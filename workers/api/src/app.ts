import {
  type AppError,
  createItemSchema,
  type Item,
  itemSearchSchema,
} from "@edge-stack/contracts";
import { Hono } from "hono";
import { err, ok, type Result } from "neverthrow";
import { getEnv } from "./env";

type Bindings = Env;
type ItemError = Extract<AppError, { code: "DUPLICATE_ITEM" }>;
const seed: Item[] = [
  {
    createdAt: "2026-08-28T08:00:00.000Z",
    id: "1",
    name: "Cloudflare Workers",
  },
  { createdAt: "2026-08-28T08:05:00.000Z", id: "2", name: "TanStack Router" },
  { createdAt: "2026-08-28T08:10:00.000Z", id: "3", name: "Hono RPC" },
];
const items = [...seed];

const createItem = (name: string): Result<Item, ItemError> => {
  if (
    items.some(
      (item) => item.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    )
  ) {
    return err({
      code: "DUPLICATE_ITEM",
      message: "An item with this name already exists.",
    });
  }
  const createdItem = {
    createdAt: new Date().toISOString(),
    id: crypto.randomUUID(),
    name,
  };
  items.unshift(createdItem);
  return ok(createdItem);
};

const app = new Hono<{ Bindings: Bindings }>()
  .get("/items", (c) => {
    getEnv(c.env);
    const parsed = itemSearchSchema.safeParse(c.req.query());
    if (!parsed.success) {
      const error = {
        code: "INVALID_QUERY",
        message: "Search query is invalid.",
      } satisfies AppError;
      return c.json(error, 400);
    }
    const q = parsed.data.q.toLocaleLowerCase();
    return c.json(
      {
        items: items.filter((item) =>
          item.name.toLocaleLowerCase().includes(q)
        ),
      },
      200
    );
  })
  .post("/items", async (c) => {
    getEnv(c.env);
    const parsed = createItemSchema.safeParse(
      await c.req.json().catch(() => null)
    );
    if (!parsed.success) {
      const error = {
        code: "INVALID_ITEM",
        message: "Name must contain 2 to 80 characters.",
      } satisfies AppError;
      return c.json(error, 422);
    }
    const result = createItem(parsed.data.name);
    if (result.isErr()) {
      return c.json(result.error, 409);
    }
    return c.json({ item: result.value }, 201);
  });

export type AppType = typeof app;
export { createItem, seed };
export default app;
