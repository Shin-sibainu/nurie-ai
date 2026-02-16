"use client";

import { STYLES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Circle, Sparkles, Heart } from "lucide-react";
import type { StyleType } from "@/types";

const iconMap = {
  circle: Circle,
  sparkles: Sparkles,
  heart: Heart,
};

interface StyleSelectorProps {
  value: StyleType;
  onChange: (value: StyleType) => void;
  disabled?: boolean;
}

export function StyleSelector({ value, onChange, disabled }: StyleSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">スタイル</label>
      <div className="grid grid-cols-3 gap-3">
        {STYLES.map((style) => {
          const Icon = iconMap[style.icon as keyof typeof iconMap];
          return (
            <button
              key={style.id}
              type="button"
              disabled={disabled}
              onClick={() => onChange(style.id)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg border p-3 text-center transition-colors",
                value === style.id
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/50"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{style.nameJa}</span>
              <span className="text-xs text-muted-foreground">{style.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
