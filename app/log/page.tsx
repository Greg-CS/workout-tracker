"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Input } from "@/components/atoms/Input";
import { Loader2, Check, ClipboardList, Activity, Trophy } from "lucide-react";
import { templates } from "@/lib/templates";
import { IntakeFlow, type IntakeResult } from "@/components/organism/IntakeFlow";
import { WorkoutSession } from "@/components/organism/WorkoutSession";
import { adaptExercise, filterAdaptedExercises, applyEquipmentProgression } from "@/lib/readinessModel";
import { enhanceDayWithWarmup } from "@/lib/warmupLibrary";
import { ExerciseImage } from "@/components/molecules/ExerciseImage";
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
  const logActivity = useMutation(api.activities.logActivity);
  const logCheckin = useMutation(api.readiness.logCheckin);
  const updateEquipment = useMutation(api.users.updateEquipmentProfile);
  const prs = useQuery(
    api.workoutLogs.getPRs,
    userId ? { userId } : "skip",
  );

  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [intakeDone, setIntakeDone] = useState(false);
  const [intakeResult, setIntakeResult] = useState<IntakeResult | null>(null);
  const [setData, setSetData] = useState<Record<number, string[]>>({});
  const [logged, setLogged] = useState<Set<number>>(new Set());
  const [saving, setSaving] = useState(false);

  const isLoading = !userLoaded || userData === undefined || (userId && regimen === undefined) || (userId && prs === undefined);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-foreground/30" />
      </div>
    );
  }

  if (!regimen) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <ClipboardList className="mb-4 h-10 w-10 text-foreground/20" />
            <p className="mb-2 text-lg font-medium">No regimen selected</p>
            <p className="mb-4 text-sm text-foreground/50">
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

  const handleIntakeComplete = async (result: IntakeResult) => {
    setIntakeResult(result);
    setIntakeDone(true);

    if (userData) {
      for (const act of result.activities) {
        await logActivity({
          userId: userData._id,
          kind: act.kind,
          minutes: act.minutes,
          intensity: act.intensity,
          load: act.load,
        });
      }

      await logCheckin({
        userId: userData._id,
        energy: result.energy,
        soreness: result.soreness,
        sleep: result.sleep,
        prescription: result.prescription,
        score: result.score,
      });
    }
  };

  const adaptedExercises = intakeResult
    ? filterAdaptedExercises(
        enhanceDayWithWarmup(day as Parameters<typeof enhanceDayWithWarmup>[0]).exercises.map((ex) =>
          adaptExercise(
            {
              name: ex.name,
              category: ex.category,
              sets: ex.sets,
              target: ex.target,
              load: ex.load,
              rest: ex.rest,
              notes: ex.notes,
              equipment: ex.load,
              durationSec: ex.durationSec,
            },
            intakeResult.prescription,
          ),
        ).map((ex) => applyEquipmentProgression(ex, intakeResult.equipment)),
      )
    : [];

  const updateSet = (exerciseIndex: number, setIndex: number, value: string) => {
    setSetData((prev) => {
      const exerciseSets = prev[exerciseIndex]
        ? [...prev[exerciseIndex]]
        : Array(adaptedExercises[exerciseIndex]?.sets ?? day.exercises[exerciseIndex].sets).fill("");
      exerciseSets[setIndex] = value;
      return { ...prev, [exerciseIndex]: exerciseSets };
    });
  };

  const handleLogExercise = async (exerciseIndex: number) => {
    if (!userData || !day) return;
    const exercise = adaptedExercises[exerciseIndex];
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
        notes: exercise.cue || exercise.notes,
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
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Log Workout</h1>
        <p className="mt-2 text-sm text-foreground/50">
          {template?.name} regimen — adaptive training based on your readiness.
        </p>
      </div>

      {!intakeDone && (
        <>
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
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-secondary/30 bg-white text-foreground/60 hover:bg-secondary/10 hover:border-secondary/50 dark:border-foreground/10 dark:bg-transparent dark:text-foreground/60 dark:hover:bg-secondary/10"
                }`}
              >
                Day {d.day}: {d.title}
              </button>
            ))}
          </div>

          <IntakeFlow
            onComplete={handleIntakeComplete}
            initialEquipment={userData?.equipmentProfile}
            onEquipmentChange={(eq) => {
              if (user?.id) updateEquipment({ clerkId: user.id, equipment: eq });
            }}
          />
        </>
      )}

      {intakeDone && intakeResult && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">
                Day {day.day}: {day.title}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIntakeDone(false);
                setIntakeResult(null);
                setSetData({});
                setLogged(new Set());
              }}
            >
              ← Redo Intake
            </Button>
          </div>

          <WorkoutSession
            dayTitle={day.title}
            exercises={day.exercises.map((ex) => ({
              name: ex.name,
              category: ex.category,
              sets: ex.sets,
              target: ex.target,
              load: ex.load,
              rest: ex.rest,
              notes: ex.notes,
              equipment: ex.load,
            }))}
            prescription={intakeResult.prescription}
            score={intakeResult.score}
            reasons={intakeResult.reasons}
            userEquipment={intakeResult.equipment}
            prs={prs ?? []}
          />

          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold">Log Your Sets</h2>
            {adaptedExercises.map((exercise, exIdx) => {
              const isLogged = logged.has(exIdx);
              const sets = setData[exIdx] ?? Array(exercise.sets).fill("");

              return (
                <Card key={exIdx} className={isLogged ? "border-primary/60" : ""}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ExerciseImage name={exercise.name} size="sm" />
                        <div>
                          <CardTitle className="text-base">{exercise.name}</CardTitle>
                          <CardDescription>
                            Target: {exercise.target} · Load: {exercise.load} · Rest: {exercise.rest}s
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{exercise.category}</Badge>
                        {(() => {
                          const pr = prs?.find((p) => p.exercise === exercise.name || p.exercise === exercise.originalName);
                          if (pr && pr.bestSet > 0) {
                            return (
                              <Badge variant="outline" className="gap-1 text-primary">
                                <Trophy className="h-3 w-3" />
                                PR: {pr.bestSet}
                              </Badge>
                            );
                          }
                          return null;
                        })()}
                        {isLogged && (
                          <Badge variant="success">
                            <Check className="mr-1 h-3 w-3" /> Logged
                          </Badge>
                        )}
                      </div>
                    </div>
                    {exercise.cue && exercise.cue !== exercise.notes && (
                      <p className="mt-1 text-xs italic text-accent">{exercise.cue}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Array.from({ length: exercise.sets }).map((_, setIdx) => (
                        <div key={setIdx} className="flex items-center gap-3">
                          <span className="w-16 text-sm text-foreground/50">
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
                          <span className="text-sm text-foreground/40">reps</span>
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

          {logged.size === adaptedExercises.length && adaptedExercises.length > 0 && (
            <Card className="mt-6 border-primary/60">
              <CardContent className="flex items-center justify-between py-6">
                <div>
                  <p className="font-medium text-primary">
                    All exercises logged! Great work.
                  </p>
                  <p className="text-sm text-foreground/50">
                    View your history to track progress.
                  </p>
                </div>
                <Link href="/history">
                  <Button variant="outline">View History</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
