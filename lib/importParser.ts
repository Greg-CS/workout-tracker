export interface ParsedLogEntry {
  date: number;
  templateKey: string;
  dayLabel: string;
  exerciseName: string;
  category: string;
  reps: string;
  sets: number;
  load: string;
  totalReps: number;
  notes: string;
}

const categoryKeywords: Record<string, string[]> = {
  mobility: ["stretch", "cat-cow", "wrist prep", "hip flexor", "seated pike", "pancake", "world's greatest", "foam roll", "shoulder dislocate", "mobility", "deep breathing", "child's pose", "mermaid", "pelvic tilt", "wrist stretch"],
  skill: ["hollow body", "plank", "side plank", "support hold", "l-sit", "tuck l-sit", "planche", "frog stand", "dead bug", "wall sit", "balance"],
  conditioning: ["burpee", "jumping jack", "mountain climber", "high knee", "sprint", "tempo run", "steady run", "easy run", "cycling", "jump rope", "skater", "swim", "lunge jump", "squat jump", "plank jack"],
};

function inferCategory(name: string): string {
  const lower = name.toLowerCase();
  for (const [cat, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((kw) => lower.includes(kw))) return cat;
  }
  return "strength";
}

function inferLoad(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("weighted")) return "weighted vest";
  if (lower.includes("db ") || lower.includes("dumbbell")) return "dumbbells";
  if (lower.includes("barbell") || lower.includes("bench press") || lower.includes("back squat") || lower.includes("deadlift") || lower.includes("overhead press")) return "barbell";
  if (lower.includes("kettlebell") || lower.includes("kb ")) return "kettlebell";
  if (lower.includes("band") || lower.includes("strap")) return "resistance band";
  if (lower.includes("ring")) return "rings";
  if (lower.includes("mace") || lower.includes("steel mace")) return "steel mace";
  if (lower.includes("ab roller") || lower.includes("ab wheel")) return "ab roller";
  if (lower.includes("jump rope")) return "jump rope";
  return "bodyweight";
}

function parseDate(dateStr: string): number {
  const trimmed = dateStr.trim();
  const match = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})(?:\s+(\d{2}):(\d{2}))?/);
  if (!match) return Date.now();
  const [, year, month, day, hour = "0", minute = "0"] = match;
  return new Date(`${year}-${month}-${day}T${hour}:${minute}:00`).getTime();
}

export function parseMarkdownLog(markdown: string, templateKey = "calisthenics"): ParsedLogEntry[] {
  const lines = markdown.split("\n");
  const entries: ParsedLogEntry[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("|")) continue;
    if (trimmed.includes("---") || trimmed.toLowerCase().includes("date") && trimmed.toLowerCase().includes("exercise")) continue;

    const cells = trimmed.split("|").map((c) => c.trim()).filter((c) => c.length > 0);
    if (cells.length < 6) continue;

    const [dateStr, dayLabel, exerciseName, reps, setsStr, totalRepsStr] = cells;

    const sets = parseInt(setsStr, 10);
    const totalRepsNum = parseInt(totalRepsStr, 10);
    if (isNaN(sets)) continue;

    const isStretchRow = isNaN(totalRepsNum);
    const totalReps = isStretchRow ? 0 : totalRepsNum;

    entries.push({
      date: parseDate(dateStr),
      templateKey,
      dayLabel: dayLabel.trim(),
      exerciseName: exerciseName.trim(),
      category: inferCategory(exerciseName),
      reps: reps.trim(),
      sets,
      load: inferLoad(exerciseName),
      totalReps,
      notes: isStretchRow ? "Imported from markdown log (stretch/mobility)" : "Imported from markdown log",
    });
  }

  return entries;
}
