"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Badge } from "@/components/atoms/Badge";
import { activityTypes, type Intensity } from "@/lib/activityModel";

interface ActivityLoggerProps {
  onLog: (activity: {
    kind: string;
    minutes: number;
    intensity: Intensity;
    load: number;
  }) => void;
  loggedActivities?: { kind: string; minutes: number; intensity: string; load: number }[];
}

export function ActivityLogger({ onLog, loggedActivities = [] }: ActivityLoggerProps) {
  const [showForm, setShowForm] = useState(false);
  const [kind, setKind] = useState("");
  const [minutes, setMinutes] = useState("");
  const [intensity, setIntensity] = useState<Intensity>("moderate");
  const [load, setLoad] = useState("");

  const handleSubmit = () => {
    const mins = parseInt(minutes, 10);
    if (!kind || isNaN(mins) || mins <= 0) return;

    onLog({
      kind,
      minutes: mins,
      intensity,
      load: parseFloat(load) || 0,
    });

    setKind("");
    setMinutes("");
    setIntensity("moderate");
    setLoad("");
    setShowForm(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-1">
          <span>External Activities</span>
          {!showForm && (
            <Button size="sm" variant="outline" className="p-6" onClick={() => setShowForm(true)}>
              + Log Activity
            </Button>
          )}
        </CardTitle>
        <p className="text-sm text-foreground/50">
          Log skate, ruck, bike, surf, or other activities. Fatigue is tracked separately from training stimulus.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {loggedActivities.length > 0 && (
          <div className="space-y-2">
            {loggedActivities.map((act, i) => {
              const type = activityTypes.find((t) => t.key === act.kind);
              return (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-secondary/20 bg-secondary/5 px-3 py-2 dark:border-foreground/10 dark:bg-foreground/5"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{type?.label ?? act.kind}</Badge>
                    <span className="text-sm text-foreground/60">
                      {act.minutes} min · {act.intensity}
                      {act.load > 0 && ` · ${act.load} lb`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showForm && (
          <div className="space-y-4 rounded-lg border border-secondary/20 p-4 dark:border-foreground/10">
            <div>
              <label className="mb-2 block text-sm font-medium">Activity Type</label>
              <div className="flex flex-wrap gap-2">
                {activityTypes.map((type) => (
                  <button
                    key={type.key}
                    type="button"
                    onClick={() => setKind(type.key)}
                    className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                      kind === type.key
                        ? "border-primary/60 bg-primary/10 text-primary"
                        : "border-secondary/30 text-foreground/60 hover:bg-secondary/10 dark:border-foreground/10 dark:text-foreground/60"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Duration (min)</label>
                <Input
                  type="number"
                  placeholder="60"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">External Load (lb)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={load}
                  onChange={(e) => setLoad(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Intensity</label>
              <div className="flex gap-2">
                {(["easy", "moderate", "hard"] as Intensity[]).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setIntensity(level)}
                    className={`flex-1 rounded-lg border py-2 text-sm font-medium capitalize transition-colors ${
                      intensity === level
                        ? "border-primary/60 bg-primary/10 text-primary"
                        : "border-secondary/30 text-foreground/60 hover:bg-secondary/10 dark:border-foreground/10"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSubmit} disabled={!kind || !minutes}>
                Log Activity
              </Button>
              <Button variant="ghost" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {loggedActivities.length === 0 && !showForm && (
          <p className="py-4 text-center text-sm text-foreground/40">
            No activities logged. Did you skate, ruck, or run today?
          </p>
        )}
      </CardContent>
    </Card>
  );
}
