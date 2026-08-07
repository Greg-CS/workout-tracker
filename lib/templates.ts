export type ExerciseCategory = "strength" | "skill" | "mobility" | "flow" | "conditioning";
export type BodyRegion = "push" | "pull" | "legs" | "core" | "shoulders" | "cardio";

export interface Exercise {
  name: string;
  category: ExerciseCategory;
  sets: number;
  target: string;
  load: string;
  rest: number;
  notes: string;
  equipment?: string;
  primaryRegion?: BodyRegion;
  fatigueCost?: number;
  durationSec?: number;
}

export interface RegimenDay {
  day: number;
  title: string;
  sourceTemplate?: string;
  exercises: Exercise[];
}

export interface Template {
  key: string;
  name: string;
  description: string;
  icon: string;
  days: RegimenDay[];
}

const e = (
  name: string, category: ExerciseCategory, sets: number, target: string,
  load: string, rest: number, notes: string,
  equipment?: string, primaryRegion?: BodyRegion, fatigueCost?: number,
  durationSec?: number,
): Exercise => ({ name, category, sets, target, load, rest, notes, equipment, primaryRegion, fatigueCost, durationSec });

const d = (day: number, title: string, exercises: Exercise[]): RegimenDay => ({ day, title, exercises });

import { getYogaDay } from "./yogaFlows";

const yogaDayFor = (dayNum: number, flows: string[]): RegimenDay => getYogaDay(dayNum, flows);

export const templates: Template[] = [
  {
    key: "calisthenics",
    name: "Calisthenics",
    description: "Bodyweight strength and skill — push, pull, legs, and core progressions.",
    icon: "Dumbbell",
    days: [
      d(1, "Heavy Push", [
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Warm up the spine."),
        e("Wrist Prep", "mobility", 1, "30s extension + 30s flexion", "bodyweight", 0, "Prep for pushups and dips."),
        e("Feet-Elevated Push-ups", "strength", 4, "8-12 reps", "bodyweight", 150, "Stop 1-2 reps before failure."),
        e("Pike Push-ups", "strength", 3, "8-15 reps", "bodyweight", 120, "Controlled shoulders."),
        e("Dips", "strength", 3, "6-12 reps", "bodyweight", 150, "Full range of motion."),
        e("Hollow Body Hold", "skill", 3, "20-45 sec", "bodyweight", 90, "Lower back pressed to floor."),
        e("Ab Roller", "strength", 3, "6-12 reps", "bodyweight", 120, "Ribs down, glutes tight."),
      ]),
      d(2, "Heavy Pull", [
        e("Hip Flexor Stretch", "mobility", 1, "30-45 sec each side", "bodyweight", 0, "Counteracts sitting."),
        e("Seated Pike", "mobility", 1, "30 sec", "bodyweight", 0, "Hamstring compression prep."),
        e("Pull-ups", "strength", 3, "6-12 reps", "bodyweight", 150, "Full hang, clean reps."),
        e("Chin-ups", "strength", 3, "6-12 reps", "bodyweight", 150, "Biceps and lats."),
        e("Bodyweight Rows", "strength", 3, "8-12 reps", "bodyweight", 150, "Use a low bar or rings."),
        e("Hammer Curls (if dumbbells)", "strength", 3, "10-15 reps", "dumbbells", 90, "No swinging."),
        e("Plank", "skill", 3, "45-90 sec", "bodyweight", 60, "Brace the core."),
      ]),
      d(3, "Legs + Posterior Chain", [
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Warm up."),
        e("Air Squats", "strength", 4, "15-25 reps", "bodyweight", 120, "Deep, controlled."),
        e("Split Squats", "strength", 3, "10-15 each leg", "bodyweight", 150, "Front knee tracking."),
        e("Romanian Deadlift (if dumbbells)", "strength", 4, "8-12 reps", "dumbbells", 150, "Hinge, don't squat."),
        e("Glute Bridge", "strength", 3, "12-20 reps", "bodyweight", 120, "Controlled lockout."),
        e("Plank", "skill", 3, "45-90 sec", "bodyweight", 60, "Core braced."),
      ]),
      d(4, "Recovery / Mobility", [
        e("Easy Walk", "mobility", 1, "10-30 min", "bodyweight", 0, "Recovery blood flow."),
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Spine mobility."),
        e("World's Greatest Stretch", "mobility", 1, "5 reps each side", "bodyweight", 0, "Hips and thoracic."),
        e("Hip Flexor Stretch", "mobility", 1, "30-45 sec each side", "bodyweight", 0, "Open the hips."),
        e("Pancake Stretch", "mobility", 1, "2 x 30 sec", "bodyweight", 0, "Adductors and compression."),
      ]),
      d(5, "Push Hypertrophy", [
        e("Wrist Prep", "mobility", 1, "30s + 30s", "bodyweight", 0, "Prep wrists."),
        e("Push-ups", "strength", 4, "12-20 reps", "bodyweight", 120, "Slow tempo."),
        e("Pike Push-ups", "strength", 3, "8-15 reps", "bodyweight", 120, "Shoulder overload."),
        e("Dips", "strength", 3, "8-15 reps", "bodyweight", 120, "Volume day."),
        e("Lateral Raises (if dumbbells)", "strength", 3, "12-20 reps", "dumbbells", 75, "Strict reps."),
        e("Plank", "skill", 3, "45-90 sec", "bodyweight", 60, "Core endurance."),
      ]),
      d(6, "Skill + Accessories", [
        e("Seated Pike", "mobility", 1, "30 sec", "bodyweight", 0, "L-sit prep."),
        e("Pancake Stretch", "mobility", 1, "2 x 30 sec", "bodyweight", 0, "Compression."),
        e("Support Hold (Dip Bars)", "skill", 3, "20-40 sec", "bodyweight", 90, "Lock elbows."),
        e("Tuck L-Sit", "skill", 3, "10-20 sec", "bodyweight", 90, "Press through handles."),
        e("Compression Raises", "skill", 3, "6-12 reps", "bodyweight", 75, "Active compression."),
        e("Bodyweight Rows", "strength", 3, "8-12 reps", "bodyweight", 150, "Scapular control."),
      ]),
      d(7, "Complete Recovery", [
        e("Easy Walk", "mobility", 1, "15-30 min", "bodyweight", 0, "Light recovery."),
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Spine."),
        e("Hip Flexor Stretch", "mobility", 1, "30-45 sec each side", "bodyweight", 0, "Hips."),
        e("Seated Pike", "mobility", 1, "30 sec", "bodyweight", 0, "Hamstrings."),
      ]),
      yogaDayFor(8, ["morningFlow", "shoulderFlow"]),
    ],
  },
  {
    key: "surfing",
    name: "Surfing",
    description: "Paddle endurance, pop-up power, balance, and shoulder health for surfers.",
    icon: "Waves",
    days: [
      d(1, "Paddle Power + Shoulders", [
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Spine warmup."),
        e("Shoulder Dislocates (band)", "mobility", 1, "10 reps", "resistance band", 0, "Shoulder mobility."),
        e("Swimmer Shoulder Press", "strength", 4, "8-12 reps", "dumbbells", 120, "Endurance for paddling."),
        e("Prone Snow Angels", "strength", 3, "12-15 reps", "bodyweight", 60, "Posture and cuff."),
        e("Side Plank Rotations", "skill", 3, "8 each side", "bodyweight", 60, "Oblique power for turns."),
        e("Russian Twists", "strength", 3, "15-20 reps", "bodyweight", 60, "Rotational core."),
      ]),
      d(2, "Pop-Up Power", [
        e("Hip Flexor Stretch", "mobility", 1, "30 sec each side", "bodyweight", 0, "Hip mobility."),
        e("Explosive Push-ups", "strength", 4, "6-10 reps", "bodyweight", 120, "Pop-up power."),
        e("Jump Squats", "strength", 4, "8-12 reps", "bodyweight", 120, "Leg explosion."),
        e("Burpees", "conditioning", 3, "8-12 reps", "bodyweight", 90, "Full-body pop-up simulation."),
        e("Hollow Body Hold", "skill", 3, "20-40 sec", "bodyweight", 60, "Core stability."),
        e("Mountain Climbers", "conditioning", 3, "30 sec", "bodyweight", 60, "Cardio core."),
      ]),
      d(3, "Balance + Stability", [
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Warm up."),
        e("Single-Leg Deadlift", "strength", 3, "8-12 each leg", "dumbbells", 120, "Balance and posterior chain."),
        e("Bulgarian Split Squats", "strength", 3, "8-12 each leg", "dumbbells", 120, "Stability on the board."),
        e("Stability Ball Plank", "skill", 3, "30-60 sec", "stability ball", 60, "Core stability."),
        e("Stability Ball Stir-the-Pot", "skill", 3, "8 each direction", "stability ball", 60, "Shoulder stability."),
        e("Side Plank", "skill", 3, "30-45 sec each side", "bodyweight", 60, "Lateral stability."),
      ]),
      d(4, "Conditioning", [
        e("Easy Swim or Row", "conditioning", 1, "15-20 min", "bodyweight", 0, "Paddle endurance."),
        e("Shoulder Dislocates (band)", "mobility", 1, "10 reps", "resistance band", 0, "Recovery mobility."),
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Spine."),
        e("World's Greatest Stretch", "mobility", 1, "5 reps each side", "bodyweight", 0, "Full body mobility."),
      ]),
      d(5, "Upper Body Strength", [
        e("Wrist Prep", "mobility", 1, "30s + 30s", "bodyweight", 0, "Wrist health."),
        e("Pull-ups", "strength", 4, "6-10 reps", "bodyweight", 150, "Paddling strength."),
        e("Dumbbell Row", "strength", 3, "8-12 each side", "dumbbells", 120, "Unilateral pull."),
        e("Push-ups", "strength", 3, "12-20 reps", "bodyweight", 90, "Pressing base."),
        e("Face Pulls (band)", "strength", 3, "15-20 reps", "resistance band", 60, "Shoulder health."),
        e("Dead Bug", "skill", 3, "8 each side", "bodyweight", 60, "Core coordination."),
      ]),
      d(6, "Legs + Core", [
        e("Hip Flexor Stretch", "mobility", 1, "30 sec each side", "bodyweight", 0, "Hip openers."),
        e("Goblet Squats", "strength", 4, "8-15 reps", "dumbbells", 120, "Leg strength."),
        e("Reverse Lunges", "strength", 3, "10-15 each leg", "dumbbells", 120, "Single-leg power."),
        e("Glute Bridge", "strength", 3, "12-20 reps", "bodyweight", 90, "Posterior chain."),
        e("Russian Twists", "strength", 3, "15-20 reps", "bodyweight", 60, "Rotational power."),
        e("V-Ups", "strength", 3, "8-15 reps", "bodyweight", 60, "Core compression."),
      ]),
      d(7, "Active Recovery", [
        e("Easy Walk or Swim", "mobility", 1, "20-30 min", "bodyweight", 0, "Light recovery."),
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Spine."),
        e("Shoulder Dislocates (band)", "mobility", 1, "10 reps", "resistance band", 0, "Shoulder mobility."),
        e("Seated Pike", "mobility", 1, "30 sec", "bodyweight", 0, "Hamstrings."),
      ]),
      yogaDayFor(8, ["morningFlow", "shoulderFlow"]),
    ],
  },
  {
    key: "gymnast",
    name: "Gymnast",
    description: "Skill-focused strength — supports, L-sit progressions, planche leans, and core compression.",
    icon: "PersonSimple",
    days: [
      d(1, "Push Strength + Support", [
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Spine warmup."),
        e("Wrist Prep", "mobility", 1, "30s + 30s", "bodyweight", 0, "Critical for supports."),
        e("Pseudo Planche Push-ups", "strength", 4, "8-12 reps", "bodyweight", 150, "Lean forward, planche prep."),
        e("Dips", "strength", 3, "8-12 reps", "bodyweight", 150, "Full range."),
        e("Support Hold (Dip Bars)", "skill", 3, "20-40 sec", "bodyweight", 90, "Lock elbows, push shoulders down."),
        e("Hollow Body Hold", "skill", 3, "20-45 sec", "bodyweight", 90, "Foundation of gymnastics core."),
        e("Ab Roller", "strength", 3, "6-12 reps", "bodyweight", 120, "Anti-extension core."),
      ]),
      d(2, "Pull Strength + Tuck L-Sit", [
        e("Seated Pike", "mobility", 1, "30 sec", "bodyweight", 0, "Compression prep."),
        e("Pancake Stretch", "mobility", 1, "2 x 30 sec", "bodyweight", 0, "Adductors."),
        e("Pull-ups", "strength", 4, "6-12 reps", "bodyweight", 150, "Strict form."),
        e("Chin-ups", "strength", 3, "6-12 reps", "bodyweight", 150, "Biceps engagement."),
        e("Tuck L-Sit", "skill", 3, "10-20 sec", "bodyweight", 90, "Press hard through handles."),
        e("Compression Raises", "skill", 3, "6-12 reps", "bodyweight", 75, "Active leg lift."),
        e("Bodyweight Rows", "strength", 3, "8-12 reps", "bodyweight", 120, "Scapular strength."),
      ]),
      d(3, "Planche + Core", [
        e("Wrist Prep", "mobility", 1, "30s + 30s", "bodyweight", 0, "Wrist conditioning."),
        e("Planche Leans", "skill", 4, "15-30 sec", "bodyweight", 90, "Shift weight over fingertips."),
        e("Pike Push-ups", "strength", 3, "8-15 reps", "bodyweight", 120, "Shoulder press."),
        e("Frog Stand", "skill", 3, "10-20 sec", "bodyweight", 90, "Balance on hands."),
        e("Hollow Body Hold", "skill", 3, "30-60 sec", "bodyweight", 90, "Endurance hold."),
        e("L-Sit Progression", "skill", 3, "10-20 sec", "bodyweight", 90, "One leg tucked, one extended."),
      ]),
      d(4, "Recovery + Mobility", [
        e("Easy Walk", "mobility", 1, "15-30 min", "bodyweight", 0, "Blood flow."),
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Spine."),
        e("World's Greatest Stretch", "mobility", 1, "5 reps each side", "bodyweight", 0, "Hips and T-spine."),
        e("Wrist Stretch", "mobility", 1, "30 sec each direction", "bodyweight", 0, "Wrist recovery."),
        e("Shoulder Dislocates (band)", "mobility", 1, "10 reps", "resistance band", 0, "Shoulder mobility."),
      ]),
      d(5, "Push Hypertrophy + Skill", [
        e("Wrist Prep", "mobility", 1, "30s + 30s", "bodyweight", 0, "Wrist prep."),
        e("Push-ups", "strength", 4, "12-20 reps", "bodyweight", 120, "Volume."),
        e("Dips", "strength", 3, "10-15 reps", "bodyweight", 120, "Volume."),
        e("Pseudo Planche Push-ups", "strength", 3, "8-12 reps", "bodyweight", 120, "Planche strength."),
        e("Support Hold", "skill", 3, "30-45 sec", "bodyweight", 90, "Endurance hold."),
        e("Plank", "skill", 3, "45-90 sec", "bodyweight", 60, "Core."),
      ]),
      d(6, "Pull + Compression", [
        e("Seated Pike", "mobility", 1, "30 sec", "bodyweight", 0, "Compression."),
        e("Pancake Stretch", "mobility", 1, "2 x 30 sec", "bodyweight", 0, "Adductors."),
        e("Pull-ups", "strength", 3, "8-12 reps", "bodyweight", 150, "Strict."),
        e("Bodyweight Rows", "strength", 3, "10-15 reps", "bodyweight", 120, "Volume."),
        e("Tuck L-Sit", "skill", 4, "10-20 sec", "bodyweight", 90, "Progression work."),
        e("Compression Raises", "skill", 3, "8-15 reps", "bodyweight", 75, "Active compression."),
        e("Hanging Leg Raises", "strength", 3, "8-12 reps", "bodyweight", 90, "Core strength."),
      ]),
      d(7, "Complete Recovery", [
        e("Easy Walk", "mobility", 1, "15-30 min", "bodyweight", 0, "Light recovery."),
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Spine."),
        e("Hip Flexor Stretch", "mobility", 1, "30-45 sec each side", "bodyweight", 0, "Hips."),
        e("Wrist Stretch", "mobility", 1, "30 sec each direction", "bodyweight", 0, "Wrist care."),
      ]),
      yogaDayFor(8, ["restorativeFlow", "hipOpenerFlow"]),
    ],
  },
  {
    key: "powerlifting",
    name: "Power Lifting",
    description: "Squat, bench, deadlift focus with accessories for raw strength.",
    icon: "Trophy",
    days: [
      d(1, "Squat Day", [
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Spine warmup."),
        e("Hip Flexor Stretch", "mobility", 1, "30 sec each side", "bodyweight", 0, "Hip mobility."),
        e("Barbell Back Squat", "strength", 5, "5 reps", "barbell", 180, "Working sets at 80-85% 1RM."),
        e("Goblet Squat", "strength", 3, "10-15 reps", "dumbbells", 120, "Accessory volume."),
        e("Romanian Deadlift", "strength", 3, "8-12 reps", "barbell", 150, "Posterior chain accessory."),
        e("Plank", "skill", 3, "45-60 sec", "bodyweight", 60, "Core bracing."),
      ]),
      d(2, "Bench Day", [
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Warmup."),
        e("Shoulder Dislocates (band)", "mobility", 1, "10 reps", "resistance band", 0, "Shoulder mobility."),
        e("Barbell Bench Press", "strength", 5, "5 reps", "barbell", 180, "Working sets at 80-85% 1RM."),
        e("DB Shoulder Press", "strength", 3, "8-12 reps", "dumbbells", 120, "Overhead accessory."),
        e("DB Floor Press", "strength", 3, "8-15 reps", "dumbbells", 120, "Triceps lockout."),
        e("Hammer Curls", "strength", 3, "10-15 reps", "dumbbells", 90, "Elbow health."),
      ]),
      d(3, "Recovery", [
        e("Easy Walk", "mobility", 1, "20-30 min", "bodyweight", 0, "Active recovery."),
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Spine."),
        e("World's Greatest Stretch", "mobility", 1, "5 reps each side", "bodyweight", 0, "Full body."),
        e("Hip Flexor Stretch", "mobility", 1, "30-45 sec each side", "bodyweight", 0, "Hips."),
        e("Foam Rolling", "mobility", 1, "10 min", "bodyweight", 0, "Soft tissue work."),
      ]),
      d(4, "Deadlift Day", [
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Warmup."),
        e("Hip Flexor Stretch", "mobility", 1, "30 sec each side", "bodyweight", 0, "Hip prep."),
        e("Conventional Deadlift", "strength", 5, "3-5 reps", "barbell", 240, "Working sets at 80-85% 1RM."),
        e("Barbell Bent-Over Row", "strength", 3, "8-12 reps", "barbell", 150, "Back accessory."),
        e("Pull-ups", "strength", 3, "6-10 reps", "bodyweight", 150, "Upper back."),
        e("Hanging Leg Raises", "strength", 3, "8-12 reps", "bodyweight", 90, "Core."),
      ]),
      d(5, "OHP + Accessories", [
        e("Shoulder Dislocates (band)", "mobility", 1, "10 reps", "resistance band", 0, "Shoulder warmup."),
        e("Overhead Press", "strength", 5, "5 reps", "barbell", 180, "Working sets at 80% 1RM."),
        e("Incline DB Press", "strength", 3, "8-12 reps", "dumbbells", 120, "Upper chest."),
        e("One-Arm DB Row", "strength", 3, "8-12 each side", "dumbbells", 120, "Unilateral pull."),
        e("Lateral Raises", "strength", 3, "12-20 reps", "dumbbells", 75, "Side delts."),
        e("Ab Roller", "strength", 3, "6-12 reps", "bodyweight", 120, "Core."),
      ]),
      d(6, "Volume Squat + Bench", [
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Warmup."),
        e("Barbell Back Squat", "strength", 4, "8-10 reps", "barbell", 150, "Volume at 65-70% 1RM."),
        e("Barbell Bench Press", "strength", 4, "8-10 reps", "barbell", 150, "Volume at 65-70% 1RM."),
        e("Split Squats", "strength", 3, "10-12 each leg", "dumbbells", 120, "Leg accessory."),
        e("Face Pulls (band)", "strength", 3, "15-20 reps", "resistance band", 60, "Rear delts."),
        e("Plank", "skill", 3, "45-90 sec", "bodyweight", 60, "Core."),
      ]),
      d(7, "Complete Recovery", [
        e("Easy Walk", "mobility", 1, "20-30 min", "bodyweight", 0, "Light recovery."),
        e("Foam Rolling", "mobility", 1, "10 min", "bodyweight", 0, "Soft tissue."),
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Spine."),
        e("Hip Flexor Stretch", "mobility", 1, "30-45 sec each side", "bodyweight", 0, "Hips."),
      ]),
      yogaDayFor(8, ["restorativeFlow", "hipOpenerFlow"]),
    ],
  },
  {
    key: "aerobics",
    name: "Aerobics",
    description: "High-energy cardio circuits — burpees, jumping jacks, mountain climbers, and core.",
    icon: "Flame",
    days: [
      d(1, "Cardio Circuit A", [
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Warmup."),
        e("Jumping Jacks", "conditioning", 4, "30 sec on / 15 sec rest", "bodyweight", 15, "Keep pace steady."),
        e("Burpees", "conditioning", 4, "10-15 reps", "bodyweight", 60, "Full-body explosive."),
        e("Mountain Climbers", "conditioning", 4, "30 sec", "bodyweight", 30, "Fast feet."),
        e("High Knees", "conditioning", 4, "30 sec", "bodyweight", 30, "Drive knees up."),
        e("Plank", "skill", 3, "30-60 sec", "bodyweight", 45, "Core finisher."),
      ]),
      d(2, "Core + Cardio", [
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Warmup."),
        e("Crunches", "strength", 3, "15-25 reps", "bodyweight", 45, "Controlled."),
        e("Russian Twists", "strength", 3, "15-20 reps", "bodyweight", 45, "Rotational core."),
        e("Bicycle Kicks", "strength", 3, "20 reps", "bodyweight", 45, "Obliques."),
        e("Mountain Climbers", "conditioning", 4, "30 sec", "bodyweight", 30, "Cardio core."),
        e("Hollow Body Hold", "skill", 3, "20-40 sec", "bodyweight", 45, "Gymnastic core."),
      ]),
      d(3, "Legs + Plyo", [
        e("Hip Flexor Stretch", "mobility", 1, "30 sec each side", "bodyweight", 0, "Warmup."),
        e("Squat Jumps", "strength", 4, "10-15 reps", "bodyweight", 60, "Explosive legs."),
        e("Lunge Jumps", "strength", 3, "10 each leg", "bodyweight", 60, "Alternating jump lunges."),
        e("Air Squats", "strength", 3, "20-30 reps", "bodyweight", 45, "Burnout."),
        e("Calf Raises", "strength", 3, "15-25 reps", "bodyweight", 45, "Calves."),
        e("Wall Sit", "skill", 3, "30-60 sec", "bodyweight", 45, "Isometric legs."),
      ]),
      d(4, "Active Recovery", [
        e("Easy Walk or Jog", "conditioning", 1, "20-30 min", "bodyweight", 0, "Steady state cardio."),
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Spine."),
        e("World's Greatest Stretch", "mobility", 1, "5 reps each side", "bodyweight", 0, "Full body."),
        e("Seated Pike", "mobility", 1, "30 sec", "bodyweight", 0, "Hamstrings."),
      ]),
      d(5, "Cardio Circuit B", [
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Warmup."),
        e("Jump Rope (or imaginary)", "conditioning", 5, "60 sec on / 30 sec rest", "bodyweight", 30, "If no rope, mimic motion."),
        e("Burpees", "conditioning", 4, "12-15 reps", "bodyweight", 60, "Push hard."),
        e("Skater Jumps", "conditioning", 4, "10 each side", "bodyweight", 30, "Lateral power."),
        e("Plank Jacks", "conditioning", 3, "30 sec", "bodyweight", 30, "Core + cardio."),
        e("V-Ups", "strength", 3, "10-15 reps", "bodyweight", 45, "Core finisher."),
      ]),
      d(6, "Upper Body + Cardio", [
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Warmup."),
        e("Push-ups", "strength", 4, "12-20 reps", "bodyweight", 45, "Upper body base."),
        e("Plank to Push-up", "strength", 3, "8-12 reps", "bodyweight", 45, "Dynamic core."),
        e("Mountain Climbers", "conditioning", 4, "30 sec", "bodyweight", 30, "Cardio."),
        e("Triceps Dips (chair)", "strength", 3, "10-15 reps", "bodyweight", 45, "Use a chair or bench."),
        e("Hollow Body Hold", "skill", 3, "20-40 sec", "bodyweight", 45, "Core."),
      ]),
      d(7, "Stretch + Recovery", [
        e("Easy Walk", "mobility", 1, "15-30 min", "bodyweight", 0, "Light cardio."),
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Spine."),
        e("Hip Flexor Stretch", "mobility", 1, "30-45 sec each side", "bodyweight", 0, "Hips."),
        e("Seated Pike", "mobility", 1, "30 sec", "bodyweight", 0, "Hamstrings."),
        e("Child's Pose", "mobility", 1, "60 sec", "bodyweight", 0, "Full body relaxation."),
      ]),
      yogaDayFor(8, ["morningFlow", "hipOpenerFlow"]),
    ],
  },
  {
    key: "pilates",
    name: "Pilates",
    description: "Core-centric mobility and control — the hundreds, roll-ups, leg circles, and spine work.",
    icon: "Heart",
    days: [
      d(1, "Core Fundamentals", [
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Spine warmup."),
        e("The Hundreds", "strength", 1, "100 beats", "bodyweight", 60, "Core endurance and breath."),
        e("Roll-Ups", "strength", 3, "6-10 reps", "bodyweight", 45, "Spine articulation."),
        e("Single Leg Circles", "strength", 3, "5 each direction each leg", "bodyweight", 45, "Hip mobility and core."),
        e("Criss-Cross", "strength", 3, "10 each side", "bodyweight", 45, "Oblique work."),
        e("Swan Dive", "strength", 3, "6-10 reps", "bodyweight", 45, "Back extension."),
      ]),
      d(2, "Legs + Glutes", [
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Warmup."),
        e("Leg Swings", "mobility", 1, "10 each leg", "bodyweight", 0, "Hip mobility."),
        e("Shoulder Bridge", "strength", 3, "10-15 reps", "bodyweight", 45, "Glutes and spine."),
        e("Side Leg Kicks", "strength", 3, "10 each side", "bodyweight", 45, "Outer thigh and glute."),
        e("Clamshells", "strength", 3, "15-20 each side", "bodyweight", 45, "Glute medius."),
        e("Plank", "skill", 3, "30-60 sec", "bodyweight", 45, "Core stability."),
      ]),
      d(3, "Spine Mobility + Stretch", [
        e("Cat-Cow", "mobility", 1, "8-10 slow reps", "bodyweight", 0, "Spine warmup."),
        e("Spine Stretch Forward", "mobility", 3, "6-10 reps", "bodyweight", 45, "Segmental flexion."),
        e("Saw", "mobility", 3, "5 each side", "bodyweight", 45, "Rotation and stretch."),
        e("Mermaid Stretch", "mobility", 3, "30 sec each side", "bodyweight", 0, "Lateral stretch."),
        e("Child's Pose", "mobility", 1, "60 sec", "bodyweight", 0, "Relaxation."),
        e("Pelvic Tilts", "mobility", 3, "10 reps", "bodyweight", 30, "Pelvic awareness."),
      ]),
      d(4, "Core + Balance", [
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Warmup."),
        e("The Hundreds", "strength", 1, "100 beats", "bodyweight", 60, "Core endurance."),
        e("Teaser", "strength", 3, "6-10 reps", "bodyweight", 45, "Advanced core."),
        e("Side Plank", "skill", 3, "20-40 sec each side", "bodyweight", 45, "Lateral stability."),
        e("Dead Bug", "skill", 3, "8 each side", "bodyweight", 45, "Core coordination."),
        e("Swimming", "strength", 3, "20 reps", "bodyweight", 45, "Back and glutes."),
      ]),
      d(5, "Full Body Flow", [
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Warmup."),
        e("Roll-Ups", "strength", 3, "6-10 reps", "bodyweight", 45, "Spine."),
        e("Shoulder Bridge", "strength", 3, "10-15 reps", "bodyweight", 45, "Glutes."),
        e("Criss-Cross", "strength", 3, "10 each side", "bodyweight", 45, "Obliques."),
        e("Swan Dive", "strength", 3, "6-10 reps", "bodyweight", 45, "Back extension."),
        e("Plank", "skill", 3, "30-60 sec", "bodyweight", 45, "Core."),
        e("Child's Pose", "mobility", 1, "60 sec", "bodyweight", 0, "Cool down."),
      ]),
      d(6, "Abs + Obliques", [
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Warmup."),
        e("The Hundreds", "strength", 1, "100 beats", "bodyweight", 60, "Core endurance."),
        e("Double Leg Stretch", "strength", 3, "8-12 reps", "bodyweight", 45, "Deep core."),
        e("Scissors", "strength", 3, "8 each leg", "bodyweight", 45, "Lower abs."),
        e("Bicycle Kicks", "strength", 3, "15 each side", "bodyweight", 45, "Obliques."),
        e("Side Plank Dips", "strength", 3, "8-12 each side", "bodyweight", 45, "Lateral core."),
      ]),
      d(7, "Gentle Recovery", [
        e("Easy Walk", "mobility", 1, "15-30 min", "bodyweight", 0, "Light movement."),
        e("Cat-Cow", "mobility", 1, "8-10 slow reps", "bodyweight", 0, "Spine."),
        e("Pelvic Tilts", "mobility", 3, "10 reps", "bodyweight", 30, "Pelvic floor."),
        e("Child's Pose", "mobility", 1, "90 sec", "bodyweight", 0, "Full relaxation."),
        e("Mermaid Stretch", "mobility", 3, "30 sec each side", "bodyweight", 0, "Lateral opener."),
      ]),
      yogaDayFor(8, ["restorativeFlow", "shoulderFlow"]),
    ],
  },
  {
    key: "cardio",
    name: "Cardio",
    description: "Interval training — run, row, cycle, and jump rope circuits for endurance and speed.",
    icon: "Zap",
    days: [
      d(1, "Run Intervals", [
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Warmup."),
        e("Dynamic Leg Swings", "mobility", 1, "10 each leg", "bodyweight", 0, "Leg prep."),
        e("Sprint Intervals", "conditioning", 8, "30 sec sprint / 90 sec walk", "bodyweight", 90, "Max effort sprints."),
        e("Plank", "skill", 3, "45-60 sec", "bodyweight", 45, "Core finisher."),
      ]),
      d(2, "Rowing + Core", [
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Warmup."),
        e("Rowing Intervals", "conditioning", 6, "250m sprint / 60 sec rest", "rowing machine", 60, "Power output focus."),
        e("Russian Twists", "strength", 3, "15-20 reps", "bodyweight", 45, "Rotational core."),
        e("Hollow Body Hold", "skill", 3, "30-45 sec", "bodyweight", 45, "Core stability."),
        e("Mountain Climbers", "conditioning", 3, "30 sec", "bodyweight", 30, "Cardio core."),
      ]),
      d(3, "Steady State Run", [
        e("Dynamic Leg Swings", "mobility", 1, "10 each leg", "bodyweight", 0, "Warmup."),
        e("Easy Steady Run", "conditioning", 1, "30-45 min", "bodyweight", 0, "Zone 2, conversational pace."),
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Post-run mobility."),
        e("Hip Flexor Stretch", "mobility", 1, "30 sec each side", "bodyweight", 0, "Hip recovery."),
      ]),
      d(4, "Jump Rope Circuit", [
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Warmup."),
        e("Jump Rope", "conditioning", 5, "60 sec on / 30 sec rest", "bodyweight", 30, "If no rope, mimic motion."),
        e("Burpees", "conditioning", 4, "10-15 reps", "bodyweight", 60, "Full body."),
        e("High Knees", "conditioning", 4, "30 sec", "bodyweight", 30, "Quick feet."),
        e("Squat Jumps", "strength", 3, "12-15 reps", "bodyweight", 45, "Explosive legs."),
        e("Plank", "skill", 3, "45-60 sec", "bodyweight", 45, "Core."),
      ]),
      d(5, "Tempo Run + Strength", [
        e("Dynamic Leg Swings", "mobility", 1, "10 each leg", "bodyweight", 0, "Warmup."),
        e("Tempo Run", "conditioning", 1, "20 min at 80% effort", "bodyweight", 0, "Comfortably hard pace."),
        e("Push-ups", "strength", 3, "12-20 reps", "bodyweight", 60, "Upper body."),
        e("Lunges", "strength", 3, "12-15 each leg", "bodyweight", 60, "Leg strength."),
        e("Hanging Leg Raises", "strength", 3, "8-12 reps", "bodyweight", 60, "Core."),
      ]),
      d(6, "Cycling or Cross-Train", [
        e("Cat-Cow", "mobility", 1, "5-8 slow reps", "bodyweight", 0, "Warmup."),
        e("Cycling Intervals", "conditioning", 6, "2 min hard / 1 min easy", "bike", 60, "If no bike, substitute running."),
        e("Air Squats", "strength", 3, "20-30 reps", "bodyweight", 45, "Leg burnout."),
        e("Calf Raises", "strength", 3, "20-30 reps", "bodyweight", 45, "Calves."),
        e("Side Plank", "skill", 3, "30-45 sec each side", "bodyweight", 45, "Lateral core."),
      ]),
      d(7, "Recovery Walk + Stretch", [
        e("Easy Walk", "mobility", 1, "30-45 min", "bodyweight", 0, "Zone 1 recovery."),
        e("Cat-Cow", "mobility", 1, "8-10 slow reps", "bodyweight", 0, "Spine."),
        e("Hip Flexor Stretch", "mobility", 1, "30-45 sec each side", "bodyweight", 0, "Hips."),
        e("Seated Pike", "mobility", 1, "30 sec", "bodyweight", 0, "Hamstrings."),
        e("Child's Pose", "mobility", 1, "60 sec", "bodyweight", 0, "Relaxation."),
      ]),
      yogaDayFor(8, ["morningFlow", "hamstringFlow"]),
    ],
  },
];

export const getTemplate = (key: string): Template | undefined =>
  templates.find((t) => t.key === key);

export function combineTemplates(keys: string[]): { key: string; name: string; days: RegimenDay[] } | null {
  const selected = keys.map((k) => getTemplate(k)).filter((t): t is Template => !!t);
  if (selected.length === 0) return null;

  const maxDays = Math.min(7, Math.max(...selected.map((t) => t.days.length)));
  const days: RegimenDay[] = [];

  for (let i = 0; i < maxDays; i++) {
    const dayParts = selected
      .map((t) => ({ template: t, day: t.days[i] }))
      .filter((p) => p.day !== undefined);

    if (dayParts.length === 0) continue;

    const exercises = dayParts.flatMap((p) =>
      p.day.exercises.map((ex) => ({ ...ex })),
    );

    const titleParts = dayParts.map((p) => `${p.template.name}: ${p.day.title}`);
    const sources = dayParts.map((p) => p.template.name);

    days.push({
      day: i + 1,
      title: titleParts.join(" + "),
      sourceTemplate: sources.join(" + "),
      exercises,
    });
  }

  return {
    key: selected.map((t) => t.key).join("+"),
    name: selected.map((t) => t.name).join(" + "),
    days,
  };
}
