"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/atoms/Card";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { TrendingUp, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/atoms/dropdown-menu";

interface ProgressionEntry {
  date: number;
  bestSet: number;
  totalReps: number;
}

interface ProgressionData {
  exercise: string;
  category?: string;
  isTimed?: boolean;
  entries: ProgressionEntry[];
}

interface ProgressionGraphProps {
  data: ProgressionData[];
}

const colors = [
  "#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6",
  "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#6366f1",
];

function formatSeconds(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.round(s % 60);
  return m > 0 ? `${m}:${sec.toString().padStart(2, "0")}` : `${sec}s`;
}

export function ProgressionGraph({ data }: ProgressionGraphProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set(data.slice(0, 3).map((d) => d.exercise)));
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = Array.from(new Set(data.map((d) => d.category).filter((c): c is string => !!c)));
  const categoryLabels: Record<string, string> = { all: "All Categories" };
  categories.forEach((c) => (categoryLabels[c] = c.charAt(0).toUpperCase() + c.slice(1)));

  const filteredData = categoryFilter === "all" ? data : data.filter((d) => d.category === categoryFilter);

  const toggleExercise = (name: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const visible = filteredData.filter((d) => selected.has(d.exercise));
  const allTimed = visible.length > 0 && visible.every((d) => d.isTimed);

  const picker = (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-foreground/50">Filter by category</span>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="sm" className="gap-1.5">
                {categoryLabels[categoryFilter] ?? "All Categories"}
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setCategoryFilter("all")}
                className={categoryFilter === "all" ? "bg-accent" : ""}
              >
                All Categories
              </DropdownMenuItem>
              {categories.map((c) => (
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
      </div>

      <div className="flex flex-wrap gap-2">
        {filteredData.length === 0 && (
          <p className="text-sm text-foreground/40">No exercises in this category yet.</p>
        )}
        {filteredData.map((d) => {
          const isSelected = selected.has(d.exercise);
          const colorIdx = visible.findIndex((v) => v.exercise === d.exercise);
          const color = colorIdx >= 0 ? colors[colorIdx % colors.length] : undefined;
          return (
            <button
              key={d.exercise}
              onClick={() => toggleExercise(d.exercise)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-all ${
                isSelected
                  ? "border-primary/40 bg-primary/10 text-foreground"
                  : "border-secondary/20 bg-white text-foreground/50 hover:bg-secondary/10 dark:border-foreground/10 dark:bg-transparent"
              }`}
            >
              {isSelected && color && (
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
              )}
              {d.exercise}
              {d.isTimed && <span className="text-[10px] text-foreground/40">(timed)</span>}
              <Badge variant="outline" className="ml-1 text-[10px]">{d.entries.length}</Badge>
            </button>
          );
        })}
      </div>
    </div>
  );

  if (visible.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Progression Graph
          </CardTitle>
          <CardDescription>Select exercises to see progression over time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex h-48 items-center justify-center text-sm text-foreground/40">
            Select an exercise below to view its progression
          </div>
          {picker}
        </CardContent>
      </Card>
    );
  }

  const allEntries = visible.flatMap((d) => d.entries);
  if (allEntries.length === 0) return null;

  const minDate = Math.min(...allEntries.map((e) => e.date));
  const maxDate = Math.max(...allEntries.map((e) => e.date));
  const maxVal = Math.max(...allEntries.map((e) => e.bestSet), 10);
  const dateRange = maxDate - minDate || 1;

  const W = 800;
  const H = 300;
  const PAD = 40;
  const chartW = W - PAD * 2;
  const chartH = H - PAD * 2;

  const toX = (date: number) => PAD + ((date - minDate) / dateRange) * chartW;
  const toY = (val: number) => H - PAD - (val / maxVal) * chartH;

  const xTicks = 5;
  const yTicks = 5;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Progression Graph
        </CardTitle>
        <CardDescription>
          {allTimed ? "Longest hold time per exercise over time" : "Best set per exercise over time"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="w-full overflow-x-auto">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 600 }}>
            {/* Y-axis grid lines and labels */}
            {Array.from({ length: yTicks + 1 }).map((_, i) => {
              const val = Math.round((maxVal / yTicks) * i);
              const y = toY(val);
              return (
                <g key={`y-${i}`}>
                  <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="currentColor" strokeWidth={0.5} className="text-foreground/10" />
                  <text x={PAD - 8} y={y + 4} textAnchor="end" className="fill-foreground/40 text-[10px]">
                    {allTimed ? formatSeconds(val) : val}
                  </text>
                </g>
              );
            })}

            {/* X-axis labels */}
            {Array.from({ length: xTicks + 1 }).map((_, i) => {
              const date = minDate + (dateRange / xTicks) * i;
              const x = toX(date);
              return (
                <text key={`x-${i}`} x={x} y={H - PAD + 16} textAnchor="middle" className="fill-foreground/40 text-[10px]">
                  {new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </text>
              );
            })}

            {/* Lines */}
            {visible.map((series, idx) => {
              const color = colors[idx % colors.length];
              const points = series.entries
                .filter((e) => e.bestSet > 0)
                .map((e) => `${toX(e.date)},${toY(e.bestSet)}`)
                .join(" ");
              return (
                <g key={series.exercise}>
                  <polyline
                    points={points}
                    fill="none"
                    stroke={color}
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  {series.entries.filter((e) => e.bestSet > 0).map((e, i) => (
                    <circle
                      key={i}
                      cx={toX(e.date)}
                      cy={toY(e.bestSet)}
                      r={3}
                      fill={color}
                    />
                  ))}
                </g>
              );
            })}
          </svg>
        </div>

        {picker}
      </CardContent>
    </Card>
  );
}
