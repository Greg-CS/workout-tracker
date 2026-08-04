"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation, useConvexAuth } from "convex/react";
import { api } from "../../convex/_generated/api";
import { templates, combineTemplates, type Template } from "@/lib/templates";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Check, Loader2, Layers, X } from "lucide-react";
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

function templateDisplayName(key: string): string {
  if (key.includes("+")) {
    return key
      .split("+")
      .map((k) => templates.find((t) => t.key === k)?.name ?? k)
      .join(" + ");
  }
  return templates.find((t) => t.key === key)?.name ?? key;
}

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
  const [combineMode, setCombineMode] = useState(false);
  const [combineSelected, setCombineSelected] = useState<Set<string>>(new Set());

  const currentTemplate = userData?.selectedTemplate;
  const activeKeys = currentTemplate ? currentTemplate.split("+") : [];

  const ensureUserId = async () => {
    if (!user) return undefined;
    let userId = userData?._id;
    if (!userId) {
      userId = await getOrCreateUser({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress ?? "",
        name: user.fullName ?? user.username ?? "Athlete",
      });
    }
    return userId;
  };

  const handleSelect = async (template: Template) => {
    if (!user) return;
    setSaving(true);
    setSelected(template.key);

    try {
      const userId = await ensureUserId();
      if (!userId) return;

      await updateTemplate({
        clerkId: user.id,
        templateKey: template.key,
      });
      await createRegimen({
        userId,
        templateKey: template.key,
        templateKeys: [template.key],
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

  const toggleCombineSelected = (key: string) => {
    setCombineSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleCombine = async () => {
    if (!user || combineSelected.size < 2) return;
    const keys = Array.from(combineSelected);
    const combined = combineTemplates(keys);
    if (!combined) return;

    setSaving(true);
    setSelected(combined.key);

    try {
      const userId = await ensureUserId();
      if (!userId) return;

      await updateTemplate({
        clerkId: user.id,
        templateKey: combined.key,
      });
      await createRegimen({
        userId,
        templateKey: combined.key,
        templateKeys: keys,
        days: combined.days,
      });

      await fetch("/api/send-regimen-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName ?? "Athlete",
          templateName: combined.name,
          regimenSummary: combined.days
            .map((d) => `Day ${d.day}: ${d.title} (${d.exercises.length} exercises)`)
            .join("\n"),
        }),
      }).catch(() => {});

      setCombineMode(false);
      setCombineSelected(new Set());
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
    <div className="mx-auto max-w-6xl p-6 pb-24">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Choose Your Template</h1>
          <p className="mt-2 text-sm text-foreground/50">
            Select a training regimen that matches your goals. You can switch anytime.
          </p>
        </div>
        <Button
          variant={combineMode ? "default" : "outline"}
          size="sm"
          className="gap-2"
          onClick={() => {
            setCombineMode((m) => !m);
            setCombineSelected(new Set());
          }}
        >
          {combineMode ? <X className="h-4 w-4" /> : <Layers className="h-4 w-4" />}
          {combineMode ? "Cancel Combine" : "Combine Regimens"}
        </Button>
      </div>

      {currentTemplate && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3">
          <Check className="h-4 w-4 text-primary" />
          <span className="text-sm text-primary">
            Current template: <strong>{templateDisplayName(currentTemplate)}</strong>
          </span>
        </div>
      )}

      {combineMode && (
        <div className="mb-6 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 text-sm text-foreground/70">
          Select 2 or more templates to merge into a single combined regimen (e.g. Calisthenics + Power Lifting).
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => {
          const isActive = !combineMode && activeKeys.length === 1 && activeKeys[0] === template.key;
          const isPartOfCombined = activeKeys.length > 1 && activeKeys.includes(template.key);
          const isSavingThis = saving && selected === template.key;
          const isCombineChecked = combineSelected.has(template.key);
          const totalExercises = template.days.reduce((sum, d) => sum + d.exercises.length, 0);

          return (
            <Card
              key={template.key}
              className={cn(
                "transition-all hover:shadow-md hover:border-primary/40",
                isActive && "border-primary/60 ring-1 ring-primary/30",
                isPartOfCombined && "border-primary/40 ring-1 ring-primary/20",
                combineMode && isCombineChecked && "border-accent/60 ring-1 ring-accent/40",
                combineMode && "cursor-pointer",
              )}
              onClick={combineMode ? () => toggleCombineSelected(template.key) : undefined}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {combineMode && (
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                          isCombineChecked
                            ? "border-accent bg-accent text-white"
                            : "border-secondary/40 bg-white dark:bg-transparent",
                        )}
                      >
                        {isCombineChecked && <Check className="h-3.5 w-3.5" />}
                      </span>
                    )}
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
                  {isPartOfCombined && (
                    <Badge variant="outline" className="shrink-0 text-primary">
                      <Check className="mr-1 h-3 w-3" /> In Combo
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/50">
                    {template.days.length} days · {totalExercises} exercises
                  </span>
                  {!combineMode && (
                    isSavingThis ? (
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
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {combineMode && combineSelected.size > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center border-t border-secondary/20 bg-white/95 p-4 backdrop-blur dark:border-foreground/10 dark:bg-background/95">
          <div className="flex items-center gap-4">
            <span className="text-sm text-foreground/60">
              {combineSelected.size} selected: {Array.from(combineSelected).map((k) => templateDisplayName(k)).join(" + ")}
            </span>
            <Button
              onClick={handleCombine}
              disabled={combineSelected.size < 2 || saving}
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Layers className="h-4 w-4" />}
              Combine Selected
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
