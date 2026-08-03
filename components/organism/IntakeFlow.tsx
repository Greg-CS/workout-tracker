"use client";

import { useState } from "react";
import { ReadinessForm } from "@/components/molecules/ReadinessForm";
import { ActivityLogger } from "@/components/molecules/ActivityLogger";
import { EquipmentToggle } from "@/components/molecules/EquipmentToggle";
import { ReadinessGauge } from "@/components/molecules/ReadinessGauge";
import { Button } from "@/components/atoms/Button";
import { calculateReadiness, type Prescription } from "@/lib/readinessModel";
import type { Intensity } from "@/lib/activityModel";
import { defaultEquipment } from "@/lib/equipmentModel";

export interface IntakeResult {
  energy: number;
  soreness: number;
  sleep: number;
  activities: { kind: string; minutes: number; intensity: Intensity; load: number }[];
  equipment: string[];
  score: number;
  prescription: Prescription;
  reasons: string[];
}

interface IntakeFlowProps {
  onComplete: (result: IntakeResult) => void;
  initialEquipment?: string[];
  onEquipmentChange?: (equipment: string[]) => void;
}

export function IntakeFlow({ onComplete, initialEquipment, onEquipmentChange }: IntakeFlowProps) {
  const [energy, setEnergy] = useState(3);
  const [soreness, setSoreness] = useState(2);
  const [sleep, setSleep] = useState(3);
  const [activities, setActivities] = useState<
    { kind: string; minutes: number; intensity: Intensity; load: number }[]
  >([]);
  const [equipment, setEquipment] = useState<string[]>(initialEquipment ?? defaultEquipment);
  const [showEquipment, setShowEquipment] = useState(false);

  const result = calculateReadiness({
    energy,
    soreness,
    sleep,
    activity: activities.length > 0 ? activities[activities.length - 1] : null,
  });

  const toggleEquipment = (key: string) => {
    setEquipment((prev) => {
      const next = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key];
      onEquipmentChange?.(next);
      return next;
    });
  };

  const handleComplete = () => {
    onComplete({
      energy,
      soreness,
      sleep,
      activities,
      equipment,
      score: result.score,
      prescription: result.prescription,
      reasons: result.reasons,
    });
  };

  return (
    <div className="space-y-4">
      <ReadinessGauge
        score={result.score}
        prescription={result.prescription}
        reasons={result.reasons}
      />

      <ReadinessForm
        energy={energy}
        soreness={soreness}
        sleep={sleep}
        onEnergyChange={setEnergy}
        onSorenessChange={setSoreness}
        onSleepChange={setSleep}
      />

      <ActivityLogger
        onLog={(act) => setActivities((prev) => [...prev, act])}
        loggedActivities={activities}
      />

      <div>
        {!showEquipment ? (
          <Button variant="outline" className="w-full" onClick={() => setShowEquipment(true)}>
            Adjust Available Equipment ({equipment.length} items)
          </Button>
        ) : (
          <EquipmentToggle selected={equipment} onToggle={toggleEquipment} />
        )}
      </div>

      <Button size="lg" className="w-full bg-primary text-primary-foreground" onClick={handleComplete}>
        Generate Today&apos;s Workout →
      </Button>
    </div>
  );
}
