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
    const categoryByExercise: Record<string, string> = {};

    for (const log of logs) {
      if (!byExercise[log.exerciseName]) byExercise[log.exerciseName] = [];
      categoryByExercise[log.exerciseName] = log.category;
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
        category: categoryByExercise[exercise],
        isTimed: categoryByExercise[exercise] === "mobility" || categoryByExercise[exercise] === "flow",
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
      { bestSet: number; totalReps: number; lastDate: number; category: string; bestLoad: string }
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
          category: log.category,
          bestLoad: log.load,
        };
      } else {
        const newBest = maxSet > existing.bestSet;
        prs[log.exerciseName] = {
          bestSet: Math.max(existing.bestSet, maxSet),
          totalReps: Math.max(existing.totalReps, log.totalReps),
          lastDate: Math.max(existing.lastDate, log.date),
          category: log.category,
          bestLoad: newBest ? log.load : existing.bestLoad,
        };
      }
    }

    return Object.entries(prs)
      .map(([exercise, data]) => ({
        exercise,
        ...data,
        isTimed: data.category === "mobility" || data.category === "flow",
      }))
      .sort((a, b) => b.bestSet - a.bestSet);
  },
});

export const getWeeklyLogs = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const monday = new Date(now);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(monday.getDate() - diffToMonday);
    const cutoff = monday.getTime();

    const logs = await ctx.db
      .query("workoutLogs")
      .withIndex("by_user_date", (q) =>
        q.eq("userId", args.userId).gte("date", cutoff),
      )
      .collect();

    return logs;
  },
});

export const getLeaderboard = query({
  args: {
    period: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const period = args.period ?? "all";
    const now = new Date();
    let cutoff = 0;
    if (period === "week") {
      const dayOfWeek = now.getDay();
      const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const monday = new Date(now);
      monday.setHours(0, 0, 0, 0);
      monday.setDate(monday.getDate() - diffToMonday);
      cutoff = monday.getTime();
    } else if (period === "month") {
      const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
      cutoff = firstOfMonth.getTime();
    }

    const allUsers = await ctx.db.query("users").collect();

    const byClerkId = new Map<string, typeof allUsers>();
    for (const u of allUsers) {
      const existing = byClerkId.get(u.clerkId);
      if (!existing) {
        byClerkId.set(u.clerkId, [u]);
      } else {
        existing.push(u);
      }
    }

    const stats: {
      userId: string;
      userName: string;
      templateKey: string;
      totalLogs: number;
      totalReps: number;
      bestSet: number;
      avgRepsPerWorkout: number;
      lastLogDate: number;
      exercises: { name: string; category: string; totalReps: number; totalSets: number; bestSet: number; sessions: number }[];
    }[] = [];

    for (const [, userRecords] of byClerkId) {
      const primary = userRecords[0];
      let logs = [];
      for (const u of userRecords) {
        const userLogs = await ctx.db
          .query("workoutLogs")
          .withIndex("by_user", (q) => q.eq("userId", u._id))
          .collect();
        logs.push(...userLogs);
      }

      if (period !== "all") {
        logs = logs.filter((l) => l.date >= cutoff);
      }

      if (logs.length === 0) continue;

      let totalReps = 0;
      let bestSet = 0;
      let lastLogDate = 0;
      const workoutDays = new Set<string>();
      const exerciseMap: Record<string, { category: string; totalReps: number; totalSets: number; bestSet: number; sessions: number }> = {};

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
          exerciseMap[log.exerciseName] = { category: log.category, totalReps: 0, totalSets: 0, bestSet: 0, sessions: 0 };
        }
        exerciseMap[log.exerciseName].totalReps += log.totalReps;
        exerciseMap[log.exerciseName].totalSets += log.sets;
        exerciseMap[log.exerciseName].bestSet = Math.max(exerciseMap[log.exerciseName].bestSet, logBestSet);
        exerciseMap[log.exerciseName].sessions += 1;
      }

      const numWorkouts = workoutDays.size;
      const avgRepsPerWorkout = numWorkouts > 0 ? Math.round(totalReps / numWorkouts) : 0;

      const templateKeys = Array.from(new Set(logs.map((l) => l.templateKey))).filter((k) => k);
      const displayTemplateKey = templateKeys.length > 1
        ? templateKeys.slice().sort().join("+")
        : templateKeys[0] ?? primary.selectedTemplate ?? "unknown";

      const exercises = Object.entries(exerciseMap)
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.totalReps - a.totalReps);

      stats.push({
        userId: primary._id,
        userName: primary.name,
        templateKey: displayTemplateKey,
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

export const deleteUserWorkouts = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const logs = await ctx.db
      .query("workoutLogs")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    for (const log of logs) {
      await ctx.db.delete(log._id);
    }

    return { deletedCount: logs.length };
  },
});

export const getUserWorkoutHistory = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("workoutLogs")
      .withIndex("by_user_date", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});
