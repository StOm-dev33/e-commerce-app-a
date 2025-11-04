import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    category: v.optional(v.string()),
  },
  handler: async (ctx: any, args: any) => {
    if (args.category) {
      return await ctx.db
        .query("products")
        .filter((q: any) => q.eq(q.field("category"), args.category))
        .collect();
    }
    return await ctx.db.query("products").collect();
  },
});

export const add = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    price: v.number(),
    category: v.string(),
    features: v.array(v.string()),
    images: v.array(v.string()),
    inBox: v.array(
      v.object({
        item: v.string(),
        quantity: v.number(),
      })
    ),
  },
  handler: async (ctx: any, args: any) => {
    return await ctx.db.insert("products", args);
  },
});

export const get = query({
  args: { id: v.string() },
  handler: async (ctx: any, args: any) => {
    return await ctx.db.get(args.id);
  },
});