import { createEnv } from "@t3-oss/env-core";
import { Hono } from "hono";
import { z } from "zod";

const getEnv = (runtimeEnv: Env) =>
  createEnv({
    emptyStringAsUndefined: true,
    runtimeEnv: { APP_ENV: runtimeEnv.APP_ENV },
    server: { APP_ENV: z.enum(["development", "test", "production"]) },
  });

const app = new Hono<{ Bindings: Env }>();
app.all("/api/*", async (c) => {
  getEnv(c.env);
  const url = new URL(c.req.url);
  url.pathname = url.pathname.slice(4) || "/";
  const response = await c.env.API.fetch(new Request(url, c.req.raw));
  const headers = new Headers(response.headers);
  headers.set("cache-control", "no-store");
  return new Response(response.body, {
    headers,
    status: response.status,
    statusText: response.statusText,
  });
});
app.all("*", (c) => c.env.ASSETS.fetch(c.req.raw));
export default app;
