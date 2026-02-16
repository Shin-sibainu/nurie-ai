"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { generation } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { generateColoringPage } from "@/lib/gemini";
import { uploadToR2, generateKey } from "@/lib/r2";
import { generatePdf } from "@/lib/pdf";
import { checkRateLimit, incrementUsage } from "@/lib/rate-limit";
import type { StyleType, DifficultyLevel } from "@/types";

const generateSchema = z.object({
  prompt: z.string().min(1, "テーマを入力してください").max(200, "200文字以内で入力してください"),
  style: z.enum(["simple", "detailed", "kawaii"]),
  difficulty: z.enum(["easy", "normal", "hard"]),
});

export type GenerateInput = z.infer<typeof generateSchema>;

interface GenerateResult {
  success: boolean;
  error?: string;
  data?: {
    id: string;
    imageUrl: string;
    pdfUrl: string | null;
  };
  remaining?: number;
}

export async function generateAction(input: GenerateInput): Promise<GenerateResult> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return { success: false, error: "ログインが必要です" };
    }

    const parsed = generateSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const { prompt, style, difficulty } = parsed.data;
    const userId = session.user.id;

    // Check rate limit
    const rateLimit = await checkRateLimit(userId);
    if (!rateLimit.allowed) {
      return {
        success: false,
        error: "今月の無料生成回数を使い切りました。Proプランにアップグレードするか、来月までお待ちください。",
        remaining: 0,
      };
    }

    // Create generation record
    const [gen] = await db.insert(generation).values({
      userId,
      prompt,
      style,
      difficulty,
      status: "processing",
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    // Generate image
    const imageBuffer = await generateColoringPage(prompt, style as StyleType, difficulty as DifficultyLevel);

    // Upload original to R2 (Gemini returns PNG or JPEG)
    const isPng = imageBuffer[0] === 0x89 && imageBuffer[1] === 0x50;
    const ext = isPng ? "png" : "jpg";
    const mime = isPng ? "image/png" : "image/jpeg";
    const imageKey = generateKey(userId, "original", ext);
    const imageUrl = await uploadToR2(imageKey, imageBuffer, mime);

    // Generate PDF
    const pdfBuffer = await generatePdf(imageBuffer);
    const pdfKey = generateKey(userId, "pdf", "pdf");
    const pdfUrl = await uploadToR2(pdfKey, pdfBuffer, "application/pdf");

    // Update generation record
    await db.update(generation).set({
      status: "completed",
      imageKey,
      pdfKey,
      imageUrl,
      pdfUrl,
      updatedAt: new Date(),
    }).where(eq(generation.id, gen.id));

    // Increment usage
    await incrementUsage(userId);

    const newRateLimit = await checkRateLimit(userId);

    return {
      success: true,
      data: {
        id: gen.id,
        imageUrl,
        pdfUrl,
      },
      remaining: newRateLimit.remaining === Infinity ? undefined : newRateLimit.remaining,
    };
  } catch (error) {
    console.error("Generation error:", error);
    return { success: false, error: "生成中にエラーが発生しました。もう一度お試しください。" };
  }
}
