import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const logActivity = mutation({
  args: {
    userId: v.id("users"),
    kind: v.string(),
    minutes: v.number(),
    intensity: v.string(),
    load: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("activities", {
      userId: args.userId,
      date: Date.now(),
      kind: args.kind,
      minutes: args.minutes,
      intensity: args.intensity,
      load: args.load,
    });
  },
});

export const getRecentActivities = query({
  args: { userId: v.id("users"), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;
    return await ctx.db
      .query("activities")
      .withIndex("by_user_date", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(limit);
  },
});

export const getActivitiesByDateRange = query({
  args: {
    userId: v.id("users"),
    afterDate: v.number(),
  },
  handler: async (ctx, args) => {
    const all = await ctx.db
      .query("activities")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    return all.filter((a) => a.date >= args.afterDate);
  },
});
