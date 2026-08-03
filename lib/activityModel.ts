export type BodyRegion = "legs" | "push" | "pull" | "core" | "shoulders" | "cardio";

export type Intensity = "easy" | "moderate" | "hard";

export interface Activity {
  kind: string;
  minutes: number;
  intensity: Intensity;
  load: number;
}

export interface ActivityType {
  key: string;
  label: string;
  icon: string;
}

export const activityTypes: ActivityType[] = [
  { key: "skate", label: "Skateboarding", icon: "Waves" },
  { key: "ruck", label: "Ruck", icon: "Backpack" },
  { key: "walk", label: "Walk", icon: "Footprints" },
  { key: "bike", label: "Bike", icon: "Bike" },
  { key: "hike", label: "Hike", icon: "Mountain" },
  { key: "surf", label: "Surf", icon: "Palmtree" },
  { key: "run", label: "Run", icon: "PersonSimpleRun" },
];

const baseFatigue: Record<string, Partial<Record<BodyRegion, number>>> = {
  walk: { legs: 0.8, cardio: 0.5 },
  skate: { legs: 1.9, core: 0.8, cardio: 1.2 },
  ruck: { legs: 2.2, core: 1.2, shoulders: 0.7, cardio: 1.3 },
  bike: { legs: 1.4, core: 0.3, cardio: 1.1 },
  hike: { legs: 1.7, cardio: 1.0 },
  surf: { pull: 1.1, shoulders: 1.2, core: 1.0, cardio: 1.0 },
  run: { legs: 2.0, cardio: 1.4 },
};

export function activityFatigue(a: Activity): Record<BodyRegion, number> {
  const mult = a.intensity === "easy" ? 0.65 : a.intensity === "hard" ? 1.35 : 1.0;
  const scale =
    Math.max(a.minutes / 60, 0.25) * mult * (1 + Math.min(a.load / 45, 1) * 0.35);

  const result: Record<BodyRegion, number> = {
    legs: 0,
    push: 0,
    pull: 0,
    core: 0,
    shoulders: 0,
    cardio: 0,
  };

  const base = baseFatigue[a.kind];
  if (base) {
    for (const [region, value] of Object.entries(base)) {
      result[region as BodyRegion] = (value as number) * scale;
    }
  }

  return result;
}

export function fatigueLabel(fatigue: Record<BodyRegion, number>): string[] {
  const labels: string[] = [];
  for (const [region, value] of Object.entries(fatigue)) {
    if (value > 0) {
      const level = value > 2 ? "high" : value > 1 ? "moderate" : "light";
      labels.push(`${region}: ${level} (${value.toFixed(1)})`);
    }
  }
  return labels;
}
