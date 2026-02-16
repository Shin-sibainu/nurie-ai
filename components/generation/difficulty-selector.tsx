"use client";

import { DIFFICULTIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { DifficultyLevel } from "@/types";

interface DifficultySelectorProps {
  value: DifficultyLevel;
  onChange: (value: DifficultyLevel) => void;
  disabled?: boolean;
}

export function DifficultySelector({ value, onChange, disabled }: DifficultySelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">難易度</label>
      <div className="grid grid-cols-3 gap-3">
        {DIFFICULTIES.map((diff) => (
          <button
            key={diff.id}
            type="button"
            disabled={disabled}
            onClick={() => onChange(diff.id)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg border p-3 text-center transition-colors",
              value === diff.id
                ? "border-primary bg-primary/5 text-primary"
                : "border-border hover:border-primary/50"
            )}
          >
            <span className="text-sm font-medium">{diff.nameJa}</span>
            <span className="text-xs text-muted-foreground">{diff.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
