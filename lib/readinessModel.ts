import type { BodyRegion, Intensity } from "./activityModel";
import { activityFatigue } from "./activityModel";
import { getEquipmentProgression, checkEquipmentAvailability, type EquipmentProgression } from "./equipmentModel";

export type Prescription = "full" | "reduced" | "technique" | "recovery";

export interface ReadinessInput {
  energy: number;
  soreness: number;
  sleep: number;
  activity?: {
    kind: string;
    minutes: number;
    intensity: Intensity;
    load: number;
  } | null;
  recentFatigue?: number;
  hoursSinceHardSession?: number;
}

export interface ReadinessResult {
  score: number;
  prescription: Prescription;
  reasons: string[];
  activityFatigue: Record<BodyRegion, number>;
}

export interface AdaptedExercise {
  name: string;
  category: string;
  sets: number;
  target: string;
  load: string;
  rest: number;
  notes: string;
  equipment: string;
  cue: string;
  originalSets?: number;
  progression?: EquipmentProgression;
  originalName?: string;
  durationSec?: number;
}

export function calculateReadiness(input: ReadinessInput): ReadinessResult {
  const { energy, soreness, sleep, activity, recentFatigue = 0, hoursSinceHardSession = 999 } = input;

  const actFatigue = activity
    ? activityFatigue(activity)
    : { legs: 0, push: 0, pull: 0, core: 0, shoulders: 0, cardio: 0 };

  let score = 100;
  score -= recentFatigue * 10;
  score += (energy - 3) * 5;
  score += (sleep - 3) * 5;
  score -= (soreness - 1) * 7;

  const totalActFatigue = Object.values(actFatigue).reduce((a, b) => a + b, 0);
  score -= totalActFatigue * 3;

  score = Math.max(0, Math.min(100, score));

  let prescription: Prescription = "full";
  const reasons: string[] = [];

  if (hoursSinceHardSession < 32) {
    reasons.push(`Hard regional stimulus ${Math.round(hoursSinceHardSession)} hours ago`);
  }

  if (totalActFatigue > 2) {
    reasons.push(`External activity added ${totalActFatigue.toFixed(1)} fatigue units`);
  }

  if (score < 40 || energy <= 1 || soreness >= 5) {
    prescription = "recovery";
    reasons.push("Very low readiness or severe soreness — recovery prescribed");
  } else if (score < 58 || hoursSinceHardSession < 20) {
    prescription = "technique";
    reasons.push("High fatigue — preserve movement quality with technique session");
  } else if (score < 75 || hoursSinceHardSession < 32) {
    prescription = "reduced";
    reasons.push("Moderate fatigue — retain patterns with lower volume");
  } else {
    reasons.push("Readiness supports full training");
  }

  return { score, prescription, reasons, activityFatigue: actFatigue };
}

export function adaptExercise(
  exercise: {
    name: string;
    category: string;
    sets: number;
    target: string;
    load: string;
    rest: number;
    notes: string;
    equipment?: string;
    durationSec?: number;
  },
  prescription: Prescription,
): AdaptedExercise {
  const base: AdaptedExercise = {
    name: exercise.name,
    category: exercise.category,
    sets: exercise.sets,
    target: exercise.target,
    load: exercise.load,
    rest: exercise.rest,
    notes: exercise.notes,
    equipment: exercise.equipment ?? exercise.load,
    cue: exercise.notes,
    durationSec: exercise.durationSec,
  };

  switch (prescription) {
    case "full":
      return base;

    case "reduced":
      if (exercise.category !== "mobility" && exercise.category !== "conditioning") {
        base.sets = Math.max(2, Math.ceil(exercise.sets * 0.67));
        base.originalSets = exercise.sets;
        base.cue = (exercise.notes + " Use 85-90% normal load. Stop 2-4 reps in reserve.").trim();
      }
      return base;

    case "technique":
      if (exercise.category === "mobility" || exercise.category === "skill") {
        base.sets = Math.min(exercise.sets, 2);
        return base;
      }
      if (exercise.category === "strength") {
        base.sets = 2;
        base.originalSets = exercise.sets;
        base.cue = (exercise.notes + " Stop with 4 reps in reserve. Focus on quality.").trim();
        return base;
      }
      return { ...base, sets: 0 };

    case "recovery":
      if (exercise.category === "mobility" || exercise.category === "conditioning") {
        return base;
      }
      return { ...base, sets: 0 };
  }
}

export function applyEquipmentProgression(
  exercise: AdaptedExercise,
  userEquipment: string[],
): AdaptedExercise {
  const prog = getEquipmentProgression(exercise.name, userEquipment);
  if (!prog) return exercise;

  return {
    ...exercise,
    originalName: exercise.name,
    name: prog.upgradedName,
    load: prog.upgradedLoad,
    equipment: prog.equipment,
    cue: prog.cue,
    progression: prog,
  };
}

export function filterAdaptedExercises(exercises: AdaptedExercise[], userEquipment?: string[]): AdaptedExercise[] {
  return exercises.filter((e) => {
    if (e.sets <= 0) return false;
    if (!userEquipment || userEquipment.length === 0) return true;
    const { available } = checkEquipmentAvailability(e.load ?? "", userEquipment);
    return available;
  });
}

export const prescriptionLabels: Record<Prescription, string> = {
  full: "Full Session",
  reduced: "Reduced Volume",
  technique: "Technique Focus",
  recovery: "Recovery & Mobility",
};

export const prescriptionColors: Record<Prescription, string> = {
  full: "text-primary",
  reduced: "text-accent",
  technique: "text-secondary",
  recovery: "text-foreground/50",
};
