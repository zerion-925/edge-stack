import { z } from "zod";

export const itemSchema = z.object({
  createdAt: z.iso.datetime(),
  id: z.string().min(1),
  name: z.string().min(2).max(80),
});
export const itemSearchSchema = z.object({
  q: z.string().trim().max(80).catch(""),
});
export const createItemSchema = z.object({
  name: z.string().trim().min(2).max(80),
});
export const appErrorSchema = z.discriminatedUnion("code", [
  z.object({
    code: z.literal("INVALID_QUERY"),
    message: z.string(),
  }),
  z.object({
    code: z.literal("INVALID_ITEM"),
    message: z.string(),
  }),
  z.object({
    code: z.literal("DUPLICATE_ITEM"),
    message: z.string(),
  }),
]);
export type Item = z.infer<typeof itemSchema>;
export type ItemSearch = z.infer<typeof itemSearchSchema>;
export type CreateItem = z.infer<typeof createItemSchema>;
export type AppError = z.infer<typeof appErrorSchema>;
