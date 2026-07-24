"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Loader2, History, Trophy } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function HistoryPage() {
  const { user, isLoaded: userLoaded } = useUser();
  const userData = useQuery(api.users.getUser, {
    clerkId: user?.id ?? "",
  });
  const userId = userData?._id;
  const logs = useQuery(
    api.workoutLogs.getLogs,
    userId ? { userId } : "skip",
  );
  const prs = useQuery(
    api.workoutLogs.getPRs,
    userId ? { userId } : "skip",
  );

  const isLoading = !userLoaded || userData === undefined || (userId && logs === undefined) || (userId && prs === undefined);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (!userData?.selectedTemplate) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <History className="mb-4 h-10 w-10 text-zinc-300 dark:text-zinc-700" />
            <p className="mb-2 text-lg font-medium">No history yet</p>
            <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
              Select a training template and start logging workouts to see your history.
            </p>
            <Link href="/templates">
              <Button>Choose Template</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const groupedLogs = (logs ?? []).reduce<Record<string, NonNullable<typeof logs>>>((acc, log) => {
    const date = new Date(log.date).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(log);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Workout History</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Track your progress and personal records over time.
        </p>
      </div>

      {prs && prs.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <CardTitle>Personal Records</CardTitle>
            </div>
            <CardDescription>Your best total reps per exercise</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {prs.map((pr) => (
                <div
                  key={pr.exercise}
                  className="flex items-center justify-between rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-800"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{pr.exercise}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-emerald-500">{pr.totalReps}</span>
                    <span className="ml-1 text-xs text-zinc-500 dark:text-zinc-400">total reps</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {Object.keys(groupedLogs).length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <History className="mb-4 h-10 w-10 text-zinc-300 dark:text-zinc-700" />
            <p className="mb-2 text-lg font-medium">No workouts logged yet</p>
            <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
              Start logging your workouts to see them here.
            </p>
            <Link href="/log">
              <Button>Log a Workout</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedLogs)
            .sort((a, b) => b[0].localeCompare(a[0]))
            .map(([date, dateLogs]) => (
              <Card key={date}>
                <CardHeader>
                  <CardTitle className="text-base">{date}</CardTitle>
                  <CardDescription>{dateLogs?.length ?? 0} exercises logged</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {dateLogs?.map((log) => (
                      <div
                        key={log._id}
                        className="flex items-center justify-between rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-800"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">{log.exerciseName}</span>
                          <Badge variant="secondary">{log.category}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                          <span>{log.sets} sets</span>
                          <span>{log.reps}</span>
                          <span className="font-medium text-emerald-500">{log.totalReps} total</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
