import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const logWorkout = mutation({
  args: {
    userId: v.id("users"),
    templateKey: v.string(),
    dayLabel: v.string(),
    exerciseName: v.string(),
    category: v.string(),
    reps: v.string(),
    sets: v.number(),
    load: v.string(),
    totalReps: v.number(),
    notes: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("workoutLogs", {
      userId: args.userId,
      date: Date.now(),
      templateKey: args.templateKey,
      dayLabel: args.dayLabel,
      exerciseName: args.exerciseName,
      category: args.category,
      reps: args.reps,
      sets: args.sets,
      load: args.load,
      totalReps: args.totalReps,
      notes: args.notes,
    });
  },
});

export const getLogs = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("workoutLogs")
      .withIndex("by_user_date", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(100);
  },
});

export const getRecentLogs = query({
  args: { userId: v.id("users"), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;
    return await ctx.db
      .query("workoutLogs")
      .withIndex("by_user_date", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(limit);
  },
});

export const getPRs = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const logs = await ctx.db
      .query("workoutLogs")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const prs: Record<
      string,
      { bestSet: number; totalReps: number; lastDate: number }
    > = {};

    for (const log of logs) {
      const existing = prs[log.exerciseName];
      const setValues = log.reps
        .split(",")
        .map((r) => parseInt(r.replace("s", "").trim(), 10))
        .filter((n) => !isNaN(n));
      const maxSet = setValues.length > 0 ? Math.max(...setValues) : 0;

      if (!existing) {
        prs[log.exerciseName] = {
          bestSet: maxSet,
          totalReps: log.totalReps,
          lastDate: log.date,
        };
      } else {
        prs[log.exerciseName] = {
          bestSet: Math.max(existing.bestSet, maxSet),
          totalReps: Math.max(existing.totalReps, log.totalReps),
          lastDate: Math.max(existing.lastDate, log.date),
        };
      }
    }

    return Object.entries(prs)
      .map(([exercise, data]) => ({ exercise, ...data }))
      .sort((a, b) => b.bestSet - a.bestSet);
  },
});
