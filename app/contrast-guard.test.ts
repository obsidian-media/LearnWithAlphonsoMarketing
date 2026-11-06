import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";

/**
 * Contrast of every text-on-background pair the site uses, read from the app's generated tokens
 * (app/ds-tokens.generated.css) in light AND dark mode. A token change in the app that breaks one of these fails
 * here the day it is synced. e2e/contrast.spec.ts is the browser half (real gradients, real computed colours).
 *
 * Also: no colour value is typed anywhere outside the generated file. Components and app/site.css use
 * var(--c-*) tokens only, so the site cannot drift from the app's palette.
 */
const ROOT = process.cwd();
const CSS = readFileSync(path.join(ROOT, "app/ds-tokens.generated.css"), "utf8");

function block(src: string, start: number): string {
  const open = src.indexOf("{", start);
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}" && --depth === 0) return src.slice(open + 1, i);
  }
  throw new Error("unbalanced CSS");
}
function vars(body: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of body.matchAll(/--c-([\w-]+):\s*(#[0-9a-fA-F]{6})/g)) out[m[1]!] = m[2]!;
  return out;
}
// Light: every top-level :root block. Dark: the :root inside the first prefers-color-scheme block.
const light: Record<string, string> = {};
for (const m of CSS.matchAll(/^:root\s*\{/gm)) Object.assign(light, vars(block(CSS, m.index!)));
const darkAt = CSS.indexOf("@media (prefers-color-scheme: dark)");
const dark = { ...light, ...vars(block(CSS, darkAt)) };

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const f = (v: number) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * f(r!) + 0.7152 * f(g!) + 0.0722 * f(b!);
}
function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi! + 0.05) / (lo! + 0.05);
}

/** [text, background, minimum]. Every pair a component in app/site.css draws. */
const PAIRS: [string, string, number][] = [
  ["ink", "surface", 4.5],
  ["ink-soft", "surface", 4.5],
  ["brand", "surface", 4.5],
  ["brand", "card", 4.5],
  ["brand", "sunk", 4.5],
  ["ink-soft", "sunk", 4.5],
  ["ink-soft", "card", 4.5],
  ["action-text", "surface", 4.5],
  ["action-text", "action-tint", 4.5],
  ["action-text", "card", 4.5],
  ["brand", "action-tint", 4.5],
  ["ink-soft", "action-tint", 4.5],
  ["on-action", "action", 4.5],
  ["on-action", "action-hi", 4.5],
  ["brand", "choice-tint", 4.5],
  ["choice", "choice-tint", 3],
  ["right-ink", "right-tint", 4.5],
  ["wrong-ink", "wrong-tint", 4.5],
  ["on-hero", "hero", 4.5],
  ["on-hero-soft", "hero", 4.5],
  ["on-hero-kick", "hero", 4.5],
  ["on-hero", "hero-a", 4.5],
  ["on-hero", "hero-b", 4.5],
  ["on-hero-soft", "hero-b", 4.5],
  ["on-hero-kick", "hero-b", 4.5],
  ["ink", "surface", 4.5],
];

describe("token contrast, light and dark", () => {
  it("reads both modes from the generated tokens", () => {
    expect(Object.keys(light).length).toBeGreaterThan(30);
    expect(darkAt).toBeGreaterThan(0);
    expect(dark.surface).not.toBe(light.surface);
  });

  for (const [mode, palette] of [
    ["light", light],
    ["dark", dark],
  ] as const) {
    it.each(PAIRS)(`${mode}: %s on %s is at least %d:1`, (fg, bg, min) => {
      expect(palette[fg], `--c-${fg}`).toBeDefined();
      expect(palette[bg], `--c-${bg}`).toBeDefined();
      expect(contrast(palette[fg]!, palette[bg]!)).toBeGreaterThanOrEqual(min);
    });
  }
});

function files(rel: string, ext: RegExp): string[] {
  const abs = path.join(ROOT, rel);
  return readdirSync(abs).flatMap((name) => {
    const child = path.join(rel, name);
    if (statSync(path.join(ROOT, child)).isDirectory()) return files(child, ext);
    return ext.test(name) && !/\.test\.tsx?$/.test(name) && !/\.generated\./.test(name)
      ? [child]
      : [];
  });
}

describe("no raw colour values outside the generated tokens", () => {
  const RAW =
    /#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(|\b(?:bg|text|border|from|via|to|ring|fill|stroke)-(?:white|black|red|green|blue|emerald|gray|slate|zinc)(?:-\d{2,3})?\b/;
  const sources = [...files("app", /\.(css|tsx?)$/), ...files("components", /\.tsx?$/)];

  it("scans the stylesheets and components", () => {
    expect(sources.some((f) => f.endsWith("site.css"))).toBe(true);
    expect(sources.length).toBeGreaterThan(20);
  });

  it("finds none", () => {
    const hits = sources.flatMap((f) =>
      readFileSync(path.join(ROOT, f), "utf8")
        .split("\n")
        .map((line, i) => ({ f, i, line }))
        .filter(({ line }) => RAW.test(line.replace(/&#\d+;|&#x[0-9a-f]+;/gi, "")))
        .map(({ f, i, line }) => `${f}:${i + 1}: ${line.trim().slice(0, 100)}`),
    );
    expect(hits).toEqual([]);
  });
});
