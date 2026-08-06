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
  category: string;
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

function formatTemplateKey(key: string): string {
  if (templateLabels[key]) return templateLabels[key];
  const parts = key.split("+");
  if (parts.length > 1) {
    return parts.map((p) => templateLabels[p] ?? p).join(" + ");
  }
  return key;
}

const categoryLabels: Record<string, string> = {
  mobility: "Mobility",
  strength: "Strength",
  skill: "Skill",
  cardio: "Cardio",
  flow: "Flow",
  warmup: "Warm-up",
  cooldown: "Cool-down",
  power: "Power",
  balance: "Balance",
  flexibility: "Flexibility",
};

type SortKey = "avgPerSession" | "totalSessions" | "bestSet";

const sortOptions: { key: SortKey; label: string; icon: typeof Trophy }[] = [
  { key: "avgPerSession", label: "Avg Reps / Session", icon: Repeat },
  { key: "totalSessions", label: "Total Sessions", icon: Dumbbell },
  { key: "bestSet", label: "Best Set", icon: Trophy },
];

export function Leaderboard({ entries, currentUserId }: LeaderboardProps) {
  const [category, setCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortKey>("avgPerSession");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const categories = ["all", ...Array.from(new Set(entries.flatMap((e) => e.exercises.map((ex) => ex.category))))];

  const computeCategoryStats = (entry: LeaderboardEntry, cat: string) => {
    const exs = cat === "all" ? entry.exercises : entry.exercises.filter((ex) => ex.category === cat);
    const totalReps = exs.reduce((sum, ex) => sum + ex.totalReps, 0);
    const totalSessions = exs.reduce((sum, ex) => sum + ex.sessions, 0);
    const bestSet = exs.reduce((max, ex) => Math.max(max, ex.bestSet), 0);
    const avgPerSession = totalSessions > 0 ? Math.round(totalReps / totalSessions) : 0;
    return { totalReps, totalSessions, bestSet, avgPerSession, exercises: exs };
  };

  const filtered = entries
    .map((e) => ({ entry: e, stats: computeCategoryStats(e, category) }))
    .filter(({ stats }) => stats.totalSessions > 0)
    .sort((a, b) => b.stats[sortBy] - a.stats[sortBy]);

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
                  {category === "all" ? "All Categories" : categoryLabels[category] ?? category}
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
                    {cat === "all" ? "All Categories" : categoryLabels[cat] ?? cat}
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
            {filtered.map(({ entry, stats }, idx) => {
              const isYou = entry.userId === currentUserId;
              const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : null;
              const displayValue =
                sortBy === "avgPerSession" ? stats.avgPerSession
                : sortBy === "totalSessions" ? stats.totalSessions
                : stats.bestSet;
              const displayLabel =
                sortBy === "avgPerSession" ? "avg/session"
                : sortBy === "totalSessions" ? "sessions"
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
                            {formatTemplateKey(entry.templateKey)}
                          </Badge>
                          <span>{stats.totalSessions} sessions</span>
                          <span className="hidden sm:inline">· {stats.avgPerSession} avg/session</span>
                          <span className="hidden sm:inline">· {stats.exercises.length} exercises</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-lg font-bold text-primary">{displayValue}</span>
                      <span className="ml-1 text-xs text-foreground/50">{displayLabel}</span>
                    </div>
                  </button>
                  {isExpanded && stats.exercises.length > 0 && (
                    <div className="border-t border-secondary/10 px-4 py-3 dark:border-foreground/5">
                      <div className="mb-2 text-xs font-semibold text-foreground/50">Exercise Breakdown</div>
                      <div className="space-y-1.5">
                        {stats.exercises.map((ex) => (
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
