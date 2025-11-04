import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createOrder = mutation({
  args: {
    userId: v.string(),
    customerName: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    city: v.string(),
    country: v.string(),
    zipCode: v.string(),
    items: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
      })
    ),
    subtotal: v.number(),
    shipping: v.number(),
    tax: v.number(),
    total: v.number(),
  },
  handler: async (ctx: any, args: any) => {
    const orderId = await ctx.db.insert("orders", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
    });

    return orderId;
  },
});