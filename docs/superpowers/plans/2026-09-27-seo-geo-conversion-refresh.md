# SEO/GEO, Conversion, and Content-Accuracy Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix stale/incorrect facts, wire up the already-provisioned custom domain, add real analytics, restructure the iOS conversion funnel around TestFlight, give the Listen (podcast) feature a presence on the site, add technical SEO/GEO surface area (structured data, FAQ, llms.txt), and seed a content-marketing start (comparison page + 2 blog posts).

**Architecture:** Small, additive changes to an existing Next.js 15 App Router site. Follows established patterns exactly: shared feature-copy arrays (like `competeFeatures.tsx`), `ContentSection`/`FeatureGrid` for page sections, `PhoneFrame`-based mockups, y/scale-only Framer Motion (never text opacity). No new state management, no CMS, no build tooling changes.

**Tech Stack:** Next.js 15 (App Router) + React 19 + Tailwind v4 + Framer Motion, Vitest + Testing Library for unit tests, Playwright + axe-core for e2e. New dependency: `@vercel/analytics`.

Reference spec: `docs/superpowers/specs/2026-09-27-seo-geo-conversion-refresh-design.md`

---

## File Structure

**Modify:**
- `app/layout.tsx` — metadataBase, twitter metadata, Organization + SoftwareApplication JSON-LD, `<Analytics />`
- `app/sitemap.ts` — new BASE_URL, new routes
- `app/robots.ts` — new sitemap URL
- `components/home/StatsBand.tsx` — corrected lesson counts
- `app/features/page.tsx` — corrected lesson counts, corrected question formats, new Listen section, new differentiator card
- `app/download/page.tsx` — TestFlight CTA becomes primary, waitlist reframed, Sign in with Apple mention, analytics tracking
- `components/home/Hero.tsx` — TestFlight secondary CTA button, analytics tracking
- `components/shared/CTAButton.tsx` — optional `trackEvent` prop
- `components/download/WaitlistForm.tsx` — analytics tracking on success
- `components/shared/icons.tsx` — add `HeadphonesIcon`, `DownloadIcon`
- `app/page.tsx` — insert `ListenTeaser` and `FAQ`
- `package.json` — add `@vercel/analytics`

**Create:**
- `components/shared/listenFeatures.tsx` — shared Listen feature copy (mirrors `competeFeatures.tsx`)
- `components/shared/ListenMockup.tsx` — phone mockup for the Listen feature
- `components/home/ListenTeaser.tsx` (+ `.test.tsx`) — home page teaser section
- `components/shared/FAQ.tsx` (+ `.test.tsx`) — FAQ section with FAQPage JSON-LD
- `public/llms.txt` — plain-text product summary for AI crawlers
- `components/shared/ArticleLayout.tsx` (+ `.test.tsx`) — shared prose layout + Article JSON-LD for blog posts
- `app/compare/duolingo-alternative/page.tsx` (+ `.test.tsx`)
- `app/blog/page.tsx` (+ `.test.tsx`) — blog index
- `app/blog/how-spaced-repetition-works/page.tsx` (+ `.test.tsx`)
- `app/blog/cefr-levels-explained/page.tsx` (+ `.test.tsx`)

---

## Task 1: Fix stale lesson-count and question-format facts

**Files:**
- Modify: `components/home/StatsBand.tsx`
- Modify: `app/features/page.tsx:25-48`
- Test: `components/home/StatsBand.test.tsx`, `app/features/page.test.tsx`

- [ ] **Step 1: Read the current StatsBand test to see what it asserts**

Run: `cat components/home/StatsBand.test.tsx` (or open it) — confirm whether it asserts the literal number `1542` anywhere. If it does, that assertion is the "failing test" for this task.

- [ ] **Step 2: Update the failing/new assertion in `StatsBand.test.tsx`**

Change any assertion of `1542` (or `"1,542"` / `1,542`) to `1767` / `"1,767"`. If the test only checks the label text ("total lessons") and not the number, add:

```tsx
it("shows the current total lesson count", () => {
  render(<StatsBand />);
  expect(screen.getByText("1,767")).toBeInTheDocument();
});
```

(Match whatever `AnimatedCounter` renders the value as — check its test/component for the exact formatting, e.g. whether it adds commas.)

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test -- StatsBand`
Expected: FAIL (current code still renders 1,542)

- [ ] **Step 4: Fix `components/home/StatsBand.tsx`**

Replace lines 1-13 with:

```tsx
import { AnimatedCounter } from "../shared/AnimatedCounter";

// Per-course stats (609 English / 575 French / 583 Spanish) would need a
// new line here every time a course grows or a new one ships -- rolling up
// to total lessons + language count scales without a rewrite. All three
// courses reached full question-type parity (mc/fill/reorder/listening/
// speak/translate) by 2026-09-25 -- verified against LearnWithAlphonso's
// README content table on 2026-09-27.
const STATS = [
  { value: 1767, unit: "total lessons" },
  { value: 3, unit: "languages" },
  { value: 5, unit: "CEFR levels, A1–C1" },
];
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test -- StatsBand`
Expected: PASS

- [ ] **Step 6: Fix the features page lesson counts and question-format copy**

In `app/features/page.tsx`, replace the `CURRICULUM` array's second and third items (lines ~31-42):

```tsx
  {
    title: "Three courses",
    description:
      "609 English lessons, 575 French lessons, and 583 Spanish lessons — all three at full A1–C1 depth with every question type.",
    icon: <BookIcon className="size-5" />,
  },
  {
    title: "6 question formats",
    description:
      "Multiple choice, fill-in-the-blank, sentence reordering, listening comprehension, speaking practice, and free-form translation.",
    icon: <PaletteIcon className="size-5" />,
  },
```

- [ ] **Step 7: Update `app/features/page.test.tsx`**

Find any assertion referencing the old numbers (`534`, `500`, `508`) or the old format list (`"5 question formats"`, `"image matching"`) and replace with the corrected copy: `609`, `575`, `583`, `"6 question formats"`, and the six real format names. If no such assertions exist yet, add one:

```tsx
it("states the current, correct lesson counts and question formats", () => {
  render(<FeaturesPage />);
  expect(screen.getByText(/609 English lessons/)).toBeInTheDocument();
  expect(screen.getByText(/6 question formats/)).toBeInTheDocument();
  expect(screen.queryByText(/image matching/)).not.toBeInTheDocument();
});
```

- [ ] **Step 8: Run both test files, confirm green**

Run: `npm test -- StatsBand features/page`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add components/home/StatsBand.tsx components/home/StatsBand.test.tsx app/features/page.tsx app/features/page.test.tsx
git commit -m "fix: correct stale lesson counts and question-format copy"
```

---

## Task 2: Switch the site's canonical domain to discover.alphonsoecosystem.app

**Files:**
- Modify: `app/layout.tsx:20`
- Modify: `app/sitemap.ts:3`
- Modify: `app/robots.ts:6`
- Test: none of these have dedicated tests today (they're config, not components) — verify by direct read after editing, and confirm the full test suite still passes.

- [ ] **Step 1: Update `app/layout.tsx`**

Change line 20:

```tsx
  metadataBase: new URL("https://discover.alphonsoecosystem.app"),
```

- [ ] **Step 2: Update `app/sitemap.ts`**

Change line 3:

```ts
const BASE_URL = "https://discover.alphonsoecosystem.app";
```

- [ ] **Step 3: Update `app/robots.ts`**

Change line 6:

```ts
    sitemap: "https://discover.alphonsoecosystem.app/sitemap.xml",
```

- [ ] **Step 4: Run the full test suite to confirm nothing broke**

Run: `npm test`
Expected: PASS (no test currently asserts the old domain string; if one does, update it to the new domain)

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/sitemap.ts app/robots.ts
git commit -m "fix: point canonical URLs at discover.alphonsoecosystem.app"
```

**Manual follow-up (not automatable via the available Vercel API):** in the Vercel dashboard, add a redirect from `learnwithalphonsomarketing.vercel.app` to `discover.alphonsoecosystem.app` on the project's Domains settings, to avoid duplicate-content risk. Mention this to the account owner — it's a ~2 minute manual step.

---

## Task 3: Add Vercel Analytics and CTA click tracking

**Files:**
- Modify: `package.json`
- Modify: `app/layout.tsx`
- Modify: `components/shared/CTAButton.tsx`
- Modify: `components/download/WaitlistForm.tsx`
- Modify: `components/home/Hero.tsx`, `components/layout/Header.tsx`, `app/download/page.tsx`, `app/pricing/page.tsx`, `app/page.tsx` (pass `trackEvent` props)
- Test: `components/shared/CTAButton.test.tsx`, `components/download/WaitlistForm.test.tsx`

- [ ] **Step 1: Install the dependency**

Run: `npm install @vercel/analytics`
Expected: `package.json` gains `"@vercel/analytics": "^<version>"` under `dependencies`.

- [ ] **Step 2: Write the failing test for `CTAButton`'s tracking prop**

In `components/shared/CTAButton.test.tsx`, add:

```tsx
import { vi } from "vitest";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

it("fires the named analytics event on click when trackEvent is set", async () => {
  const { track } = await import("@vercel/analytics");
  render(
    <CTAButton href="/somewhere" trackEvent="test_event">
      Click me
    </CTAButton>,
  );
  await userEvent.click(screen.getByRole("link", { name: "Click me" }));
  expect(track).toHaveBeenCalledWith("test_event");
});

it("does not throw or call track when trackEvent is omitted", async () => {
  const { track } = await import("@vercel/analytics");
  vi.mocked(track).mockClear();
  render(<CTAButton href="/somewhere">Click me</CTAButton>);
  await userEvent.click(screen.getByRole("link", { name: "Click me" }));
  expect(track).not.toHaveBeenCalled();
});
```

(Match the existing test file's import style for `render`/`screen`/`userEvent` — it already tests this component, so follow its existing setup exactly.)

- [ ] **Step 2b: Run it to verify it fails**

Run: `npm test -- CTAButton`
Expected: FAIL — `trackEvent` prop doesn't exist yet / `track` never called.

- [ ] **Step 3: Implement tracking in `CTAButton.tsx`**

Replace the full file:

```tsx
"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@vercel/analytics";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "secondary-inverted";
  external?: boolean;
  className?: string;
  /** Fires a named Vercel Analytics event on click. Omit for CTAs that
   * aren't part of the tracked conversion funnel. */
  trackEvent?: string;
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
  trackEvent,
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
    <Link
      href={href}
      className={`${base} ${styles} ${className}`}
      onClick={trackEvent ? () => track(trackEvent) : undefined}
      {...externalProps}
    >
      {children}
    </Link>
  );
}
```

(This adds `"use client"` — required for the `onClick` handler. `CTAButton` is already used from both server and client page components; a leaf client component under a server component is a normal Next.js pattern and requires no changes at the call sites beyond the new optional prop.)

- [ ] **Step 4: Run the test, verify it passes**

Run: `npm test -- CTAButton`
Expected: PASS

- [ ] **Step 5: Add `trackEvent` to the key CTA usages**

- `components/home/Hero.tsx` — the "Start learning free" `CTAButton`: add `trackEvent="start_learning_click"`.
- `components/layout/Header.tsx` — both "Start learning free" `CTAButton`s (desktop + mobile menu): add `trackEvent="start_learning_click"`.
- `app/page.tsx` — the bottom "Start learning free" `CTAButton`: add `trackEvent="start_learning_click"`.
- `app/pricing/page.tsx` — the Free tier's "Start learning free" `CTAButton`: add `trackEvent="start_learning_click"`.
- `app/download/page.tsx` — the web "Start learning free" `CTAButton`: add `trackEvent="start_learning_click"`; the TestFlight `CTAButton`: add `trackEvent="testflight_click"`.

Example diff shape (apply the same pattern at each site above):

```tsx
<CTAButton href="https://learn.alphonsoecosystem.app/auth" external trackEvent="start_learning_click">
  Start learning free
</CTAButton>
```

- [ ] **Step 6: Write the failing test for waitlist-submit tracking**

In `components/download/WaitlistForm.test.tsx`, add:

```tsx
import { vi } from "vitest";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

it("tracks a waitlist_submit event on successful submission", async () => {
  const { track } = await import("@vercel/analytics");
  // reuse this file's existing fetch-mocking setup for a successful response
  // (match whatever pattern the existing "shows a success message" test uses)
  render(<WaitlistForm />);
  await userEvent.type(screen.getByLabelText("Email address"), "test@example.com");
  await userEvent.click(screen.getByRole("button", { name: /notify me/i }));
  await screen.findByRole("status");
  expect(track).toHaveBeenCalledWith("waitlist_submit");
});
```

- [ ] **Step 7: Run it, verify it fails**

Run: `npm test -- WaitlistForm`
Expected: FAIL

- [ ] **Step 8: Implement in `WaitlistForm.tsx`**

Add the import and call `track("waitlist_submit")` in the success branch of `handleSubmit`:

```tsx
import { track } from "@vercel/analytics";
```

```tsx
      setStatus("success");
      setMessage(json.alreadyJoined ? "You're already on the list!" : "You're on the list!");
      track("waitlist_submit");
```

- [ ] **Step 9: Run it, verify it passes**

Run: `npm test -- WaitlistForm`
Expected: PASS

- [ ] **Step 10: Add `<Analytics />` to the root layout**

In `app/layout.tsx`, add the import and render it as the last child of `<body>`:

```tsx
import { Analytics } from "@vercel/analytics/next";
```

```tsx
      <body>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
```

- [ ] **Step 11: Run the full suite**

Run: `npm test`
Expected: PASS

- [ ] **Step 12: Commit**

```bash
git add package.json package-lock.json app/layout.tsx components/shared/CTAButton.tsx components/shared/CTAButton.test.tsx components/download/WaitlistForm.tsx components/download/WaitlistForm.test.tsx components/home/Hero.tsx components/layout/Header.tsx app/page.tsx app/pricing/page.tsx app/download/page.tsx
git commit -m "feat: add Vercel Analytics with CTA and waitlist event tracking"
```

---

## Task 4: Make TestFlight the primary iOS conversion path

**Files:**
- Modify: `app/download/page.tsx`
- Modify: `components/home/Hero.tsx`
- Test: `app/download/page.test.tsx`, `components/home/Hero.test.tsx`

- [ ] **Step 1: Update `app/download/page.test.tsx`'s expectations first**

Find the existing assertion(s) about the TestFlight button's variant or the waitlist framing (if any exist) and update, or add:

```tsx
it("presents TestFlight as the primary iOS action", async () => {
  render(await DownloadPage());
  const testflightLink = screen.getByRole("link", { name: /join the testflight beta/i });
  expect(testflightLink.className).toContain("from-coral"); // primary variant's gradient
});
```

(`DownloadPage` is an async server component — check the existing test file for how it already handles that, e.g. `render(await DownloadPage())`, and match it.)

- [ ] **Step 2: Run it, verify it fails**

Run: `npm test -- download/page`
Expected: FAIL (current variant is `secondary-inverted`, no `from-coral` class)

- [ ] **Step 3: Update `app/download/page.tsx`**

Change the TestFlight `CTAButton` (currently `variant="secondary-inverted"`) to `variant="primary"`, add `trackEvent="testflight_click"` (from Task 3), and add a reframing line + Sign in with Apple mention. Replace the second `ContentSection` block:

```tsx
      <ContentSection
        eyebrow="In TestFlight beta"
        title="Try iOS now, or get notified at launch"
        tone="royal"
        visual={<GamificationMockup />}
      >
        <div className="max-w-md">
          <p className="text-sm text-white/80">
            Learn with Alphonso is in TestFlight beta on iOS right now. Sign in with Apple or
            Google — no new password to remember — and join with the link below.
          </p>
          <div className="mt-5">
            <CTAButton
              href="https://testflight.apple.com/join/awk9cvNQ"
              external
              variant="primary"
              trackEvent="testflight_click"
            >
              Join the TestFlight beta
            </CTAButton>
          </div>
          <div className="mt-8">
            <p className="text-xs text-white/60">
              Not ready to install a beta? Leave your email and we&apos;ll let you know when it&apos;s
              out of beta instead.
            </p>
            <div className="mt-3">
              <WaitlistForm />
            </div>
            <div className="mt-4">
              <WaitlistCount count={waitlistCount} />
            </div>
          </div>
        </div>
      </ContentSection>
```

- [ ] **Step 4: Run it, verify it passes**

Run: `npm test -- download/page`
Expected: PASS

- [ ] **Step 5: Update `Hero.test.tsx`'s expectations**

Add or update:

```tsx
it("offers Join the TestFlight beta as a real CTA button next to Start learning free", () => {
  render(<Hero />);
  expect(screen.getByRole("link", { name: /join the testflight beta/i })).toBeInTheDocument();
});
```

- [ ] **Step 6: Run it, verify it fails**

Run: `npm test -- Hero`
Expected: FAIL

- [ ] **Step 7: Update `components/home/Hero.tsx`**

Replace the CTA row (lines 28-38):

```tsx
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CTAButton
              href="https://learn.alphonsoecosystem.app/auth"
              external
              trackEvent="start_learning_click"
            >
              Start learning free
            </CTAButton>
            <CTAButton
              href="https://testflight.apple.com/join/awk9cvNQ"
              external
              variant="secondary"
              trackEvent="testflight_click"
            >
              🦙 Join the TestFlight beta
            </CTAButton>
          </div>
```

(This removes the old plain-`<Link>` badge in favor of a real second `CTAButton` — remove the now-unused `Link` import if `Hero.tsx` no longer uses `Link` anywhere else; check the file after editing.)

- [ ] **Step 8: Run it, verify it passes**

Run: `npm test -- Hero`
Expected: PASS

- [ ] **Step 9: Run the full suite**

Run: `npm test`
Expected: PASS

- [ ] **Step 10: Commit**

```bash
git add app/download/page.tsx app/download/page.test.tsx components/home/Hero.tsx components/home/Hero.test.tsx
git commit -m "feat: make TestFlight the primary iOS conversion path"
```

---

## Task 5: Add Listen (podcast) feature icons and shared copy

**Files:**
- Modify: `components/shared/icons.tsx`
- Create: `components/shared/listenFeatures.tsx`

- [ ] **Step 1: Add two icons to `components/shared/icons.tsx`**

Append:

```tsx
export function HeadphonesIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 14v-2a8 8 0 0 1 16 0v2"
        stroke="currentColor"
        strokeWidth={W}
        strokeLinecap="round"
      />
      <rect x="2.5" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth={W} />
      <rect x="17.5" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth={W} />
    </svg>
  );
}

export function DownloadIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3v12m0 0-4-4m4 4 4-4"
        stroke="currentColor"
        strokeWidth={W}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth={W} strokeLinecap="round" />
    </svg>
  );
}
```

There's no dedicated `icons.test.tsx` in this codebase (icons are exercised indirectly through the components that render them) — no test step needed here; Task 6/7's component tests exercise these.

- [ ] **Step 2: Create `components/shared/listenFeatures.tsx`**

```tsx
import type { FeatureItem } from "./FeatureGrid";
import { HeadphonesIcon, BookIcon, DownloadIcon } from "./icons";

// Shared between the home page's compact ListenTeaser and the Features
// page's full Listen section -- same real, shipped mechanics
// (LearnWithAlphonso README, "Listen" Phase 1a-3), just shown at two
// different sizes via FeatureGrid, so copy can't drift between the two
// places it appears.
export const LISTEN_FEATURES: FeatureItem[] = [
  {
    title: "A real episode library",
    description:
      "Browse short audio episodes by folder, from real recordings and Deepgram-narrated scripts, with transcripts included.",
    icon: <HeadphonesIcon className="size-5" />,
  },
  {
    title: "A mini-player that remembers",
    description:
      "Keep listening with the screen locked, and resume exactly where you left off — even switching from web to iOS.",
    icon: <BookIcon className="size-5" />,
  },
  {
    title: "Download for offline",
    description:
      "On iOS, save episodes to listen without a connection — nothing is ever deleted without you asking.",
    icon: <DownloadIcon className="size-5" />,
  },
];
```

- [ ] **Step 3: Commit**

```bash
git add components/shared/icons.tsx components/shared/listenFeatures.tsx
git commit -m "feat: add Headphones/Download icons and shared Listen feature copy"
```

---

## Task 6: Add the ListenMockup phone component

**Files:**
- Create: `components/shared/ListenMockup.tsx`
- Test: `components/shared/ListenMockup.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { ListenMockup } from "./ListenMockup";

describe("ListenMockup", () => {
  it("renders an episode list and a now-playing mini-player", () => {
    render(<ListenMockup />);
    expect(screen.getByText("Ordering at a café")).toBeInTheDocument();
    expect(screen.getByText(/resumes on any device/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it, verify it fails**

Run: `npm test -- ListenMockup`
Expected: FAIL (module doesn't exist)

- [ ] **Step 3: Implement `components/shared/ListenMockup.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { PhoneFrame } from "./PhoneFrame";
import { HeadphonesIcon } from "./icons";

const EPISODES = ["Ordering at a café", "Small talk on the street", "Asking for directions"];

// y/scale-only motion throughout -- the waveform bars animate height via
// scaleY (a decorative, non-text element, so no contrast-during-fade risk),
// and the episode/player text never carries an opacity transition. Same
// ground rules as CompeteMockup.
export function ListenMockup() {
  return (
    <PhoneFrame>
      <div className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
        <HeadphonesIcon className="size-4 text-coral" />
        A2 · Everyday Conversations
      </div>
      <div className="mt-6 space-y-2">
        {EPISODES.map((title, index) => (
          <div
            key={title}
            className={
              index === 0
                ? "flex items-center justify-between rounded-2xl bg-royal px-4 py-3 text-sm text-white"
                : "flex items-center justify-between rounded-2xl border border-ink/8 px-4 py-3 text-sm text-ink-soft"
            }
          >
            <span>{title}</span>
            {index === 0 && <span className="text-xs">4:12</span>}
          </div>
        ))}
      </div>
      <motion.div
        initial={{ y: 12 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 flex items-center gap-3 rounded-2xl bg-royal px-4 py-3 text-white"
      >
        <div className="flex items-end gap-0.5" aria-hidden="true">
          {[6, 12, 8, 16, 10].map((height, index) => (
            <motion.span
              key={height + index}
              className="w-1 rounded-full bg-amber"
              style={{ height }}
              animate={{ scaleY: [1, 1.6, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: index * 0.12, ease: "easeInOut" }}
            />
          ))}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">Ordering at a café</p>
          <p className="text-xs text-white/70">1:48 / 4:12 · resumes on any device</p>
        </div>
      </motion.div>
    </PhoneFrame>
  );
}
```

- [ ] **Step 4: Run it, verify it passes**

Run: `npm test -- ListenMockup`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/shared/ListenMockup.tsx components/shared/ListenMockup.test.tsx
git commit -m "feat: add ListenMockup phone component"
```

---

## Task 7: Add the Listen section to the home page and Features page

**Files:**
- Create: `components/home/ListenTeaser.tsx` (+ `.test.tsx`)
- Modify: `app/page.tsx`
- Modify: `app/features/page.tsx`
- Test: `app/features/page.test.tsx`

- [ ] **Step 1: Write the failing test for `ListenTeaser`**

```tsx
import { render, screen } from "@testing-library/react";
import { ListenTeaser } from "./ListenTeaser";

describe("ListenTeaser", () => {
  it("links out to the full Listen section on the Features page", () => {
    render(<ListenTeaser />);
    expect(screen.getByRole("link", { name: /how listen works/i })).toHaveAttribute(
      "href",
      "/features#listen",
    );
  });
});
```

- [ ] **Step 2: Run it, verify it fails**

Run: `npm test -- ListenTeaser`
Expected: FAIL (module doesn't exist)

- [ ] **Step 3: Implement `components/home/ListenTeaser.tsx`**

```tsx
import { ContentSection } from "../shared/ContentSection";
import { FeatureGrid } from "../shared/FeatureGrid";
import { CTAButton } from "../shared/CTAButton";
import { LISTEN_FEATURES } from "../shared/listenFeatures";

// Compact teaser: same real copy as the Features page's full Listen
// section (components/shared/listenFeatures.tsx), no phone mockup, with a
// link out to the full section. Mirrors CompeteTeaser.tsx's shape exactly.
export function ListenTeaser() {
  return (
    <ContentSection
      eyebrow="Listen"
      title="Learning that fits in your headphones"
      description="Short audio episodes with a mini-player that remembers where you left off — on the web and on iOS."
    >
      <FeatureGrid items={LISTEN_FEATURES} />
      <div className="mt-8">
        <CTAButton href="/features#listen" variant="secondary">
          See how Listen works
        </CTAButton>
      </div>
    </ContentSection>
  );
}
```

- [ ] **Step 4: Run it, verify it passes**

Run: `npm test -- ListenTeaser`
Expected: PASS

- [ ] **Step 5: Insert `ListenTeaser` into `app/page.tsx`**

Add the import and place it between `CompeteTeaser` and `ThemesTeaser`:

```tsx
import { ListenTeaser } from "@/components/home/ListenTeaser";
```

```tsx
      <CompeteTeaser />
      <ListenTeaser />
      <ThemesTeaser />
```

- [ ] **Step 6: Write the failing test for the Features page Listen section**

In `app/features/page.test.tsx`, add:

```tsx
it("has a Listen section with a stable deep-link id", () => {
  render(<FeaturesPage />);
  expect(screen.getByText(/mini-player that remembers/i)).toBeInTheDocument();
  expect(document.getElementById("listen")).not.toBeNull();
});
```

- [ ] **Step 7: Run it, verify it fails**

Run: `npm test -- features/page`
Expected: FAIL

- [ ] **Step 8: Add the Listen `ContentSection` to `app/features/page.tsx`**

Add imports:

```tsx
import { ListenMockup } from "@/components/shared/ListenMockup";
import { LISTEN_FEATURES } from "@/components/shared/listenFeatures";
```

Insert a new section between the Compete `ContentSection` and the "Why Alphonso" `ContentSection`:

```tsx
      <ContentSection eyebrow="Listen" title="Language learning for your headphones" visual={<ListenMockup />} id="listen">
        <FeatureGrid items={LISTEN_FEATURES} />
      </ContentSection>
```

- [ ] **Step 9: Run it, verify it passes**

Run: `npm test -- features/page`
Expected: PASS

- [ ] **Step 10: Run the full suite**

Run: `npm test`
Expected: PASS

- [ ] **Step 11: Commit**

```bash
git add components/home/ListenTeaser.tsx components/home/ListenTeaser.test.tsx app/page.tsx app/features/page.tsx app/features/page.test.tsx
git commit -m "feat: add Listen section to home page and Features page"
```

---

## Task 8: Add the "Your account, your control" differentiator card

**Files:**
- Modify: `app/features/page.tsx:100-113`
- Test: `app/features/page.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it("mentions self-serve account deletion and safety tools", () => {
  render(<FeaturesPage />);
  expect(screen.getByText(/your account, your control/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run it, verify it fails**

Run: `npm test -- features/page`
Expected: FAIL

- [ ] **Step 3: Add the 4th item to `DIFFERENTIATORS`**

```tsx
const DIFFERENTIATORS = [
  {
    title: "Bite-size, not marathon",
    description: "5-minute reps designed to fit into an actual day, not a study session.",
  },
  {
    title: "Real conversation, not just flashcards",
    description: "Voice or text roleplay with a language partner that adapts to you.",
  },
  {
    title: "It knows what you're stuck on",
    description: "Weakness tracking feeds review automatically — you don't have to notice it yourself.",
  },
  {
    title: "Your account, your control",
    description:
      "Delete your account and export your data yourself, in-app, any time — plus block and report tools on every social feature.",
  },
];
```

- [ ] **Step 4: Run it, verify it passes**

Run: `npm test -- features/page`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/features/page.tsx app/features/page.test.tsx
git commit -m "feat: add account-control/safety differentiator card"
```

---

## Task 9: Structured data (Organization + SoftwareApplication), Twitter metadata, llms.txt

**Files:**
- Modify: `app/layout.tsx`
- Create: `public/llms.txt`
- Test: none of these are component-level testable in this codebase's existing style; verify by build + manual JSON.parse sanity check (Step 4 below) instead of a unit test.

- [ ] **Step 1: Add JSON-LD to `app/layout.tsx`**

Add above the `RootLayout` function:

```tsx
const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Obsidian Media",
  url: "https://discover.alphonsoecosystem.app",
  logo: "https://discover.alphonsoecosystem.app/icon-512.png",
};

const SOFTWARE_APPLICATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Learn with Alphonso",
  applicationCategory: "EducationalApplication",
  operatingSystem: "iOS, Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

function jsonLdScript(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
```

Render both scripts as the last children of `<head>`... but this layout has no explicit `<head>` (Next.js injects one from `metadata`). Add them at the top of `<body>`, before `<Header />`:

```tsx
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(ORGANIZATION_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(SOFTWARE_APPLICATION_JSON_LD) }}
        />
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
```

- [ ] **Step 2: Add explicit Twitter metadata**

Replace the `twitter` field in the `metadata` object:

```tsx
  twitter: {
    card: "summary_large_image",
    title: "Learn with Alphonso — English that actually sticks",
    description:
      "Bite-size English, French, and Spanish lessons, AI conversation practice, and gamified streaks.",
    images: ["/og-image.png"],
  },
```

- [ ] **Step 3: Create `public/llms.txt`**

```
# Learn with Alphonso

A mobile-first English, French, and Spanish learning app: bite-size
lessons, AI voice/text conversation practice, spaced repetition review,
and gamification (streaks, leagues, teams, duels, a season ladder). Built
by Obsidian Media.

## Courses
- English, French, and Spanish, each with 5 CEFR levels (A1 through C1)
- 1,767 lessons total (609 English / 575 French / 583 Spanish), 8,886
  questions across 6 formats: multiple choice, fill-in-the-blank, sentence
  reordering, listening comprehension, speaking practice, free-form
  translation

## Practice
- 12 AI-guided roleplay scenarios (voice or text), adaptive to CEFR level
- Spaced repetition review queue (SM-2-style algorithm)

## Listen
- A browsable library of short audio episodes with a persistent
  mini-player that resumes across web and iOS, transcripts included, and
  offline downloads on iOS

## Platforms
- Web app: free, works in any browser, no download — https://learn.alphonsoecosystem.app
- iOS app: in TestFlight beta — https://testflight.apple.com/join/awk9cvNQ

## Pricing
- Free tier: full curriculum, AI conversation practice, spaced repetition,
  gamification
- Hector Pro ($9.99/month): a second AI tutor mode with cross-session
  memory — not purchasable yet

## Links
- Features: https://discover.alphonsoecosystem.app/features
- Pricing: https://discover.alphonsoecosystem.app/pricing
- Download: https://discover.alphonsoecosystem.app/download
- About: https://discover.alphonsoecosystem.app/about
```

- [ ] **Step 4: Sanity-check the JSON-LD is valid**

Run: `npm run build` (Next.js will fail to prerender if the inline scripts contain invalid JS/JSON syntax) — or, faster: `node -e "JSON.parse(require('fs').readFileSync('app/layout.tsx','utf8').match(/ORGANIZATION_JSON_LD = ({[\s\S]*?});/)[1])"` is fragile; simplest is just running the dev build.
Expected: build succeeds.

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: PASS (layout isn't unit-tested today; this confirms nothing else broke)

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx public/llms.txt
git commit -m "feat: add Organization/SoftwareApplication JSON-LD, Twitter metadata, and llms.txt"
```

---

## Task 10: Add the home page FAQ section with FAQPage JSON-LD

**Files:**
- Create: `components/shared/FAQ.tsx` (+ `.test.tsx`)
- Modify: `app/page.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { FAQ } from "./FAQ";

describe("FAQ", () => {
  it("renders every question as a heading", () => {
    render(<FAQ />);
    expect(screen.getByText("Is Learn with Alphonso free?")).toBeInTheDocument();
    expect(screen.getByText("Can I delete my account and my data?")).toBeInTheDocument();
  });

  it("embeds a valid FAQPage JSON-LD script", () => {
    const { container } = render(<FAQ />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const data = JSON.parse(script!.textContent ?? "{}");
    expect(data["@type"]).toBe("FAQPage");
    expect(data.mainEntity).toHaveLength(6);
  });
});
```

- [ ] **Step 2: Run it, verify it fails**

Run: `npm test -- FAQ`
Expected: FAIL (module doesn't exist)

- [ ] **Step 3: Implement `components/shared/FAQ.tsx`**

```tsx
import { SectionHeading } from "./SectionHeading";

const FAQS = [
  {
    q: "Is Learn with Alphonso free?",
    a: "Yes — the full curriculum, AI conversation practice, spaced repetition review, and gamification are free. Hector, a second AI tutor mode, is a paid Pro tier that isn't purchasable yet.",
  },
  {
    q: "What languages can I learn?",
    a: "English, French, and Spanish, each with a full curriculum from A1 (beginner) to C1 (advanced).",
  },
  {
    q: "Is there an iOS app?",
    a: "Yes — Learn with Alphonso is in TestFlight beta on iOS. The web app works on any device today, free, no download needed.",
  },
  {
    q: "How is this different from Duolingo?",
    a: "Bite-size lessons plus real AI conversation practice (voice or text, 12 roleplay scenarios) and a spaced repetition review queue built to make what you learn actually stick.",
  },
  {
    q: "How does the spaced repetition review work?",
    a: "An SM-2-style algorithm resurfaces exactly what you got wrong, timed to show up right before you'd forget it — not on a fixed schedule.",
  },
  {
    q: "Can I delete my account and my data?",
    a: "Yes — account deletion and a full data export are both available directly in the app, no support ticket required.",
  },
];

function jsonLdScript(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <section className="bg-cream px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Questions people actually ask" />
        <dl className="mt-10 space-y-6">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="rounded-3xl border border-ink/8 bg-white p-6">
              <dt className="font-display text-lg font-semibold text-ink">{q}</dt>
              <dd className="mt-2 text-sm text-ink-soft">{a}</dd>
            </div>
          ))}
        </dl>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
    </section>
  );
}
```

- [ ] **Step 4: Run it, verify it passes**

Run: `npm test -- FAQ`
Expected: PASS

- [ ] **Step 5: Insert `FAQ` into `app/page.tsx`, above the closing CTA**

```tsx
import { FAQ } from "@/components/shared/FAQ";
```

```tsx
      <ThemesTeaser />
      <FAQ />
      <section className="bg-cream py-20 text-center">
```

- [ ] **Step 6: Run the full suite**

Run: `npm test`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add components/shared/FAQ.tsx components/shared/FAQ.test.tsx app/page.tsx
git commit -m "feat: add home page FAQ section with FAQPage JSON-LD"
```

---

## Task 11: Shared article layout for the blog

**Files:**
- Create: `components/shared/ArticleLayout.tsx` (+ `.test.tsx`)

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { ArticleLayout } from "./ArticleLayout";

describe("ArticleLayout", () => {
  it("renders the title as an h1 and embeds Article JSON-LD", () => {
    const { container } = render(
      <ArticleLayout title="Test Title" description="Test description" datePublished="2026-09-27">
        <p>Body</p>
      </ArticleLayout>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Test Title" })).toBeInTheDocument();
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent ?? "{}");
    expect(data["@type"]).toBe("Article");
    expect(data.headline).toBe("Test Title");
  });
});
```

- [ ] **Step 2: Run it, verify it fails**

Run: `npm test -- ArticleLayout`
Expected: FAIL (module doesn't exist)

- [ ] **Step 3: Implement `components/shared/ArticleLayout.tsx`**

```tsx
import type { ReactNode } from "react";

type ArticleLayoutProps = {
  title: string;
  description: string;
  datePublished: string;
  children: ReactNode;
};

function jsonLdScript(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function ArticleLayout({ title, description, datePublished, children }: ArticleLayoutProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    author: { "@type": "Organization", name: "Obsidian Media" },
  };

  return (
    <main className="bg-cream px-6 py-16">
      <article className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl font-semibold text-ink">{title}</h1>
        <p className="mt-3 text-sm text-ink-soft">{description}</p>
        <div className="prose prose-neutral mt-10 max-w-none text-ink-soft [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_p]:leading-relaxed">
          {children}
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
    </main>
  );
}
```

- [ ] **Step 4: Run it, verify it passes**

Run: `npm test -- ArticleLayout`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/shared/ArticleLayout.tsx components/shared/ArticleLayout.test.tsx
git commit -m "feat: add shared ArticleLayout with Article JSON-LD"
```

---

## Task 12: Blog index + two seed articles

**Files:**
- Create: `app/blog/page.tsx` (+ `.test.tsx`)
- Create: `app/blog/how-spaced-repetition-works/page.tsx` (+ `.test.tsx`)
- Create: `app/blog/cefr-levels-explained/page.tsx` (+ `.test.tsx`)
- Modify: `components/layout/Footer.tsx` (add a Blog link)

- [ ] **Step 1: Write the failing test for the blog index**

```tsx
import { render, screen } from "@testing-library/react";
import BlogIndexPage from "./page";

describe("BlogIndexPage", () => {
  it("links to both seed articles", () => {
    render(<BlogIndexPage />);
    expect(screen.getByRole("link", { name: /how spaced repetition actually works/i })).toHaveAttribute(
      "href",
      "/blog/how-spaced-repetition-works",
    );
    expect(screen.getByRole("link", { name: /cefr levels explained/i })).toHaveAttribute(
      "href",
      "/blog/cefr-levels-explained",
    );
  });
});
```

- [ ] **Step 2: Run it, verify it fails**

Run: `npm test -- blog/page`
Expected: FAIL (module doesn't exist)

- [ ] **Step 3: Implement `app/blog/page.tsx`**

```tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides on language learning, spaced repetition, and the CEFR scale.",
};

const POSTS = [
  {
    slug: "how-spaced-repetition-works",
    title: "How spaced repetition actually works",
    description: "The algorithm behind why review timing matters more than review frequency.",
  },
  {
    slug: "cefr-levels-explained",
    title: "CEFR levels explained: which one are you?",
    description: "What A1 through C1 actually mean, and how a placement test figures out yours.",
  },
];

export default function BlogIndexPage() {
  return (
    <main className="bg-cream px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl font-semibold text-ink">Blog</h1>
        <ul className="mt-10 space-y-8">
          {POSTS.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="font-display text-2xl font-semibold text-ink hover:text-coral">
                {post.title}
              </Link>
              <p className="mt-1 text-sm text-ink-soft">{post.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Run it, verify it passes**

Run: `npm test -- blog/page`
Expected: PASS

- [ ] **Step 5: Write the failing test for the spaced-repetition article**

```tsx
import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("how-spaced-repetition-works page", () => {
  it("renders the article title", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", { level: 1, name: "How spaced repetition actually works" }),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run it, verify it fails**

Run: `npm test -- how-spaced-repetition-works`
Expected: FAIL

- [ ] **Step 7: Implement `app/blog/how-spaced-repetition-works/page.tsx`**

```tsx
import type { Metadata } from "next";
import { ArticleLayout } from "@/components/shared/ArticleLayout";

export const metadata: Metadata = {
  title: "How spaced repetition actually works",
  description: "The algorithm behind why review timing matters more than review frequency.",
};

export default function Page() {
  return (
    <ArticleLayout
      title="How spaced repetition actually works"
      description="The algorithm behind why review timing matters more than review frequency."
      datePublished="2026-09-27"
    >
      <p>
        Cramming a word ten times in one sitting feels productive, but it barely changes how long
        you&apos;ll remember it. Spaced repetition works differently: it shows you a word again
        right before you&apos;re about to forget it, not on a fixed daily schedule. Each
        correct recall pushes the next review further out; each mistake pulls it back in.
      </p>
      <h2>Why timing beats frequency</h2>
      <p>
        Memory research calls this the spacing effect — recalling something just as it&apos;s
        fading strengthens it far more than recalling it while it&apos;s still fresh. A fixed
        schedule (say, review every word daily) wastes time on things you already know cold, and
        under-reviews the handful of items that are actually at risk.
      </p>
      <h2>How Learn with Alphonso schedules reviews</h2>
      <p>
        The app uses an SM-2-style algorithm with two deliberate differences from the textbook
        version: a wrong answer halves your progress on that item instead of resetting it to
        zero, so one slip doesn&apos;t erase weeks of earned spacing. And a correct answer on an
        item you were overdue to review gets a small bonus to its next interval, rewarding the
        fact that you still remembered it well past when you were expected to forget it.
      </p>
      <p>
        In practice, that means the review queue you see on the Learn tab is never busywork —
        every item in it is there because the algorithm has calculated you&apos;re at real risk
        of forgetting it right now.
      </p>
    </ArticleLayout>
  );
}
```

- [ ] **Step 8: Run it, verify it passes**

Run: `npm test -- how-spaced-repetition-works`
Expected: PASS

- [ ] **Step 9: Write the failing test for the CEFR article**

```tsx
import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("cefr-levels-explained page", () => {
  it("renders the article title", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", { level: 1, name: "CEFR levels explained: which one are you?" }),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 10: Run it, verify it fails**

Run: `npm test -- cefr-levels-explained`
Expected: FAIL

- [ ] **Step 11: Implement `app/blog/cefr-levels-explained/page.tsx`**

```tsx
import type { Metadata } from "next";
import { ArticleLayout } from "@/components/shared/ArticleLayout";

export const metadata: Metadata = {
  title: "CEFR levels explained: which one are you?",
  description: "What A1 through C1 actually mean, and how a placement test figures out yours.",
};

export default function Page() {
  return (
    <ArticleLayout
      title="CEFR levels explained: which one are you?"
      description="What A1 through C1 actually mean, and how a placement test figures out yours."
      datePublished="2026-09-27"
    >
      <p>
        The Common European Framework of Reference for Languages (CEFR) is the scale most
        language courses — including this one — use to describe how far along a learner is. It
        runs from A1 to C2, though most everyday courses (this one included) stop building new
        content at C1, since C2 is closer to native-level nuance than a language most learners
        set out to reach.
      </p>
      <h2>The five levels this app teaches</h2>
      <p>
        <strong>A1 (Beginner):</strong> basic phrases, introductions, simple present-tense
        sentences. <strong>A2 (Elementary):</strong> everyday topics — shopping, directions,
        routines. <strong>B1 (Intermediate):</strong> handling most travel and work situations,
        expressing opinions simply. <strong>B2 (Upper Intermediate):</strong> following extended
        conversation and expressing more complex ideas fluently. <strong>C1 (Advanced):</strong>
        near-fluent, nuanced expression across abstract topics.
      </p>
      <h2>How the placement test picks your starting level</h2>
      <p>
        Rather than start everyone at lesson one, a 15-question adaptive placement test finds
        your level directly — multiple choice, listening, and written translation, the same
        formats the course itself uses, so you&apos;re never placed by a test that measures
        something the course doesn&apos;t. Speaking is deliberately left out of placement: it
        would require microphone access before you&apos;ve even seen the app, and a denial would
        leave the question unanswerable.
      </p>
    </ArticleLayout>
  );
}
```

- [ ] **Step 12: Run it, verify it passes**

Run: `npm test -- cefr-levels-explained`
Expected: PASS

- [ ] **Step 13: Add a Blog link to the footer**

In `components/layout/Footer.tsx`, add to the "Product" list (after Download):

```tsx
              <li>
                <Link href="/blog" className="text-ink hover:text-coral">
                  Blog
                </Link>
              </li>
```

- [ ] **Step 14: Run the full suite**

Run: `npm test`
Expected: PASS

- [ ] **Step 15: Commit**

```bash
git add app/blog components/layout/Footer.tsx
git commit -m "feat: add blog index and two seed articles"
```

---

## Task 13: Comparison page

**Files:**
- Create: `app/compare/duolingo-alternative/page.tsx` (+ `.test.tsx`)
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("duolingo-alternative comparison page", () => {
  it("renders the comparison headline and does not disparage the competitor", () => {
    render(<Page />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/duolingo/i);
    expect(screen.queryByText(/duolingo is bad|duolingo sucks/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it, verify it fails**

Run: `npm test -- duolingo-alternative`
Expected: FAIL

- [ ] **Step 3: Implement `app/compare/duolingo-alternative/page.tsx`**

```tsx
import type { Metadata } from "next";
import { CTAButton } from "@/components/shared/CTAButton";

export const metadata: Metadata = {
  title: "A Duolingo Alternative With Real Conversation Practice",
  description:
    "How Learn with Alphonso compares to Duolingo: bite-size lessons, AI conversation practice, and spaced repetition review.",
};

const ROWS: [string, string, string][] = [
  ["Bite-size daily lessons", "Yes", "Yes"],
  ["AI voice/text conversation practice", "Yes — 12 roleplay scenarios", "Limited/newer feature"],
  ["Spaced repetition review queue", "Yes — SM-2-style algorithm", "Built into lesson flow"],
  ["Gamification (streaks, leagues, teams)", "Yes", "Yes"],
  ["Languages", "English, French, Spanish", "40+"],
  ["Price", "Free, Pro tier coming", "Free, Super subscription"],
];

export default function DuolingoAlternativePage() {
  return (
    <main className="bg-cream px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-semibold text-ink">
          Learn with Alphonso vs. Duolingo
        </h1>
        <p className="mt-4 text-ink-soft">
          Duolingo covers far more languages. If English, French, or Spanish is what you&apos;re
          after, here&apos;s how the two compare on the mechanics that actually help a language
          stick.
        </p>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-xs font-bold uppercase tracking-wide text-ink-soft">
                <th className="py-3 pr-4">Feature</th>
                <th className="py-3 pr-4">Learn with Alphonso</th>
                <th className="py-3">Duolingo</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([feature, ours, theirs]) => (
                <tr key={feature} className="border-b border-ink/8">
                  <td className="py-3 pr-4 font-semibold text-ink">{feature}</td>
                  <td className="py-3 pr-4 text-ink-soft">{ours}</td>
                  <td className="py-3 text-ink-soft">{theirs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10">
          <CTAButton href="https://learn.alphonsoecosystem.app/auth" external trackEvent="start_learning_click">
            Try Learn with Alphonso free
          </CTAButton>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Run it, verify it passes**

Run: `npm test -- duolingo-alternative`
Expected: PASS

- [ ] **Step 5: Add the new routes to `app/sitemap.ts`**

```ts
const ROUTES = [
  "",
  "/features",
  "/pricing",
  "/download",
  "/about",
  "/blog",
  "/blog/how-spaced-repetition-works",
  "/blog/cefr-levels-explained",
  "/compare/duolingo-alternative",
];
```

- [ ] **Step 6: Run the full suite**

Run: `npm test`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add app/compare app/sitemap.ts
git commit -m "feat: add Duolingo comparison page, extend sitemap"
```

---

## Task 14: Full verification pass

- [ ] **Step 1: Run the full unit suite**

Run: `npm test`
Expected: PASS, all files green.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: no errors. Fix any (e.g. unused `Link` import left in `Hero.tsx` from Task 4) before proceeding.

- [ ] **Step 3: Run a production build**

Run: `npm run build`
Expected: build succeeds — this is the real check on the inline JSON-LD scripts and the new static routes.

- [ ] **Step 4: Run e2e + accessibility sweep**

Run: `npm run test:e2e` (requires a running dev server per this repo's own docs — check `playwright.config.ts` for whether it starts one automatically)
Expected: PASS, including axe accessibility checks in `e2e/site.spec.ts`. Pay particular attention to the new `/blog`, `/blog/*`, and `/compare/duolingo-alternative` routes and the new FAQ/Listen sections not having heading-order or contrast violations (the codebase's own established rule: motion must never rest text at partial opacity).

- [ ] **Step 5: Manual smoke check of JSON-LD**

Run: `npm run dev`, then in another terminal: `curl -s http://localhost:3000/ | grep -A2 'application/ld+json'` (or open the page and check dev tools) — confirm three `<script type="application/ld+json">` blocks appear (Organization, SoftwareApplication, FAQPage) and each parses as valid JSON.

- [ ] **Step 6: Final commit if any lint/build fixes were needed**

```bash
git add -A
git commit -m "fix: address lint/build issues from the SEO/GEO/conversion refresh"
```
