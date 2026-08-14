"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Input } from "@/components/atoms/Input";
import { Loader2, Check, ClipboardList, Activity, Download } from "lucide-react";
import { templates } from "@/lib/templates";
import { IntakeFlow, type IntakeResult } from "@/components/organism/IntakeFlow";
import { ReadinessGauge } from "@/components/molecules/ReadinessGauge";
import { ExerciseCard } from "@/components/molecules/ExerciseCard";
import { adaptExercise, filterAdaptedExercises, applyEquipmentProgression } from "@/lib/readinessModel";
import { enhanceDayWithWarmup } from "@/lib/warmupLibrary";
import { ExerciseTimer } from "@/components/molecules/ExerciseTimer";
import { RestTimer } from "@/components/molecules/RestTimer";
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
  const weeklyLogs = useQuery(
    api.workoutLogs.getWeeklyLogs,
    userId ? { userId } : "skip",
  );

  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [intakeDone, setIntakeDone] = useState(false);
  const [intakeResult, setIntakeResult] = useState<IntakeResult | null>(null);
  const [setData, setSetData] = useState<Record<number, string[]>>({});
  const [loadData, setLoadData] = useState<Record<number, string>>({});
  const [restSetIdx, setRestSetIdx] = useState<Record<number, number | null>>({});
  const [forceRelog, setForceRelog] = useState<Set<number>>(new Set());
  const [logged, setLogged] = useState<Set<number>>(new Set());
  const [saving, setSaving] = useState(false);

  const isLoading = !userLoaded || userData === undefined || (userId && regimen === undefined) || (userId && prs === undefined) || (userId && weeklyLogs === undefined);

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

  const regimenKeys = regimen.templateKeys ?? [regimen.templateKey];
  const regimenTemplates = regimenKeys.map((k) => templates.find((t) => t.key === k)).filter((t): t is (typeof templates)[number] => !!t);
  const templateDisplayName = regimenTemplates.map((t) => t.name).join(" + ");
  const day = regimen.days[selectedDay];

  const currentDayLabel = `Day ${day.day}: ${day.title}`;
  const alreadyLoggedNames = new Set<string>();
  if (weeklyLogs) {
    for (const log of weeklyLogs) {
      if (log.dayLabel === currentDayLabel) {
        alreadyLoggedNames.add(log.exerciseName);
      }
    }
  }

  const handleDownloadPDF = () => {
    if (!regimen) return;
    const keys = regimen.templateKeys ?? [regimen.templateKey];
    const matchedTemplates = keys.map((k) => templates.find((t) => t.key === k)).filter((t): t is (typeof templates)[number] => !!t);
    if (matchedTemplates.length === 0) return;
    const displayName = matchedTemplates.map((t) => t.name).join(" + ");

    import("jspdf").then(({ jsPDF }) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text(`${displayName} Regimen`, 14, 22);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Athlete: ${user?.fullName ?? "Unknown"}`, 14, 30);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 36);
        doc.setTextColor(0);

        let y = 46;

        regimen.days.forEach((day) => {
          if (y > 250) {
            doc.addPage();
            y = 20;
          }

          doc.setFontSize(14);
          doc.text(`Day ${day.day}: ${day.title}`, 14, y);
          y += 6;

          const autoTable = (doc as unknown as { autoTable: (config: unknown) => void }).autoTable;
          autoTable({
            startY: y,
            head: [["Exercise", "Category", "Sets", "Target", "Load", "Rest", "Notes"]],
            body: day.exercises.map((ex) => [
              ex.name,
              ex.category,
              String(ex.sets),
              ex.target,
              ex.load,
              `${ex.rest}s`,
              ex.notes,
            ]),
            theme: "striped",
            headStyles: { fillColor: [8, 135, 50] },
            styles: { fontSize: 8, cellPadding: 2 },
          });

          y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
        });

        doc.save(`${matchedTemplates.map((t) => t.key).join("-")}-regimen.pdf`);
      });
    });
  };

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
        intakeResult.equipment,
      ).filter((ex, i, arr) => arr.findIndex((e) => e.name === ex.name) === i)
    : [];

  const updateSet = (exerciseIndex: number, setIndex: number, value: string) => {
    setSetData((prev) => {
      const exerciseSets = prev[exerciseIndex]
        ? [...prev[exerciseIndex]]
        : Array(adaptedExercises[exerciseIndex]?.sets ?? day.exercises[exerciseIndex].sets).fill("");
      exerciseSets[setIndex] = value;
      return { ...prev, [exerciseIndex]: exerciseSets };
    });
    if (value.trim() && parseInt(value, 10) > 0) {
      setRestSetIdx((prev) => ({ ...prev, [exerciseIndex]: setIndex }));
    }
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
        load: loadData[exerciseIndex] || exercise.load,
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
    <div className="mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Log Workout</h1>
        <p className="mt-2 text-sm text-foreground/50">
          {templateDisplayName} regimen — adaptive training based on your readiness.
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
                  setLoadData({});
                  setRestSetIdx({});
                  setForceRelog(new Set());
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
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={handleDownloadPDF}>
                <Download className="h-4 w-4" /> PDF
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIntakeDone(false);
                  setIntakeResult(null);
                  setSetData({});
                  setLoadData({});
                  setRestSetIdx({});
                  setForceRelog(new Set());
                  setLogged(new Set());
                }}
              >
                ← Redo Intake
              </Button>
            </div>
          </div>

          <ReadinessGauge
            score={intakeResult.score}
            prescription={intakeResult.prescription}
            reasons={intakeResult.reasons}
          />

          <div className="mt-6 space-y-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {adaptedExercises.map((exercise, exIdx) => {
              const sessionLogged = logged.has(exIdx);
              const weekLogged = !sessionLogged && alreadyLoggedNames.has(exercise.name);
              const isLogged = sessionLogged || weekLogged;
              const inputsDisabled = sessionLogged || (weekLogged && !forceRelog.has(exIdx));
              const sets = setData[exIdx] ?? Array(exercise.sets).fill("");
              const pr = prs?.find((p) => p.exercise === exercise.name || p.exercise === exercise.originalName);

              return (
                <ExerciseCard
                  key={exIdx}
                  name={exercise.name}
                  category={exercise.category}
                  sets={exercise.sets}
                  target={exercise.target}
                  load={exercise.load}
                  rest={exercise.rest}
                  notes={exercise.notes}
                  equipment={exercise.load}
                  cue={exercise.cue}
                  originalSets={exercise.originalSets}
                  originalName={exercise.originalName}
                  durationSec={exercise.durationSec}
                  userEquipment={intakeResult.equipment}
                  pr={pr && pr.bestSet > 0 ? pr : undefined}
                  className={isLogged ? "border-primary/60" : ""}
                >
                  <div className="border-t border-secondary/15 px-4 pb-4 pt-3 dark:border-foreground/10">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      {sessionLogged && (
                        <Badge variant="success">
                          <Check className="mr-1 h-3 w-3" /> Logged
                        </Badge>
                      )}
                      {weekLogged && !forceRelog.has(exIdx) && (
                        <Badge variant="outline" className="gap-1 text-foreground/50">
                          <Check className="h-3 w-3" /> Logged this week
                        </Badge>
                      )}
                    </div>
                    {exercise.load && exercise.load !== "bodyweight" && !inputsDisabled && (
                      <div className="mb-3 flex items-center gap-2">
                        <span className="text-sm text-foreground/50">Load used:</span>
                        <Input
                          type="text"
                          placeholder={exercise.load}
                          value={loadData[exIdx] ?? ""}
                          onChange={(e) =>
                            setLoadData((prev) => ({ ...prev, [exIdx]: e.target.value }))
                          }
                          className="w-40"
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      {Array.from({ length: exercise.sets }).map((_, setIdx) => {
                        const isTimed = exercise.category === "mobility" || exercise.category === "flow";
                        return (
                          <div key={setIdx} className="flex items-center gap-3">
                            <span className="w-16 text-sm text-foreground/50">
                              Set {setIdx + 1}
                            </span>
                            {isTimed ? (
                              <ExerciseTimer
                                value={sets[setIdx] ?? ""}
                                onChange={(v) => updateSet(exIdx, setIdx, v)}
                                disabled={inputsDisabled}
                                targetSeconds={exercise.durationSec}
                              />
                            ) : (
                              <>
                                <Input
                                  type="text"
                                  placeholder="reps (e.g. 10)"
                                  value={sets[setIdx] ?? ""}
                                  onChange={(e) => updateSet(exIdx, setIdx, e.target.value)}
                                  className="w-32"
                                  disabled={inputsDisabled}
                                />
                                <span className="text-sm text-foreground/40">reps</span>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {restSetIdx[exIdx] !== undefined && restSetIdx[exIdx] !== null && !inputsDisabled && (
                      <div className="mt-3">
                        <RestTimer
                          key={`${exIdx}-${restSetIdx[exIdx]}`}
                          restSeconds={exercise.rest ?? 180}
                        />
                      </div>
                    )}
                    {!sessionLogged && (
                      <Button
                        size="sm"
                        className="mt-4"
                        onClick={() => handleLogExercise(exIdx)}
                        disabled={saving || !sets.some((s) => s && s.trim() && parseInt(s, 10) > 0)}
                      >
                        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                        Log Exercise
                      </Button>
                    )}
                    {weekLogged && !forceRelog.has(exIdx) && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-4 ml-2"
                        onClick={() => setForceRelog((prev) => new Set(prev).add(exIdx))}
                      >
                        Log Again
                      </Button>
                    )}
                  </div>
                </ExerciseCard>
              );
            })}
          </div>

          {adaptedExercises.length > 0 && adaptedExercises.every((ex) => logged.has(adaptedExercises.indexOf(ex)) || alreadyLoggedNames.has(ex.name)) && (
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
