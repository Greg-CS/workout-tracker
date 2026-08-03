import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const logCheckin = mutation({
  args: {
    userId: v.id("users"),
    energy: v.number(),
    soreness: v.number(),
    sleep: v.number(),
    prescription: v.string(),
    score: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const startOfDay = new Date(now).setHours(0, 0, 0, 0);

    const existing = await ctx.db
      .query("readinessCheckins")
      .withIndex("by_user_date", (q) =>
        q.eq("userId", args.userId).gte("date", startOfDay),
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        energy: args.energy,
        soreness: args.soreness,
        sleep: args.sleep,
        prescription: args.prescription,
        score: args.score,
        date: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("readinessCheckins", {
      userId: args.userId,
      date: now,
      energy: args.energy,
      soreness: args.soreness,
      sleep: args.sleep,
      prescription: args.prescription,
      score: args.score,
    });
  },
});

export const getLatestCheckin = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("readinessCheckins")
      .withIndex("by_user_date", (q) => q.eq("userId", args.userId))
      .order("desc")
      .first();
  },
});

export const getCheckinHistory = query({
  args: { userId: v.id("users"), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 7;
    return await ctx.db
      .query("readinessCheckins")
      .withIndex("by_user_date", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(limit);
  },
});
