import type { Exercise, RegimenDay } from "./templates";

const y = (
  name: string,
  target: string,
  notes: string,
  durationSec?: number,
): Exercise => ({
  name,
  category: "flow",
  sets: 1,
  target,
  load: "bodyweight",
  rest: 0,
  notes,
  durationSec: durationSec ?? 0,
});

export const yogaFlows: Record<string, Exercise[]> = {
  morningFlow: [
    y("Child's Pose", "60 sec", "Start grounded — breathe into the back body.", 60),
    y("Cat-Cow", "8 slow reps", "Awaken the spine with breath."),
    y("Downward Dog", "45 sec", "Full body stretch — pedal the heels.", 45),
    y("Standing Forward Fold", "45 sec", "Release hamstrings and calm the mind.", 45),
    y("Mountain Pose", "30 sec", "Stand tall — root through all four corners of the feet.", 30),
    y("Sun Salutation A", "3 rounds", "Flow through plank, cobra, downward dog. Link with breath.", 180),
    y("Crescent Lunge", "30 sec each side", "Open hip flexors and stretch the psoas.", 60),
    y("Triangle Pose", "30 sec each side", "Lateral stretch — open the side body.", 60),
    y("Standing Balance (Tree Pose)", "30 sec each side", "Focus and single-leg stability.", 60),
    y("Seated Twist", "30 sec each side", "Wring out the spine — rinse and refresh.", 60),
    y("Bridge Pose", "30 sec", "Gentle backbend — open the chest and hips.", 30),
    y("Savasana", "3 min", "Final rest — absorb the practice.", 180),
  ],
  restorativeFlow: [
    y("Child's Pose", "90 sec", "Let go of the day — wide knees, arms forward.", 90),
    y("Cat-Cow", "6 slow reps", "Gentle spinal mobility."),
    y("Thread the Needle", "45 sec each side", "Release tension across the upper back.", 90),
    y("Supine Figure 4", "60 sec each side", "Gentle piriformis and glute release.", 120),
    y("Reclined Butterfly", "60 sec", "Open hips passively — let gravity do the work.", 60),
    y("Legs Up the Wall", "3 min", "Inversion for circulation and nervous system reset.", 180),
    y("Supine Twist", "45 sec each side", "Decompress the spine.", 90),
    y("Corpse Pose (Savasana)", "5 min", "Complete relaxation — scan from feet to head.", 300),
  ],
  hipOpenerFlow: [
    y("Child's Pose", "60 sec", "Start with hip opening.", 60),
    y("Cat-Cow", "8 reps", "Spine prep."),
    y("Low Lunge (Anjaneyasana)", "45 sec each side", "Deep psoas and hip flexor stretch.", 90),
    y("Pigeon Pose", "60 sec each side", "Deep glute and hip rotator release.", 120),
    y("Lizard Pose", "45 sec each side", "Hip flexors and inner thigh.", 90),
    y("Garland Pose (Malasana)", "60 sec", "Deep squat — open hips and ankles.", 60),
    y("Cow Face Pose", "45 sec each side", "Outer hip and IT band.", 90),
    y("Butterfly Stretch", "60 sec", "Inner thigh and groin opener.", 60),
    y("Happy Baby", "60 sec", "Release the lower back and hips.", 60),
    y("Savasana", "3 min", "Rest and integrate.", 180),
  ],
  shoulderFlow: [
    y("Child's Pose", "60 sec", "Relax the shoulders down.", 60),
    y("Cat-Cow", "8 reps", "Spine and shoulder blade mobility."),
    y("Thread the Needle", "45 sec each side", "Release posterior shoulder and rhomboids.", 90),
    y("Puppy Pose", "45 sec", "Heart melting — shoulder flexion stretch.", 45),
    y("Eagle Arms", "30 sec each side", "Stretch between shoulder blades.", 60),
    y("Cow Face Arms", "30 sec each side", "Triceps and deltoid stretch.", 60),
    y("Wall Chest Opener", "45 sec", "Pec stretch at a wall or doorway.", 45),
    y("Supported Fish (block)", "60 sec", "Passive chest opener — relax over a block.", 60),
    y("Savasana", "3 min", "Let the shoulders melt.", 180),
  ],
  hamstringFlow: [
    y("Child's Pose", "60 sec", "Start grounded.", 60),
    y("Cat-Cow", "8 reps", "Spine prep."),
    y("Downward Dog", "45 sec", "Calves and hamstrings — pedal the feet.", 45),
    y("Standing Forward Fold", "60 sec", "Let gravity lengthen the hamstrings.", 60),
    y("Pyramid Pose", "45 sec each side", "Deep hamstring stretch with straight leg.", 90),
    y("Seated Forward Fold", "60 sec", "Paschimottanasana — fold over straight legs.", 60),
    y("Supine Hamstring Stretch", "45 sec each side", "Use a strap or towel around the foot.", 90),
    y("Lying Figure 4", "45 sec each side", "Glute and piriformis complement.", 90),
    y("Savasana", "3 min", "Rest and release.", 180),
  ],
};

export function getYogaDay(dayNumber: number, flowKeys: string[]): RegimenDay {
  const exercises: Exercise[] = [];
  for (const key of flowKeys) {
    const flow = yogaFlows[key];
    if (flow) exercises.push(...flow);
  }
  return {
    day: dayNumber,
    title: "Yoga + Mobility Flow",
    exercises,
  };
}

export const yogaFlowKeys = Object.keys(yogaFlows);
