import { Calendar } from "@edge-stack/ui/components/calendar";
import { FieldLabel } from "@edge-stack/ui/components/field";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

const month = new Date(2026, 0, 1);
const day = new Date(2026, 0, 15);
const locale = { code: "en-GB" };

describe("upgraded shared UI", () => {
  it("preserves calendar day identity, focus and locale when rerendered", () => {
    const { container, rerender } = render(
      <Calendar defaultMonth={month} locale={locale} mode="single" />
    );
    const selector = `[data-day="${day.toLocaleDateString(locale.code)}"]`;
    const button = container.querySelector(selector);
    expect(button).toBeInstanceOf(HTMLButtonElement);
    if (button instanceof HTMLButtonElement) {
      button.focus();
    }

    rerender(
      <Calendar
        className="updated"
        defaultMonth={month}
        locale={locale}
        mode="single"
      />
    );
    expect(container.querySelector(selector)).toBe(button);
    expect(button).toHaveFocus();
  });

  it("forwards field label association and children", () => {
    render(
      <>
        <FieldLabel htmlFor="upgrade-name">Name</FieldLabel>
        <input id="upgrade-name" />
      </>
    );
    expect(screen.getByLabelText("Name")).toHaveAttribute("id", "upgrade-name");
    expect(screen.getByText("Name").tagName).toBe("LABEL");
  });
});
