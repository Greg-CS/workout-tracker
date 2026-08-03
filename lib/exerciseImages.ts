const IMAGE_BASE = "/workout_images";

const imageOverrides: Record<string, string> = {
  "20 lb Mace 360 + 10-to-2": "360-swings-&-10-2.jpg",
  "Steel Mace 360 + 10-to-2": "360-swings-&-10-2.jpg",
  "Steel Mace Flow": "360-swings-&-10-2.jpg",
  "360 Swings": "360-swings-&-10-2.jpg",
  "Mace Side Swings": "360-swings-&-10-2.jpg",
  "Offset Mace Hold": "360-swings-&-10-2.jpg",
  "Steel Mace Recovery Flow": "360-swings-&-10-2.jpg",
};

const imageMap: Record<string, string> = {
  "360swings10to2": "360-swings-&-10-2.jpg",
  "dipbarsupporthold": "Dip-bar-support-hold.webp",
  "glutebridge": "Glute_Bridge.webp",
  "reversecrunches": "Reverse-Crunches.jpg",
  "singlelegromaniandeadlift": "SingleLegRomanianDeadlift.jpg",
  "strapkneetucks": "Strap-knee-tucks.jpg",
  "barbellbentoverrow": "barbell-bent-over-row.jpg",
  "bicyclecrunches": "bicycle-crunches.jpg",
  "catcow": "cat-cow.jpg",
  "chestpress": "chest-press.webp",
  "childspose": "child-pose.jpg",
  "compressionlift": "compression-lift.jpg",
  "dbfloorpress": "db-floor-press.webp",
  "dbsplitsquat": "db-split-squat.jpg",
  "dbshoulderpress": "db_shoulder_press.jpg",
  "deadhang": "dead-hang.jpg",
  "deepsquathold": "deep-squat-hold.png",
  "dips": "dips.jpg",
  "dumbbelllateralraise": "dumbbell-lateral-raise.webp",
  "elevatedpushup": "elevated-pushup.webp",
  "gobletsquat": "goblet-squat.jpg",
  "hammercurls": "hammer-curls.webp",
  "hipflexorstretch": "hip-flexor-stretch.jpg",
  "hollowbodyhold": "hollow-body-hold.jpg",
  "inclinepushups": "incline-push-ups.jpg",
  "kneeraises": "knee-raises.jpg",
  "onearmdbrow": "one_arm_db_row.webp",
  "pancakestretch": "pancake-stretch.jpg",
  "pikepulses": "pike-pulses.webp",
  "pikepushups": "pike-push-ups.png",
  "pistolsquat": "pistol-squat.jpg",
  "plank": "plank.jpg",
  "pushups": "push-ups.webp",
  "romaniandeadlift": "romanian-deadlift.webp",
  "seatedpikestretch": "seated-pike-stretch.jpg",
  "shoulderwallstretch": "shoulder-wall-stretch.jpg",
  "splitsquat": "split-squat.jpg",
  "strappushups": "strap-pushups.jpg",
  "straprows": "strap-rows.jpg",
  "thoracicrotations": "thoracic-rotations.png",
  "worldsgreateststretch": "world-greatest-stretch.webp",
  "wristprep": "wrist-prep.png",
};

function normalizeName(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function splitWords(s: string): string[] {
  return s
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[\s\-_()]+/)
    .map((w) => w.toLowerCase())
    .filter((w) => w.length > 0);
}

export function getExerciseImage(exerciseName: string): string | null {
  if (imageOverrides[exerciseName]) {
    return `${IMAGE_BASE}/${imageOverrides[exerciseName]}`;
  }

  const norm = normalizeName(exerciseName);
  if (imageMap[norm]) {
    return `${IMAGE_BASE}/${imageMap[norm]}`;
  }

  let bestMatch = "";
  let bestLen = 0;
  for (const [key, file] of Object.entries(imageMap)) {
    if (key.length < 4) continue;
    if (norm.includes(key) || key.includes(norm)) {
      if (key.length > bestLen) {
        bestMatch = file;
        bestLen = key.length;
      }
    }
  }
  if (bestMatch) return `${IMAGE_BASE}/${bestMatch}`;

  const exWords = splitWords(exerciseName);
  let bestFile = "";
  let bestOverlap = 0;
  for (const [key, file] of Object.entries(imageMap)) {
    const imgWords = splitWords(key);
    let overlap = 0;
    for (const ew of exWords) {
      for (const iw of imgWords) {
        if (ew === iw && ew.length >= 3) overlap++;
      }
    }
    if (overlap > bestOverlap) {
      bestFile = file;
      bestOverlap = overlap;
    }
  }
  if (bestOverlap >= 2) return `${IMAGE_BASE}/${bestFile}`;

  if (bestOverlap >= 1) {
    for (const ew of exWords) {
      if (ew.length < 4) continue;
      for (const [key, file] of Object.entries(imageMap)) {
        for (const iw of splitWords(key)) {
          if (ew === iw) return `${IMAGE_BASE}/${file}`;
        }
      }
    }
  }

  return null;
}
