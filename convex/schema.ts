import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    selectedTemplate: v.optional(v.string()),
    equipmentProfile: v.optional(v.array(v.string())),
    createdAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  regimens: defineTable({
    userId: v.id("users"),
    templateKey: v.string(),
    templateKeys: v.optional(v.array(v.string())),
    days: v.array(
      v.object({
        day: v.number(),
        title: v.string(),
        sourceTemplate: v.optional(v.string()),
        exercises: v.array(
          v.object({
            name: v.string(),
            category: v.string(),
            sets: v.number(),
            target: v.string(),
            load: v.string(),
            rest: v.number(),
            notes: v.string(),
            durationSec: v.optional(v.number()),
          }),
        ),
      }),
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  workoutLogs: defineTable({
    userId: v.id("users"),
    date: v.number(),
    templateKey: v.string(),
    dayLabel: v.string(),
    exerciseName: v.string(),
    category: v.string(),
    reps: v.string(),
    sets: v.number(),
    load: v.string(),
    totalReps: v.number(),
    notes: v.string(),
  }).index("by_user", ["userId"]).index("by_user_date", ["userId", "date"]),

  activities: defineTable({
    userId: v.id("users"),
    date: v.number(),
    kind: v.string(),
    minutes: v.number(),
    intensity: v.string(),
    load: v.number(),
  }).index("by_user", ["userId"]).index("by_user_date", ["userId", "date"]),

  readinessCheckins: defineTable({
    userId: v.id("users"),
    date: v.number(),
    energy: v.number(),
    soreness: v.number(),
    sleep: v.number(),
    prescription: v.string(),
    score: v.number(),
  }).index("by_user", ["userId"]).index("by_user_date", ["userId", "date"]),
});
