import { test, expect } from "@playwright/test";

/**
 * axe-core cannot judge text on a CSS gradient (it reports "needs review", not a violation), so the
 * white-on-coral-to-amber "Start learning free" button shipped at about 2.4:1 against the 4.5:1 AA limit.
 * This reads the REAL computed styles in a browser: for every element that shows text or an icon on a
 * gradient background, it measures the text colour against EVERY gradient stop and fails on the worst.
 * Large text (24px, or 18.66px bold) and icons need 3:1; everything else needs 4.5:1.
 */
const PAGES = [
  "/",
  "/features",
  "/pricing",
  "/download",
  "/about",
  "/placement-test",
  "/compare/duolingo-alternative",
];

type Finding = { page: string; text: string; ratio: number; need: number; color: string; stop: string };

for (const path of PAGES) {
  test(`${path} text and icons on gradients meet WCAG contrast`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    // Entrance animations start text at opacity 0; wait until they settle so colours are final.
    await page.waitForTimeout(1500);

    const findings: Finding[] = await page.evaluate((pagePath) => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
      // Any CSS colour syntax Chrome understands (hex, rgb, oklab, color(), ...) -> sRGB bytes.
      const toRgb = (css: string): [number, number, number] | null => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = "#000";
        ctx.fillStyle = css;
        ctx.fillRect(0, 0, 1, 1);
        const d = ctx.getImageData(0, 0, 1, 1).data;
        return d[3] === 0 ? null : [d[0]!, d[1]!, d[2]!];
      };
      const lum = ([r, g, b]: [number, number, number]) => {
        const f = (v: number) => {
          const s = v / 255;
          return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
      };
      const ratio = (a: [number, number, number], b: [number, number, number]) => {
        const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
        return (hi! + 0.05) / (lo! + 0.05);
      };
      const stopRe = /(?:rgba?|hsla?|oklab|oklch|lab|lch|color)\([^)]*\)|#[0-9a-fA-F]{3,8}/g;

      /** Gradient stops behind this element: its own background, or the nearest ancestor with one. */
      const gradientStops = (el: Element): string[] | null => {
        for (let node: Element | null = el; node; node = node.parentElement) {
          const bg = getComputedStyle(node).backgroundImage;
          if (bg && bg.includes("gradient")) return bg.match(stopRe) ?? [];
          const solid = getComputedStyle(node).backgroundColor;
          if (solid && solid !== "rgba(0, 0, 0, 0)" && solid !== "transparent") return null; // solid colour wins
        }
        return null;
      };
      const visible = (el: Element) => {
        for (let n: Element | null = el; n; n = n.parentElement) {
          const cs = getComputedStyle(n);
          if (cs.display === "none" || cs.visibility === "hidden" || Number(cs.opacity) < 0.05) return false;
        }
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      };

      const out: {
        page: string; text: string; ratio: number; need: number; color: string; stop: string;
      }[] = [];
      const candidates = Array.from(document.querySelectorAll("body *")).filter((el) => {
        if (el.tagName === "SCRIPT" || el.tagName === "STYLE") return false;
        const ownText = Array.from(el.childNodes).some(
          (n) => n.nodeType === Node.TEXT_NODE && (n.textContent ?? "").trim().length > 0,
        );
        return ownText || el.tagName.toLowerCase() === "svg";
      });
      for (const el of candidates) {
        if (!visible(el)) continue;
        const stops = gradientStops(el);
        if (!stops || stops.length === 0) continue;
        const cs = getComputedStyle(el);
        const fg = toRgb(cs.color);
        if (!fg) continue;
        const isIcon = el.tagName.toLowerCase() === "svg";
        const px = parseFloat(cs.fontSize);
        const bold = Number(cs.fontWeight) >= 700;
        const large = px >= 24 || (px >= 18.66 && bold);
        const need = isIcon || large ? 3 : 4.5;
        for (const stop of stops) {
          const bgc = toRgb(stop);
          if (!bgc) continue;
          const r = ratio(fg, bgc);
          if (r < need) {
            out.push({
              page: pagePath,
              text: (el.textContent ?? "").trim().slice(0, 40) || `<${el.tagName.toLowerCase()} icon>`,
              ratio: Math.round(r * 100) / 100,
              need,
              color: cs.color,
              stop,
            });
            break;
          }
        }
      }
      return out;
    }, path);

    expect(findings, JSON.stringify(findings, null, 1)).toEqual([]);
  });
}
