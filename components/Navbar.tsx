"use client";

import Link from "next/link";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";
import { useUserData } from "@/lib/useUserData";
import Image from "next/image";
import ProfileDropdown from "@/components/organism/profile-dropdown";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button";

export function Navbar() {
  const { isSignedIn, isLoaded: authLoaded } = useAuth();
  const { user } = useUser();
  const { userData, isLoaded: userDataLoaded } = useUserData();

  const isLoaded = authLoaded && userDataLoaded;
  const profile =
    userData && user
      ? {
          name: userData.name,
          email: userData.email,
          avatar: user.imageUrl,
        }
      : undefined;

  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard")
    }
  }, [isLoaded, isSignedIn, router])

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
          {isLoaded && isSignedIn && profile ? (
            <ProfileDropdown data={profile} />
          ) : (
            <UserButton />
          )}
        </div>
      </nav>
    </header>
  );
}
