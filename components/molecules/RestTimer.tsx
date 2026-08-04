"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { SkipForward, Timer } from "lucide-react";

interface RestTimerProps {
  restSeconds: number;
  autoStart?: boolean;
}

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function RestTimer({ restSeconds, autoStart = true }: RestTimerProps) {
  const [remaining, setRemaining] = useState(restSeconds);
  const [active, setActive] = useState(autoStart);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (active && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            setActive(false);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, remaining]);

  if (remaining <= 0 && !active) return null;

  const pct = ((restSeconds - remaining) / restSeconds) * 100;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-secondary/20 bg-secondary/5 px-3 py-2 dark:border-foreground/10 dark:bg-foreground/5">
      <Timer className="h-4 w-4 text-foreground/40" />
      <div className="flex-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-foreground/50">Rest</span>
          <span className={`font-mono tabular-nums ${remaining <= 10 ? "text-accent font-bold" : "text-foreground/70"}`}>
            {formatTime(remaining)}
          </span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary/20 dark:bg-foreground/10">
          <div
            className="h-full rounded-full bg-primary transition-all duration-1000 ease-linear"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => {
          setActive(false);
          setRemaining(0);
        }}
        className="shrink-0"
      >
        <SkipForward className="h-3.5 w-3.5" />
        Skip
      </Button>
    </div>
  );
}
