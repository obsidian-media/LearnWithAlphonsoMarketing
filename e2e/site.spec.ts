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
    await expect(cta).toHaveAttribute("href", "https://learn.alphonsoecosystem.app/auth");
  }
});
