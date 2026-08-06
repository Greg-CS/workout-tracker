const IMAGE_BASE = "/workout_images";

const imageOverrides: Record<string, string> = {
  "20 lb Mace 360 + 10-to-2": "360-swings-&-10-2.jpg",
  "Steel Mace 360 + 10-to-2": "360-swings-&-10-2.jpg",
  "Steel Mace Flow": "360-swings-&-10-2.jpg",
  "360 Swings": "360-swings-&-10-2.jpg",
  "Mace Side Swings": "360-swings-&-10-2.jpg",
  "Offset Mace Hold": "360-swings-&-10-2.jpg",
  "Steel Mace Recovery Flow": "360-swings-&-10-2.jpg",
  "Ab Roller": "ab-roller.jpg",
  "Pull-ups": "pull-up.webp",
  "Chin-ups": "chin-ups.jpg",
  "Bodyweight Rows": "inverted-row.webp",
  "Shoulder Dislocates (band)": "shoulder-dislocates.jpg",
  "Dynamic Leg Swings": "dynamic-leg-swing.jpg",
  "Leg Swings": "dynamic-leg-swing.jpg",
  "Wrist Stretch": "shoulder_stretch.jpg",
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
  "deep breathing": "deep-breathing.webp",
  "supine twist": "supine-spinal-twist-yoga-pose.webp",
  "ruck walk": "Ruck_walk.webp",
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
  "abroller": "ab-roller.jpg",
  "chinups": "chin-ups.jpg",
  "pullups": "pull-up.webp",
  "invertedrow": "inverted-row.webp",
  "bodyweightrows": "inverted-row.webp",
  "shoulderdislocates": "shoulder-dislocates.jpg",
  "dynamiclegswings": "dynamic-leg-swing.jpg",
  "legswings": "dynamic-leg-swing.jpg",
  "hamstringscoop": "hamstring-scoop.jpg",
  "armcircles": "arm_circles.webp",
  "pecstretch": "Pec+Stretch.webp",
  "shoulderstretch": "shoulder_stretch.jpg",
  "wriststretch": "shoulder_stretch.jpg",
  "airsquats": "air-squats.png",
  "jumpsquats": "jump-squats.webp",
  "squatjumps": "squat-jumps.webp",
  "lungejumps": "lunge-jumps.jpg",
  "reverselunges": "reverse-lunge.jpg",
  "90/90 Hip Rotations": "90-90-hip-rotations.webp",
  "ankle circles": "ankle-circles.png",
  "weighted squats": "barbell-squats.webp",
  "ring rows": "ring-row.jpg",
  "Weighted Jumping Jacks": "weighted-jump-jacks.webp",
  "Triceps Stretch": "tricep-stretch.jpg",
  // stayed here
  "lunges": "lunges.svg",
  "calfraises": "calf-raises.svg",
  "wallsit": "wall-sit.svg",
  "burpees": "burpees.svg",
  "mountainclimbers": "mountain-climbers.svg",
  "jumpingjacks": "jumping-jacks.svg",
  "skaterjumps": "skater-jumps.svg",
  "highknees": "high-knees.svg",
  "planktopushup": "plank-to-pushup.svg",
  "vups": "v-ups.svg",
  "crunches": "crunches.svg",
  "russiantwists": "russian-twists.svg",
  "bicyclekicks": "bicycle-kicks.svg",
  "pronesnowangels": "prone-snow-angels.svg",
  "stabilityballstirthepot": "stability-ball-stir.svg",
  "facepullsband": "face-pulls-band.svg",
  "deadbug": "dead-bug.svg",
  "tucklsit": "tuck-l-sit.svg",
  "lsitprogression": "l-sit-progression.svg",
  "plancheleans": "planche-leans.svg",
  "frogstand": "frog-stand.svg",
  "overheadpress": "overhead-press.svg",
  "barbellbacksquat": "barbell-back-squat.svg",
  "barbellbenchpress": "barbell-bench-press.svg",
  "conventionaldeadlift": "conventional-deadlift.svg",
  "foamrolling": "foam-rolling.svg",
  "sprintintervals": "sprint-intervals.svg",
  "rowingintervals": "rowing-intervals.svg",
  "temporun": "tempo-run.svg",
  "cyclingintervals": "cycling-intervals.svg",
  "easysteadyrun": "easy-steady-run.svg",
  "jumprope": "jump-rope.svg",
  "thehundreds": "the-hundreds.svg",
  "rollups": "roll-ups.svg",
  "singlelegcircles": "single-leg-circles.svg",
  "crisscross": "criss-cross.svg",
  "swandive": "swan-dive.svg",
  "sidelegkicks": "side-leg-kicks.svg",
  "clamshells": "clamshells.svg",
  "spinestretchforward": "spine-stretch-forward.svg",
  "saw": "saw-pilates.svg",
  "mermaidstretch": "mermaid-stretch.svg",
  "pelvictilts": "pelvic-tilts.svg",
  "teaser": "teaser.svg",
  "swimming": "swimming-pilates.svg",
  "doublelegstretch": "double-leg-stretch.svg",
  "scissors": "scissors.svg",
  "sideplankdips": "side-plank-dips.svg",
  "downwarddog": "downward-dog.svg",
  "standingforwardfold": "standing-forward-fold.svg",
  "mountainpose": "mountain-pose.svg",
  "sunsalutationa": "sun-salutation-a.svg",
  "crescentlunge": "crescent-lunge.svg",
  "trianglepose": "triangle-pose.svg",
  "treepose": "tree-pose.svg",
  "seatedtwist": "seated-twist.svg",
  "savasana": "savasana.svg",
  "corpseposesavasana": "savasana.svg",
  "threadtheneedle": "thread-the-needle.svg",
  "supinefigure4": "supine-figure-4.svg",
  "reclinedbutterfly": "reclined-butterfly.svg",
  "legsupthewall": "legs-up-the-wall.svg",
  "lowlunge": "low-lunge.svg",
  "pigeonpose": "pigeon-pose.svg",
  "lizardpose": "lizard-pose.svg",
  "garlandpose": "garland-pose.svg",
  "cowfacepose": "cow-face-pose.svg",
  "butterflystretch": "butterfly-stretch.svg",
  "happybaby": "happy-baby.svg",
  "puppypose": "puppy-pose.svg",
  "eaglearms": "eagle-arms.svg",
  "cowfacearms": "cow-face-arms.svg",
  "wallchestopener": "wall-chest-opener.svg",
  "supportedfish": "supported-fish.svg",
  "pyramidpose": "pyramid-pose.svg",
  "seatedforwardfold": "seated-forward-fold.svg",
  "supinehamstringstretch": "supine-hamstring-stretch.svg",
  "lyingfigure4": "lying-figure-4.svg",
  "easywalk": "easy-walk.svg",
  "easywalkorswim": "easy-walk.svg",
  "easywalkorjog": "easy-walk.svg",
  "easyswimorrow": "easy-swim-or-row.svg",
  "easyswimorjog": "easy-swim-or-row.svg",
  "bridgepose": "Glute_Bridge.webp",
  "shoulderbridge": "Glute_Bridge.webp",
  "explosivepushups": "push-ups.webp",
  "tricepsdipschair": "dips.jpg",
  "stabilityballplank": "plank.jpg",
  "sideplank": "plank.jpg",
  "sideplankrotations": "plank.jpg",
  "jumpropeorimaginary": "jump-rope.svg",
  "swimmershoulderpress": "db_shoulder_press.jpg",
  "inlinedbpress": "db-floor-press.webp",
  "dumbbellrow": "one_arm_db_row.webp",
  "gobletsquats": "goblet-squat.jpg",
  "bulgariansplitsquats": "db-split-squat.jpg",
  "lateralraises": "dumbbell-lateral-raise.webp",
  "lateralraisesifdumbbells": "dumbbell-lateral-raise.webp",
  "hammercurlsifdumbbells": "hammer-curls.webp",
  "romaniandeadliftifdumbbells": "romanian-deadlift.webp",
  "feetelevatedpushups": "elevated-pushup.webp",
  "pseudoplanchepushups": "push-ups.webp",
  "hanginglegraises": "knee-raises.jpg",
  "compressionraises": "compression-lift.jpg",
  "supporthold": "Dip-bar-support-hold.webp",
  "supportholddipbars": "Dip-bar-support-hold.webp",
  "seatedpike": "seated-pike-stretch.jpg",
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
