import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getOrCreateUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existing) {
      let needsUpdate = false;
      const updates: Partial<{ email: string; name: string }> = {};

      if (existing.email !== args.email) {
        updates.email = args.email;
        needsUpdate = true;
      }
      if (existing.name !== args.name) {
        updates.name = args.name;
        needsUpdate = true;
      }

      if (needsUpdate) {
        await ctx.db.patch(existing._id, updates);
      }

      return existing._id;
    }

    const userId = await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      name: args.name,
      createdAt: Date.now(),
    });

    return userId;
  },
});

export const getUser = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

export const updateEquipmentProfile = mutation({
  args: {
    clerkId: v.string(),
    equipment: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) return null;

    await ctx.db.patch(user._id, { equipmentProfile: args.equipment });
    return user._id;
  },
});

export const updateTemplate = mutation({
  args: {
    clerkId: v.string(),
    templateKey: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) return null;

    await ctx.db.patch(user._id, { selectedTemplate: args.templateKey });
    return user._id;
  },
});
