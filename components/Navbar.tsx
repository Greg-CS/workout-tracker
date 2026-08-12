"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, LayoutDashboard, ClipboardList, History, Trophy, User, Settings, Users, Lightbulb } from "lucide-react";
import { UserButton, useAuth } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { useUserData } from "@/lib/useUserData";
import { SpecialDelete } from "./SpecialDelete";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/templates", label: "Templates", icon: Dumbbell },
  { href: "/log", label: "Log Workout", icon: ClipboardList },
  { href: "/history", label: "History", icon: History },
  { href: "/users", label: "Users", icon: Users },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
];

export function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  const { userData } = useUserData();

  return (
    <header className="sticky top-0 z-50 border-b border-secondary/20 bg-white/80 backdrop-blur-md dark:border-foreground/10 dark:bg-background/80">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Dumbbell className="h-5 w-5 text-primary" />
            <span className="hidden sm:inline">Gym snooze</span>
          </Link>
          {isSignedIn && (
            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/50 hover:text-foreground hover:bg-secondary/10",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-secondary/10",
                )}
                aria-label="User menu"
              >
                <User className="h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <div className="px-2 py-1.5">
                    <UserButton />
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => (window.location.href = "/history")}>
                    <History className="h-4 w-4" />
                    Workout Records
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => (window.location.href = "/settings")}>
                    <Settings className="h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => (window.location.href = "/suggestions")}>
                    <Lightbulb className="h-4 w-4" />
                    Suggestions
                  </DropdownMenuItem>
                  {process.env.NODE_ENV === "development" && (
                    <DropdownMenuItem>
                      {userData && <SpecialDelete userId={userData._id} />}
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <UserButton />
          )}
        </div>
      </nav>
      {isSignedIn && (
        <div className="flex items-center gap-1 overflow-x-auto px-4 pb-2 md:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/50 hover:text-foreground",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
