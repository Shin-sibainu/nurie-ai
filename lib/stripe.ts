import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export async function createCheckoutSession({
  priceId,
  userId,
  email,
  stripeCustomerId,
}: {
  priceId: string;
  userId: string;
  email: string;
  stripeCustomerId?: string | null;
}): Promise<string> {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/mypage?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?checkout=cancel`,
    customer: stripeCustomerId || undefined,
    customer_email: stripeCustomerId ? undefined : email,
    metadata: { userId },
    allow_promotion_codes: true,
  });

  return session.url!;
}

export async function createCustomerPortalSession(
  customerId: string
): Promise<string> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/mypage`,
  });

  return session.url;
}
