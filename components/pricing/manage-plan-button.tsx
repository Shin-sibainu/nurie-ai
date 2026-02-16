"use client";

import { Button } from "@/components/ui/button";
import { createPortalAction } from "@/actions/billing";
import { toast } from "sonner";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

export function ManagePlanButton() {
  const [loading, setLoading] = useState(false);

  const handleManage = async () => {
    setLoading(true);
    try {
      const result = await createPortalAction();
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
    <Button variant="outline" size="sm" onClick={handleManage} loading={loading}>
      <ExternalLink className="h-4 w-4" />
      プランを管理
    </Button>
  );
}
