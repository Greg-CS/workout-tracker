"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import { Badge } from "@/components/atoms/Badge";
import { allEquipment, type EquipmentItem } from "@/lib/equipmentModel";

interface EquipmentToggleProps {
  selected: string[];
  onToggle: (key: string) => void;
}

export function EquipmentToggle({ selected, onToggle }: EquipmentToggleProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Equipment</CardTitle>
        <p className="text-sm text-foreground/50">
          Toggle what you have. The regimen adapts — no excuses.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {allEquipment.map((item: EquipmentItem) => {
            const isSelected = selected.includes(item.key);
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onToggle(item.key)}
                className={`flex flex-col items-start rounded-lg border p-3 text-left transition-all ${
                  isSelected
                    ? "border-primary/60 bg-primary/10 dark:border-primary/40 dark:bg-primary/15"
                    : "border-secondary/25 bg-white hover:bg-secondary/10 dark:border-foreground/10 dark:bg-transparent dark:hover:bg-secondary/10"
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm font-medium">{item.label}</span>
                  {isSelected && <Badge variant="success" className="ml-1">✓</Badge>}
                </div>
                <span className="mt-0.5 text-xs text-foreground/40">{item.description}</span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
