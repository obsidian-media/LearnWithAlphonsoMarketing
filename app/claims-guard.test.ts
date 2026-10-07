// app/claims-guard.test.ts
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";

/**
 * Pre-launch truth guard. The iOS app is going to the App Store, not
 * TestFlight, and Alphonso Pro is a real subscription. A
 * page that still pushes a beta or calls Pro "coming soon" contradicts the App
 * Store listing a reviewer may open. Scans every shipped source file, not one
 * page, because the same claims lived in Hero, FAQ, About, compare pages and
 * llms.txt.
 */
const ROOT = process.cwd();
const SCAN = ["app", "components", "public/llms.txt"];
const EXT = /\.(tsx?|mdx?|txt)$/;

function files(rel: string): string[] {
  const abs = path.join(ROOT, rel);
  if (statSync(abs).isFile()) return [rel];
  return readdirSync(abs).flatMap((name) => {
    const child = path.join(rel, name);
    if (statSync(path.join(ROOT, child)).isDirectory()) return files(child);
    return EXT.test(name) && !/\.test\.tsx?$/.test(name) ? [child] : [];
  });
}

const SOURCES = SCAN.flatMap(files).map((f) => ({ file: f, text: readFileSync(path.join(ROOT, f), "utf8") }));

const BANNED: { label: string; re: RegExp }[] = [
  { label: "TestFlight link", re: /testflight\.apple\.com/i },
  { label: "TestFlight beta wording", re: /TestFlight/i },
  { label: "Pro not purchasable", re: /(not|isn['’]t|isn&apos;t) purchasable/i },
  { label: "Pro tier coming", re: /Pro tier coming/i },
  { label: "Hector coming soon", re: /Hector[^.]{0,120}coming soon|coming soon[^.]{0,120}Hector/i },
  { label: "old product name", re: /Hector Pro/ },
];

describe("pre-launch claims guard", () => {
  it("scans a non-trivial number of files", () => {
    expect(SOURCES.length).toBeGreaterThan(20);
  });

  it.each(BANNED)("no shipped file contains: $label", ({ re }) => {
    const hits = SOURCES.filter(({ text }) => re.test(text)).map(({ file }) => file);
    expect(hits).toEqual([]);
  });
});
