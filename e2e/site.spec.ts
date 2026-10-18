import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = ["/", "/features", "/pricing", "/download", "/about"];

for (const path of PAGES) {
  test(`${path || "/"} has no automatically-detectable accessibility violations`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test(`${path || "/"} loads without console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto(path);
    expect(errors).toEqual([]);
  });
}

test("primary CTA on every page points to the live web app", async ({ page }) => {
  for (const path of PAGES) {
    await page.goto(path);
    const cta = page.getByRole("link", { name: /start learning free/i }).first();
    await expect(cta).toHaveAttribute("href", /^https:\/\/learn\.alphonsoecosystem\.app\/auth\?utm_source=site&/);
  }
});

test("the home page offers the iPhone beta through the approved TestFlight link", async ({ page }) => {
  await page.goto("/");
  const beta = page.getByRole("link", { name: /join the iphone beta/i }).first();
  await expect(beta).toHaveAttribute("href", "https://testflight.apple.com/join/AVAgvB3y");
});

test.describe("phone width", () => {
  test.use({ viewport: { width: 375, height: 812 } });
  for (const path of PAGES) {
    test(`${path} does not scroll sideways`, async ({ page }) => {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});
