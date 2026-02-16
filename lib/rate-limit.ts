import { db } from "./db";
import { user } from "./db/schema";
import { eq } from "drizzle-orm";
import { FREE_GENERATIONS_PER_MONTH } from "./constants";

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  limit: number;
}

export async function checkRateLimit(userId: string): Promise<RateLimitResult> {
  const [userData] = await db
    .select()
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  if (!userData) {
    return { allowed: false, remaining: 0, limit: 0 };
  }

  if (userData.plan?.startsWith("pro")) {
    return { allowed: true, remaining: Infinity, limit: Infinity };
  }

  const credits = userData.credits ?? 0;
  if (credits > 0) {
    return { allowed: true, remaining: credits, limit: credits };
  }

  const now = new Date();
  const resetAt = userData.freeCountResetAt;

  if (!resetAt || now > resetAt) {
    const nextReset = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    await db
      .update(user)
      .set({
        freeCountMonth: 0,
        freeCountResetAt: nextReset,
      })
      .where(eq(user.id, userId));

    return {
      allowed: true,
      remaining: FREE_GENERATIONS_PER_MONTH,
      limit: FREE_GENERATIONS_PER_MONTH,
    };
  }

  const freeCount = userData.freeCountMonth ?? 0;
  const remaining = FREE_GENERATIONS_PER_MONTH - freeCount;

  return {
    allowed: remaining > 0,
    remaining: Math.max(0, remaining),
    limit: FREE_GENERATIONS_PER_MONTH,
  };
}

export async function incrementUsage(userId: string): Promise<void> {
  const [userData] = await db
    .select()
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  if (!userData) return;

  if (userData.plan?.startsWith("pro")) return;

  const credits = userData.credits ?? 0;
  if (credits > 0) {
    await db
      .update(user)
      .set({ credits: credits - 1 })
      .where(eq(user.id, userId));
    return;
  }

  const freeCount = userData.freeCountMonth ?? 0;
  await db
    .update(user)
    .set({ freeCountMonth: freeCount + 1 })
    .where(eq(user.id, userId));
}
