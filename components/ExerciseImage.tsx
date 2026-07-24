import { exerciseDescriptions } from "@/lib/exerciseDescriptions";

export function ExerciseDescription({ name }: { name: string }) {
  const desc = exerciseDescriptions[name];
  if (!desc) return null;
  return (
    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
      {desc}
    </p>
  );
}

