"use client";

import { useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { ExerciseImage } from "@/components/molecules/ExerciseImage";
import { MuscleVisualizer } from "@/components/molecules/MuscleVisualizer";
import { exerciseInfo } from "@/lib/exerciseInfo";
import { checkEquipmentAvailability } from "@/lib/equipmentModel";
import { ChevronDown, Play, AlertCircle, ArrowUp, Clock, Trophy, Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExerciseCardProps {
  name: string;
  category: string;
  sets: number;
  target: string;
  load: string;
  rest: number;
  notes?: string;
  equipment?: string;
  cue?: string;
  originalSets?: number;
  originalName?: string;
  durationSec?: number;
  userEquipment?: string[];
  pr?: { exercise: string; bestSet: number; totalReps: number; lastDate: number };
}

export function ExerciseCard({
  name,
  category,
  sets,
  target,
  load,
  rest,
  notes,
  equipment,
  cue,
  originalSets,
  originalName,
  durationSec,
  userEquipment = ["bodyweight"],
  pr,
}: ExerciseCardProps) {
  const info = exerciseInfo[name];
  const [expanded, setExpanded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showMuscles, setShowMuscles] = useState(false);

  const equipCheck = checkEquipmentAvailability(
    equipment ?? load,
    userEquipment,
  );

  return (
    <div className="overflow-hidden rounded-xl border border-secondary/25 bg-white shadow-sm shadow-secondary/10 transition-all hover:shadow-md dark:border-foreground/10 dark:bg-foreground/5">
      <div className="flex flex-col md:flex-row gap-4 p-4 items-center justify-between">
        <ExerciseImage name={name} size="md" />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-foreground">{name}</span>
            <Badge variant="secondary">{category}</Badge>
            {originalSets !== undefined && originalSets !== sets && (
              <Badge variant="outline" className="text-accent">
                {sets}/{originalSets} sets
              </Badge>
            )}
            {originalName && originalName !== name && (
              <Badge variant="success" className="gap-1">
                <ArrowUp className="h-3 w-3" />
                Upgraded from {originalName}
              </Badge>
            )}
            {pr && pr.bestSet > 0 && (
              <Badge variant="outline" className="gap-1 text-primary">
                <Trophy className="h-3 w-3" />
                PR: {pr.bestSet} reps
              </Badge>
            )}
          </div>

          {info?.short && (
            <p className="mt-1 line-clamp-2 text-sm text-foreground/60">
              {info.short}
            </p>
          )}

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
            <span className="text-foreground/50">
              <span className="font-semibold text-foreground/70">Sets:</span> {sets}
            </span>
            <span className="text-foreground/50">
              <span className="font-semibold text-foreground/70">Target:</span> {target}
            </span>
            <span className="text-foreground/50">
              <span className="font-semibold text-foreground/70">Load:</span> {load}
            </span>
            {durationSec ? (
              <span className="flex items-center gap-1 text-primary/70">
                <Clock className="h-3 w-3" />
                <span className="font-semibold text-primary">{durationSec >= 60 ? `${Math.floor(durationSec / 60)}:${String(durationSec % 60).padStart(2, "0")}` : `${durationSec}s`}</span>
              </span>
            ) : (
              <span className="text-foreground/50">
                <span className="font-semibold text-foreground/70">Rest:</span> {rest}s
              </span>
            )}
          </div>

          {(cue || notes) && (
            <p className="mt-1.5 text-xs italic text-foreground/40">
              {cue || notes}
            </p>
          )}

          {!equipCheck.available && equipCheck.substitution && (
            <div className="mt-2 flex items-start gap-1.5 rounded-lg bg-accent/10 px-2.5 py-1.5 text-xs text-accent">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>
                <strong>No {equipCheck.substitution.requiredEquipment}:</strong>{" "}
                {equipCheck.substitution.fallbackCue}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-secondary/15 dark:border-foreground/10">
        <div className="flex items-center divide-x divide-secondary/15 dark:divide-foreground/10">
          {info?.long && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-foreground/60 transition-colors hover:bg-secondary/10"
            >
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  expanded && "rotate-180",
                )}
              />
              {expanded ? "Hide Details" : "Show Details"}
            </button>
          )}
          <button
            onClick={() => setShowMuscles(!showMuscles)}
            className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-foreground/60 transition-colors hover:bg-secondary/10"
          >
            <Dumbbell className="h-3.5 w-3.5" />
            {showMuscles ? "Hide Muscles" : "Muscles"}
          </button>
          {info?.youtubeId && (
            <button
              onClick={() => setShowVideo(!showVideo)}
              className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-foreground/60 transition-colors hover:bg-secondary/10"
            >
              <Play className="h-3.5 w-3.5" />
              {showVideo ? "Hide Video" : "Watch Demo"}
            </button>
          )}
        </div>

        {expanded && info?.long && (
          <div className="px-4 pb-4 pt-2">
            <p className="text-sm leading-relaxed text-foreground/60">
              {info.long}
            </p>
          </div>
        )}

        {showMuscles && (
          <div className="px-4 pb-4 pt-2">
            <MuscleVisualizer exerciseName={name} />
          </div>
        )}

        {showVideo && info?.youtubeId && (
          <div className="px-4 pb-4 pt-2">
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                src={`https://www.youtube.com/embed/${info.youtubeId}`}
                title={`${name} demo`}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
