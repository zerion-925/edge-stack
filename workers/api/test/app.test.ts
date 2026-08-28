import { describe, expect, it } from "vitest";
import app from "../src/app";

const env: Env = { APP_ENV: "development" };
describe("items API", () => {
  it("searches items", async () => {
    const response = await app.request(
      "https://example.test/items?q=hono",
      undefined,
      env
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      items: [{ name: "Hono RPC" }],
    });
  });
  it("returns a typed expected duplicate error", async () => {
    const response = await app.request(
      "https://example.test/items",
      {
        body: JSON.stringify({ name: "Hono RPC" }),
        headers: { "content-type": "application/json" },
        method: "POST",
      },
      env
    );
    expect(response.status).toBe(409);
    expect(await response.json()).toMatchObject({ code: "DUPLICATE_ITEM" });
  });
});
