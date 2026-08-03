"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import { RatingSlider } from "@/components/atoms/RatingSlider";
import { Badge } from "@/components/atoms/Badge";

interface ReadinessFormProps {
  energy: number;
  soreness: number;
  sleep: number;
  onEnergyChange: (v: number) => void;
  onSorenessChange: (v: number) => void;
  onSleepChange: (v: number) => void;
}

export function ReadinessForm({
  energy,
  soreness,
  sleep,
  onEnergyChange,
  onSorenessChange,
  onSleepChange,
}: ReadinessFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          How are you feeling today?
        </CardTitle>
        <p className="text-sm text-foreground/50">
          Your readiness score adjusts the workout intensity based on your current state.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium">Energy Level</label>
            <Badge variant={energy <= 2 ? "secondary" : energy >= 4 ? "success" : "outline"}>
              {["", "Drained", "Low", "Normal", "Good", "Excellent"][energy]}
            </Badge>
          </div>
          <RatingSlider
            value={energy}
            onChange={onEnergyChange}
            labels={["Drained", "Low", "Normal", "Good", "Excellent"]}
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium">Soreness (scheduled region)</label>
            <Badge variant={soreness >= 4 ? "secondary" : soreness <= 2 ? "success" : "outline"}>
              {["", "None", "Mild", "Noticeable", "High", "Severe"][soreness]}
            </Badge>
          </div>
          <RatingSlider
            value={soreness}
            onChange={onSorenessChange}
            labels={["None", "Mild", "Noticeable", "High", "Severe"]}
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium">Sleep Quality</label>
            <Badge variant={sleep <= 2 ? "secondary" : sleep >= 4 ? "success" : "outline"}>
              {["", "Poor", "Low", "Normal", "Good", "Excellent"][sleep]}
            </Badge>
          </div>
          <RatingSlider
            value={sleep}
            onChange={onSleepChange}
            labels={["Poor", "Low", "Normal", "Good", "Excellent"]}
          />
        </div>
      </CardContent>
    </Card>
  );
}
