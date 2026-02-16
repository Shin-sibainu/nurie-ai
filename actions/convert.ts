"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { generation } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { convertPhotoToColoring } from "@/lib/gemini";
import { uploadToR2, generateKey } from "@/lib/r2";
import { generatePdf } from "@/lib/pdf";
import { checkRateLimit, incrementUsage } from "@/lib/rate-limit";

function detectMimeType(buffer: Buffer): string {
  if (buffer[0] === 0xff && buffer[1] === 0xd8) return "image/jpeg";
  if (buffer[0] === 0x89 && buffer[1] === 0x50) return "image/png";
  if (buffer[0] === 0x52 && buffer[1] === 0x49) return "image/webp";
  return "image/jpeg";
}

interface ConvertResult {
  success: boolean;
  error?: string;
  data?: {
    id: string;
    imageUrl: string;
    pdfUrl: string | null;
  };
  remaining?: number;
}

export async function convertAction(formData: FormData): Promise<ConvertResult> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return { success: false, error: "ログインが必要です" };
    }

    const file = formData.get("photo") as File | null;
    if (!file) {
      return { success: false, error: "写真を選択してください" };
    }

    if (file.size > 10 * 1024 * 1024) {
      return { success: false, error: "ファイルサイズは10MB以下にしてください" };
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return { success: false, error: "JPEG、PNG、WebP形式の画像を選択してください" };
    }

    const userId = session.user.id;

    const rateLimit = await checkRateLimit(userId);
    if (!rateLimit.allowed) {
      return {
        success: false,
        error: "今月の無料生成回数を使い切りました。Proプランにアップグレードするか、来月までお待ちください。",
        remaining: 0,
      };
    }

    const [gen] = await db.insert(generation).values({
      userId,
      prompt: `写真変換: ${file.name}`,
      style: "simple",
      difficulty: "normal",
      status: "processing",
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    const arrayBuffer = await file.arrayBuffer();
    const photoBuffer = Buffer.from(arrayBuffer);

    const mimeType = detectMimeType(photoBuffer);
    const imageBuffer = await convertPhotoToColoring(photoBuffer, mimeType);

    // Gemini returns PNG or JPEG
    const isPng = imageBuffer[0] === 0x89 && imageBuffer[1] === 0x50;
    const ext = isPng ? "png" : "jpg";
    const outMime = isPng ? "image/png" : "image/jpeg";
    const imageKey = generateKey(userId, "original", ext);
    const imageUrl = await uploadToR2(imageKey, imageBuffer, outMime);

    // Generate PDF
    const pdfBuffer = await generatePdf(imageBuffer);
    const pdfKey = generateKey(userId, "pdf", "pdf");
    const pdfUrl = await uploadToR2(pdfKey, pdfBuffer, "application/pdf");

    await db.update(generation).set({
      status: "completed",
      imageKey,
      pdfKey,
      imageUrl,
      pdfUrl,
      updatedAt: new Date(),
    }).where(eq(generation.id, gen.id));

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
    console.error("Conversion error:", error);
    return { success: false, error: "変換中にエラーが発生しました。もう一度お試しください。" };
  }
}
