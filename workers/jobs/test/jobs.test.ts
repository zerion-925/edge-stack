import {
  createExecutionContext,
  createScheduledController,
  waitOnExecutionContext,
} from "cloudflare:test";
import { describe, expect, it } from "vitest";
import worker from "../src";

describe("scheduled jobs", () => {
  it("registers its background promise", async () => {
    const ctx = createExecutionContext();
    worker.scheduled(
      createScheduledController(),
      { APP_ENV: "development" },
      ctx
    );
    await expect(waitOnExecutionContext(ctx)).resolves.toBeUndefined();
  });
});
