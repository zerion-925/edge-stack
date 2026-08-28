import { describe, expect, it } from "vitest";
import { appErrorSchema, createItemSchema } from "./index";

describe("item contracts", () => {
  it("trims and validates names", () =>
    expect(createItemSchema.parse({ name: "  Oak  " }).name).toBe("Oak"));
  it("rejects unknown application error codes", () => {
    expect(
      appErrorSchema.safeParse({ code: "UNKNOWN", message: "Unknown error" })
        .success
    ).toBe(false);
  });
});
