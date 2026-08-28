import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PwaStatus } from "../components/pwa-status";

const updateServiceWorker = vi.fn(async () => undefined);

vi.mock("virtual:pwa-register/react", () => ({
  useRegisterSW: () => ({
    needRefresh: [true, vi.fn()],
    offlineReady: [false, vi.fn()],
    updateServiceWorker,
  }),
}));

describe("PWA status", () => {
  it("asks the user before installing an update", () => {
    render(<PwaStatus />);
    expect(screen.getByText("Update available")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Reload" }));
    expect(updateServiceWorker).toHaveBeenCalledWith(true);
  });
});
