import { Button } from "@edge-stack/ui/components/button";
import { render, screen } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

const server = setupServer(
  http.get("/api/items", () => HttpResponse.json({ items: [] }))
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
describe("shared UI", () => {
  it("renders an accessible button", () => {
    render(<Button>Search</Button>);
    expect(screen.getByRole("button", { name: "Search" })).toBeEnabled();
  });
});
