import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";

/**
 * White text on the coral-to-amber gradient measured 2.8:1 at the coral end and about 1.8:1 at the amber end
 * (WCAG AA needs 4.5:1 for button text) and shipped, because axe-core cannot judge gradients. This is the
 * fast static half of the guard (runs in `npm test`); e2e/contrast.spec.ts is the browser half that measures
 * the real computed gradient stops behind every piece of text and icon.
 */
const ROOT = process.cwd();

function tsxFiles(rel: string): string[] {
  const abs = path.join(ROOT, rel);
  return readdirSync(abs).flatMap((name) => {
    const child = path.join(rel, name);
    if (statSync(path.join(ROOT, child)).isDirectory()) return tsxFiles(child);
    return /\.tsx$/.test(name) && !/\.test\.tsx$/.test(name) ? [child] : [];
  });
}

function token(name: string): string {
  const css = readFileSync(path.join(ROOT, "app/globals.css"), "utf8");
  const m = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`token --color-${name} not found in app/globals.css`);
  return m[1]!;
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const f = (v: number) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * f(r!) + 0.7152 * f(g!) + 0.0722 * f(b!);
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi! + 0.05) / (lo! + 0.05);
}

describe("contrast on the brand gradients", () => {
  it("keeps ink on coral and on amber at 4.5:1 or better, and shows white would not", () => {
    for (const bg of ["coral", "amber"]) {
      expect(contrast(token("ink"), token(bg))).toBeGreaterThanOrEqual(4.5);
    }
    expect(contrast("#ffffff", token("coral"))).toBeLessThan(4.5);
    expect(contrast("#ffffff", token("amber"))).toBeLessThan(4.5);
  });

  it("no class string puts text-white on a coral or amber gradient stop", () => {
    const offenders: string[] = [];
    for (const file of [...tsxFiles("app"), ...tsxFiles("components")]) {
      const text = readFileSync(path.join(ROOT, file), "utf8");
      for (const m of text.matchAll(/[`"']([^`"'\n]*)[`"']/g)) {
        const cls = m[1]!;
        const solidStop = /\b(?:from|via|to)-(?:coral|amber)(?![\w/-])/.test(cls);
        if (/\bbg-gradient-to-/.test(cls) && solidStop && /\btext-white\b/.test(cls)) {
          offenders.push(`${file}: ${cls.slice(0, 90)}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  it("the scan reads a meaningful number of component files", () => {
    expect(tsxFiles("components").length).toBeGreaterThan(15);
  });
});
