"use client";

import { ExerciseCard } from "@/components/molecules/ExerciseCard";
import { ReadinessGauge } from "@/components/molecules/ReadinessGauge";
import { Badge } from "@/components/atoms/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import { adaptExercise, filterAdaptedExercises, applyEquipmentProgression, type Prescription } from "@/lib/readinessModel";
import { enhanceDayWithWarmup } from "@/lib/warmupLibrary";

interface GenericExercise {
  name: string;
  category: string;
  sets: number;
  target: string;
  load: string;
  rest: number;
  notes: string;
  equipment?: string;
  durationSec?: number;
}

interface PRData {
  exercise: string;
  bestSet: number;
  totalReps: number;
  lastDate: number;
}

interface WorkoutSessionProps {
  dayTitle: string;
  exercises: GenericExercise[];
  prescription: Prescription;
  score: number;
  reasons: string[];
  userEquipment: string[];
  prs?: PRData[];
}

export function WorkoutSession({
  dayTitle,
  exercises,
  prescription,
  score,
  reasons,
  userEquipment,
  prs = [],
}: WorkoutSessionProps) {
  const prMap = new Map(prs.map((p) => [p.exercise, p]));
  const enhancedDay = enhanceDayWithWarmup({ day: 0, title: dayTitle, exercises } as Parameters<typeof enhanceDayWithWarmup>[0]);
  const adapted = enhancedDay.exercises
    .map((ex) => adaptExercise(ex, prescription))
    .map((ex) => applyEquipmentProgression(ex, userEquipment))
    .filter((e) => e.sets > 0);

  const filtered = filterAdaptedExercises(adapted);

  return (
    <div className="space-y-4">
      <ReadinessGauge score={score} prescription={prescription} reasons={reasons} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Today&apos;s Session: {dayTitle}</span>
            <Badge variant={prescription === "full" ? "success" : "secondary"}>
              {prescription}
            </Badge>
          </CardTitle>
          <p className="text-sm text-foreground/50">
            {filtered.length} exercises · Adapted to your readiness and equipment
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {filtered.map((ex, i) => (
            <ExerciseCard
              key={i}
              name={ex.name}
              category={ex.category}
              sets={ex.sets}
              target={ex.target}
              load={ex.load}
              rest={ex.rest}
              notes={ex.notes}
              equipment={ex.equipment}
              cue={ex.cue}
              originalSets={ex.originalSets}
              originalName={ex.originalName}
              durationSec={ex.durationSec}
              userEquipment={userEquipment}
              pr={prMap.get(ex.name) ?? prMap.get(ex.originalName ?? "")}
            />
          ))}
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-foreground/40">
              Recovery day — focus on mobility and rest.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
