import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { user, payment } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

function getPlanFromSubscription(subscription: Stripe.Subscription): string {
  const priceId = subscription.items.data[0]?.price?.id;
  if (priceId === process.env.STRIPE_PRO_ANNUAL_PRICE_ID) {
    return "pro-annual";
  }
  if (priceId === process.env.STRIPE_PRO_MONTHLY_PRICE_ID) {
    return "pro-monthly";
  }
  return "pro";
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        if (!userId) break;

        // Retrieve subscription to determine plan type
        let plan = "pro";
        if (session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );
          plan = getPlanFromSubscription(subscription);
        }

        await db
          .update(user)
          .set({
            plan,
            stripeCustomerId: session.customer as string,
            updatedAt: new Date(),
          })
          .where(eq(user.id, userId));

        await db.insert(payment).values({
          userId,
          stripePaymentId:
            (session.payment_intent as string) ||
            (session.subscription as string) ||
            "",
          amount: session.amount_total || 0,
          currency: session.currency || "jpy",
          status: "completed",
          type: "subscription",
          createdAt: new Date(),
        });
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        if (subscription.status === "active") {
          const plan = getPlanFromSubscription(subscription);
          await db
            .update(user)
            .set({ plan, updatedAt: new Date() })
            .where(eq(user.stripeCustomerId, customerId));
        } else if (
          subscription.status === "past_due" ||
          subscription.status === "unpaid"
        ) {
          // Keep pro but could add a warning flag in the future
          console.warn(
            `Subscription ${subscription.id} status: ${subscription.status}`
          );
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        await db
          .update(user)
          .set({ plan: "free", updatedAt: new Date() })
          .where(eq(user.stripeCustomerId, customerId));
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        // Skip the first invoice (already recorded in checkout.session.completed)
        if (
          invoice.billing_reason === "subscription_create"
        ) {
          break;
        }

        const [userData] = await db
          .select()
          .from(user)
          .where(eq(user.stripeCustomerId, customerId))
          .limit(1);

        if (userData) {
          await db.insert(payment).values({
            userId: userData.id,
            stripePaymentId:
              String(
                (invoice as unknown as { payment_intent: string | null })
                  .payment_intent ?? ""
              ),
            amount: invoice.amount_paid,
            currency: invoice.currency,
            status: "completed",
            type: "renewal",
            createdAt: new Date(),
          });
        }
        break;
      }
    }
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
