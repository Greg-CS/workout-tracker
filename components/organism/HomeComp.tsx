"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Dumbbell, ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const MagicBento = dynamic(() => import("@/components/MagicBento"), { ssr: false });

export const HomeComp = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard")
    }
  }, [isLoaded, isSignedIn, router])

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center p-8 overflow-hidden">
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
        <div className="mt-16 w-full max-w-6xl">
          <MagicBento />
        </div>
      </div>
    </div>
  );
}
