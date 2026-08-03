"use client";

import { cn } from "@/lib/utils";
import type { Prescription } from "@/lib/readinessModel";
import { prescriptionLabels, prescriptionColors } from "@/lib/readinessModel";

interface ReadinessGaugeProps {
  score: number;
  prescription: Prescription;
  reasons?: string[];
  className?: string;
}

export function ReadinessGauge({ score, prescription, reasons = [], className }: ReadinessGaugeProps) {
  const filled = Math.round((score / 100) * 20);
  const bar = "█".repeat(filled) + "░".repeat(20 - filled);

  const scoreColor =
    score >= 75 ? "text-primary" : score >= 58 ? "text-accent" : score >= 40 ? "text-secondary" : "text-foreground/40";

  return (
    <div className={cn("rounded-xl border border-secondary/25 bg-white p-5 dark:border-foreground/10 dark:bg-foreground/5", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wide text-foreground/60">Readiness</h3>
        <span className={cn("text-2xl font-bold", scoreColor)}>{Math.round(score)}%</span>
      </div>

      <div className="mt-3">
        <div className={cn("font-mono text-sm tracking-tighter", scoreColor)}>{bar}</div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="text-xs text-foreground/50">Prescription:</span>
        <span className={cn("text-sm font-bold", prescriptionColors[prescription])}>
          {prescriptionLabels[prescription]}
        </span>
      </div>

      {reasons.length > 0 && (
        <ul className="mt-3 space-y-1">
          {reasons.map((reason, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-foreground/50">
              <span className="text-accent">•</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
