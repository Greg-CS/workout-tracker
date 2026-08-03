export interface EquipmentItem {
  key: string;
  label: string;
  description: string;
}

export const allEquipment: EquipmentItem[] = [
  { key: "bodyweight", label: "Bodyweight Only", description: "No equipment needed" },
  { key: "weighted-vest", label: "Weighted Vest", description: "Adds resistance to bodyweight exercises" },
  { key: "dumbbells", label: "Dumbbells", description: "Free weights for loading" },
  { key: "barbell", label: "Barbell", description: "Barbell with plates" },
  { key: "pull-up-bar", label: "Pull-up Bar", description: "For vertical pulling" },
  { key: "dip-station", label: "Dip Station", description: "Parallel bars for dips and supports" },
  { key: "rings", label: "Gymnastic Rings", description: "For ring push-ups, rows, and supports" },
  { key: "resistance-band", label: "Resistance Band", description: "For mobility and assistance" },
  { key: "parallettes", label: "Parallettes", description: "Low bars for L-sit and planche work" },
  { key: "kettlebell", label: "Kettlebell", description: "For goblet squats and swings" },
  { key: "ab-roller", label: "Ab Roller", description: "For core anti-extension work" },
  { key: "jump-rope", label: "Jump Rope", description: "For conditioning and warm-up" },
  { key: "foam-roller", label: "Foam Roller", description: "For recovery and mobility" },
  { key: "lacrosse-ball", label: "Lacrosse Ball", description: "For targeted tissue release" },
  { key: "mace", label: "Steel Mace", description: "For rotational strength work" },
  { key: "stability-ball", label: "Stability Ball", description: "For balance and core work" },
  { key: "rowing-machine", label: "Rowing Machine", description: "For cardio intervals" },
  { key: "bike", label: "Bike", description: "For cycling and cardio" },
];

export const defaultEquipment: string[] = ["bodyweight"];

export interface EquipmentSubstitution {
  requiredEquipment: string;
  fallbackName: string;
  fallbackCue: string;
}

export const equipmentSubstitutions: Record<string, EquipmentSubstitution> = {
  "weighted-vest": {
    requiredEquipment: "weighted-vest",
    fallbackName: "Bodyweight",
    fallbackCue: "No vest — go to muscle failure on each set. Max reps with perfect form.",
  },
  "dumbbells": {
    requiredEquipment: "dumbbells",
    fallbackName: "Bodyweight",
    fallbackCue: "No dumbbells — use bodyweight equivalent and progress to harder variation.",
  },
  "barbell": {
    requiredEquipment: "barbell",
    fallbackName: "Dumbbells",
    fallbackCue: "No barbell — use dumbbells for equivalent loading.",
  },
  "rings": {
    requiredEquipment: "rings",
    fallbackName: "Bodyweight",
    fallbackCue: "No rings — use floor or bar equivalent.",
  },
  "pull-up-bar": {
    requiredEquipment: "pull-up-bar",
    fallbackName: "Bodyweight Rows",
    fallbackCue: "No bar — use a sturdy table edge or low bar for rows.",
  },
  "dip-station": {
    requiredEquipment: "dip-station",
    fallbackName: "Chair Dips",
    fallbackCue: "No dip station — use two sturdy chairs or bench dips.",
  },
  "resistance-band": {
    requiredEquipment: "resistance-band",
    fallbackName: "Bodyweight",
    fallbackCue: "No band — use slow controlled bodyweight movements.",
  },
  "kettlebell": {
    requiredEquipment: "kettlebell",
    fallbackName: "Dumbbell",
    fallbackCue: "No kettlebell — use a single dumbbell for goblet squats.",
  },
  "ab-roller": {
    requiredEquipment: "ab-roller",
    fallbackName: "Hollow Body Hold",
    fallbackCue: "No ab roller — do hollow body holds for anti-extension core work.",
  },
  "stability-ball": {
    requiredEquipment: "stability-ball",
    fallbackName: "Bodyweight",
    fallbackCue: "No stability ball — use floor-based equivalent exercises.",
  },
  "rowing-machine": {
    requiredEquipment: "rowing-machine",
    fallbackName: "Burpees",
    fallbackCue: "No rower — substitute with burpees or jumping jacks for cardio.",
  },
  "bike": {
    requiredEquipment: "bike",
    fallbackName: "Run or Jump Rope",
    fallbackCue: "No bike — run, jog, or use jump rope for cycling intervals.",
  },
  "mace": {
    requiredEquipment: "mace",
    fallbackName: "Bodyweight Circles",
    fallbackCue: "No mace — use controlled arm circles and rotational mobility.",
  },
  "parallettes": {
    requiredEquipment: "parallettes",
    fallbackName: "Floor",
    fallbackCue: "No parallettes — use the floor for L-sit and support work.",
  },
  "jump-rope": {
    requiredEquipment: "jump-rope",
    fallbackName: "Imaginary Rope",
    fallbackCue: "No rope — mimic the motion with hands and jump in rhythm.",
  },
};

export function checkEquipmentAvailability(
  exerciseEquipment: string,
  userEquipment: string[],
): { available: boolean; substitution?: EquipmentSubstitution } {
  if (!exerciseEquipment || exerciseEquipment === "bodyweight" || exerciseEquipment === "none") {
    return { available: true };
  }

  const required = exerciseEquipment.toLowerCase().trim();

  for (const userItem of userEquipment) {
    if (required.includes(userItem) || userItem.includes(required)) {
      return { available: true };
    }
  }

  for (const [key, sub] of Object.entries(equipmentSubstitutions)) {
    if (required.includes(key) || key.includes(required)) {
      return { available: false, substitution: sub };
    }
  }

  return { available: false, substitution: undefined };
}

export function getEquipmentLabel(key: string): string {
  const item = allEquipment.find((e) => e.key === key);
  return item?.label ?? key;
}

export interface EquipmentProgression {
  equipment: string;
  upgradedName: string;
  upgradedLoad: string;
  cue: string;
}

const progressionMap: Record<string, EquipmentProgression[]> = {
  "Push-ups": [
    { equipment: "weighted-vest", upgradedName: "Weighted Push-ups", upgradedLoad: "Weighted vest", cue: "Add vest for extra resistance. Maintain same tempo." },
    { equipment: "rings", upgradedName: "Ring Push-ups", upgradedLoad: "Gymnastic rings", cue: "Rings add instability — squeeze inward at the top." },
    { equipment: "parallettes", upgradedName: "Parallette Push-ups", upgradedLoad: "Parallettes", cue: "Deeper range of motion through the parallettes." },
  ],
  "Feet-Elevated Push-ups": [
    { equipment: "weighted-vest", upgradedName: "Weighted Feet-Elevated Push-ups", upgradedLoad: "Weighted vest", cue: "Vest adds load to an already intense push." },
    { equipment: "rings", upgradedName: "Ring Feet-Elevated Push-ups", upgradedLoad: "Gymnastic rings", cue: "Rings + feet elevated = maximum instability." },
  ],
  "Dips": [
    { equipment: "weighted-vest", upgradedName: "Weighted Dips", upgradedLoad: "Weighted vest", cue: "Add vest for extra load on dips." },
    { equipment: "rings", upgradedName: "Ring Dips", upgradedLoad: "Gymnastic rings", cue: "Ring dips are significantly harder — stay tight." },
  ],
  "Pull-ups": [
    { equipment: "weighted-vest", upgradedName: "Weighted Pull-ups", upgradedLoad: "Weighted vest", cue: "Add vest for progressive overload on pull-ups." },
    { equipment: "rings", upgradedName: "Ring Pull-ups", upgradedLoad: "Gymnastic rings", cue: "Ring pull-ups increase scapular control demands." },
  ],
  "Chin-ups": [
    { equipment: "weighted-vest", upgradedName: "Weighted Chin-ups", upgradedLoad: "Weighted vest", cue: "Vest adds load to chin-ups." },
  ],
  "Bodyweight Rows": [
    { equipment: "rings", upgradedName: "Ring Rows", upgradedLoad: "Gymnastic rings", cue: "Rings allow adjustable difficulty by changing body angle." },
    { equipment: "weighted-vest", upgradedName: "Weighted Bodyweight Rows", upgradedLoad: "Weighted vest", cue: "Add vest for extra row resistance." },
  ],
  "Air Squats": [
    { equipment: "weighted-vest", upgradedName: "Weighted Squats", upgradedLoad: "Weighted vest", cue: "Vest turns air squats into loaded work." },
    { equipment: "dumbbells", upgradedName: "Goblet Squats", upgradedLoad: "Dumbbell", cue: "Hold one DB at chest for goblet squats." },
    { equipment: "kettlebell", upgradedName: "KB Goblet Squats", upgradedLoad: "Kettlebell", cue: "Hold KB by the horns at chest height." },
    { equipment: "barbell", upgradedName: "Barbell Back Squats", upgradedLoad: "Barbell", cue: "Barbell on upper traps — brace core." },
  ],
  "Split Squats": [
    { equipment: "dumbbells", upgradedName: "DB Split Squats", upgradedLoad: "Dumbbells", cue: "Hold DBs at sides for loaded split squats." },
    { equipment: "weighted-vest", upgradedName: "Weighted Split Squats", upgradedLoad: "Weighted vest", cue: "Vest adds load to split squats." },
  ],
  "Glute Bridge": [
    { equipment: "weighted-vest", upgradedName: "Weighted Glute Bridge", upgradedLoad: "Weighted vest", cue: "Vest on hips for extra glute activation." },
    { equipment: "dumbbells", upgradedName: "DB Hip Thrust", upgradedLoad: "Dumbbell", cue: "Place DB across hips for added load." },
    { equipment: "barbell", upgradedName: "Barbell Hip Thrust", upgradedLoad: "Barbell", cue: "Barbell across hips — drive through heels." },
  ],
  "Hollow Body Hold": [
    { equipment: "weighted-vest", upgradedName: "Weighted Hollow Hold", upgradedLoad: "Weighted vest", cue: "Vest increases anti-extension demand." },
  ],
  "Plank": [
    { equipment: "weighted-vest", upgradedName: "Weighted Plank", upgradedLoad: "Weighted vest", cue: "Vest adds load to the plank." },
    { equipment: "stability-ball", upgradedName: "Stability Ball Plank", upgradedLoad: "Stability ball", cue: "Forearms on ball — fight the instability." },
  ],
  "Ab Roller": [
    { equipment: "ab-roller", upgradedName: "Ab Roller Rollouts", upgradedLoad: "Ab roller", cue: "Full rollouts — keep ribs down and glutes tight." },
  ],
  "Lateral Raises": [
    { equipment: "dumbbells", upgradedName: "DB Lateral Raises", upgradedLoad: "Dumbbells", cue: "Strict form — raise to shoulder height." },
    { equipment: "resistance-band", upgradedName: "Band Lateral Raises", upgradedLoad: "Resistance band", cue: "Step on band — controlled raises." },
  ],
  "Hammer Curls (if dumbbells)": [
    { equipment: "dumbbells", upgradedName: "DB Hammer Curls", upgradedLoad: "Dumbbells", cue: "Neutral grip — no swinging." },
  ],
  "Romanian Deadlift (if dumbbells)": [
    { equipment: "dumbbells", upgradedName: "DB Romanian Deadlift", upgradedLoad: "Dumbbells", cue: "Hinge at hips — feel the hamstring stretch." },
    { equipment: "barbell", upgradedName: "Barbell Romanian Deadlift", upgradedLoad: "Barbell", cue: "Barbell RDL — hip hinge, not a squat." },
  ],
  "Squat Jumps": [
    { equipment: "weighted-vest", upgradedName: "Weighted Squat Jumps", upgradedLoad: "Weighted vest", cue: "Vest adds load — still explode upward." },
  ],
  "Burpees": [
    { equipment: "weighted-vest", upgradedName: "Weighted Burpees", upgradedLoad: "Weighted vest", cue: "Vest makes burpees brutal — embrace it." },
  ],
  "Jumping Jacks": [
    { equipment: "weighted-vest", upgradedName: "Weighted Jumping Jacks", upgradedLoad: "Weighted vest", cue: "Vest adds cardio demand." },
  ],
  "Lunge Jumps": [
    { equipment: "weighted-vest", upgradedName: "Weighted Lunge Jumps", upgradedLoad: "Weighted vest", cue: "Vest adds load to explosive lunges." },
  ],
  "Support Hold (Dip Bars)": [
    { equipment: "rings", upgradedName: "Ring Support Hold", upgradedLoad: "Gymnastic rings", cue: "Ring support — turn rings out at top." },
    { equipment: "parallettes", upgradedName: "Parallette Support Hold", upgradedLoad: "Parallettes", cue: "Press through parallettes — shoulders down." },
  ],
  "Tuck L-Sit": [
    { equipment: "parallettes", upgradedName: "Parallette Tuck L-Sit", upgradedLoad: "Parallettes", cue: "Press through parallettes for deeper compression." },
    { equipment: "rings", upgradedName: "Ring Tuck L-Sit", upgradedLoad: "Gymnastic rings", cue: "Rings add instability — press hard." },
  ],
  "Pike Push-ups": [
    { equipment: "weighted-vest", upgradedName: "Weighted Pike Push-ups", upgradedLoad: "Weighted vest", cue: "Vest adds load to shoulder press." },
    { equipment: "parallettes", upgradedName: "Parallette Pike Push-ups", upgradedLoad: "Parallettes", cue: "Deeper range through parallettes." },
  ],
  "Explosive Push-ups": [
    { equipment: "weighted-vest", upgradedName: "Weighted Explosive Push-ups", upgradedLoad: "Weighted vest", cue: "Vest adds load — still explode." },
  ],
  "Goblet Squats": [
    { equipment: "kettlebell", upgradedName: "KB Goblet Squats", upgradedLoad: "Kettlebell", cue: "Hold KB by horns at chest." },
    { equipment: "dumbbells", upgradedName: "DB Goblet Squats", upgradedLoad: "Dumbbell", cue: "Hold one DB vertically at chest." },
  ],
  "Mountain Climbers": [
    { equipment: "stability-ball", upgradedName: "Stability Ball Mountain Climbers", upgradedLoad: "Stability ball", cue: "Hands on ball — fight for stability." },
  ],
  "Calf Raises": [
    { equipment: "dumbbells", upgradedName: "DB Calf Raises", upgradedLoad: "Dumbbells", cue: "Hold DBs at sides for added load." },
    { equipment: "weighted-vest", upgradedName: "Weighted Calf Raises", upgradedLoad: "Weighted vest", cue: "Vest adds load to calf raises." },
  ],
  "Hanging Leg Raises": [
    { equipment: "weighted-vest", upgradedName: "Weighted Hanging Leg Raises", upgradedLoad: "Weighted vest", cue: "Vest adds load — control the descent." },
    { equipment: "pull-up-bar", upgradedName: "Hanging Leg Raises", upgradedLoad: "Pull-up bar", cue: "Dead hang from bar — raise legs to parallel." },
  ],
  "V-Ups": [
    { equipment: "weighted-vest", upgradedName: "Weighted V-Ups", upgradedLoad: "Weighted vest", cue: "Vest adds resistance to V-ups." },
  ],
  "Russian Twists": [
    { equipment: "dumbbells", upgradedName: "DB Russian Twists", upgradedLoad: "Dumbbell", cue: "Hold one DB for added twist resistance." },
    { equipment: "weighted-vest", upgradedName: "Weighted Russian Twists", upgradedLoad: "Weighted vest", cue: "Vest adds load to twists." },
  ],
  "Jump Rope (or imaginary)": [
    { equipment: "jump-rope", upgradedName: "Jump Rope", upgradedLoad: "Jump rope", cue: "Actual rope — find your rhythm." },
  ],
  "Foam Rolling": [
    { equipment: "foam-roller", upgradedName: "Foam Rolling", upgradedLoad: "Foam roller", cue: "Use roller on quads, IT band, lats, and calves." },
  ],
  "Easy Walk": [
    { equipment: "weighted-vest", upgradedName: "Ruck Walk", upgradedLoad: "Weighted vest", cue: "Vest turns a walk into a ruck — stay tall." },
  ],
  "Easy Walk or Jog": [
    { equipment: "weighted-vest", upgradedName: "Ruck Walk/Jog", upgradedLoad: "Weighted vest", cue: "Vest adds load to cardio." },
  ],
  "Easy Walk or Swim": [
    { equipment: "weighted-vest", upgradedName: "Ruck Walk", upgradedLoad: "Weighted vest", cue: "Vest turns walk into ruck." },
  ],
  "Easy Swim or Row": [
    { equipment: "rowing-machine", upgradedName: "Row Machine Intervals", upgradedLoad: "Rowing machine", cue: "5x500m with 1 min rest." },
    { equipment: "bike", upgradedName: "Bike Intervals", upgradedLoad: "Bike", cue: "5x500m equivalent with 1 min rest." },
  ],
};

export function getEquipmentProgression(
  exerciseName: string,
  userEquipment: string[],
): EquipmentProgression | null {
  const progressions = progressionMap[exerciseName];
  if (!progressions) return null;

  for (const prog of progressions) {
    if (userEquipment.includes(prog.equipment)) {
      return prog;
    }
  }
  return null;
}
