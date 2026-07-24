"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Loader2, Check, ClipboardList } from "lucide-react";
import { templates } from "@/lib/templates";
import Link from "next/link";

export default function LogWorkoutPage() {
  const { user, isLoaded: userLoaded } = useUser();
  const userData = useQuery(api.users.getUser, {
    clerkId: user?.id ?? "",
  });
  const userId = userData?._id;
  const regimen = useQuery(
    api.regimens.getRegimen,
    userId ? { userId } : "skip",
  );
  const logWorkout = useMutation(api.workoutLogs.logWorkout);

  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [setData, setSetData] = useState<Record<number, string[]>>({});
  const [logged, setLogged] = useState<Set<number>>(new Set());
  const [saving, setSaving] = useState(false);

  const isLoading = !userLoaded || userData === undefined || (userId && regimen === undefined);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (!regimen) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <ClipboardList className="mb-4 h-10 w-10 text-zinc-300 dark:text-zinc-700" />
            <p className="mb-2 text-lg font-medium">No regimen selected</p>
            <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
              Select a training template to start logging workouts.
            </p>
            <Link href="/templates">
              <Button>Choose Template</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const template = templates.find((t) => t.key === regimen.templateKey);
  const day = regimen.days[selectedDay];

  const updateSet = (exerciseIndex: number, setIndex: number, value: string) => {
    setSetData((prev) => {
      const exerciseSets = prev[exerciseIndex] ? [...prev[exerciseIndex]] : Array(day.exercises[exerciseIndex].sets).fill("");
      exerciseSets[setIndex] = value;
      return { ...prev, [exerciseIndex]: exerciseSets };
    });
  };

  const handleLogExercise = async (exerciseIndex: number) => {
    if (!userData || !day) return;
    const exercise = day.exercises[exerciseIndex];
    const reps = (setData[exerciseIndex] ?? []).join(", ");
    const totalReps = (setData[exerciseIndex] ?? [])
      .map((r) => parseInt(r.replace("s", "").trim(), 10) || 0)
      .reduce((a, b) => a + b, 0);

    if (!reps) return;

    setSaving(true);
    try {
      await logWorkout({
        userId: userData._id,
        templateKey: regimen.templateKey,
        dayLabel: `Day ${day.day}: ${day.title}`,
        exerciseName: exercise.name,
        category: exercise.category,
        reps,
        sets: exercise.sets,
        load: exercise.load,
        totalReps,
        notes: exercise.notes,
      });
      setLogged((prev) => new Set(prev).add(exerciseIndex));
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Log Workout</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {template?.name} regimen — select a day and log your sets.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {regimen.days.map((d, i) => (
          <button
            key={d.day}
            onClick={() => {
              setSelectedDay(i);
              setSetData({});
              setLogged(new Set());
            }}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
              selectedDay === i
                ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-500 dark:bg-emerald-950/30 dark:text-emerald-400"
                : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            Day {d.day}: {d.title}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {day.exercises.map((exercise, exIdx) => {
          const isLogged = logged.has(exIdx);
          const sets = setData[exIdx] ?? Array(exercise.sets).fill("");

          return (
            <Card key={exIdx} className={isLogged ? "border-emerald-500" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-base">{exercise.name}</CardTitle>
                    <Badge variant="secondary">{exercise.category}</Badge>
                  </div>
                  {isLogged && (
                    <Badge variant="success">
                      <Check className="mr-1 h-3 w-3" /> Logged
                    </Badge>
                  )}
                </div>
                <CardDescription>
                  Target: {exercise.target} · Load: {exercise.load} · Rest: {exercise.rest}s
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from({ length: exercise.sets }).map((_, setIdx) => (
                    <div key={setIdx} className="flex items-center gap-3">
                      <span className="w-16 text-sm text-zinc-500 dark:text-zinc-400">
                        Set {setIdx + 1}
                      </span>
                      <Input
                        type="text"
                        placeholder="reps (e.g. 10)"
                        value={sets[setIdx] ?? ""}
                        onChange={(e) => updateSet(exIdx, setIdx, e.target.value)}
                        className="w-32"
                        disabled={isLogged}
                      />
                      <span className="text-sm text-zinc-400">reps</span>
                    </div>
                  ))}
                </div>
                {!isLogged && (
                  <Button
                    size="sm"
                    className="mt-4"
                    onClick={() => handleLogExercise(exIdx)}
                    disabled={saving || !sets.some((s) => s && s.trim())}
                  >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                    Log Exercise
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {logged.size === day.exercises.length && (
        <Card className="mt-6 border-emerald-500">
          <CardContent className="flex items-center justify-between py-6">
            <div>
              <p className="font-medium text-emerald-700 dark:text-emerald-400">
                All exercises logged! Great work.
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                View your history to track progress.
              </p>
            </div>
            <Link href="/history">
              <Button variant="outline">View History</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
