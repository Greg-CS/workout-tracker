"use client";

import { Dumbbell } from "lucide-react";
import dynamic from "next/dynamic";

const MagicBento = dynamic(() => import("@/components/MagicBento"), { ssr: false });

export const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 overflow-hidden">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Dumbbell className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Track your workouts.
          <br />
          <span className="text-primary">Build your routine.</span>
        </h1>
        <p className="mb-8 text-lg text-foreground/60">
          Choose from 7 training templates, log your sessions set-by-set,
          export your regimen as PDF, and get email reminders to stay on track.
        </p>
        <div>
          <MagicBento />
        </div>
      </div>
    </div>
  );
}
