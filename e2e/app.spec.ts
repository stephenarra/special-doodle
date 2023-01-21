import { test, expect } from "@playwright/test";

test("has hello world", async ({ page }) => {
  await page.goto("/");

  const locator = page.locator("h1");
  await expect(locator).toContainText("Hello world!");
});
