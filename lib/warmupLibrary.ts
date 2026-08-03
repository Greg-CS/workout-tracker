import type { Exercise, RegimenDay } from "./templates";

const s = (
  name: string,
  target: string,
  notes: string,
  durationSec?: number,
  sets = 1,
): Exercise => ({
  name,
  category: "mobility",
  sets,
  target,
  load: "bodyweight",
  rest: 0,
  notes,
  durationSec,
});

export type WarmupFocus =
  | "push"
  | "pull"
  | "legs"
  | "core"
  | "shoulders"
  | "cardio"
  | "full-body"
  | "recovery"
  | "yoga";

export const warmupPresets: Record<WarmupFocus, Exercise[]> = {
  push: [
    s("Cat-Cow", "5-8 slow reps", "Spine warmup."),
    s("Wrist Prep", "30s extension + 30s flexion", "Prep for pushups and dips.", 60),
    s("Arm Circles", "10 forward + 10 backward", "Warm up rotator cuffs and deltoids."),
    s("Shoulder Dislocates (band)", "10 reps", "Shoulder mobility with band.", 0, 1),
    s("Pec Stretch (doorway)", "30 sec each side", "Open chest and pecs before pressing.", 30),
    s("Triceps Stretch", "30 sec each side", "Stretch triceps and lats.", 30),
    s("Thoracic Rotation", "8 each side", "Upper back mobility for pressing.", 0, 1),
  ],
  pull: [
    s("Cat-Cow", "5-8 slow reps", "Spine warmup."),
    s("Shoulder Dislocates (band)", "10 reps", "Shoulder mobility for pulling.", 0, 1),
    s("Arm Circles", "10 forward + 10 backward", "Warm up shoulders."),
    s("Dead Hang", "20-30 sec", "Decompress spine and prep grip.", 30),
    s("Lat Stretch", "30 sec each side", "Stretch lats before pulling.", 30),
    s("Banded Pull-aparts", "15 reps", "Activate rear delts and rotator cuff.", 0, 1),
    s("Wrist Flexor Stretch", "30 sec each side", "Prep forearms for grip work.", 30),
  ],
  legs: [
    s("Cat-Cow", "5-8 slow reps", "Spine warmup."),
    s("Dynamic Leg Swings", "10 each leg", "Front-to-back and lateral swings."),
    s("Hip Flexor Stretch", "45 sec each side", "Open hips before squatting.", 45),
    s("Hamstring Scoops", "8 reps", "Dynamic hamstring stretch."),
    s("90/90 Hip Rotations", "8 each direction", "Hip internal rotation."),
    s("Ankle Circles", "10 each direction each ankle", "Prep ankles for squat depth.", 0, 1),
    s("World's Greatest Stretch", "5 each side", "Full body mobility — hips, T-spine, hamstrings."),
  ],
  core: [
    s("Cat-Cow", "5-8 slow reps", "Spine warmup."),
    s("Pelvic Tilts", "10 reps", "Awaken pelvic floor and lower abs."),
    s("Dead Bug (slow)", "6 each side", "Core activation without loading."),
    s("Trunk Rotations", "8 each direction", "Thoracic rotation for oblique prep."),
    s("Seated Pike", "30 sec", "Hamstring and core connection.", 30),
    s("Kneeling Hip Flexor Stretch", "30 sec each side", "Open hips for core work.", 30),
  ],
  shoulders: [
    s("Cat-Cow", "5-8 slow reps", "Spine warmup."),
    s("Shoulder Dislocates (band)", "10 reps", "Shoulder mobility.", 0, 1),
    s("Arm Circles", "10 forward + 10 backward", "Warm up deltoids."),
    s("Wall Slides", "10 reps", "Scapular mobility and upward rotation."),
    s("Pec Stretch (doorway)", "30 sec each side", "Open chest.", 30),
    s("Prone Snow Angels", "12 reps", "Activate posterior cuff and rhomboids."),
    s("Banded Pull-aparts", "15 reps", "Rear delt and rotator cuff activation.", 0, 1),
  ],
  cardio: [
    s("Cat-Cow", "5-8 slow reps", "Spine warmup."),
    s("Dynamic Leg Swings", "10 each leg", "Leg prep."),
    s("Hip Flexor Stretch", "30 sec each side", "Open hips.", 30),
    s("Ankle Circles", "10 each direction each ankle", "Prep ankles.", 0, 1),
    s("World's Greatest Stretch", "5 each side", "Full body mobility."),
    s("Light Jog in Place", "60 sec", "Raise heart rate gradually.", 60),
  ],
  "full-body": [
    s("Cat-Cow", "5-8 slow reps", "Spine warmup."),
    s("World's Greatest Stretch", "5 each side", "Full body opener."),
    s("Dynamic Leg Swings", "10 each leg", "Hip mobility."),
    s("Arm Circles", "10 forward + 10 backward", "Shoulder warmup."),
    s("Hip Flexor Stretch", "30 sec each side", "Open hips.", 30),
    s("Thoracic Rotation", "8 each side", "Upper back mobility."),
    s("Jumping Jacks", "30 sec", "Raise heart rate.", 30),
  ],
  recovery: [
    s("Cat-Cow", "8-10 slow reps", "Gentle spine mobility."),
    s("Child's Pose", "60-90 sec", "Full body relaxation and hip opening.", 90),
    s("Seated Pike", "45 sec", "Hamstring release.", 45),
    s("Hip Flexor Stretch", "45 sec each side", "Hip opening.", 45),
    s("Pancake Stretch", "45 sec", "Adductor and inner thigh release.", 45),
    s("Supine Twist", "45 sec each side", "Spinal rotation and release.", 45),
    s("Deep Breathing", "10 breaths", "Box breathing — 4 in, 4 hold, 4 out, 4 hold.", 120),
  ],
  yoga: [
    s("Child's Pose", "60 sec", "Centering and hip opening.", 60),
    s("Cat-Cow", "8 slow reps", "Spine awakening."),
    s("Downward Dog", "45 sec", "Full body stretch — calves, hamstrings, shoulders.", 45),
    s("Cobra Pose", "30 sec", "Gentle backbend and chest opener.", 30),
    s("Pigeon Pose", "45 sec each side", "Deep hip opener for glutes and piriformis.", 45),
    s("Seated Forward Fold", "60 sec", "Calming hamstring and spine stretch.", 60),
    s("Supine Twist", "45 sec each side", "Spinal release and digestion aid.", 45),
    s("Bridge Pose", "30 sec", "Glute activation and spine extension.", 30),
    s("Savasana", "3-5 min", "Final relaxation — lie flat, breathe naturally.", 300),
  ],
};

export function getWarmupForDay(day: RegimenDay): Exercise[] {
  const title = day.title.toLowerCase();
  const hasStrength = day.exercises.some((ex) => ex.category === "strength");
  const hasConditioning = day.exercises.some((ex) => ex.category === "conditioning");

  if (title.includes("yoga") || title.includes("stretch") || title.includes("recovery") || title.includes("mobility")) {
    return warmupPresets.recovery;
  }

  if (title.includes("push") || title.includes("bench") || title.includes("ohp") || title.includes("press")) {
    if (title.includes("shoulder") || title.includes("overhead")) return warmupPresets.shoulders;
    return warmupPresets.push;
  }

  if (title.includes("pull") || title.includes("row") || title.includes("deadlift")) {
    return warmupPresets.pull;
  }

  if (title.includes("leg") || title.includes("squat") || title.includes("posterior") || title.includes("glute")) {
    return warmupPresets.legs;
  }

  if (title.includes("core") || title.includes("abs") || title.includes("oblique")) {
    return warmupPresets.core;
  }

  if (title.includes("cardio") || title.includes("run") || title.includes("row") || title.includes("interval") || title.includes("cycle") || title.includes("jump")) {
    return warmupPresets.cardio;
  }

  if (hasConditioning && !hasStrength) return warmupPresets.cardio;

  return warmupPresets["full-body"];
}

export function enhanceDayWithWarmup(day: RegimenDay): RegimenDay {
  const warmup = getWarmupForDay(day);

  const existingNames = new Set(day.exercises.map((ex) => ex.name));
  const filteredWarmup = warmup.filter((ex) => !existingNames.has(ex.name));

  return {
    ...day,
    exercises: [...filteredWarmup, ...day.exercises],
  };
}

export function enhanceTemplateDays(days: RegimenDay[]): RegimenDay[] {
  return days.map(enhanceDayWithWarmup);
}
