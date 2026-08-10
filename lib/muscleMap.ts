export type MuscleGroup =
  | "chest"
  | "front-shoulders"
  | "side-shoulders"
  | "rear-shoulders"
  | "biceps"
  | "triceps"
  | "forearms"
  | "abs"
  | "obliques"
  | "lats"
  | "upper-back"
  | "lower-back"
  | "glutes"
  | "quads"
  | "hamstrings"
  | "calves"
  | "hip-flexors"
  | "neck"
  | "traps"
  | "wrists";

export interface MuscleActivation {
  primary: MuscleGroup[];
  secondary: MuscleGroup[];
}

export const muscleGroupLabels: Record<MuscleGroup, string> = {
  chest: "Chest (Pectorals)",
  "front-shoulders": "Front Delts",
  "side-shoulders": "Side Delts",
  "rear-shoulders": "Rear Delts",
  biceps: "Biceps",
  triceps: "Triceps",
  forearms: "Forearms",
  abs: "Abs (Rectus Abdominis)",
  obliques: "Obliques",
  lats: "Lats (Latissimus Dorsi)",
  "upper-back": "Upper Back (Rhomboids/Traps)",
  "lower-back": "Lower Back (Erectors)",
  glutes: "Glutes",
  quads: "Quadriceps",
  hamstrings: "Hamstrings",
  calves: "Calves",
  "hip-flexors": "Hip Flexors",
  neck: "Neck / Upper Traps",
  traps: "Trapezius",
  wrists: "Wrists",
};

const m = (primary: MuscleGroup[], secondary: MuscleGroup[] = []): MuscleActivation => ({
  primary,
  secondary,
});

export const exerciseMuscleMap: Record<string, MuscleActivation> = {
  // Push exercises
  "Push-ups": m(["chest", "triceps", "front-shoulders"], ["abs", "obliques"]),
  "Feet-Elevated Push-ups": m(["chest", "front-shoulders", "triceps"], ["abs"]),
  "Pike Push-ups": m(["front-shoulders", "side-shoulders", "triceps"], ["chest", "abs"]),
  "Pseudo Planche Push-ups": m(["chest", "front-shoulders", "triceps"], ["biceps", "abs"]),
  "Explosive Push-ups": m(["chest", "triceps", "front-shoulders"], ["abs"]),
  "Dips": m(["triceps", "chest", "front-shoulders"], ["abs"]),
  "Plank to Push-up": m(["chest", "triceps", "abs"], ["front-shoulders"]),
  "Triceps Dips (chair)": m(["triceps", "chest"], ["front-shoulders"]),

  // Pull exercises
  "Pull-ups": m(["lats", "biceps", "upper-back"], ["rear-shoulders", "forearms", "abs"]),
  "Chin-ups": m(["biceps", "lats", "upper-back"], ["forearms", "rear-shoulders"]),
  "Bodyweight Rows": m(["upper-back", "lats", "biceps", "rear-shoulders"], ["forearms"]),
  "Barbell Bent-Over Row": m(["upper-back", "lats", "rear-shoulders"], ["biceps", "lower-back"]),
  "Dumbbell Row": m(["lats", "upper-back", "biceps"], ["rear-shoulders", "forearms"]),
  "One-Arm DB Row": m(["lats", "biceps", "upper-back"], ["forearms", "obliques"]),
  "Face Pulls (band)": m(["rear-shoulders", "upper-back"], ["triceps"]),

  // Shoulder exercises
  "Overhead Press": m(["front-shoulders", "side-shoulders", "triceps"], ["upper-back", "abs"]),
  "DB Shoulder Press": m(["front-shoulders", "side-shoulders", "triceps"], ["upper-back"]),
  "Swimmer Shoulder Press": m(["front-shoulders", "side-shoulders", "triceps"], ["upper-back"]),
  "Lateral Raises": m(["side-shoulders"], ["front-shoulders", "triceps"]),
  "Lateral Raises (if dumbbells)": m(["side-shoulders"], ["front-shoulders"]),
  "Shoulder Dislocates (band)": m(["rear-shoulders", "upper-back"], ["chest"]),

  // Arm exercises
  "Hammer Curls": m(["biceps", "forearms"], []),
  "Hammer Curls (if dumbbells)": m(["biceps", "forearms"], []),
  "DB Floor Press": m(["triceps", "chest", "front-shoulders"], ["biceps"]),

  // Leg exercises
  "Air Squats": m(["quads", "glutes"], ["hamstrings", "calves", "abs"]),
  "Goblet Squats": m(["quads", "glutes"], ["hamstrings", "abs", "calves"]),
  "Barbell Back Squat": m(["quads", "glutes", "abs"], ["hamstrings", "calves", "lower-back"]),
  "Split Squats": m(["quads", "glutes"], ["hamstrings", "calves"]),
  "Bulgarian Split Squats": m(["quads", "glutes"], ["hamstrings", "calves", "abs"]),
  "Reverse Lunges": m(["quads", "glutes"], ["hamstrings", "calves"]),
  "Lunges": m(["quads", "glutes"], ["hamstrings", "calves"]),
  "Jump Squats": m(["quads", "glutes", "calves"], ["hamstrings"]),
  "Squat Jumps": m(["quads", "glutes", "calves"], ["hamstrings"]),
  "Lunge Jumps": m(["quads", "glutes", "calves"], ["hamstrings"]),
  "Wall Sit": m(["quads"], ["glutes", "calves"]),
  "Calf Raises": m(["calves"], ["quads"]),
  "Romanian Deadlift": m(["hamstrings", "glutes", "lower-back"], ["calves", "forearms"]),
  "Romanian Deadlift (if dumbbells)": m(["hamstrings", "glutes", "lower-back"], ["calves", "forearms"]),
  "Single-Leg Deadlift": m(["hamstrings", "glutes", "lower-back"], ["calves", "abs"]),
  "Glute Bridge": m(["glutes", "hamstrings"], ["lower-back", "abs"]),
  "Shoulder Bridge": m(["glutes", "hamstrings", "lower-back"], ["abs"]),
  "Conventional Deadlift": m(["hamstrings", "glutes", "lower-back", "lats", "forearms"], ["quads", "upper-back", "traps"]),
  "Clamshells": m(["glutes"], ["hip-flexors"]),
  "Side Leg Kicks": m(["glutes", "hip-flexors"], ["obliques"]),

  // Core exercises
  "Hollow Body Hold": m(["abs", "hip-flexors"], ["obliques", "quads"]),
  "Ab Roller": m(["abs", "obliques"], ["lower-back", "triceps", "lats"]),
  "Plank": m(["abs", "obliques"], ["lower-back", "front-shoulders"]),
  "Side Plank": m(["obliques", "glutes"], ["abs", "lats"]),
  "Side Plank Rotations": m(["obliques", "abs"], ["lats", "front-shoulders"]),
  "Side Plank Dips": m(["obliques"], ["abs", "lats"]),
  "Russian Twists": m(["obliques", "abs"], ["hip-flexors"]),
  "Hanging Leg Raises": m(["abs", "hip-flexors"], ["obliques", "forearms", "lats"]),
  "V-Ups": m(["abs", "hip-flexors"], ["obliques", "hamstrings"]),
  "Crunches": m(["abs"], ["obliques"]),
  "Bicycle Kicks": m(["obliques", "abs", "hip-flexors"], []),
  "Mountain Climbers": m(["abs", "hip-flexors", "quads"], ["obliques", "chest", "triceps"]),
  "Dead Bug": m(["abs", "obliques"], ["hip-flexors"]),
  "The Hundreds": m(["abs", "obliques"], ["front-shoulders"]),
  "Roll-Ups": m(["abs", "hip-flexors"], ["hamstrings"]),
  "Teaser": m(["abs", "hip-flexors", "obliques"], ["hamstrings"]),
  "Double Leg Stretch": m(["abs", "hip-flexors"], ["obliques"]),
  "Scissors": m(["abs", "hip-flexors", "hamstrings"], ["obliques"]),
  "Criss-Cross": m(["obliques", "abs"], ["hip-flexors"]),
  "Plank Jacks": m(["abs", "obliques", "quads"], ["glutes", "hip-flexors"]),

  // Back / posterior chain
  "Prone Snow Angels": m(["upper-back", "rear-shoulders", "lower-back"], ["triceps"]),
  "Swan Dive": m(["lower-back", "glutes", "upper-back"], ["hamstrings"]),
  "Swimming": m(["lower-back", "glutes", "upper-back", "hamstrings"], ["rear-shoulders"]),

  // Conditioning
  "Burpees": m(["chest", "quads", "glutes", "calves", "abs", "triceps"], ["hamstrings", "front-shoulders"]),
  "Jumping Jacks": m(["calves", "quads", "side-shoulders"], ["glutes", "hip-flexors"]),
  "High Knees": m(["hip-flexors", "quads", "calves", "abs"], ["hamstrings"]),
  "Sprint Intervals": m(["quads", "hamstrings", "glutes", "calves"], ["abs", "hip-flexors"]),
  "Rowing Intervals": m(["lats", "quads", "upper-back", "biceps", "lower-back"], ["hamstrings", "glutes"]),
  "Easy Steady Run": m(["quads", "hamstrings", "calves", "glutes"], ["abs", "hip-flexors"]),
  "Tempo Run": m(["quads", "hamstrings", "calves", "glutes"], ["abs"]),
  "Cycling Intervals": m(["quads", "calves", "glutes"], ["hamstrings"]),
  "Jump Rope": m(["calves", "quads"], ["glutes", "abs"]),
  "Jump Rope (or imaginary)": m(["calves", "quads"], ["glutes"]),
  "Skater Jumps": m(["quads", "glutes", "calves"], ["hamstrings", "obliques"]),
  "Easy Walk": m(["quads", "calves", "glutes"], ["hamstrings"]),
  "Easy Walk or Jog": m(["quads", "calves", "glutes", "hamstrings"], []),
  "Easy Walk or Swim": m(["lats", "quads", "calves"], ["rear-shoulders"]),
  "Easy Swim or Row": m(["lats", "upper-back", "quads"], ["rear-shoulders", "biceps"]),

  // Gymnastic skills
  "Support Hold (Dip Bars)": m(["triceps", "chest", "front-shoulders", "abs"], ["lats"]),
  "Tuck L-Sit": m(["abs", "hip-flexors", "triceps", "front-shoulders"], ["quads", "lats"]),
  "L-Sit Progression": m(["abs", "hip-flexors", "triceps", "front-shoulders"], ["quads", "lats"]),
  "Compression Raises": m(["hip-flexors", "abs"], ["quads"]),
  "Planche Leans": m(["front-shoulders", "chest", "triceps", "abs"], ["biceps", "wrists"]),
  "Frog Stand": m(["front-shoulders", "triceps", "abs"], ["chest", "wrists"]),

  // Mobility / stretching
  "Cat-Cow": m(["lower-back", "upper-back"], ["abs"]),
  "Wrist Prep": m(["forearms"], []),
  "Wrist Stretch": m(["forearms"], []),
  "Hip Flexor Stretch": m(["hip-flexors"], ["quads"]),
  "Seated Pike": m(["hamstrings", "lower-back"], ["calves"]),
  "Pancake Stretch": m(["hamstrings", "glutes"], ["lower-back", "hip-flexors"]),
  "World's Greatest Stretch": m(["hip-flexors", "hamstrings", "upper-back"], ["quads", "glutes"]),
  "Foam Rolling": m([], []),
  "Child's Pose": m(["lower-back", "glutes"], ["lats", "quads"]),
  "Pelvic Tilts": m(["abs", "lower-back"], ["glutes"]),
  "Spine Stretch Forward": m(["hamstrings", "lower-back"], ["abs"]),
  "Saw": m(["hamstrings", "obliques", "upper-back"], ["lower-back"]),
  "Mermaid Stretch": m(["obliques", "lats"], ["side-shoulders"]),
  "Leg Swings": m(["hip-flexors", "hamstrings"], ["glutes"]),
  "Dynamic Leg Swings": m(["hip-flexors", "hamstrings", "glutes"], ["quads"]),
  "Single Leg Circles": m(["hip-flexors", "abs"], ["hamstrings", "glutes"]),

  // Bench / barbell
  "Barbell Bench Press": m(["chest", "triceps", "front-shoulders"], ["biceps", "forearms", "upper-back"]),
  "Incline DB Press": m(["chest", "front-shoulders", "triceps"], ["biceps"]),
};

export function getMuscleActivation(exerciseName: string): MuscleActivation | null {
  const direct = exerciseMuscleMap[exerciseName];
  if (direct) return direct;

  // Try without "(if dumbbells)" suffix
  const cleaned = exerciseName.replace(/\s*\(if dumbbells\)\s*/i, "").trim();
  const cleanedMatch = exerciseMuscleMap[cleaned];
  if (cleanedMatch) return cleanedMatch;

  // Try without "(band)" suffix
  const noBand = exerciseName.replace(/\s*\(band\)\s*/i, "").trim();
  const bandMatch = exerciseMuscleMap[noBand];
  if (bandMatch) return bandMatch;

  // Try without "(or imaginary)" suffix
  const noImaginary = exerciseName.replace(/\s*\(or imaginary\)\s*/i, "").trim();
  const imaginaryMatch = exerciseMuscleMap[noImaginary];
  if (imaginaryMatch) return imaginaryMatch;

  return null;
}
