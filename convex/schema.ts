import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
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
    status: v.string(),
    createdAt: v.number(),
  }),
  products: defineTable({
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
  }),
});