"use client";

import Link from "next/link";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { useUserData } from "@/lib/useUserData";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";
import { useEffect } from "react";
import ProfileDropdown from "@/components/organism/profile-dropdown";
import { Button } from "@/components/atoms/Button";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { isSignedIn, isLoaded: authLoaded } = useAuth();
  const { user } = useUser();
  const { userData, isLoaded: userDataLoaded } = useUserData();
  const isLoaded = authLoaded && userDataLoaded;
  const router = useRouter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const profile =
    userData && user
      ? {
          name: userData.name,
          email: userData.email,
          avatar: user.imageUrl,
        }
      : undefined;

  useEffect(() => {
    if (isLoaded && isSignedIn && profile) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn, profile, router]);

  return (
    <header className="fixed top-0 left-1/2 z-50 mt-10 w-[90%] md:w-[70%] -translate-x-1/2 rounded-full border-b border-secondary/20 bg-white/80 backdrop-blur-md dark:border-foreground/10 dark:bg-primary/80">
      <nav className="mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/applogo.svg" alt="Gym snooze" width={50} height={50} />
          <span className="inline">Gym snooze</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/sign-up">
              <Button size="lg" variant="outline">Sign Up</Button>
            </Link>
          </div>
          {isLoaded && isSignedIn && profile && (
            // <ProfileDropdown data={profile} />
            <>
              <Link href="/dashboard" className="p-2 rounded-lg bg-background">Dashboard</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
