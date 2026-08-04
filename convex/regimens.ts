import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getRegimen = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("regimens")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
  },
});

export const createRegimen = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("regimens")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    const now = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, {
        templateKey: args.templateKey,
        templateKeys: args.templateKeys,
        days: args.days,
        updatedAt: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("regimens", {
      userId: args.userId,
      templateKey: args.templateKey,
      templateKeys: args.templateKeys,
      days: args.days,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const deleteRegimen = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const regimen = await ctx.db
      .query("regimens")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (regimen) {
      await ctx.db.delete(regimen._id);
    }

    return null;
  },
});
