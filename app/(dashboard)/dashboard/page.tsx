"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { ReadinessGauge } from "@/components/molecules/ReadinessGauge";
import { Loader2, Dumbbell, FileText, ClipboardList, History, ArrowRight, Activity } from "lucide-react";
import { templates } from "@/lib/templates";
import { prescriptionLabels } from "@/lib/readinessModel";

export default function DashboardPage() {
  const { user, isLoaded: userLoaded } = useUser();
  const userData = useQuery(api.users.getUser, {
    clerkId: user?.id ?? "",
  });
  const userId = userData?._id;
  const regimen = useQuery(
    api.regimens.getRegimen,
    userId ? { userId } : "skip",
  );
  const recentLogs = useQuery(
    api.workoutLogs.getRecentLogs,
    userId ? { userId, limit: 5 } : "skip",
  );
  const latestCheckin = useQuery(
    api.readiness.getLatestCheckin,
    userId ? { userId } : "skip",
  );
  const recentActivities = useQuery(
    api.activities.getRecentActivities,
    userId ? { userId, limit: 3 } : "skip",
  );

  const isLoading = !userLoaded || userData === undefined || (userId && regimen === undefined) || (userId && recentLogs === undefined) || (userId && latestCheckin === undefined) || (userId && recentActivities === undefined);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-foreground/30" />
      </div>
    );
  }

  const currentTemplateKey = userData?.selectedTemplate ?? "";
  const isCombined = currentTemplateKey.includes("+");
  const currentTemplate = templates.find((t) => t.key === currentTemplateKey);
  const regimenKeys = regimen?.templateKeys ?? (currentTemplateKey ? [currentTemplateKey] : []);
  const regimenTemplates = regimenKeys.map((k) => templates.find((t) => t.key === k)).filter((t): t is (typeof templates)[number] => !!t);
  const displayName = regimenTemplates.length > 0 ? regimenTemplates.map((t) => t.name).join(" + ") : (currentTemplate?.name ?? "None selected");
  const totalDays = regimen?.days.length ?? currentTemplate?.days.length ?? 0;
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;
  const todayWorkout = regimen?.days[todayIndex] ?? currentTemplate?.days[todayIndex];

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome back, {user?.firstName ?? "Athlete"}
        </h1>
        <p className="mt-2 text-sm text-foreground/50">
          Here is your training overview for today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Regimen</CardTitle>
            <Dumbbell className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {displayName}
            </div>
            <p className="mt-1 text-xs text-foreground/50">
              {totalDays > 0 ? `${totalDays} day plan` : "Choose a template to start"}
            </p>
            {!currentTemplate && !isCombined && (
              <Link href="/templates" className="mt-3 inline-block">
                <Button size="sm">Select Template <ArrowRight className="h-3 w-3" /></Button>
              </Link>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Readiness</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            {latestCheckin ? (
              <>
                <div className="text-2xl font-bold">{Math.round(latestCheckin.score)}%</div>
                <p className="mt-1 text-xs text-foreground/50">
                  {prescriptionLabels[latestCheckin.prescription as keyof typeof prescriptionLabels] ?? latestCheckin.prescription}
                </p>
                <Link href="/log" className="mt-3 inline-block">
                  <Button size="sm">Start Workout <ArrowRight className="h-3 w-3" /></Button>
                </Link>
              </>
            ) : (
              <>
                <div className="text-sm text-foreground/50">No check-in yet today</div>
                <Link href="/log" className="mt-3 inline-block">
                  <Button size="sm">Check In <ArrowRight className="h-3 w-3" /></Button>
                </Link>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Logs</CardTitle>
            <History className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentLogs?.length ?? 0}</div>
            <p className="mt-1 text-xs text-foreground/50">
              recent workout entries
            </p>
            <Link href="/history" className="mt-3 inline-block">
              <Button size="sm" variant="outline">View History <ArrowRight className="h-3 w-3" /></Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {latestCheckin && (
        <div className="mt-6">
          <ReadinessGauge
            score={latestCheckin.score}
            prescription={latestCheckin.prescription as "full" | "reduced" | "technique" | "recovery"}
          />
        </div>
      )}

      {recentActivities && recentActivities.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentActivities.map((act) => (
                <div
                  key={act._id}
                  className="flex items-center justify-between rounded-lg border border-secondary/20 bg-white px-4 py-3 dark:border-foreground/10 dark:bg-foreground/5"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{act.kind}</Badge>
                    <span className="text-sm text-foreground/50">{act.minutes} min · {act.intensity}</span>
                  </div>
                  <span className="text-sm text-foreground/40">{new Date(act.date).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {todayWorkout && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Today&apos;s Exercises — {todayWorkout.title}</CardTitle>
            <CardDescription>Day {todayWorkout.day} of your {displayName} regimen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {todayWorkout.exercises.map((ex, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 rounded-lg border border-secondary/20 bg-white px-4 py-3 dark:border-foreground/10 dark:bg-foreground/5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{ex.name}</span>
                    <Badge variant="secondary">{ex.category}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-foreground/50">
                    <span>{ex.sets} sets</span>
                    <span>{ex.target}</span>
                    <span>{ex.rest}s rest</span>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/log" className="mt-4 inline-block">
              <Button>Log This Workout <ClipboardList className="h-4 w-4" /></Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {recentLogs && recentLogs.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentLogs.map((log) => (
                <div
                  key={log._id}
                  className="flex flex-col gap-2 rounded-lg border border-secondary/20 bg-white px-4 py-3 dark:border-foreground/10 dark:bg-foreground/5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{log.exerciseName}</span>
                    <Badge variant="outline">{log.category}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-foreground/50">
                    <span>{log.sets} × {log.reps}</span>
                    <span>{new Date(log.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!currentTemplate && (
        <Card className="mt-6 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="mb-4 h-10 w-10 text-foreground/20" />
            <p className="mb-2 text-lg font-medium">No regimen yet</p>
            <p className="mb-4 text-sm text-foreground/50">
              Select a training template to get started with your workout journey.
            </p>
            <Link href="/templates">
              <Button>Choose Template <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
