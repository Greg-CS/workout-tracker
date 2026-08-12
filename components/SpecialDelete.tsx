"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/atoms/Button";
import type { Id } from "@/convex/_generated/dataModel";

interface SpecialDeleteProps {
  userId: Id<"users">;
}

export function SpecialDelete({ userId }: SpecialDeleteProps) {
  const deleteWorkouts = useMutation(api.workoutLogs.deleteUserWorkouts);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    const confirmed = window.confirm(
      "Delete all workout logs for this user? This cannot be undone."
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      const result = await deleteWorkouts({ userId });
      window.alert(`Deleted ${result.deletedCount} workout log(s).`);
    } catch (err) {
      window.alert("Failed to delete workout logs.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      variant="destructive"
      size="sm"
    >
      {loading ? "Deleting..." : "Delete Workouts"}
    </Button>
  );
}
