"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { createCheckoutAction } from "@/actions/billing";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import type { PlanDefinition } from "@/types";

interface PlanCardProps {
  plan: PlanDefinition;
}

export function PlanCard({ plan }: PlanCardProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isPopular = plan.id === "pro-monthly";

  const handleSubscribe = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    if (plan.id === "free") return;

    setLoading(true);
    try {
      const result = await createCheckoutAction(plan.id);
      if (result.success && result.url) {
        window.location.href = result.url;
      } else {
        toast.error(result.error || "エラーが発生しました");
      }
    } catch {
      toast.error("エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={isPopular ? "border-primary shadow-md relative" : "relative"}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge>おすすめ</Badge>
        </div>
      )}
      <CardHeader className="text-center">
        <CardTitle>{plan.nameJa}</CardTitle>
        <div className="mt-2">
          <span className="text-3xl font-bold">{plan.priceLabel}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
              {feature}
            </li>
          ))}
        </ul>

        {plan.id !== "free" ? (
          <Button
            onClick={handleSubscribe}
            loading={loading}
            className="w-full"
            variant={isPopular ? "default" : "outline"}
          >
            プランを選択
          </Button>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            現在のプラン
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
