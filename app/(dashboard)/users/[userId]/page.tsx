"use client";

import { use } from "react";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserData } from "@/lib/useUserData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Loader2, UserCheck, UserPlus, ArrowLeft } from "lucide-react";
import type { Id } from "@/convex/_generated/dataModel";

export default function UserDetailPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params);
  const { userData } = useUserData();
  const profile = useQuery(api.users.getUserPublicProfile, {
    userId: userId as Id<"users">,
  });
  const history = useQuery(api.workoutLogs.getUserWorkoutHistory, {
    userId: userId as Id<"users">,
  });
  const isFollowing = useQuery(
    api.users.isFollowing,
    userData?._id
      ? { followerId: userData._id, followingId: userId as Id<"users"> }
      : "skip",
  );
  const follow = useMutation(api.users.followUser);
  const unfollow = useMutation(api.users.unfollowUser);

  if (profile === undefined || history === undefined) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-foreground/30" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <p>User not found.</p>
      </div>
    );
  }

  const isMe = userData?._id === userId;

  return (
    <div className="mx-auto max-w-4xl p-6">
      <Link
        href="/users"
        className="mb-4 inline-flex items-center gap-1 text-sm text-foreground/50 hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to users
      </Link>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{profile.name}</h1>
          {/* <p className="text-sm text-foreground/50">{profile.email}</p> */}
        </div>
        {!isMe && userData && isFollowing !== undefined && (
          <Button
            size="sm"
            variant={isFollowing ? "secondary" : "default"}
            onClick={() =>
              isFollowing
                ? unfollow({
                    followerId: userData._id,
                    followingId: userId as Id<"users">,
                  })
                : follow({
                    followerId: userData._id,
                    followingId: userId as Id<"users">,
                  })
            }
          >
            {isFollowing ? (
              <>
                <UserCheck className="mr-1 h-4 w-4" /> Following
              </>
            ) : (
              <>
                <UserPlus className="mr-1 h-4 w-4" /> Follow
              </>
            )}
          </Button>
        )}
      </div>

      <h2 className="mb-3 text-lg font-semibold">Workout History</h2>
      {history.length === 0 ? (
        <p className="text-foreground/50">No workouts logged yet.</p>
      ) : (
        <div className="space-y-3">
          {history.map((log) => (
            <Card key={log._id}>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{log.exerciseName}</span>
                  <Badge variant="secondary">{log.category}</Badge>
                </div>
                <p className="mt-1 text-sm text-foreground/50">
                  {log.sets} sets · {log.reps} reps · {log.load} · {log.totalReps} total reps
                </p>
                <p className="text-xs text-foreground/40">
                  {new Date(log.date).toLocaleDateString()} · {log.dayLabel}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
