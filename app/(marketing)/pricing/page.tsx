import type { Metadata } from "next";
import { PricingPageContent } from "@/components/pricing/pricing-page-content";

export const metadata: Metadata = {
  title: "料金プラン",
  description:
    "ぬりえAIの料金プラン。無料プランから始めて、Proプランでもっと楽しもう。",
};

export default function PricingPage() {
  return <PricingPageContent />;
}
