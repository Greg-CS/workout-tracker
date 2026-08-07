"use client";

import { ExerciseCard } from "@/components/molecules/ExerciseCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import { Badge } from "@/components/atoms/Badge";
import { getEquipmentProgression, checkEquipmentAvailability } from "@/lib/equipmentModel";
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

interface GenericDay {
  day: number;
  title: string;
  sourceTemplate?: string;
  exercises: GenericExercise[];
}

interface RegimenViewProps {
  days: GenericDay[];
  userEquipment?: string[];
}

export function RegimenView({ days, userEquipment = ["bodyweight"] }: RegimenViewProps) {
  const enhancedDays = days.map((day) => enhanceDayWithWarmup(day as Parameters<typeof enhanceDayWithWarmup>[0]));
  return (
    <div className="space-y-6">
      {enhancedDays.map((day) => (
        <Card key={day.day}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="default">Day {day.day}</Badge>
              <span>{day.title}</span>
              {day.sourceTemplate && (
                <Badge variant="outline" className="text-xs text-foreground/50">
                  {day.sourceTemplate}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {day.exercises.filter((ex) => {
              const { available } = checkEquipmentAvailability(ex.load, userEquipment);
              return available;
            }).map((ex, i) => {
              const prog = getEquipmentProgression(ex.name, userEquipment);
              return (
                <ExerciseCard
                  key={i}
                  name={prog ? prog.upgradedName : ex.name}
                  category={ex.category}
                  sets={ex.sets}
                  target={ex.target}
                  load={prog ? prog.upgradedLoad : ex.load}
                  rest={ex.rest}
                  notes={ex.notes}
                  equipment={prog ? prog.equipment : (ex.equipment ?? ex.load)}
                  cue={prog?.cue}
                  originalName={prog ? ex.name : undefined}
                  durationSec={ex.durationSec}
                  userEquipment={userEquipment}
                />
              );
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
