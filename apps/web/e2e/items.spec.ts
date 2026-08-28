import { expect, test } from "@playwright/test";

const honoQuery = /q=Hono/;

test("search URL and create form work", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Searchable items" })
  ).toBeVisible();
  await page.getByRole("searchbox").fill("Hono");
  await expect(page).toHaveURL(honoQuery);
  await expect(page.getByText("Hono RPC")).toBeVisible();
  await page.getByRole("searchbox").fill("");
  await page.getByLabel("Name").fill("Durable Objects");
  await page.getByRole("button", { name: "Add item" }).click();
  await expect(page.getByText("Durable Objects")).toBeVisible();
});

test("PWA shell works offline without caching API responses", async ({
  context,
  page,
}) => {
  const apiResponse = await page.request.get("/api/items");
  expect(apiResponse.headers()["cache-control"]).toBe("no-store");

  await page.goto("/");
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await expect
    .poll(() =>
      page.evaluate(() => navigator.serviceWorker.controller !== null)
    )
    .toBe(true);

  const cachedPaths = await page.evaluate(async () => {
    const cacheNames = await caches.keys();
    const cachedRequests = await Promise.all(
      cacheNames.map(async (cacheName) => {
        const cache = await caches.open(cacheName);
        return cache.keys();
      })
    );
    return cachedRequests
      .flat()
      .map((request) => new URL(request.url).pathname);
  });
  expect(cachedPaths.some((path) => path.startsWith("/api/"))).toBe(false);

  await context.setOffline(true);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Searchable items" })
  ).toBeVisible();
  await page.evaluate(() => window.dispatchEvent(new Event("offline")));
  await expect(page.getByText("You are offline")).toBeVisible();
});
