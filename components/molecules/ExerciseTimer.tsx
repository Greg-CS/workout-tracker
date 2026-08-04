"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface ExerciseTimerProps {
  value: string;
  onChange: (seconds: string) => void;
  disabled?: boolean;
  targetSeconds?: number;
}

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function ExerciseTimer({ value, onChange, disabled, targetSeconds }: ExerciseTimerProps) {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState<number>(() => parseInt(value, 10) || 0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsed((e) => e + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  useEffect(() => {
    if (!running) {
      onChange(String(elapsed));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const toggle = () => {
    if (disabled) return;
    setRunning((r) => !r);
  };

  const reset = () => {
    if (disabled) return;
    setRunning(false);
    setElapsed(0);
    onChange("0");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="w-14 font-mono text-lg tabular-nums text-foreground">
        {formatTime(elapsed)}
      </span>
      {targetSeconds ? (
        <span className="text-xs text-foreground/40">/ {formatTime(targetSeconds)}</span>
      ) : null}
      <Button
        type="button"
        size="icon"
        variant={running ? "default" : "outline"}
        onClick={toggle}
        disabled={disabled}
      >
        {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={reset}
        disabled={disabled || (elapsed === 0 && !running)}
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
}
