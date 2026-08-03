"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Dumbbell, FileText, ClipboardList, History, ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();

  if (isLoaded && isSignedIn) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center p-8">
        <div className="text-center">
          <p className="text-foreground/50 mb-4">Redirecting to your dashboard...</p>
          <Link href="/dashboard">
            <Button>Go to Dashboard <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center p-8">
      <div className="max-w-3xl text-center">
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
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/sign-up">
            <Button size="lg">Get Started <ArrowRight className="h-4 w-4" /></Button>
          </Link>
          <Link href="/sign-in">
            <Button size="lg" variant="outline">Sign In</Button>
          </Link>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: Dumbbell, label: "7 Templates" },
            { icon: ClipboardList, label: "Set-by-Set Logging" },
            { icon: FileText, label: "PDF Export" },
            { icon: History, label: "Track PRs" },
          ].map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.label} className="flex flex-col items-center gap-2 rounded-xl border border-secondary/25 bg-white p-4 shadow-sm shadow-secondary/10 dark:border-foreground/10 dark:bg-foreground/5">
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground/70">{feature.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
