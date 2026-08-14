"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/atoms/Card";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Loader2, History, Trophy, ChevronDown, CalendarDays } from "lucide-react";
import Link from "next/link";
import { ProgressionGraph } from "@/components/molecules/ProgressionGraph";
import { Calendar } from "@/components/atoms/calendar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/atoms/dropdown-menu";

type GroupBy = "date" | "month" | "exercise" | "calendar";
type CategoryFilter = "all" | "strength" | "mobility" | "skill" | "conditioning";


const categoryLabels: Record<CategoryFilter, string> = {
  all: "All Categories",
  strength: "Strength",
  mobility: "Mobility",
  skill: "Skill",
  conditioning: "Conditioning",
};

function formatDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.round(totalSeconds % 60);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

export default function HistoryPage() {
  const { user, isLoaded: userLoaded } = useUser();
  const userData = useQuery(api.users.getUser, {
    clerkId: user?.id ?? "",
  });
  const userId = userData?._id;
  const logs = useQuery(
    api.workoutLogs.getLogs,
    userId ? { userId } : "skip",
  );
  const prs = useQuery(
    api.workoutLogs.getPRs,
    userId ? { userId } : "skip",
  );
  const progression = useQuery(
    api.workoutLogs.getProgression,
    userId ? { userId } : "skip",
  );

  const [groupBy, setGroupBy] = useState<GroupBy>("date");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const isLoading = !userLoaded || userData === undefined || (userId && logs === undefined) || (userId && prs === undefined) || (userId && progression === undefined);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-foreground/30" />
      </div>
    );
  }

  if (!userData?.selectedTemplate) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <History className="mb-4 h-10 w-10 text-foreground/20" />
            <p className="mb-2 text-lg font-medium">No history yet</p>
            <p className="mb-4 text-sm text-foreground/50">
              Select a training template and start logging workouts to see your history.
            </p>
            <Link href="/templates">
              <Button>Choose Template</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const allFilteredLogs = (logs ?? []).filter(
    (log) => categoryFilter === "all" || log.category === categoryFilter,
  );

  const logDateKeys = new Set(allFilteredLogs.map((l) => new Date(l.date).toDateString()));
  const logDateModifiers = allFilteredLogs.map((l) => new Date(l.date));

  const filteredLogs = selectedDate
    ? allFilteredLogs.filter((l) => new Date(l.date).toDateString() === selectedDate.toDateString())
    : allFilteredLogs;

  const groupedLogs = filteredLogs.reduce<Record<string, typeof filteredLogs>>((acc, log) => {
    let key: string;
    if (groupBy === "date") {
      key = new Date(log.date).toLocaleDateString();
    } else if (groupBy === "month") {
      key = new Date(log.date).toLocaleDateString(undefined, { year: "numeric", month: "long" });
    } else {
      key = log.exerciseName;
    }
    if (!acc[key]) acc[key] = [];
    acc[key].push(log);
    return acc;
  }, {});

  const groupKeys = Object.keys(groupedLogs).sort((a, b) => {
    if (groupBy === "exercise") return a.localeCompare(b);
    return b.localeCompare(a);
  });

  const expandAll = () => setExpandedGroups(new Set(groupKeys));
  const collapseAll = () => setExpandedGroups(new Set());

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Workout History</h1>
        <p className="mt-2 text-sm text-foreground/50">
          Track your progress and personal records over time.
        </p>
      </div>

      {/* {prs && prs.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-accent" />
              <CardTitle>Personal Records</CardTitle>
            </div>
            <CardDescription>Your best total reps per exercise</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {prs.map((pr) => (
                <div
                  key={pr.exercise}
                  className="flex items-center justify-between rounded-lg border border-secondary/20 bg-white px-4 py-3 dark:border-foreground/10 dark:bg-foreground/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{pr.exercise}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-primary">
                      {pr.isTimed ? formatDuration(pr.totalReps) : pr.totalReps}
                    </span>
                    <span className="ml-1 text-xs text-foreground/50">
                      {pr.isTimed ? "total time" : "total reps"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )} */}

      {progression && progression.length > 0 && (
        <div className="mb-6">
          <ProgressionGraph data={progression} />
        </div>
      )}

      {/* Filters bar */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="sm" className="gap-2">
                {categoryLabels[categoryFilter]}
                <ChevronDown className="h-4 w-4" />
              </Button>
            }
          />
          <DropdownMenuContent align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Filter Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(Object.keys(categoryLabels) as CategoryFilter[]).map((c) => (
                <DropdownMenuItem
                  key={c}
                  onClick={() => setCategoryFilter(c)}
                  className={categoryFilter === c ? "bg-accent" : ""}
                >
                  {categoryLabels[c]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="ml-auto flex gap-2">
          <Button variant="ghost" size="sm" onClick={expandAll}>Expand All</Button>
          <Button variant="ghost" size="sm" onClick={collapseAll}>Collapse All</Button>
          {selectedDate && (
            <Button variant="ghost" size="sm" onClick={() => setSelectedDate(undefined)}>Show All</Button>
          )}
        </div>
      </div>

      {/* Calendar view */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={{ hasLogs: logDateModifiers }}
              modifiersClassNames={{ hasLogs: "rdp-has-logs" }}
              className="mx-auto scale-100 origin-center rounded-lg"
              classNames={{ root: "w-full max-w-md" }}
            />
            <div className="w-full">
              {selectedDate ? (
                <>
                  <div className="mb-3 flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold">
                      {selectedDate.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                    </h3>
                  </div>
                  {filteredLogs.length === 0 ? (
                    <p className="py-8 text-center text-sm text-foreground/40">
                      No workouts logged on this day.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {filteredLogs.map((log) => (
                        <div
                          key={log._id}
                          className="flex flex-col gap-2 rounded-lg border border-secondary/20 bg-white px-4 py-3 dark:border-foreground/10 dark:bg-foreground/5 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">{log.exerciseName}</span>
                            <Badge variant="secondary">{log.category}</Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-foreground/50">
                            <span>{log.sets} sets</span>
                            <span>{log.reps}</span>
                            <span className="font-medium text-primary">
                              {log.category === "mobility" || log.category === "flow"
                                ? formatDuration(log.totalReps)
                                : `${log.totalReps} total`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CalendarDays className="mb-3 h-8 w-8 text-foreground/20" />
                  <p className="text-sm text-foreground/50">
                    Select a date to view workouts logged on that day.
                  </p>
                  <p className="mt-1 text-xs text-foreground/40">
                    {logDateKeys.size} day{logDateKeys.size !== 1 ? "s" : ""} with logged workouts
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
