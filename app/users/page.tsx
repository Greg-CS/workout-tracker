"use client";

import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUserData } from "@/lib/useUserData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { Loader2, Users, UserPlus, UserCheck } from "lucide-react";

export default function UsersPage() {
  const { userData } = useUserData();
  const users = useQuery(api.users.listUsers);
  const following = useQuery(
    api.users.getFollowing,
    userData?._id ? { followerId: userData._id } : "skip",
  );
  const follow = useMutation(api.users.followUser);
  const unfollow = useMutation(api.users.unfollowUser);

  if (users === undefined || following === undefined) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-foreground/30" />
      </div>
    );
  }

  const followingSet = new Set<string>(following);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center gap-3">
        <Users className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {users.map((u) => {
          const isMe = u._id === userData?._id;
          const isFollowing = followingSet.has(u._id);

          return (
            <Card key={u._id}>
              <CardHeader>
                <CardTitle>{u.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-2">
                <Link href={`/users/${u._id}`} className="flex-1">
                  <Button size="sm" variant="outline" className="w-full">
                    View History
                  </Button>
                </Link>
                {!isMe && (
                  <Button
                    size="sm"
                    variant={isFollowing ? "secondary" : "default"}
                    onClick={() =>
                      isFollowing
                        ? unfollow({ followerId: userData!._id, followingId: u._id })
                        : follow({ followerId: userData!._id, followingId: u._id })
                    }
                    disabled={!userData}
                  >
                    {isFollowing ? (
                      <UserCheck className="h-4 w-4" />
                    ) : (
                      <UserPlus className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
