"use client";

import { cn } from "@/lib/utils";

interface RatingSliderProps {
  value: number;
  onChange: (value: number) => void;
  labels: string[];
  className?: string;
}

export function RatingSlider({ value, onChange, labels, className }: RatingSliderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex gap-1.5">
        {labels.map((label, i) => {
          const idx = i + 1;
          const selected = value === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onChange(idx)}
              className={cn(
                "flex h-10 flex-1 flex-col items-center justify-center rounded-lg border text-xs font-medium transition-colors",
                selected
                  ? "border-primary/60 bg-primary/10 text-primary"
                  : "border-secondary/30 bg-white text-foreground/50 hover:bg-secondary/10 dark:border-foreground/10 dark:bg-transparent dark:text-foreground/50 dark:hover:bg-secondary/10",
              )}
            >
              <span className="text-sm font-bold">{idx}</span>
              <span className="text-[10px] leading-tight">{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  );
}
