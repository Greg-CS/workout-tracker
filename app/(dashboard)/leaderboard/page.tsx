"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Leaderboard } from "@/components/molecules/Leaderboard";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/atoms/dropdown-menu";
import { Calendar } from "lucide-react";

type Period = "week" | "month" | "all";

const periodLabels: Record<Period, string> = {
  week: "This Week",
  month: "This Month",
  all: "All Time",
};

export default function LeaderboardPage() {
  const { user, isLoaded } = useUser();
  const userData = useQuery(api.users.getUser, { clerkId: user?.id ?? "" });
  const userId = userData?._id;
  const [period, setPeriod] = useState<Period>("month");

  const leaderboard = useQuery(api.workoutLogs.getLeaderboard, { period });

  const isLoading = !isLoaded || userData === undefined || leaderboard === undefined;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-foreground/30" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex gap-4 items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Leaderboard</h1>
          <p className="mt-2 text-sm text-foreground/50">
            Compete with other athletes by workout intensity and consistency.
          </p>
        </div>

        {/* Period selector */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="sm" className="gap-2 p-6">
                <Calendar className="h-4 w-4" />
                {periodLabels[period]}
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Time Period</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(Object.keys(periodLabels) as Period[]).map((p) => (
                <DropdownMenuItem
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={period === p ? "bg-accent" : ""}
                >
                  {periodLabels[p]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Leaderboard entries={leaderboard ?? []} currentUserId={userId} />
    </div>
  );
}
