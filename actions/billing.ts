"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { createCheckoutSession, createCustomerPortalSession } from "@/lib/stripe";

interface BillingResult {
  success: boolean;
  url?: string;
  error?: string;
}

const PRICE_ID_MAP: Record<string, string | undefined> = {
  "pro-monthly": process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
  "pro-annual": process.env.STRIPE_PRO_ANNUAL_PRICE_ID,
};

export async function createCheckoutAction(planId: string): Promise<BillingResult> {
  try {
    const priceId = PRICE_ID_MAP[planId];
    if (!priceId) {
      return { success: false, error: "無効なプランです" };
    }

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return { success: false, error: "ログインが必要です" };
    }

    const [userData] = await db
      .select()
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);

    if (!userData) {
      return { success: false, error: "ユーザーが見つかりません" };
    }

    const url = await createCheckoutSession({
      priceId,
      userId: session.user.id,
      email: session.user.email,
      stripeCustomerId: userData.stripeCustomerId,
    });

    return { success: true, url };
  } catch (error) {
    console.error("Checkout error:", error);
    return { success: false, error: "チェックアウトの作成に失敗しました" };
  }
}

export async function createPortalAction(): Promise<BillingResult> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return { success: false, error: "ログインが必要です" };
    }

    const [userData] = await db
      .select()
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);

    if (!userData?.stripeCustomerId) {
      return { success: false, error: "Stripe顧客情報が見つかりません" };
    }

    const url = await createCustomerPortalSession(userData.stripeCustomerId);
    return { success: true, url };
  } catch (error) {
    console.error("Portal error:", error);
    return { success: false, error: "ポータルの作成に失敗しました" };
  }
}
