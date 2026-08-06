"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/atoms/Card";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Trophy, Dumbbell, Repeat, Calendar, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/atoms/dropdown-menu";

interface ExerciseBreakdown {
  name: string;
  totalReps: number;
  totalSets: number;
  bestSet: number;
  sessions: number;
}

interface LeaderboardEntry {
  userId: string;
  userName: string;
  templateKey: string;
  totalLogs: number;
  totalReps: number;
  bestSet: number;
  avgRepsPerWorkout: number;
  lastLogDate: number;
  exercises: ExerciseBreakdown[];
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
}

const templateLabels: Record<string, string> = {
  calisthenics: "Calisthenics",
  surfing: "Surfing",
  gymnast: "Gymnast",
  powerlifting: "Power Lifting",
  aerobics: "Aerobics",
  pilates: "Pilates",
  cardio: "Cardio",
  unknown: "Other",
};

type SortKey = "avgRepsPerWorkout" | "totalLogs" | "bestSet";

const sortOptions: { key: SortKey; label: string; icon: typeof Trophy }[] = [
  { key: "avgRepsPerWorkout", label: "Avg Reps / Workout", icon: Repeat },
  { key: "totalLogs", label: "Workouts Logged", icon: Dumbbell },
  { key: "bestSet", label: "Best Set", icon: Trophy },
];

export function Leaderboard({ entries, currentUserId }: LeaderboardProps) {
  const [category, setCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortKey>("avgRepsPerWorkout");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const categories = ["all", ...Array.from(new Set(entries.map((e) => e.templateKey)))];

  const filtered = entries
    .filter((e) => category === "all" || e.templateKey === category)
    .sort((a, b) => b[sortBy] - a[sortBy]);

  const activeSort = sortOptions.find((s) => s.key === sortBy)!;

  const toggleExpand = (userId: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId);
      else next.add(userId);
      return next;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-accent" />
          Leaderboard
        </CardTitle>
        <CardDescription>See how you stack up against other athletes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="sm" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  {category === "all" ? "All Categories" : templateLabels[category] ?? category}
                </Button>
              }
            />
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categories.map((cat) => (
                  <DropdownMenuItem
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={category === cat ? "bg-accent" : ""}
                  >
                    {cat === "all" ? "All Categories" : templateLabels[cat] ?? cat}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="sm" className="gap-2">
                  <activeSort.icon className="h-4 w-4" />
                  {activeSort.label}
                </Button>
              }
            />
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {sortOptions.map(({ key, label, icon: Icon }) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => setSortBy(key)}
                    className={sortBy === key ? "bg-accent" : ""}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Leaderboard list */}
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-sm text-foreground/40">
            No athletes in this category yet. Be the first!
          </p>
        ) : (
          <div className="space-y-2">
            {filtered.map((entry, idx) => {
              const isYou = entry.userId === currentUserId;
              const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : null;
              const displayValue =
                sortBy === "avgRepsPerWorkout" ? entry.avgRepsPerWorkout
                : sortBy === "totalLogs" ? entry.totalLogs
                : entry.bestSet;
              const displayLabel =
                sortBy === "avgRepsPerWorkout" ? "avg/workout"
                : sortBy === "totalLogs" ? "workouts"
                : "reps";
              const isExpanded = expanded.has(entry.userId);
              return (
                <div
                  key={entry.userId}
                  className={`rounded-lg border transition-all ${
                    isYou
                      ? "border-primary/40 bg-primary/5"
                      : "border-secondary/20 bg-white dark:border-foreground/10 dark:bg-foreground/5"
                  }`}
                >
                  <button
                    onClick={() => toggleExpand(entry.userId)}
                    className="flex w-full flex-col gap-2 px-4 py-3 text-left sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <ChevronDown
                        className={`h-4 w-4 text-foreground/40 transition-transform ${
                          isExpanded ? "" : "-rotate-90"
                        }`}
                      />
                      <span className="flex h-8 w-8 items-center justify-center text-sm font-bold">
                        {medal ?? `#${idx + 1}`}
                      </span>
                      <div>
                        <span className="text-sm font-medium">
                          {entry.userName}
                          {isYou && <Badge variant="secondary" className="ml-2 text-[10px]">You</Badge>}
                        </span>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-foreground/40">
                          <Badge variant="outline" className="text-[10px]">
                            {templateLabels[entry.templateKey] ?? entry.templateKey}
                          </Badge>
                          <span>{entry.totalLogs} logs</span>
                          <span className="hidden sm:inline">· {entry.avgRepsPerWorkout} avg/workout</span>
                          <span className="hidden sm:inline">· {entry.exercises.length} exercises</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-lg font-bold text-primary">{displayValue}</span>
                      <span className="ml-1 text-xs text-foreground/50">{displayLabel}</span>
                    </div>
                  </button>
                  {isExpanded && entry.exercises.length > 0 && (
                    <div className="border-t border-secondary/10 px-4 py-3 dark:border-foreground/5">
                      <div className="mb-2 text-xs font-semibold text-foreground/50">Exercise Breakdown</div>
                      <div className="space-y-1.5">
                        {entry.exercises.map((ex) => (
                          <div
                            key={ex.name}
                            className="flex flex-col gap-1.5 rounded-md bg-secondary/5 px-3 py-2 text-xs dark:bg-foreground/5 sm:flex-row sm:items-center sm:justify-between"
                          >
                            <span className="font-medium text-foreground/80">{ex.name}</span>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-foreground/50">
                              <span><span className="font-semibold text-foreground/70">{ex.sessions}</span> sessions</span>
                              <span><span className="font-semibold text-foreground/70">{ex.totalSets}</span> sets</span>
                              <span><span className="font-semibold text-foreground/70">{ex.totalReps}</span> reps</span>
                              <span className="text-primary"><span className="font-semibold">{ex.bestSet}</span> best</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
