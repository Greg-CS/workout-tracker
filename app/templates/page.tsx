"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation, useConvexAuth } from "convex/react";
import { api } from "../../convex/_generated/api";
import { templates, type Template } from "@/lib/templates";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, string> = {
  Dumbbell: "💪",
  Waves: "🌊",
  PersonSimple: "🤸",
  Trophy: "🏆",
  Flame: "🔥",
  Heart: "❤️",
  Zap: "⚡",
};

export default function TemplatesPage() {
  const { user, isLoaded: userLoaded } = useUser();
  const { isLoading: authLoading } = useConvexAuth();
  const userData = useQuery(api.users.getUser, {
    clerkId: user?.id ?? "",
  });
  const updateTemplate = useMutation(api.users.updateTemplate);
  const createRegimen = useMutation(api.regimens.createRegimen);
  const getOrCreateUser = useMutation(api.users.getOrCreateUser);
  const [selected, setSelected] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const currentTemplate = userData?.selectedTemplate;

  const handleSelect = async (template: Template) => {
    if (!user) return;
    setSaving(true);
    setSelected(template.key);

    try {
      let userId = userData?._id;

      if (!userId) {
        userId = await getOrCreateUser({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress ?? "",
          name: user.fullName ?? user.username ?? "Athlete",
        });
      }

      await updateTemplate({
        clerkId: user.id,
        templateKey: template.key,
      });
      await createRegimen({
        userId,
        templateKey: template.key,
        days: template.days,
      });

      await fetch("/api/send-regimen-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName ?? "Athlete",
          templateName: template.name,
          regimenSummary: template.days
            .map((d) => `Day ${d.day}: ${d.title} (${d.exercises.length} exercises)`)
            .join("\n"),
        }),
      }).catch(() => {});
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || !userLoaded || userData === undefined) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-foreground/30" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Choose Your Template</h1>
        <p className="mt-2 text-sm text-foreground/50">
          Select a training regimen that matches your goals. You can switch anytime.
        </p>
      </div>

      {currentTemplate && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3">
          <Check className="h-4 w-4 text-primary" />
          <span className="text-sm text-primary">
            Current template: <strong>{templates.find((t) => t.key === currentTemplate)?.name}</strong>
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => {
          const isActive = currentTemplate === template.key;
          const isSavingThis = saving && selected === template.key;
          const totalExercises = template.days.reduce((sum, d) => sum + d.exercises.length, 0);

          return (
            <Card
              key={template.key}
              className={cn(
                "transition-all hover:shadow-md hover:border-primary/40",
                isActive && "border-primary/60 ring-1 ring-primary/30",
              )}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{iconMap[template.icon] ?? "💪"}</span>
                    <div>
                      <CardTitle>{template.name}</CardTitle>
                      <CardDescription className="mt-1">{template.description}</CardDescription>
                    </div>
                  </div>
                  {isActive && (
                    <Badge variant="success" className="shrink-0">
                      <Check className="mr-1 h-3 w-3" /> Active
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/50">
                    {template.days.length} days · {totalExercises} exercises
                  </span>
                  {isSavingThis ? (
                    <Loader2 className="h-4 w-4 animate-spin text-foreground/30" />
                  ) : (
                    <Button
                      size="sm"
                      variant={isActive ? "outline" : "default"}
                      disabled={isActive || isSavingThis}
                      onClick={() => handleSelect(template)}
                    >
                      {isActive ? "Selected" : "Select"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
