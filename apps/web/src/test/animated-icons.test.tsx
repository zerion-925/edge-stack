import { SparklesIcon } from "@edge-stack/ui/components/sparkles-icon";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AnimatedIconDemo } from "../components/animated-icon-demo";

describe("AnimateIcons accessibility", () => {
  it("hides decorative icons and their SVGs from assistive technology", () => {
    const { container } = render(<SparklesIcon isAnimated={false} />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("supports meaningful icons with an accessible name", () => {
    render(<SparklesIcon aria-label="New features" isAnimated={false} />);
    expect(screen.getByRole("img", { name: "New features" })).toBeVisible();
  });

  it("provides a native keyboard-operable demo button with a decorative icon", () => {
    render(<AnimatedIconDemo />);
    const button = screen.getByRole("button", { name: "Preview animation" });
    expect(button).toHaveAttribute("type", "button");
    expect(button.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
