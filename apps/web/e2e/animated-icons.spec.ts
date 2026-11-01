import { expect, test } from "@playwright/test";

test("AnimateIcons plays on keyboard focus and pointer hover", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const button = page.getByRole("button", { name: "Preview animation" });
  const shape = button.locator("svg > path");
  await expect(shape).toHaveAttribute("d");
  await button.focus();
  await expect
    .poll(() =>
      shape.evaluate((element) => getComputedStyle(element).transform)
    )
    .not.toBe("none");
  await button.blur();
  await expect(shape).toHaveCSS("transform", "none");
  await button.hover();
  await expect
    .poll(() =>
      shape.evaluate((element) => getComputedStyle(element).transform)
    )
    .not.toBe("none");
  await expect(button.locator("svg")).toHaveAttribute("aria-hidden", "true");
});

test("AnimateIcons stays still for reduced-motion users", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const button = page.getByRole("button", { name: "Preview animation" });
  const shape = button.locator("svg > path");
  await button.focus();
  await button.hover();
  await button.click();
  await expect(shape).toHaveCSS("transform", "none");
  await expect(button).toHaveAccessibleName("Preview animation");
});
