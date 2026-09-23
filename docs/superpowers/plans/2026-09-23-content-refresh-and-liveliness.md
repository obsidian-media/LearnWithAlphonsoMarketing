# Content Refresh + Liveliness Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the marketing site's facts, feature coverage, and mascot cast up to date with what actually shipped in `LearnWithAlphonso`'s V4 milestone, and extend the existing Framer Motion system with a few more moments of life — without breaking any of the site's established accessibility rules.

**Architecture:** Straight content/component edits inside the existing Next.js App Router structure. No new pages, no new routing, no new dependencies (`framer-motion` is already installed). Two small new shared primitives (`MascotPortraitCard`, a `CompeteMockup` phone mockup) follow the exact shape of components that already exist (`PhoneFrame`-based mockups, `ContentSection`/`FeatureGrid` wrapper sections like `HowItWorks.tsx`).

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS v4, Framer Motion 12, Vitest + Testing Library, Playwright + axe-core.

**Spec:** `docs/superpowers/specs/2026-09-23-content-refresh-and-liveliness-design.md`

---

## Ground rules carried over from the existing codebase (read before starting)

- **Never animate the opacity of an element that contains real text.** Every existing text-carrying animated element in this codebase uses `y`-only or `scale`-only motion (see the comments in `components/shared/ContentSection.tsx`, `components/shared/FeatureGrid.tsx`, and `components/shared/AnimatedCounter.tsx`). A mid-fade or pre-`whileInView` snapshot reads as a real WCAG contrast failure to axe (`e2e/site.spec.ts` runs `AxeBuilder` on every page with zero violations tolerated). Every new animated component in this plan follows that same rule — do not add `opacity` to any `initial`/`animate`/`whileInView` that wraps text.
- Follow the icon convention in `components/shared/icons.tsx`: `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `strokeWidth={W}` where `W = "2.6"`, `aria-hidden="true"`.
- Run tests from the repo root: `D:\AgentDevWork\repos\LearnWithAlphonsoMarketing`.

---

### Task 1: Fix the stale Spanish lesson count in `StatsBand`

Spanish reached full parity with French on 2026-09-21: 508 lessons, not 125 (verified 2026-09-22 in `LearnWithAlphonso/LESSON_ASSETS.md`). Total lessons across all three courses is 534 + 500 + 508 = **1,542**, not 1,159.

**Files:**
- Modify: `components/home/StatsBand.tsx`
- Modify: `components/home/StatsBand.test.tsx`

- [ ] **Step 1: Update the failing test first**

Edit `components/home/StatsBand.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatsBand } from "./StatsBand";

describe("StatsBand", () => {
  it("shows the real content counts", () => {
    render(<StatsBand />);
    expect(screen.getByText("1,542")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test -- StatsBand.test.tsx`
Expected: FAIL — `1,542` not found (component still renders `1,159`).

- [ ] **Step 3: Fix the component**

Edit `components/home/StatsBand.tsx` lines 1-12 (the comment and `STATS` array):

```tsx
import { AnimatedCounter } from "../shared/AnimatedCounter";

// Per-course stats (534 English / 500 French / 508 Spanish) would need a
// new line here every time a course grows or a new one ships -- rolling up
// to total lessons + language count scales without a rewrite. Spanish
// reached full parity with French (508 lessons) on 2026-09-21, verified in
// LearnWithAlphonso/LESSON_ASSETS.md on 2026-09-22 -- no longer the
// newest/thinnest course, so no asterisk needed here anymore.
const STATS = [
  { value: 1542, unit: "total lessons" },
  { value: 3, unit: "languages" },
  { value: 5, unit: "CEFR levels, A1–C1" },
];
```

- [ ] **Step 4: Run it to confirm it passes**

Run: `npm test -- StatsBand.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/home/StatsBand.tsx components/home/StatsBand.test.tsx
git commit -m "fix: correct total lesson count now that Spanish is at parity (508, not 125)"
```

---

### Task 2: Fix the stale Spanish lesson count on the Features page

**Files:**
- Modify: `app/features/page.tsx:31-33`

- [ ] **Step 1: Update the copy**

In `app/features/page.tsx`, replace the `"Three courses"` entry in the `CURRICULUM` array:

```tsx
  {
    title: "Three courses",
    description:
      "534 English lessons, 500 French lessons, and 508 Spanish lessons — all three now at full A1–C1 depth.",
    icon: <BookIcon className="size-5" />,
  },
```

(This replaces the old `"534 English lessons, 500 French lessons, and a newly-launched 125-lesson Spanish course — growing the same way French did."` line.)

- [ ] **Step 2: Run the existing Features page test to confirm nothing broke**

Run: `npm test -- features/page.test.tsx`
Expected: PASS (that test doesn't assert on this specific string, but confirms the page still renders)

- [ ] **Step 3: Commit**

```bash
git add app/features/page.tsx
git commit -m "fix: correct Spanish lesson count on Features page (508, not 125)"
```

---

### Task 3: Add a `secondary-inverted` variant to `CTAButton`

Needed for Task 5 (a secondary CTA on the royal/dark Download-page section, where the existing `secondary` variant's dark-ink-on-dark-royal styling is illegible).

**Files:**
- Modify: `components/shared/CTAButton.tsx`
- Modify: `components/shared/CTAButton.test.tsx`

- [ ] **Step 1: Write the failing test**

Add to `components/shared/CTAButton.test.tsx`:

```tsx
  it("applies inverted secondary styling for use on dark backgrounds", () => {
    render(
      <CTAButton href="https://testflight.apple.com/join/example" variant="secondary-inverted" external>
        Join the beta
      </CTAButton>,
    );
    const link = screen.getByRole("link", { name: /join the beta/i });
    expect(link.className).toContain("text-white");
    expect(link.className).toContain("border-white/30");
  });
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test -- CTAButton.test.tsx`
Expected: FAIL — TypeScript/runtime error, `"secondary-inverted"` isn't a valid `variant`.

- [ ] **Step 3: Implement the variant**

Edit `components/shared/CTAButton.tsx`:

```tsx
import Link from "next/link";
import type { ReactNode } from "react";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "secondary-inverted";
  external?: boolean;
  className?: string;
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-coral to-amber text-white shadow-sm hover:shadow-md hover:opacity-95"
      : variant === "secondary-inverted"
        ? "border border-white/30 text-white hover:bg-white/10"
        : "border border-ink/15 text-ink hover:bg-ink/5";

  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Link href={href} className={`${base} ${styles} ${className}`} {...externalProps}>
      {children}
    </Link>
  );
}
```

- [ ] **Step 4: Run it to confirm it passes**

Run: `npm test -- CTAButton.test.tsx`
Expected: PASS (all 4 tests in the file)

- [ ] **Step 5: Commit**

```bash
git add components/shared/CTAButton.tsx components/shared/CTAButton.test.tsx
git commit -m "feat: add secondary-inverted CTAButton variant for dark-background sections"
```

---

### Task 4: Hero's iOS badge becomes an honest, clickable TestFlight link

**Files:**
- Modify: `components/home/Hero.tsx`
- Modify: `components/home/Hero.test.tsx`

- [ ] **Step 1: Update the test first**

Replace the test body in `components/home/Hero.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the headline and primary CTA", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/actually stick/i);
    expect(screen.getByRole("link", { name: /start learning free/i })).toHaveAttribute(
      "href",
      "https://learn.alphonsoecosystem.app/auth",
    );
  });

  it("links to the download page with honest TestFlight-beta status, not an App Store badge", () => {
    render(<Hero />);
    const badge = screen.getByRole("link", { name: /testflight beta/i });
    expect(badge).toHaveAttribute("href", "/download");
    expect(screen.queryByRole("link", { name: /app store/i })).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test -- Hero.test.tsx`
Expected: FAIL — no link named `/testflight beta/i` exists yet.

- [ ] **Step 3: Implement**

Edit `components/home/Hero.tsx` — add the `Link` import and replace the `<span>` badge:

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CTAButton } from "../shared/CTAButton";
import { MascotFloat } from "../shared/MascotFloat";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        {/* y-only: keeps headline text always fully opaque, see ContentSection. */}
        <motion.div
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-deep">
            English, French &amp; Spanish, one lesson at a time
          </p>
          <h1 className="mt-3 text-balance font-display text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl">
            Learn a language with lessons that actually stick.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Bite-size lessons, AI conversation practice, and streaks that respect your time — with
            Alphonso the llama cheering you on.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CTAButton href="https://learn.alphonsoecosystem.app/auth" external>
              Start learning free
            </CTAButton>
            <Link
              href="/download"
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-semibold text-ink-soft transition hover:border-coral/40 hover:text-ink"
            >
              🦙 In TestFlight beta on iOS
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto flex w-full max-w-sm items-center justify-center"
        >
          {/* Decorative glow only (no text) -- safe to animate opacity/scale
              freely, unlike text-carrying elements elsewhere on the site. */}
          <motion.div
            aria-hidden="true"
            className="absolute -inset-10 -z-10 rounded-full bg-gradient-to-br from-coral/35 via-amber/25 to-transparent blur-3xl"
            animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute -inset-6 -z-10 rounded-full bg-gradient-to-tl from-royal/15 to-transparent blur-2xl"
            animate={{ scale: [1.08, 1, 1.08] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <MascotFloat
            src="/mascot/alphonso-cutout.png"
            alt="Alphonso the llama, wearing sunglasses and a blue and gold jacket"
            size={420}
          />
        </motion.div>
      </div>
    </section>
  );
}
```

(Note: the `<motion.div>` wrapping the whole left column still animates `initial={{ y: 16 }}` only — untouched, still safe. The badge itself is now a plain, unanimated `Link` inside it, same as `CTAButton` next to it already was.)

- [ ] **Step 4: Run it to confirm it passes**

Run: `npm test -- Hero.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/home/Hero.tsx components/home/Hero.test.tsx
git commit -m "fix: Hero iOS badge now links to /download and says TestFlight beta, not generic coming-soon"
```

---

### Task 5: Download page — accurate TestFlight-beta copy + a real "Join the beta" CTA

**Files:**
- Modify: `app/download/page.tsx`
- Modify: `app/download/page.test.tsx`
- Modify: `components/download/WaitlistForm.tsx` (one-line copy change)

- [ ] **Step 1: Write the failing test**

Add to `app/download/page.test.tsx` (inside the existing `describe` block, after the current two tests):

```tsx
  it("offers a direct TestFlight beta join link alongside the waitlist", async () => {
    render(await DownloadPage());
    const testflightLink = screen.getByRole("link", { name: /join the testflight beta/i });
    expect(testflightLink).toHaveAttribute("href", "https://testflight.apple.com/join/awk9cvNQ");
    expect(testflightLink).toHaveAttribute("target", "_blank");
  });
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test -- download/page.test.tsx`
Expected: FAIL — no link named `/join the testflight beta/i`.

- [ ] **Step 3: Implement**

Edit `app/download/page.tsx` — replace the second `ContentSection` block:

```tsx
      <ContentSection
        eyebrow="In TestFlight beta"
        title="Try iOS now, or get notified at launch"
        tone="royal"
        visual={<GamificationMockup />}
      >
        <div className="max-w-md">
          <p className="text-sm text-white/80">
            Learn with Alphonso is in TestFlight beta on iOS right now. Join with the link below,
            or leave your email and we&apos;ll let you know when it&apos;s out of beta.
          </p>
          <div className="mt-5">
            <CTAButton
              href="https://testflight.apple.com/join/awk9cvNQ"
              external
              variant="secondary-inverted"
            >
              Join the TestFlight beta
            </CTAButton>
          </div>
          <div className="mt-6">
            <WaitlistForm />
            <div className="mt-4">
              <WaitlistCount count={waitlistCount} />
            </div>
          </div>
        </div>
      </ContentSection>
```

The full file should now read:

```tsx
import type { Metadata } from "next";
import { count } from "drizzle-orm";
import { getDb } from "@/db";
import { waitlistSignups } from "@/db/schema";
import { ContentSection } from "@/components/shared/ContentSection";
import { CTAButton } from "@/components/shared/CTAButton";
import { LessonMockup } from "@/components/shared/LessonMockup";
import { GamificationMockup } from "@/components/shared/GamificationMockup";
import { WaitlistForm } from "@/components/download/WaitlistForm";
import { WaitlistCount } from "@/components/download/WaitlistCount";

export const metadata: Metadata = {
  title: "Download",
  description: "Start learning on the web today, or join the iOS TestFlight beta.",
};

// Without this, Next.js would statically prerender this page once at build
// time and the "live" count would only ever update on the next deploy --
// re-checking the DB every 60s keeps it honestly live without hitting it on
// every single request.
export const revalidate = 60;

async function getWaitlistCount(): Promise<number | null> {
  try {
    const [row] = await getDb().select({ value: count() }).from(waitlistSignups);
    return row?.value ?? 0;
  } catch {
    // A DB hiccup shouldn't take down the page -- WaitlistCount renders
    // nothing for a null count instead of a stale or fabricated number.
    return null;
  }
}

export default async function DownloadPage() {
  const waitlistCount = await getWaitlistCount();

  return (
    <main>
      <ContentSection
        eyebrow="Get started"
        title="Learn on the web today"
        level="h1"
        visual={<LessonMockup />}
      >
        <p className="max-w-xl text-ink-soft">
          The web app works on any device, right now, free — no download needed.
        </p>
        <div className="mt-6">
          <CTAButton href="https://learn.alphonsoecosystem.app/auth" external>
            Start learning free
          </CTAButton>
        </div>
      </ContentSection>

      <ContentSection
        eyebrow="In TestFlight beta"
        title="Try iOS now, or get notified at launch"
        tone="royal"
        visual={<GamificationMockup />}
      >
        <div className="max-w-md">
          <p className="text-sm text-white/80">
            Learn with Alphonso is in TestFlight beta on iOS right now. Join with the link below,
            or leave your email and we&apos;ll let you know when it&apos;s out of beta.
          </p>
          <div className="mt-5">
            <CTAButton
              href="https://testflight.apple.com/join/awk9cvNQ"
              external
              variant="secondary-inverted"
            >
              Join the TestFlight beta
            </CTAButton>
          </div>
          <div className="mt-6">
            <WaitlistForm />
            <div className="mt-4">
              <WaitlistCount count={waitlistCount} />
            </div>
          </div>
        </div>
      </ContentSection>
    </main>
  );
}
```

Also, in `components/download/WaitlistForm.tsx`, change the submit button's idle-state label from `"Notify me on iOS"` to `"Notify me at launch"` (line ~68) — now that a direct beta-join path exists above it, the waitlist's job is specifically "tell me when it's fully out," not "tell me it exists at all":

```tsx
        {status === "loading" ? "Joining..." : "Notify me at launch"}
```

- [ ] **Step 4: Run it to confirm it passes**

Run: `npm test -- download/page.test.tsx WaitlistForm.test.tsx`
Expected: PASS (the `WaitlistForm.test.tsx` assertions use `/notify me/i`, which still matches "Notify me at launch")

- [ ] **Step 5: Commit**

```bash
git add app/download/page.tsx app/download/page.test.tsx components/download/WaitlistForm.tsx
git commit -m "feat: add direct TestFlight beta join link to Download page, fix coming-soon copy"
```

---

### Task 6: New icons — `TeamsIcon` and `SwordsIcon`

**Files:**
- Modify: `components/shared/icons.tsx`

- [ ] **Step 1: Add the icons**

Append to `components/shared/icons.tsx` (after `HeartIcon`):

```tsx
// A shield-with-team-dots shape, deliberately NOT another two-circle
// person pair -- UsersIcon already owns that motif for "Friends" on the
// same Features page, and reusing it for "Teams" would read as the same
// icon twice.
export function TeamsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3 5 6v5c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6l-7-3Z"
        stroke="currentColor"
        strokeWidth={W}
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="10.5" r="1.3" fill="currentColor" />
      <circle cx="14.5" cy="10.5" r="1.3" fill="currentColor" />
      <circle cx="12" cy="14" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function SwordsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 4l16 16M6 4l2 2M18 20l2 2M20 4 4 20M4 18l2 2M20 6l-2-2"
        stroke="currentColor"
        strokeWidth={W}
        strokeLinecap="round"
      />
      <circle cx="4" cy="4" r="1.3" fill="currentColor" />
      <circle cx="20" cy="4" r="1.3" fill="currentColor" />
    </svg>
  );
}
```

- [ ] **Step 2: Verify the file still compiles**

Run: `npx tsc --noEmit`
Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add components/shared/icons.tsx
git commit -m "feat: add TeamsIcon and SwordsIcon for the new Compete section"
```

---

### Task 7: Shared `COMPETE_FEATURES` data (used by both the home teaser and the Features page)

**Files:**
- Create: `components/shared/competeFeatures.tsx`

- [ ] **Step 1: Create the file**

```tsx
import type { FeatureItem } from "./FeatureGrid";
import { TeamsIcon, SwordsIcon, TrophyIcon } from "./icons";

// Shared between the home page's compact CompeteTeaser and the Features
// page's full Compete section -- same three real, shipped mechanics
// (LearnWithAlphonso CHANGELOG.md, V4 #7 "Deeper gamification"), just shown
// at two different sizes via FeatureGrid, so one source of truth avoids the
// copy drifting apart between the two places it appears.
export const COMPETE_FEATURES: FeatureItem[] = [
  {
    title: "Teams",
    description:
      "Join a persistent team, stack your weekly XP together, and chase the top of the team leaderboard.",
    icon: <TeamsIcon className="size-5" />,
  },
  {
    title: "Duels & weekly challenges",
    description:
      "Clear six weekly goals solo, or call out a stranger for a live duel — first to the XP target wins.",
    icon: <SwordsIcon className="size-5" />,
  },
  {
    title: "Season ladder",
    description:
      "Five weekly divisions, Bronze to Diamond cohorts. Finish at the top and you're promoted; the bottom and you're demoted.",
    icon: <TrophyIcon className="size-5" />,
  },
];
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add components/shared/competeFeatures.tsx
git commit -m "feat: add shared Compete feature copy (Teams, Duels, Season Ladder)"
```

---

### Task 8: `CompeteMockup` — a duel face-off phone mockup

**Files:**
- Create: `components/shared/CompeteMockup.tsx`
- Create: `components/shared/CompeteMockup.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CompeteMockup } from "./CompeteMockup";

describe("CompeteMockup", () => {
  it("shows a duel face-off between two players", () => {
    render(<CompeteMockup />);
    expect(screen.getByText("You")).toBeInTheDocument();
    expect(screen.getByText("Theo")).toBeInTheDocument();
    expect(screen.getByText("VS")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test -- CompeteMockup.test.tsx`
Expected: FAIL — module doesn't exist yet.

- [ ] **Step 3: Implement**

```tsx
"use client";

import { motion } from "framer-motion";
import { PhoneFrame } from "./PhoneFrame";
import { SwordsIcon } from "./icons";

// x/scale-only motion throughout -- no opacity on any element here, since
// every one of them carries real text (names, XP, "VS"). See the ground
// rules at the top of this plan / the same pattern in ContentSection and
// AnimatedCounter.
export function CompeteMockup() {
  return (
    <PhoneFrame>
      <div className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
        <SwordsIcon className="size-4 text-coral" />
        Open duel · Gold division
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        <motion.div
          initial={{ x: -24 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-2"
        >
          <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-royal to-royal-deep text-sm font-bold text-white">
            You
          </span>
          <span className="text-xs font-semibold text-ink-soft">1,980 XP</span>
        </motion.div>
        <motion.span
          initial={{ scale: 0.6 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-lg font-bold text-coral-deep"
        >
          VS
        </motion.span>
        <motion.div
          initial={{ x: 24 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-2"
        >
          <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-amber to-coral text-sm font-bold text-white">
            Theo
          </span>
          <span className="text-xs font-semibold text-ink-soft">1,865 XP</span>
        </motion.div>
      </div>
      <p className="mt-6 text-center text-xs text-ink-soft">6 days left this week</p>
    </PhoneFrame>
  );
}
```

- [ ] **Step 4: Run it to confirm it passes**

Run: `npm test -- CompeteMockup.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/shared/CompeteMockup.tsx components/shared/CompeteMockup.test.tsx
git commit -m "feat: add CompeteMockup duel face-off phone mockup"
```

---

### Task 9: `ContentSection` — support an optional `id` (needed so `/features#compete` can deep-link)

**Files:**
- Modify: `components/shared/ContentSection.tsx`
- Modify: `components/shared/ContentSection.test.tsx`

- [ ] **Step 1: Write the failing test**

Add to `components/shared/ContentSection.test.tsx`:

```tsx
  it("applies an id when given one, for deep-linking", () => {
    const { container } = render(<ContentSection title="Compete" id="compete" />);
    expect(container.querySelector("section#compete")).toBeInTheDocument();
  });
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test -- ContentSection.test.tsx`
Expected: FAIL — no `id` attribute is rendered.

- [ ] **Step 3: Implement**

Edit `components/shared/ContentSection.tsx`:

```tsx
type ContentSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "cream" | "royal";
  level?: "h1" | "h2";
  children?: ReactNode;
  /** An illustrated device mockup shown alongside the section's text/cards
   * instead of below them -- the site was otherwise wall-to-wall text with
   * no visual representation of the actual product. */
  visual?: ReactNode;
  /** Lets another page deep-link straight to this section (e.g. the home
   * page's Compete teaser links to /features#compete). */
  id?: string;
};

export function ContentSection({
  eyebrow,
  title,
  description,
  tone = "cream",
  level = "h2",
  children,
  visual,
  id,
}: ContentSectionProps) {
  return (
    <section
      id={id}
      className={tone === "royal" ? "bg-royal py-24" : "bg-cream py-16"}
      style={
        tone === "royal"
          ? { clipPath: "polygon(0 0, 100% 4%, 100% 100%, 0 96%)" }
          : undefined
      }
    >
```

(Only the `type`, the function signature, and the opening `<section>` tag change — the rest of the file is unchanged.)

- [ ] **Step 4: Run it to confirm it passes**

Run: `npm test -- ContentSection.test.tsx`
Expected: PASS (all 3 tests)

- [ ] **Step 5: Commit**

```bash
git add components/shared/ContentSection.tsx components/shared/ContentSection.test.tsx
git commit -m "feat: support an optional id on ContentSection for deep-linking"
```

---

### Task 10: Features page — add the Compete section

**Files:**
- Modify: `app/features/page.tsx`
- Modify: `app/features/page.test.tsx`

- [ ] **Step 1: Write the failing test**

Add to `app/features/page.test.tsx` (inside the existing `describe` block):

```tsx
  it("covers Teams, Duels, and the Season Ladder", () => {
    render(<FeaturesPage />);
    expect(screen.getByRole("heading", { name: "Teams", level: 3 })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Duels & weekly challenges", level: 3 }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Season ladder", level: 3 })).toBeInTheDocument();
  });
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test -- features/page.test.tsx`
Expected: FAIL — no such headings exist yet.

- [ ] **Step 3: Implement**

Edit `app/features/page.tsx` — add imports and a new section. The new imports:

```tsx
import { CompeteMockup } from "@/components/shared/CompeteMockup";
import { COMPETE_FEATURES } from "@/components/shared/competeFeatures";
```

Update the page `metadata` description to mention it:

```tsx
export const metadata: Metadata = {
  title: "Features",
  description:
    "Everything inside Learn with Alphonso: curriculum, AI conversation, spaced repetition, gamification, and team competition.",
};
```

Add a new `ContentSection` between the existing "Gamification" section and the "Why Alphonso" section, in `FeaturesPage`:

```tsx
      <ContentSection
        eyebrow="Compete"
        title="Teams, duels, and a real season ladder"
        tone="royal"
        visual={<CompeteMockup />}
        id="compete"
      >
        <FeatureGrid items={COMPETE_FEATURES} tone="royal" />
      </ContentSection>
```

So the full `return` block reads (only the new section is added; everything else is unchanged):

```tsx
  return (
    <main>
      <ContentSection
        eyebrow="Curriculum"
        title="A real CEFR-leveled curriculum, not a gimmick"
        level="h1"
        visual={<LessonMockup />}
      >
        <FeatureGrid items={CURRICULUM} headingLevel="h2" />
      </ContentSection>
      <ContentSection
        eyebrow="Practice"
        title="AI conversation practice and spaced repetition"
        tone="royal"
        visual={<ConversationMockup />}
      >
        <FeatureGrid items={PRACTICE} tone="royal" />
      </ContentSection>
      <ContentSection
        eyebrow="Stay motivated"
        title="Gamification that respects your time"
        visual={<GamificationMockup />}
      >
        <FeatureGrid items={SOCIAL} />
      </ContentSection>
      <ContentSection
        eyebrow="Compete"
        title="Teams, duels, and a real season ladder"
        tone="royal"
        visual={<CompeteMockup />}
        id="compete"
      >
        <FeatureGrid items={COMPETE_FEATURES} tone="royal" />
      </ContentSection>
      <ContentSection eyebrow="Why Alphonso" title="Not another flashcard app">
        <div className="grid gap-8 sm:grid-cols-3">
          {DIFFERENTIATORS.map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{item.description}</p>
            </div>
          ))}
        </div>
      </ContentSection>
    </main>
  );
```

- [ ] **Step 4: Run it to confirm it passes**

Run: `npm test -- features/page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/features/page.tsx app/features/page.test.tsx
git commit -m "feat: add Teams/Duels/Season Ladder section to Features page"
```

---

### Task 11: `CompeteTeaser` — compact Compete teaser on the home page

**Files:**
- Create: `components/home/CompeteTeaser.tsx`
- Create: `components/home/CompeteTeaser.test.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CompeteTeaser } from "./CompeteTeaser";

describe("CompeteTeaser", () => {
  it("teases Teams, Duels, and the Season Ladder, and links to the full Features section", () => {
    render(<CompeteTeaser />);
    expect(screen.getByRole("heading", { name: "Teams", level: 3 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /see all the ways to compete/i })).toHaveAttribute(
      "href",
      "/features#compete",
    );
  });
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test -- CompeteTeaser.test.tsx`
Expected: FAIL — module doesn't exist yet.

- [ ] **Step 3: Implement**

```tsx
import { ContentSection } from "../shared/ContentSection";
import { FeatureGrid } from "../shared/FeatureGrid";
import { CTAButton } from "../shared/CTAButton";
import { COMPETE_FEATURES } from "../shared/competeFeatures";

// Compact teaser: same real copy as the Features page's full Compete
// section (components/shared/competeFeatures.tsx), no phone mockup, with a
// link out to the full section for anyone who wants the detail. Mirrors
// HowItWorks.tsx's shape -- a thin ContentSection + FeatureGrid wrapper.
export function CompeteTeaser() {
  return (
    <ContentSection
      eyebrow="Compete"
      title="You're never learning alone"
      description="Team up, duel a stranger, or climb the season ladder — all built on the same XP you're already earning."
    >
      <FeatureGrid items={COMPETE_FEATURES} />
      <div className="mt-8">
        <CTAButton href="/features#compete" variant="secondary">
          See all the ways to compete
        </CTAButton>
      </div>
    </ContentSection>
  );
}
```

- [ ] **Step 4: Run it to confirm it passes**

Run: `npm test -- CompeteTeaser.test.tsx`
Expected: PASS

- [ ] **Step 5: Wire it into the home page**

Edit `app/page.tsx`:

```tsx
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LessonDemo } from "@/components/home/LessonDemo";
import { StatsBand } from "@/components/home/StatsBand";
import { CompeteTeaser } from "@/components/home/CompeteTeaser";
import { ThemesTeaser } from "@/components/home/ThemesTeaser";
import { CTAButton } from "@/components/shared/CTAButton";
import { SectionHeading } from "@/components/shared/SectionHeading";

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <SectionHeading
            eyebrow="No sign-up needed"
            title="This is an actual question from the course"
            description="Not a screenshot -- a real multiple-choice item, same format as the app. Give it a try."
          />
        </div>
        <div className="mt-10 px-6">
          <LessonDemo />
        </div>
      </section>
      <HowItWorks />
      <StatsBand />
      <CompeteTeaser />
      <ThemesTeaser />
      <section className="bg-cream py-20 text-center">
        <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Ready when you are.
        </h2>
        <div className="mt-6 flex justify-center">
          <CTAButton href="https://learn.alphonsoecosystem.app/auth" external>
            Start learning free
          </CTAButton>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 6: Run the full unit test suite to confirm nothing else broke**

Run: `npm test`
Expected: PASS (all files)

- [ ] **Step 7: Commit**

```bash
git add components/home/CompeteTeaser.tsx components/home/CompeteTeaser.test.tsx app/page.tsx
git commit -m "feat: add CompeteTeaser section to the home page"
```

---

### Task 12: `MascotPortraitCard` + bring Hector's portrait into the repo

Hector currently exists only as a 699×671 photoreal portrait in the iOS asset
catalog, no transparent cutout, in a different art style than Alphonso's
flat-vector look — that's already how the app itself presents him. Frame him
in a rounded card rather than trying to force a floating cutout treatment.

**Files:**
- Copy: `LearnWithAlphonso/ios/LearnWithAlphonso/Sources/Assets.xcassets/Hector.imageset/Hector.png` → `public/mascot/hector-portrait.png`
- Create: `components/shared/MascotPortraitCard.tsx`
- Create: `components/shared/MascotPortraitCard.test.tsx`

- [ ] **Step 1: Copy the asset**

```bash
cp "D:\AgentDevWork\repos\LearnWithAlphonso\ios\LearnWithAlphonso\Sources\Assets.xcassets\Hector.imageset\Hector.png" "D:\AgentDevWork\repos\LearnWithAlphonsoMarketing\public\mascot\hector-portrait.png"
```

- [ ] **Step 2: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MascotPortraitCard } from "./MascotPortraitCard";

describe("MascotPortraitCard", () => {
  it("renders the portrait, name, and tagline", () => {
    render(
      <MascotPortraitCard
        src="/mascot/hector-portrait.png"
        alt="Hector, wearing AR goggles, in a grand library"
        name="Hector"
        tagline="The Pro AI tutor"
      />,
    );
    expect(screen.getByAltText(/hector, wearing ar goggles/i)).toBeInTheDocument();
    expect(screen.getByText("Hector")).toBeInTheDocument();
    expect(screen.getByText("The Pro AI tutor")).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run it to confirm it fails**

Run: `npm test -- MascotPortraitCard.test.tsx`
Expected: FAIL — module doesn't exist yet.

- [ ] **Step 4: Implement**

```tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type MascotPortraitCardProps = {
  src: string;
  alt: string;
  name: string;
  tagline: string;
  tone?: "cream" | "royal";
};

// A rounded-card portrait, not a floating cutout like MascotFloat -- the
// source art here (Hector.png, ported from the iOS asset catalog) isn't a
// transparent cutout, so a card frame reads as intentional where a bare
// rectangle floating on the page would not. scale-only entrance (no
// opacity) since the card contains real text (name/tagline) -- see the
// ground rules at the top of this plan.
export function MascotPortraitCard({
  src,
  alt,
  name,
  tagline,
  tone = "cream",
}: MascotPortraitCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.94 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`overflow-hidden rounded-3xl border ${
        tone === "royal" ? "border-white/15 bg-royal-deep" : "border-ink/8 bg-white"
      }`}
    >
      <Image src={src} alt={alt} width={280} height={269} className="h-auto w-full" />
      <div className="p-4">
        <p className={`font-display text-base font-semibold ${tone === "royal" ? "text-white" : "text-ink"}`}>
          {name}
        </p>
        <p className={`mt-0.5 text-xs ${tone === "royal" ? "text-white/70" : "text-ink-soft"}`}>
          {tagline}
        </p>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 5: Run it to confirm it passes**

Run: `npm test -- MascotPortraitCard.test.tsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add public/mascot/hector-portrait.png components/shared/MascotPortraitCard.tsx components/shared/MascotPortraitCard.test.tsx
git commit -m "feat: add MascotPortraitCard and bring Hector's portrait into the marketing site"
```

---

### Task 13: Pricing page — Hector's portrait on his own card

**Files:**
- Modify: `app/pricing/page.tsx`
- Modify: `app/pricing/page.test.tsx`

- [ ] **Step 1: Write the failing test**

Add to `app/pricing/page.test.tsx`:

```tsx
  it("shows Hector's portrait on the Pro card", () => {
    render(<PricingPage />);
    expect(screen.getByAltText(/hector/i)).toBeInTheDocument();
  });
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test -- pricing/page.test.tsx`
Expected: FAIL — no image with alt text matching `/hector/i` yet.

- [ ] **Step 3: Implement**

Edit `app/pricing/page.tsx` — add the import and drop the card into the Hector Pro column, right after the "Coming soon" badge span:

```tsx
import { MascotPortraitCard } from "@/components/shared/MascotPortraitCard";
```

```tsx
          <div className="relative rounded-3xl border border-ink/8 bg-royal p-8 text-white">
            <span className="absolute right-6 top-6 rounded-full bg-amber px-3 py-1 text-xs font-bold uppercase tracking-wide text-royal-deep">
              Coming soon
            </span>
            <div className="mb-6 w-40">
              <MascotPortraitCard
                src="/mascot/hector-portrait.png"
                alt="Hector, the Pro AI tutor, wearing AR goggles in a grand library"
                name="Hector"
                tagline="Your Pro AI tutor"
                tone="royal"
              />
            </div>
            <h2 className="font-display text-2xl font-semibold">Hector Pro</h2>
```

(Everything below `<h2>` stays exactly as it was.)

- [ ] **Step 4: Run it to confirm it passes**

Run: `npm test -- pricing/page.test.tsx`
Expected: PASS (both the old test and the new one)

- [ ] **Step 5: Commit**

```bash
git add app/pricing/page.tsx app/pricing/page.test.tsx
git commit -m "feat: show Hector's portrait on the Pricing page's Hector Pro card"
```

---

### Task 14: About page — a "Meet Hector" section

Not merged into the existing "Meet Alphonso" flex row — that layout is sized
for one mascot + one prose block, and Hector's different art style would
clash inside it. A separate, parallel `ContentSection` instead.

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/about/page.test.tsx`

- [ ] **Step 1: Write the failing test**

Add to `app/about/page.test.tsx`:

```tsx
  it("introduces Hector as the Pro AI tutor, separately from Alphonso", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { name: /hector/i })).toBeInTheDocument();
    expect(screen.getByAltText(/hector/i)).toBeInTheDocument();
  });
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test -- about/page.test.tsx`
Expected: FAIL — no such heading/image yet.

- [ ] **Step 3: Implement**

Edit `app/about/page.tsx` — add imports:

```tsx
import Link from "next/link";
import { MascotPortraitCard } from "@/components/shared/MascotPortraitCard";
```

Insert a new `ContentSection` between the existing "Our story" block and the "What we believe" block:

```tsx
      <ContentSection eyebrow="Meet the cast" title="And then there's Hector">
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
          <div className="w-[200px] shrink-0">
            <MascotPortraitCard
              src="/mascot/hector-portrait.png"
              alt="Hector, wearing AR goggles, in a grand library"
              name="Hector"
              tagline="The Pro AI tutor"
            />
          </div>
          <p className="max-w-xl text-ink-soft">
            Where Alphonso keeps you moving through lessons, Hector is the deep-focus tutor mode:
            a second AI conversation partner who remembers your CEFR level and what you&apos;re
            working on between sessions. He&apos;s part of{" "}
            <strong className="text-ink">Hector Pro</strong>, not purchasable yet — see{" "}
            <Link href="/pricing" className="underline hover:text-coral">
              Pricing
            </Link>{" "}
            for details.
          </p>
        </div>
      </ContentSection>
```

So `AboutPage`'s full `return` reads:

```tsx
  return (
    <main>
      <ContentSection eyebrow="Our story" title="Meet Alphonso" level="h1">
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
          <div className="relative mx-auto shrink-0 sm:mx-0">
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-full bg-gradient-to-br from-coral/30 to-amber/20 blur-2xl"
            />
            <Image
              src="/mascot/alphonso-cutout.png"
              alt="Alphonso the llama"
              width={180}
              height={300}
              className="h-auto w-[180px]"
            />
          </div>
          <p className="max-w-xl text-ink-soft">
            Alphonso is a confident, sunglasses-wearing llama who believes a language sticks best
            in small, honest reps — not marathon cram sessions. Learn with Alphonso is built by{" "}
            <strong className="text-ink">Obsidian Media</strong> around that idea: bite-size
            lessons, real spaced repetition, and gamification that respects your time instead of
            manipulating it.
          </p>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Meet the cast" title="And then there's Hector">
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
          <div className="w-[200px] shrink-0">
            <MascotPortraitCard
              src="/mascot/hector-portrait.png"
              alt="Hector, wearing AR goggles, in a grand library"
              name="Hector"
              tagline="The Pro AI tutor"
            />
          </div>
          <p className="max-w-xl text-ink-soft">
            Where Alphonso keeps you moving through lessons, Hector is the deep-focus tutor mode:
            a second AI conversation partner who remembers your CEFR level and what you&apos;re
            working on between sessions. He&apos;s part of{" "}
            <strong className="text-ink">Hector Pro</strong>, not purchasable yet — see{" "}
            <Link href="/pricing" className="underline hover:text-coral">
              Pricing
            </Link>{" "}
            for details.
          </p>
        </div>
      </ContentSection>

      <ContentSection
        eyebrow="What we believe"
        title="Built on a few rules we don't break"
        visual={<ConversationMockup />}
      >
        <FeatureGrid items={VALUES} />
      </ContentSection>
    </main>
  );
```

- [ ] **Step 4: Run it to confirm it passes**

Run: `npm test -- about/page.test.tsx`
Expected: PASS (all 3 tests in the file — the two original ones still pass since "Meet Alphonso" is still the first `/alphonso/i` heading match)

- [ ] **Step 5: Commit**

```bash
git add app/about/page.tsx app/about/page.test.tsx
git commit -m "feat: introduce Hector on the About page"
```

---

### Task 15: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Run the full unit test suite**

Run: `npm test`
Expected: PASS, all files (StatsBand, Hero, CTAButton, download/page, WaitlistForm, CompeteMockup, ContentSection, features/page, CompeteTeaser, MascotPortraitCard, pricing/page, about/page, plus every untouched existing test file)

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Start the dev server and manually sanity-check in a browser**

Run: `npm run dev`, then visit `/`, `/features`, `/pricing`, `/about`, `/download`:
- Home: Hero badge is a working link to `/download`; `CompeteTeaser` appears between the stats band and themes teaser; "See all the ways to compete" scrolls `/features` to the Compete section.
- Features: Compete section renders with the duel mockup; total lesson count reads 1,542 via the curriculum card copy.
- Pricing: Hector's portrait shows on the Pro card without looking broken/cropped oddly.
- About: "Meet Hector" section appears below "Meet Alphonso", not squeezed into the same row.
- Download: TestFlight button opens `https://testflight.apple.com/join/awk9cvNQ` in a new tab; waitlist form still works.

- [ ] **Step 5: Run the Playwright accessibility + console-error sweep**

Run: `npm run test:e2e`
Expected: PASS for all pages in `e2e/site.spec.ts` (`/`, `/features`, `/pricing`, `/download`, `/about`) — zero axe violations, no console errors, and the "primary CTA on every page points to the live web app" check still passes since no primary CTA was touched.

If anything fails here, fix it and re-run — do not mark this task done with a red suite.

- [ ] **Step 6: Final commit if Steps 4-5 needed any fixes**

```bash
git add -A
git commit -m "fix: address issues found in the final verification pass"
```

(Skip this commit if no fixes were needed.)
