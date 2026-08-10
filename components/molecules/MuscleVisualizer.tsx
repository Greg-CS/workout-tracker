"use client";

import { useState } from "react";
import { getMuscleActivation, muscleGroupLabels, type MuscleGroup } from "@/lib/muscleMap";
import { cn } from "@/lib/utils";
import { Dumbbell } from "lucide-react";

interface MuscleVisualizerProps {
  exerciseName: string;
}

type ViewSide = "front" | "back";

const primaryColor = "var(--primary)";
const secondaryColor = "var(--accent)";

const frontMuscles: { group: MuscleGroup; d: string }[] = [
  { group: "neck", d: "M88,38 Q100,32 112,38 L108,55 L92,55 Z" },
  { group: "chest", d: "M72,70 Q72,62 80,60 L98,62 L98,95 L82,98 Q72,95 72,85 Z M102,62 L120,60 Q128,62 128,70 L128,85 Q128,95 118,98 L102,95 Z" },
  { group: "front-shoulders", d: "M72,65 Q62,65 58,72 L55,85 Q58,90 65,88 L72,80 Z M128,65 Q138,65 142,72 L145,85 Q142,90 135,88 L128,80 Z" },
  { group: "side-shoulders", d: "M58,72 Q52,75 50,82 L52,90 Q56,88 58,85 Z M142,72 Q148,75 150,82 L148,90 Q144,88 142,85 Z" },
  { group: "biceps", d: "M65,92 Q60,95 58,105 L56,120 Q58,125 63,123 L68,110 L70,98 Z M135,92 Q140,95 142,105 L144,120 Q142,125 137,123 L132,110 L130,98 Z" },
  { group: "forearms", d: "M56,125 Q52,128 50,140 L48,155 Q50,160 55,158 L60,145 L63,130 Z M144,125 Q148,128 150,140 L152,155 Q150,160 145,158 L140,145 L137,130 Z" },
  { group: "abs", d: "M85,100 L85,130 L100,132 L100,100 Z M100,100 L100,132 L115,130 L115,100 Z" },
  { group: "obliques", d: "M80,100 Q78,115 80,130 L85,130 L85,100 Z M120,100 Q122,115 120,130 L115,130 L115,100 Z" },
  { group: "hip-flexors", d: "M85,135 L85,150 Q90,155 95,152 L95,138 Z M105,138 L105,152 Q110,155 115,150 L115,135 Z" },
  { group: "quads", d: "M82,155 Q78,158 76,170 L74,195 Q76,205 82,203 L88,180 L90,160 Z M118,155 Q122,158 124,170 L126,195 Q124,205 118,203 L112,180 L110,160 Z" },
  { group: "calves", d: "M78,210 Q75,215 74,230 L73,245 Q75,250 80,248 L82,235 L84,215 Z M122,210 Q125,215 126,230 L127,245 Q125,250 120,248 L118,235 L116,215 Z" },
];

const backMuscles: { group: MuscleGroup; d: string }[] = [
  { group: "neck", d: "M88,38 Q100,32 112,38 L108,55 L92,55 Z" },
  { group: "traps", d: "M75,58 Q70,55 65,62 L70,72 L85,70 L100,68 L115,70 L130,72 L135,62 Q130,55 125,58 L100,60 Z" },
  { group: "rear-shoulders", d: "M72,65 Q62,65 58,72 L55,85 Q58,90 65,88 L72,80 Z M128,65 Q138,65 142,72 L145,85 Q142,90 135,88 L128,80 Z" },
  { group: "upper-back", d: "M75,72 Q70,78 72,88 L80,92 L100,90 L120,92 L128,88 Q130,78 125,72 L100,75 Z" },
  { group: "lats", d: "M75,90 Q70,95 72,110 L78,125 L88,128 L100,126 L112,128 L122,125 L128,110 Q130,95 125,90 L100,93 Z" },
  { group: "lower-back", d: "M82,128 L82,145 L100,147 L118,145 L118,128 L100,130 Z" },
  { group: "glutes", d: "M80,148 Q75,152 73,165 L75,180 Q80,185 88,182 L92,165 L92,150 Z M108,150 L108,165 L112,182 Q120,185 125,180 L127,165 Q125,152 120,148 Z" },
  { group: "hamstrings", d: "M82,185 Q78,188 76,200 L74,225 Q76,235 82,233 L88,210 L90,190 Z M118,185 Q122,188 124,200 L126,225 Q124,235 118,233 L112,210 L110,190 Z" },
  { group: "calves", d: "M78,238 Q75,242 74,255 L73,270 Q75,275 80,273 L82,260 L84,242 Z M122,238 Q125,242 126,255 L127,270 Q125,275 120,273 L118,260 L116,242 Z" },
  { group: "triceps", d: "M65,92 Q60,95 58,105 L56,120 Q58,125 63,123 L68,110 L70,98 Z M135,92 Q140,95 142,105 L144,120 Q142,125 137,123 L132,110 L130,98 Z" },
  { group: "forearms", d: "M56,125 Q52,128 50,140 L48,155 Q50,160 55,158 L60,145 L63,130 Z M144,125 Q148,128 150,140 L152,155 Q150,160 145,158 L140,145 L137,130 Z" },
];

export function MuscleVisualizer({ exerciseName }: MuscleVisualizerProps) {
  const [side, setSide] = useState<ViewSide>("front");

  const activation = getMuscleActivation(exerciseName);

  if (!activation) return null;

  const allActive = new Set<MuscleGroup>([...activation.primary, ...activation.secondary]);
  const primarySet = new Set<MuscleGroup>(activation.primary);
  const muscles = side === "front" ? frontMuscles : backMuscles;

  const getFill = (group: MuscleGroup) => {
    if (primarySet.has(group)) return primaryColor;
    if (allActive.has(group)) return secondaryColor;
    return "none";
  };

  const getOpacity = (group: MuscleGroup) => {
    if (primarySet.has(group)) return 0.7;
    if (allActive.has(group)) return 0.35;
    return 0;
  };

  return (
    <div className="rounded-lg border border-secondary/20 bg-secondary/5 dark:border-foreground/10 dark:bg-foreground/5">
      <div className="flex items-center justify-between border-b border-secondary/15 px-3 py-2 dark:border-foreground/10">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold text-foreground/70">Muscle Activation</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSide("front")}
            className={cn(
              "rounded px-2 py-0.5 text-[10px] font-medium transition-colors",
              side === "front"
                ? "bg-primary/15 text-primary"
                : "text-foreground/40 hover:bg-secondary/10",
            )}
          >
            Front
          </button>
          <button
            onClick={() => setSide("back")}
            className={cn(
              "rounded px-2 py-0.5 text-[10px] font-medium transition-colors",
              side === "back"
                ? "bg-primary/15 text-primary"
                : "text-foreground/40 hover:bg-secondary/10",
            )}
          >
            Back
          </button>
        </div>
      </div>

        <div className="flex flex-col items-center gap-3 p-3 sm:flex-row sm:items-start sm:gap-4">
          {/* SVG body diagram */}
          <div className="relative shrink-0">
            <svg
              width="120"
              height="290"
              viewBox="45 25 110 260"
              className="overflow-visible"
            >
              {/* Head */}
              <circle cx="100" cy="22" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground/20" />
              {/* Body outline */}
              <path
                d="M75,55 Q70,58 68,70 L60,90 Q55,100 55,120 L50,155 Q48,170 50,185 L55,210 Q52,225 55,245 L58,275 Q60,280 65,278 L70,275 M125,55 Q130,58 132,70 L140,90 Q145,100 145,120 L150,155 Q152,170 150,185 L145,210 Q148,225 145,245 L142,275 Q140,280 135,278 L130,275"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-foreground/15"
              />
              {/* Torso outline */}
              <path
                d="M75,55 Q72,60 72,70 L72,150 Q72,155 75,155 L125,155 Q128,155 128,150 L128,70 Q128,60 125,55 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-foreground/15"
              />

              {/* Muscle groups */}
              {muscles.map((muscle) => {
                const fill = getFill(muscle.group);
                const opacity = getOpacity(muscle.group);
                if (opacity === 0) {
                  return (
                    <path
                      key={muscle.group}
                      d={muscle.d}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-foreground/10"
                    />
                  );
                }
                return (
                  <path
                    key={muscle.group}
                    d={muscle.d}
                    fill={fill}
                    fillOpacity={opacity}
                    stroke={fill}
                    strokeWidth="0.5"
                    strokeOpacity="0.8"
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>
          </div>

          {/* Muscle list */}
          <div className="flex-1 space-y-2">
            {activation.primary.length > 0 && (
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-primary">Primary</p>
                <div className="flex flex-wrap gap-1">
                  {activation.primary.map((g) => (
                    <span
                      key={g}
                      className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                      style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)", color: "var(--primary)" }}
                    >
                      {muscleGroupLabels[g]}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {activation.secondary.length > 0 && (
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-foreground/40">Secondary</p>
                <div className="flex flex-wrap gap-1">
                  {activation.secondary.map((g) => (
                    <span
                      key={g}
                      className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                      style={{ backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)", color: "var(--accent)" }}
                    >
                      {muscleGroupLabels[g]}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {activation.primary.length === 0 && activation.secondary.length === 0 && (
              <p className="text-xs text-foreground/40">
                Primarily a mobility or recovery exercise — no specific muscle activation data.
              </p>
            )}
          </div>
        </div>
    </div>
  );
}
