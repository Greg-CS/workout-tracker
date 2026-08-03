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

export const batchImportLogs = mutation({
  args: {
    userId: v.id("users"),
    logs: v.array(
      v.object({
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
      }),
    ),
  },
  handler: async (ctx, args) => {
    const inserted: string[] = [];
    for (const log of args.logs) {
      const id = await ctx.db.insert("workoutLogs", {
        userId: args.userId,
        ...log,
      });
      inserted.push(id);
    }
    return { inserted: inserted.length };
  },
});

export const getLogs = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("workoutLogs")
      .withIndex("by_user_date", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const getAllLogs = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("workoutLogs")
      .withIndex("by_user_date", (q) => q.eq("userId", args.userId))
      .order("asc")
      .collect();
  },
});

export const getProgression = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const logs = await ctx.db
      .query("workoutLogs")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const byExercise: Record<string, { date: number; bestSet: number; totalReps: number }[]> = {};

    for (const log of logs) {
      if (!byExercise[log.exerciseName]) byExercise[log.exerciseName] = [];
      const setValues = log.reps
        .split(",")
        .map((r) => parseInt(r.replace("s", "").trim(), 10))
        .filter((n) => !isNaN(n));
      const maxSet = setValues.length > 0 ? Math.max(...setValues) : 0;
      byExercise[log.exerciseName].push({
        date: log.date,
        bestSet: maxSet,
        totalReps: log.totalReps,
      });
    }

    return Object.entries(byExercise)
      .map(([exercise, entries]) => ({
        exercise,
        entries: entries.sort((a, b) => a.date - b.date),
      }))
      .filter((e) => e.entries.length > 1);
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

export const getLeaderboard = query({
  args: {
    period: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const period = args.period ?? "all";
    const now = Date.now();
    let cutoff = 0;
    if (period === "week") {
      cutoff = now - 7 * 24 * 60 * 60 * 1000;
    } else if (period === "month") {
      cutoff = now - 30 * 24 * 60 * 60 * 1000;
    }

    const users = await ctx.db.query("users").collect();
    const stats: {
      userId: string;
      userName: string;
      templateKey: string;
      totalLogs: number;
      totalReps: number;
      bestSet: number;
      avgRepsPerWorkout: number;
      lastLogDate: number;
      exercises: { name: string; totalReps: number; totalSets: number; bestSet: number; sessions: number }[];
    }[] = [];

    for (const u of users) {
      let logs = await ctx.db
        .query("workoutLogs")
        .withIndex("by_user", (q) => q.eq("userId", u._id))
        .collect();

      if (period !== "all") {
        logs = logs.filter((l) => l.date >= cutoff);
      }

      if (logs.length === 0) continue;

      let totalReps = 0;
      let bestSet = 0;
      let lastLogDate = 0;
      const workoutDays = new Set<string>();
      const exerciseMap: Record<string, { totalReps: number; totalSets: number; bestSet: number; sessions: number }> = {};

      for (const log of logs) {
        totalReps += log.totalReps;
        const setValues = log.reps
          .split(",")
          .map((r) => parseInt(r.replace("s", "").trim(), 10))
          .filter((n) => !isNaN(n));
        const logBestSet = setValues.length > 0 ? Math.max(...setValues) : 0;
        if (logBestSet > bestSet) bestSet = logBestSet;
        lastLogDate = Math.max(lastLogDate, log.date);
        workoutDays.add(new Date(log.date).toDateString());

        if (!exerciseMap[log.exerciseName]) {
          exerciseMap[log.exerciseName] = { totalReps: 0, totalSets: 0, bestSet: 0, sessions: 0 };
        }
        exerciseMap[log.exerciseName].totalReps += log.totalReps;
        exerciseMap[log.exerciseName].totalSets += log.sets;
        exerciseMap[log.exerciseName].bestSet = Math.max(exerciseMap[log.exerciseName].bestSet, logBestSet);
        exerciseMap[log.exerciseName].sessions += 1;
      }

      const numWorkouts = workoutDays.size;
      const avgRepsPerWorkout = numWorkouts > 0 ? Math.round(totalReps / numWorkouts) : 0;

      const exercises = Object.entries(exerciseMap)
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.totalReps - a.totalReps);

      stats.push({
        userId: u._id,
        userName: u.name,
        templateKey: u.selectedTemplate ?? "unknown",
        totalLogs: logs.length,
        totalReps,
        bestSet,
        avgRepsPerWorkout,
        lastLogDate,
        exercises,
      });
    }

    return stats.sort((a, b) => b.avgRepsPerWorkout - a.avgRepsPerWorkout);
  },
});
