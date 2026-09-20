# Learn with Alphonso Marketing Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a new multi-page Next.js marketing website for "Learn with Alphonso" (a separate repo/deploy from the main app), driving sign-ups to the live web app and capturing iOS waitlist interest.

**Architecture:** Next.js 15 App Router + TypeScript + Tailwind CSS v4 + Framer Motion, hand-written components (no UI kit). One real dynamic feature (iOS waitlist email capture) backed by a dedicated Neon Postgres database provisioned through the Vercel Marketplace — isolated from the main app's production Supabase project. Everything else is static content.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Zod, Drizzle ORM + `@neondatabase/serverless`, Vitest + React Testing Library, Playwright + `@axe-core/playwright`, deployed on Vercel.

**Spec:** `docs/superpowers/specs/2026-09-20-marketing-site-design.md`

## Global Constraints

- No UI kit / component library (shadcn, MUI, etc.) — every component is hand-written, matching the main app's own convention.
- Never link to a real App Store URL — the iOS app has no shipped build yet. Always "coming soon" / waitlist.
- Never present Hector/Pro as purchasable — always marked "coming soon."
- Never fabricate a real in-app screenshot — illustrative mockups only, clearly stylized.
- Primary CTA everywhere is the live web app: `https://learn.alphonsoecosystem.app/auth`.
- Color tokens (exact hex, from the mascot artwork): coral `#FF6B4A`, amber `#FFB238`, royal `#1E3A6E`, royal-deep `#12253F`, gold `#D4A017`, cream `#FFF8F0`, ink `#201A17`, ink-soft `#6B5F58`.
- Fonts: **Fraunces** (display/headings, continuity with the main app) + **Nunito** (body/UI, friendly/rounded).
- Legal pages (privacy/terms/cookies) are NOT duplicated here — link out to the main app's own pages at `https://learn.alphonsoecosystem.app/{privacy,terms,cookies}`.
- All commits use the attribution footer configured for this session (see each task's commit step).

---

## File structure

```
LearnWithAlphonsoMarketing/
├── app/
│   ├── layout.tsx                  # RootLayout: fonts, Header, Footer, base metadata
│   ├── globals.css                 # Tailwind v4 import + design tokens
│   ├── page.tsx                    # Home
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── features/page.tsx
│   ├── pricing/page.tsx
│   ├── download/page.tsx
│   ├── about/page.tsx
│   └── api/waitlist/route.ts
├── components/
│   ├── layout/Header.tsx
│   ├── layout/Footer.tsx
│   ├── shared/CTAButton.tsx
│   ├── shared/SectionHeading.tsx
│   ├── shared/ContentSection.tsx
│   ├── shared/FeatureGrid.tsx
│   ├── shared/AnimatedCounter.tsx
│   ├── shared/MascotFloat.tsx
│   ├── shared/icons.tsx
│   ├── home/Hero.tsx
│   ├── home/HowItWorks.tsx
│   ├── home/StatsBand.tsx
│   ├── home/ThemesTeaser.tsx
│   └── download/WaitlistForm.tsx
├── db/
│   ├── index.ts                    # lazy Neon + Drizzle client
│   ├── schema.ts                   # waitlist_signups table
│   └── migrations/                 # drizzle-kit output
├── public/
│   └── mascot/                     # processed logo assets (task 2)
├── vitest.config.ts
├── vitest.setup.ts
├── playwright.config.ts
├── e2e/site.spec.ts
├── drizzle.config.ts
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

---

### Task 1: Scaffold the Next.js app + tooling

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `.gitignore`, `.env.example`
- Create: `app/layout.tsx`, `app/globals.css`, `app/page.tsx`
- Create: `vitest.config.ts`, `vitest.setup.ts`, `playwright.config.ts`
- Create: `eslint.config.js`, `.prettierrc`
- Test: `app/page.test.tsx`

**Interfaces:**
- Produces: Tailwind tokens `bg-cream`, `text-ink`, `text-ink-soft`, `bg-coral`, `bg-amber`, `bg-royal`, `text-gold`, `font-display`, `font-sans` — every later component uses these class names verbatim.
- Produces: path alias `@/*` → repo root (used by every later import).

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "learn-with-alphonso-marketing",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "format": "prettier --write .",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "db:push": "dotenv -e .env.local -- drizzle-kit push"
  },
  "dependencies": {
    "next": "^15.5.0",
    "react": "^19.3.0",
    "react-dom": "^19.3.0",
    "framer-motion": "^12.43.0",
    "zod": "^4.6.2",
    "drizzle-orm": "^0.44.2",
    "@neondatabase/serverless": "^1.0.2"
  },
  "devDependencies": {
    "typescript": "^5.9.3",
    "@types/node": "^22.20.2",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "tailwindcss": "^4.3.3",
    "@tailwindcss/postcss": "^4.3.3",
    "eslint": "^9.39.5",
    "eslint-config-next": "^15.5.0",
    "prettier": "^3.9.6",
    "vitest": "^5.0.1",
    "@vitejs/plugin-react": "^5.2.0",
    "jsdom": "^30.1.0",
    "@testing-library/react": "^16.3.3",
    "@testing-library/jest-dom": "^7.0.1",
    "@testing-library/user-event": "^14.6.7",
    "@playwright/test": "^1.63.0",
    "@axe-core/playwright": "^4.13.0",
    "drizzle-kit": "^0.31.5",
    "dotenv-cli": "^7.4.4"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `cd D:/AgentDevWork/repos/LearnWithAlphonsoMarketing && npm install`
Expected: lockfile created, no errors.

- [ ] **Step 3: `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
```

- [ ] **Step 5: `postcss.config.mjs`**

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

- [ ] **Step 6: `app/globals.css` — design tokens**

```css
@import "tailwindcss";

@theme {
  --font-display: var(--font-fraunces), ui-serif, Georgia, serif;
  --font-sans: var(--font-nunito), ui-sans-serif, system-ui, sans-serif;

  --color-coral: #ff6b4a;
  --color-amber: #ffb238;
  --color-royal: #1e3a6e;
  --color-royal-deep: #12253f;
  --color-gold: #d4a017;
  --color-cream: #fff8f0;
  --color-ink: #201a17;
  --color-ink-soft: #6b5f58;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-cream);
  color: var(--color-ink);
  font-family: var(--font-sans);
}
```

- [ ] **Step 7: `app/layout.tsx` — fonts + base metadata**

```tsx
import type { Metadata } from "next";
import { Fraunces, Nunito } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fraunces",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://learnwithalphonsomarketing.vercel.app"),
  title: {
    default: "Learn with Alphonso — English that actually sticks",
    template: "%s — Learn with Alphonso",
  },
  description:
    "Bite-size English and French lessons, AI conversation practice, and gamified streaks — with Alphonso the llama as your guide.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

(Header/Footer are wired into this layout in Task 4, once they exist.)

- [ ] **Step 8: Placeholder `app/page.tsx`**

```tsx
export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl font-semibold text-ink">Learn with Alphonso</h1>
      <p className="mt-4 text-ink-soft">Marketing site under construction.</p>
    </main>
  );
}
```

- [ ] **Step 9: Write the failing test for the placeholder page**

```tsx
// app/page.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "./page";

describe("Home placeholder", () => {
  it("renders the site name", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /learn with alphonso/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 10: `vitest.config.ts` + `vitest.setup.ts`**

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./") },
  },
});
```

```ts
// vitest.setup.ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 11: Run the test suite to verify it passes**

Run: `npm run test`
Expected: PASS (1 test).

- [ ] **Step 12: `eslint.config.js` and `.prettierrc`**

```js
// eslint.config.js
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default [...compat.extends("next/core-web-vitals", "next/typescript", "prettier")];
```

```json
// .prettierrc
{ "semi": true, "singleQuote": false, "printWidth": 100 }
```

(Also add `eslint-config-prettier` and `@eslint/eslintrc` to `devDependencies` in Step 1 if not already present — re-run `npm install` after adding.)

- [ ] **Step 13: `.env.example`**

```
# Neon Postgres (provisioned in Task 5 via Vercel Marketplace)
DATABASE_URL=
```

- [ ] **Step 14: `.gitignore`**

```
node_modules/
.next/
.vercel/
.env
.env.local
coverage/
playwright-report/
test-results/
```

- [ ] **Step 15: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both succeed with no errors.

- [ ] **Step 16: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js app with design tokens and test tooling

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 2: Mascot & favicon asset pipeline

**Files:**
- Create: `public/mascot/alphonso-icon.png` (source icon, resized)
- Create: `public/mascot/alphonso-cutout.png` (background-removed, if viable)
- Create: `public/favicon.ico`, `public/icon-192.png`, `public/icon-512.png`, `public/apple-touch-icon.png`, `public/site.webmanifest`, `public/og-image.png`
- Modify: `app/layout.tsx` (add `icons`/`manifest` to metadata)

**Interfaces:**
- Produces: `/mascot/alphonso-icon.png` and `/mascot/alphonso-cutout.png` as the two mascot image paths every later component (Hero, Header, MascotFloat) references.

- [ ] **Step 1: Copy and resize the source icon**

Source: `C:\Users\AgentDev\Downloads\Gemini_Generated_Image_4frny74frny74frn.jpg`

Copy it into `public/mascot/alphonso-icon.png` (convert JPG→PNG), and generate `icon-192.png`/`icon-512.png`/`apple-touch-icon.png` (180×180) at those exact sizes, plus a 32×32 `favicon.ico`, using the Node `sharp` package one-off (add `sharp` as a devDependency for this step only if not already present):

```js
// scripts/process-mascot.mjs — run once, then safe to delete
import sharp from "sharp";

const src = "C:/Users/AgentDev/Downloads/Gemini_Generated_Image_4frny74frny74frn.jpg";

await sharp(src).resize(1024, 1024).png().toFile("public/mascot/alphonso-icon.png");
await sharp(src).resize(512, 512).png().toFile("public/icon-512.png");
await sharp(src).resize(192, 192).png().toFile("public/icon-192.png");
await sharp(src).resize(180, 180).png().toFile("public/apple-touch-icon.png");
await sharp(src).resize(32, 32).png().toFile("public/favicon-32.png");
```

Run: `npm install --no-save sharp && node scripts/process-mascot.mjs && rm scripts/process-mascot.mjs`

For `favicon.ico` itself (multi-resolution .ico, which `sharp` doesn't emit), use an online-free conversion is out — instead reuse `public/favicon-32.png` as `public/favicon.ico`'s only frame via `npm install --no-save png-to-ico` and:

```js
import pngToIco from "png-to-ico";
import { writeFile } from "node:fs/promises";
const buf = await pngToIco(["public/favicon-32.png"]);
await writeFile("public/favicon.ico", buf);
```

- [ ] **Step 2: Attempt a background-removed cutout**

Use the Higgsfield `remove_background` tool (available in this session) against `public/mascot/alphonso-icon.png` to produce a transparent-background version. Save the result as `public/mascot/alphonso-cutout.png`.

**Quality gate:** open the result and check it is not blurry/artifacted at the size it'll render (up to ~480px tall in the Hero). If it looks degraded, delete it and skip this step — Task 6 (Hero) then falls back to using `alphonso-icon.png` (the square badge) instead of a cutout, per the spec's explicit fallback rule. Do not ship a visibly bad cutout.

- [ ] **Step 3: `public/site.webmanifest`**

```json
{
  "name": "Learn with Alphonso",
  "short_name": "Alphonso",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#FF6B4A",
  "background_color": "#FFF8F0",
  "display": "standalone"
}
```

- [ ] **Step 4: Create `public/og-image.png` (1200×630)**

```js
// one-off, same pattern as Step 1 — pad the icon onto a branded 1200x630 canvas
import sharp from "sharp";

const icon = await sharp("public/mascot/alphonso-icon.png").resize(420, 420).toBuffer();
await sharp({
  create: { width: 1200, height: 630, channels: 3, background: "#FFF8F0" },
})
  .composite([{ input: icon, left: 120, top: 105 }])
  .png()
  .toFile("public/og-image.png");
```

- [ ] **Step 5: Wire icons/manifest into `app/layout.tsx` metadata**

Add to the `metadata` object from Task 1:

```ts
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Learn with Alphonso — English that actually sticks",
    description:
      "Bite-size English and French lessons, AI conversation practice, and gamified streaks.",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
```

- [ ] **Step 6: Verify visually**

Run: `npm run dev`, open `http://localhost:3000`, confirm the browser tab favicon loads (check DevTools Network tab for `favicon.ico` 200, not 404).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add mascot and favicon asset pipeline

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 3: Shared UI primitives

**Files:**
- Create: `components/shared/icons.tsx`
- Create: `components/shared/CTAButton.tsx` + `CTAButton.test.tsx`
- Create: `components/shared/SectionHeading.tsx` + `SectionHeading.test.tsx`
- Create: `components/shared/AnimatedCounter.tsx` + `AnimatedCounter.test.tsx`
- Create: `components/shared/MascotFloat.tsx`

**Interfaces:**
- Produces: `<CTAButton href variant="primary"|"secondary" external?>` — used by Header, Hero, every page's footer CTA.
- Produces: `<SectionHeading eyebrow? title description? tone="cream"|"royal">` — used by `ContentSection` (Task 8) and directly by page sections.
- Produces: `<AnimatedCounter value unit? />` — used by `StatsBand` (Task 9).
- Produces: `<MascotFloat src alt size />` — used by Hero (Task 6) and Header (Task 4).

- [ ] **Step 1: `components/shared/icons.tsx`**

```tsx
type IconProps = { className?: string };

export function BookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5A2.5 2.5 0 0 1 17.5 21H4V5.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function MicIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 11a7 7 0 0 0 14 0M12 18v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FlameIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2c1 3-3 4-3 8a3 3 0 0 0 6 0c0-1-1-2-1-2 2 1 3 3 3 5a5 5 0 0 1-10 0c0-5 3-6 5-11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrophyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M7 4h10v4a5 5 0 0 1-10 0V4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3M9 21h6M12 16v5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3 20a6 6 0 0 1 12 0M16 8.5a2.5 2.5 0 1 0 0-5M21 19a5 5 0 0 0-5.5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PaletteIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3a9 8 0 1 0 0 16c1.5 0 2-.9 2-2s-.6-1.7 0-2.4c.5-.6 1.3-.6 2-.6h1a4 4 0 0 0 4-4c0-4-4-7-9-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="10" r="1.1" fill="currentColor" />
      <circle cx="12" cy="8" r="1.1" fill="currentColor" />
      <circle cx="16" cy="10" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 20s-7-4.35-9.5-8.5C.7 8.2 2.4 4.5 6 4.5c2 0 3.4 1.1 4 2.4.6-1.3 2-2.4 4-2.4 3.6 0 5.3 3.7 3.5 7C19 15.65 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
```

- [ ] **Step 2: Write the failing test for `CTAButton`**

```tsx
// components/shared/CTAButton.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CTAButton } from "./CTAButton";

describe("CTAButton", () => {
  it("renders an internal link by default", () => {
    render(<CTAButton href="/features">See features</CTAButton>);
    const link = screen.getByRole("link", { name: /see features/i });
    expect(link).toHaveAttribute("href", "/features");
  });

  it("adds target=_blank and rel for external links", () => {
    render(
      <CTAButton href="https://learn.alphonsoecosystem.app/auth" external>
        Start learning free
      </CTAButton>,
    );
    const link = screen.getByRole("link", { name: /start learning free/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("applies secondary styling when requested", () => {
    render(
      <CTAButton href="/download" variant="secondary">
        Notify me
      </CTAButton>,
    );
    expect(screen.getByRole("link", { name: /notify me/i }).className).toContain("border");
  });
});
```

- [ ] **Step 3: Run to verify it fails**

Run: `npm run test -- CTAButton`
Expected: FAIL — `./CTAButton` module not found.

- [ ] **Step 4: Implement `CTAButton`**

```tsx
// components/shared/CTAButton.tsx
import Link from "next/link";
import type { ReactNode } from "react";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
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
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-coral to-amber text-white hover:opacity-90"
      : "border border-ink/15 text-ink hover:bg-ink/5";

  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link href={href} className={`${base} ${styles} ${className}`} {...externalProps}>
      {children}
    </Link>
  );
}
```

- [ ] **Step 5: Run to verify it passes**

Run: `npm run test -- CTAButton`
Expected: PASS (3 tests).

- [ ] **Step 6: Write the failing test for `SectionHeading`**

```tsx
// components/shared/SectionHeading.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SectionHeading } from "./SectionHeading";

describe("SectionHeading", () => {
  it("renders eyebrow, title, and description", () => {
    render(
      <SectionHeading eyebrow="How it works" title="Lessons that stick" description="Bite-size and warm." />,
    );
    expect(screen.getByText("How it works")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Lessons that stick" })).toBeInTheDocument();
    expect(screen.getByText("Bite-size and warm.")).toBeInTheDocument();
  });
});
```

- [ ] **Step 7: Implement `SectionHeading`**

```tsx
// components/shared/SectionHeading.tsx
type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "cream" | "royal";
};

export function SectionHeading({ eyebrow, title, description, tone = "cream" }: SectionHeadingProps) {
  const isRoyal = tone === "royal";
  return (
    <div>
      {eyebrow && (
        <p
          className={
            isRoyal
              ? "text-xs font-bold uppercase tracking-[0.2em] text-amber"
              : "text-xs font-bold uppercase tracking-[0.2em] text-coral"
          }
        >
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-2 font-display text-3xl font-semibold sm:text-4xl ${isRoyal ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 max-w-2xl text-base leading-relaxed ${isRoyal ? "text-white/80" : "text-ink-soft"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 8: Run to verify it passes**

Run: `npm run test -- SectionHeading`
Expected: PASS.

- [ ] **Step 9: Write the failing test for `AnimatedCounter`**

```tsx
// components/shared/AnimatedCounter.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AnimatedCounter } from "./AnimatedCounter";

describe("AnimatedCounter", () => {
  it("renders the final value and optional unit as accessible text", () => {
    render(<AnimatedCounter value={534} unit="lessons" />);
    expect(screen.getByText(/534/)).toBeInTheDocument();
    expect(screen.getByText(/lessons/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 10: Implement `AnimatedCounter`**

```tsx
// components/shared/AnimatedCounter.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

type AnimatedCounterProps = { value: number; unit?: string };

export function AnimatedCounter({ value, unit }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display text-4xl font-semibold text-ink sm:text-5xl">
      {display.toLocaleString()}
      {unit && <span className="ml-2 text-base font-sans font-semibold text-ink-soft">{unit}</span>}
    </span>
  );
}
```

- [ ] **Step 11: Run to verify it passes**

Run: `npm run test -- AnimatedCounter`
Expected: PASS. (jsdom has no real `IntersectionObserver`; Framer Motion's `useInView` degrades to reporting in-view on mount in that environment, which is why the final value is still reachable synchronously enough for the test to observe it after the effect runs.)

- [ ] **Step 12: Implement `MascotFloat` (no dedicated unit test — pure visual/motion component, covered by the Hero's test in Task 6 and the Task 15 accessibility sweep)**

```tsx
// components/shared/MascotFloat.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type MascotFloatProps = { src: string; alt: string; size?: number; className?: string };

export function MascotFloat({ src, alt, size = 320, className = "" }: MascotFloatProps) {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      <Image src={src} alt={alt} width={size} height={size} priority className="h-auto w-full" />
    </motion.div>
  );
}
```

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "feat: add shared UI primitives (CTA button, headings, counter, mascot)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 4: Header, Footer, and RootLayout wiring

**Files:**
- Create: `components/layout/Header.tsx` + `Header.test.tsx`
- Create: `components/layout/Footer.tsx` + `Footer.test.tsx`
- Modify: `app/layout.tsx` (render `<Header />`/`<Footer />` around `children`)

**Interfaces:**
- Consumes: `CTAButton`, `MascotFloat` (Task 3).
- Produces: nothing further consumed by later tasks (leaf UI).

- [ ] **Step 1: Write the failing test for `Header`**

```tsx
// components/layout/Header.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
  it("renders nav links to every page and a primary CTA to the live app", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /features/i })).toHaveAttribute("href", "/features");
    expect(screen.getByRole("link", { name: /pricing/i })).toHaveAttribute("href", "/pricing");
    expect(screen.getByRole("link", { name: /download/i })).toHaveAttribute("href", "/download");
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute("href", "/about");
    const cta = screen.getByRole("link", { name: /start learning free/i });
    expect(cta).toHaveAttribute("href", "https://learn.alphonsoecosystem.app/auth");
  });
});
```

- [ ] **Step 2: Implement `Header`**

```tsx
// components/layout/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CTAButton } from "../shared/CTAButton";

const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/download", label: "Download" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/mascot/alphonso-icon.png" alt="" width={36} height={36} className="rounded-xl" />
          <span className="font-display text-lg font-semibold text-ink">Alphonso</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold text-ink-soft hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <CTAButton href="https://learn.alphonsoecosystem.app/auth" external>
            Start learning free
          </CTAButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-full border border-ink/10 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink/8 md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-sm font-semibold text-ink">
                  {link.label}
                </Link>
              ))}
              <CTAButton href="https://learn.alphonsoecosystem.app/auth" external>
                Start learning free
              </CTAButton>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
```

- [ ] **Step 3: Run to verify Header test passes**

Run: `npm run test -- Header`
Expected: PASS.

- [ ] **Step 4: Write the failing test for `Footer`**

```tsx
// components/layout/Footer.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("links legal pages out to the main app, not local pages", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /privacy/i })).toHaveAttribute(
      "href",
      "https://learn.alphonsoecosystem.app/privacy",
    );
    expect(screen.getByRole("link", { name: /terms/i })).toHaveAttribute(
      "href",
      "https://learn.alphonsoecosystem.app/terms",
    );
  });
});
```

- [ ] **Step 5: Implement `Footer`**

```tsx
// components/layout/Footer.tsx
import Link from "next/link";

const APP_URL = "https://learn.alphonsoecosystem.app";

export function Footer() {
  return (
    <footer className="border-t border-ink/8 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold text-ink">Alphonso</p>
            <p className="mt-2 max-w-xs text-sm text-ink-soft">
              English and French, one bite-size lesson at a time. Built by Obsidian Media.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-ink-soft">Product</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/features" className="text-ink hover:text-coral">Features</Link></li>
              <li><Link href="/pricing" className="text-ink hover:text-coral">Pricing</Link></li>
              <li><Link href="/download" className="text-ink hover:text-coral">Download</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-ink-soft">Legal</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href={`${APP_URL}/privacy`} className="text-ink hover:text-coral">Privacy</a></li>
              <li><a href={`${APP_URL}/terms`} className="text-ink hover:text-coral">Terms</a></li>
              <li><a href={`${APP_URL}/cookies`} className="text-ink hover:text-coral">Cookies</a></li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-xs text-ink-soft/70">
          © {new Date().getFullYear()} Obsidian Media. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: Run to verify Footer test passes**

Run: `npm run test -- Footer`
Expected: PASS.

- [ ] **Step 7: Wire both into `app/layout.tsx`**

```tsx
// app/layout.tsx — replace the body contents
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
// ...keep existing imports/metadata...

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${nunito.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 8: Verify full build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add Header/Footer and wire into root layout

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 5: GitHub repo, Vercel project, and Neon Postgres provisioning

No unit tests — this is infrastructure setup. Verification is a live, empty-but-working deployment and a confirmed `DATABASE_URL`.

**Files:** none (CLI/dashboard actions only), except:
- Create: `.env.local` (git-ignored, populated by `vercel env pull`)

- [ ] **Step 1: Create the GitHub repo and push**

```bash
cd D:/AgentDevWork/repos/LearnWithAlphonsoMarketing
gh repo create obsidian-media/LearnWithAlphonsoMarketing --private --source=. --remote=origin
git branch -M main
git push -u origin main
```

Expected: repo created at `github.com/obsidian-media/LearnWithAlphonsoMarketing`, push succeeds.

- [ ] **Step 2: Link the project to Vercel**

```bash
npx vercel@latest login   # only if not already authenticated
npx vercel@latest link --yes
```

If this requires an interactive team/account choice with no unambiguous default, stop and ask which Vercel team/scope to use before continuing.

- [ ] **Step 3: Provision Neon Postgres via the Vercel Marketplace**

```bash
npx vercel@latest integration add neon --yes
```

If this prompts for a paid plan or any choice beyond the free tier, stop and confirm with the user before proceeding — do not accept a paid tier silently.

- [ ] **Step 4: Deploy once to establish the project, then pull env vars**

```bash
npx vercel@latest deploy --yes
npx vercel@latest env pull .env.local --yes
```

Expected: `.env.local` now contains a real `DATABASE_URL` from Neon.

- [ ] **Step 5: Enable auto-deploy-on-push (Git integration)**

```bash
npx vercel@latest git connect --yes
```

Expected output confirms the Vercel project is linked to `obsidian-media/LearnWithAlphonsoMarketing`.

- [ ] **Step 6: Verify**

Run: `npx vercel@latest ls` — confirm a `READY` deployment exists.
Run (PowerShell or Bash): fetch the deployment URL and confirm a 200 response.

- [ ] **Step 7: Commit** (only if `vercel link`/`vercel git connect` created a `.vercel/` project.json worth tracking — check `.gitignore`; `.vercel/` is already ignored, so likely nothing to commit here. If `git status` shows no changes, skip the commit.)

---

### Task 6: Waitlist backend (Neon schema + API route)

**Files:**
- Create: `db/schema.ts`, `db/index.ts`, `drizzle.config.ts`
- Create: `app/api/waitlist/route.ts` + `app/api/waitlist/route.test.ts`

**Interfaces:**
- Consumes: `process.env.DATABASE_URL` (Task 5).
- Produces: `POST /api/waitlist` accepting `{ email: string }`, returning `201` on new signup, `200 { alreadyJoined: true }` on duplicate, `400 { error }` on invalid input — this exact contract is what `WaitlistForm` (Task 7) calls.

- [ ] **Step 1: `db/schema.ts`**

```ts
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const waitlistSignups = pgTable("waitlist_signups", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
```

- [ ] **Step 2: `db/index.ts` — lazy client (safe at build time, per Neon/Vercel guidance)**

```ts
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!_db) {
    const sql = neon(process.env.DATABASE_URL!);
    _db = drizzle(sql, { schema });
  }
  return _db;
}
```

- [ ] **Step 3: `drizzle.config.ts`**

```ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL! },
});
```

- [ ] **Step 4: Push the schema to the real (dev) Neon database**

Run: `npm run db:push`
Expected: `waitlist_signups` table created in Neon — confirm with `npx dotenv -e .env.local -- npx tsx -e "import {neon} from '@neondatabase/serverless'; const sql = neon(process.env.DATABASE_URL!); console.log(await sql\`select to_regclass('waitlist_signups')\`)"` printing a non-null value.

- [ ] **Step 5: Write the failing tests for the route handler**

```ts
// app/api/waitlist/route.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./route";

const insertMock = vi.fn();
vi.mock("@/db", () => ({
  getDb: () => ({ insert: () => ({ values: insertMock }) }),
}));

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/waitlist", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

describe("POST /api/waitlist", () => {
  beforeEach(() => insertMock.mockReset());

  it("rejects an invalid email with 400", async () => {
    const res = await POST(makeRequest({ email: "not-an-email" }));
    expect(res.status).toBe(400);
  });

  it("stores a valid email and returns 201", async () => {
    insertMock.mockResolvedValueOnce(undefined);
    const res = await POST(makeRequest({ email: "friend@example.com" }));
    expect(res.status).toBe(201);
    expect(insertMock).toHaveBeenCalledWith({ email: "friend@example.com" });
  });

  it("treats a duplicate-key error as an already-joined 200, not a failure", async () => {
    insertMock.mockRejectedValueOnce(new Error("duplicate key value violates unique constraint"));
    const res = await POST(makeRequest({ email: "friend@example.com" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.alreadyJoined).toBe(true);
  });
});
```

- [ ] **Step 6: Run to verify tests fail**

Run: `npm run test -- waitlist`
Expected: FAIL — `./route` module not found.

- [ ] **Step 7: Implement `app/api/waitlist/route.ts`**

```ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/db";
import { waitlistSignups } from "@/db/schema";

const bodySchema = z.object({ email: z.string().email() });

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    await getDb().insert(waitlistSignups).values({ email: parsed.data.email });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.toLowerCase().includes("duplicate") || message.toLowerCase().includes("unique")) {
      return NextResponse.json({ ok: true, alreadyJoined: true }, { status: 200 });
    }
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}
```

- [ ] **Step 8: Run to verify tests pass**

Run: `npm run test -- waitlist`
Expected: PASS (3 tests).

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add waitlist database schema and API route

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 7: `WaitlistForm` component

**Files:**
- Create: `components/download/WaitlistForm.tsx` + `WaitlistForm.test.tsx`

**Interfaces:**
- Consumes: `POST /api/waitlist` contract from Task 6.
- Produces: `<WaitlistForm />` — used by the Download page (Task 12).

- [ ] **Step 1: Write the failing test**

```tsx
// components/download/WaitlistForm.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { WaitlistForm } from "./WaitlistForm";

describe("WaitlistForm", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true }),
      }),
    );
  });

  it("submits the entered email and shows a success message", async () => {
    const user = userEvent.setup();
    render(<WaitlistForm />);

    await user.type(screen.getByLabelText(/email address/i), "friend@example.com");
    await user.click(screen.getByRole("button", { name: /notify me/i }));

    expect(await screen.findByRole("status")).toHaveTextContent(/you're on the list/i);
    expect(fetch).toHaveBeenCalledWith(
      "/api/waitlist",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("shows a distinct message for an already-joined email", async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true, alreadyJoined: true }),
    });
    const user = userEvent.setup();
    render(<WaitlistForm />);

    await user.type(screen.getByLabelText(/email address/i), "friend@example.com");
    await user.click(screen.getByRole("button", { name: /notify me/i }));

    expect(await screen.findByRole("status")).toHaveTextContent(/already on the list/i);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm run test -- WaitlistForm`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `WaitlistForm`**

```tsx
// components/download/WaitlistForm.tsx
"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(json.error ?? "Something went wrong. Try again.");
        return;
      }
      setStatus("success");
      setMessage(json.alreadyJoined ? "You're already on the list!" : "You're on the list!");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  if (status === "success") {
    return (
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="rounded-2xl bg-royal/10 px-5 py-4 text-sm font-semibold text-royal"
      >
        🦙 {message}
      </motion.p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row" noValidate>
      <label htmlFor="waitlist-email" className="sr-only">
        Email address
      </label>
      <input
        id="waitlist-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        className="w-full rounded-full border border-ink/10 bg-white px-5 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-coral"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="whitespace-nowrap rounded-full bg-gradient-to-r from-coral to-amber px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? "Joining..." : "Notify me on iOS"}
      </button>
      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          {message}
        </p>
      )}
    </form>
  );
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm run test -- WaitlistForm`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add iOS waitlist form component

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
git push
```

---

### Task 8: `ContentSection` and `FeatureGrid` (shared page-composition primitives)

**Files:**
- Create: `components/shared/ContentSection.tsx` + `ContentSection.test.tsx`
- Create: `components/shared/FeatureGrid.tsx` + `FeatureGrid.test.tsx`

**Interfaces:**
- Consumes: `SectionHeading` (Task 3).
- Produces: `<ContentSection eyebrow? title description? tone="cream"|"royal">{children}</ContentSection>` and `<FeatureGrid items={FeatureItem[]} />` (`FeatureItem = { title, description, icon }`) — both used by Home (Task 9–10), Features (Task 10), Pricing (Task 11).

- [ ] **Step 1: Write the failing test for `ContentSection`**

```tsx
// components/shared/ContentSection.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ContentSection } from "./ContentSection";

describe("ContentSection", () => {
  it("renders its heading and children", () => {
    render(
      <ContentSection title="Spaced repetition" description="Never forget what you learned.">
        <p>Body content</p>
      </ContentSection>,
    );
    expect(screen.getByRole("heading", { name: "Spaced repetition" })).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Implement `ContentSection`**

```tsx
// components/shared/ContentSection.tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { SectionHeading } from "./SectionHeading";

type ContentSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "cream" | "royal";
  children?: ReactNode;
};

export function ContentSection({ eyebrow, title, description, tone = "cream", children }: ContentSectionProps) {
  return (
    <section className={tone === "royal" ? "bg-royal py-20" : "bg-cream py-20"}>
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading eyebrow={eyebrow} title={title} description={description} tone={tone} />
        </motion.div>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Run to verify it passes**

Run: `npm run test -- ContentSection`
Expected: PASS.

- [ ] **Step 4: Write the failing test for `FeatureGrid`**

```tsx
// components/shared/FeatureGrid.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FeatureGrid } from "./FeatureGrid";
import { BookIcon } from "./icons";

describe("FeatureGrid", () => {
  it("renders one card per item", () => {
    render(
      <FeatureGrid
        items={[
          { title: "5 CEFR levels", description: "A1 through C1.", icon: <BookIcon /> },
          { title: "Two courses", description: "English and French.", icon: <BookIcon /> },
        ]}
      />,
    );
    expect(screen.getByRole("heading", { name: "5 CEFR levels" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Two courses" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Implement `FeatureGrid`**

```tsx
// components/shared/FeatureGrid.tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type FeatureItem = { title: string; description: string; icon: ReactNode };

export function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((item) => (
        <motion.li
          key={item.title}
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          className="rounded-3xl border border-ink/8 bg-white p-6"
        >
          <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-coral to-amber text-white">
            {item.icon}
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold text-ink">{item.title}</h3>
          <p className="mt-1 text-sm text-ink-soft">{item.description}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

- [ ] **Step 6: Run to verify it passes**

Run: `npm run test -- FeatureGrid`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add ContentSection and FeatureGrid composition primitives

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
git push
```

---

### Task 9: Home page — Hero

**Files:**
- Create: `components/home/Hero.tsx` + `Hero.test.tsx`
- Modify: `app/page.tsx` (replace placeholder with real Home page, starting with Hero)

**Interfaces:**
- Consumes: `CTAButton`, `MascotFloat` (Task 3).
- Produces: nothing further consumed (page-level section).

- [ ] **Step 1: Write the failing test**

```tsx
// components/home/Hero.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the headline, primary CTA, and an iOS coming-soon badge (not an App Store link)", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/actually sticks/i);
    expect(screen.getByRole("link", { name: /start learning free/i })).toHaveAttribute(
      "href",
      "https://learn.alphonsoecosystem.app/auth",
    );
    expect(screen.getByText(/coming soon.*ios/i)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /app store/i })).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Implement `Hero`**

```tsx
// components/home/Hero.tsx
"use client";

import { motion } from "framer-motion";
import { CTAButton } from "../shared/CTAButton";
import { MascotFloat } from "../shared/MascotFloat";

export function Hero() {
  return (
    <section className="overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral">
            English &amp; French, one lesson at a time
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
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-semibold text-ink-soft">
              🦙 Coming soon on iOS
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-sm"
        >
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

**Note:** if Task 2 fell back to the square badge instead of a cutout, change `src` here to `/mascot/alphonso-icon.png` and drop the `MascotFloat`'s implicit transparent-background assumption (the square badge already has its own background, so wrap it in a rounded card instead of letting it float bare) — check which file actually exists before writing this step.

- [ ] **Step 3: Run to verify it passes**

Run: `npm run test -- Hero`
Expected: PASS.

- [ ] **Step 4: Wire into `app/page.tsx`**

```tsx
// app/page.tsx
import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 5: Update/remove the now-outdated placeholder test**

Delete `app/page.test.tsx` from Task 1 (its assertion about the placeholder heading no longer applies) — Home's real content is covered by `Hero.test.tsx` plus the Task 15 e2e sweep.

- [ ] **Step 6: Run full suite**

Run: `npm run test`
Expected: PASS, no leftover failing/orphaned tests.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: build Home page hero section

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
git push
```

---

### Task 10: Home page — remaining sections

**Files:**
- Create: `components/home/HowItWorks.tsx` + `.test.tsx`
- Create: `components/home/StatsBand.tsx` + `.test.tsx`
- Create: `components/home/ThemesTeaser.tsx` + `.test.tsx`
- Modify: `app/page.tsx` (append sections after `Hero`)

**Interfaces:**
- Consumes: `ContentSection`, `FeatureGrid`, `AnimatedCounter`, icons (Tasks 3, 8).

- [ ] **Step 1: Write the failing test for `HowItWorks`**

```tsx
// components/home/HowItWorks.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { HowItWorks } from "./HowItWorks";

describe("HowItWorks", () => {
  it("lists all four steps in order", () => {
    render(<HowItWorks />);
    const headings = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(headings).toEqual([
      "Take the placement test",
      "Learn in bite-size lessons",
      "Review with spaced repetition",
      "Keep your streak alive",
    ]);
  });
});
```

- [ ] **Step 2: Implement `HowItWorks`**

```tsx
// components/home/HowItWorks.tsx
import { ContentSection } from "../shared/ContentSection";
import { FeatureGrid } from "../shared/FeatureGrid";
import { BookIcon, MicIcon, FlameIcon, TrophyIcon } from "../shared/icons";

const STEPS = [
  {
    title: "Take the placement test",
    description: "15 adaptive questions place you at the right CEFR level from day one.",
    icon: <TrophyIcon className="size-5" />,
  },
  {
    title: "Learn in bite-size lessons",
    description: "5-minute reps across 534 English or 125 French lessons, A1 through C1.",
    icon: <BookIcon className="size-5" />,
  },
  {
    title: "Review with spaced repetition",
    description: "Missed items resurface on a schedule tuned to help them actually stick.",
    icon: <MicIcon className="size-5" />,
  },
  {
    title: "Keep your streak alive",
    description: "Hearts, streak freezes, and weekly leagues make consistency feel good.",
    icon: <FlameIcon className="size-5" />,
  },
];

export function HowItWorks() {
  return (
    <ContentSection eyebrow="How it works" title="From placement test to fluency, step by step">
      <FeatureGrid items={STEPS} />
    </ContentSection>
  );
}
```

- [ ] **Step 3: Run to verify it passes**

Run: `npm run test -- HowItWorks`
Expected: PASS.

- [ ] **Step 4: Write the failing test for `StatsBand`**

```tsx
// components/home/StatsBand.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatsBand } from "./StatsBand";

describe("StatsBand", () => {
  it("shows the real content counts", () => {
    render(<StatsBand />);
    expect(screen.getByText("534")).toBeInTheDocument();
    expect(screen.getByText("125")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Implement `StatsBand`**

```tsx
// components/home/StatsBand.tsx
import { AnimatedCounter } from "../shared/AnimatedCounter";

const STATS = [
  { value: 534, unit: "English lessons" },
  { value: 125, unit: "French lessons" },
  { value: 5, unit: "CEFR levels, A1\u2013C1" },
];

export function StatsBand() {
  return (
    <section className="bg-royal py-16">
      <div className="mx-auto grid max-w-5xl gap-8 px-6 text-center sm:grid-cols-3">
        {STATS.map((stat) => (
          <div key={stat.unit} className="text-white">
            <AnimatedCounter value={stat.value} />
            <p className="mt-2 text-sm font-semibold text-white/80">{stat.unit}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

Note: `AnimatedCounter`'s own default text color (`text-ink`) is overridden visually by the surrounding dark `bg-royal` context needing light text — adjust `AnimatedCounter` in this task to accept an optional `tone?: "ink" | "white"` prop (default `"ink"`) so it renders correctly on both light and dark backgrounds:

```tsx
// components/shared/AnimatedCounter.tsx — amend the returned span's className
<span
  ref={ref}
  className={`font-display text-4xl font-semibold sm:text-5xl ${tone === "white" ? "text-white" : "text-ink"}`}
>
```

(add `tone = "ink"` to the prop destructuring, and pass `tone="white"` from `StatsBand`.)

- [ ] **Step 6: Run to verify it passes**

Run: `npm run test -- StatsBand AnimatedCounter`
Expected: PASS.

- [ ] **Step 7: Write the failing test for `ThemesTeaser`**

```tsx
// components/home/ThemesTeaser.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemesTeaser } from "./ThemesTeaser";

describe("ThemesTeaser", () => {
  it("names all three in-app themes", () => {
    render(<ThemesTeaser />);
    expect(screen.getByText("Meadow")).toBeInTheDocument();
    expect(screen.getByText("Studio Ink")).toBeInTheDocument();
    expect(screen.getByText("Manuscript")).toBeInTheDocument();
  });
});
```

- [ ] **Step 8: Implement `ThemesTeaser`**

```tsx
// components/home/ThemesTeaser.tsx
import { ContentSection } from "../shared/ContentSection";

const THEMES = [
  { name: "Meadow", swatch: "from-[#f6f0e4] to-[#5c7a5c]" },
  { name: "Studio Ink", swatch: "from-[#20263a] to-[#4a6fd4]" },
  { name: "Manuscript", swatch: "from-[#f6f5f4] to-[#7a2733]" },
];

export function ThemesTeaser() {
  return (
    <ContentSection
      eyebrow="Make it yours"
      title="Three themes, one you"
      description="Switch between Meadow, Studio Ink, and Manuscript any time — your pick syncs across devices."
    >
      <div className="grid gap-5 sm:grid-cols-3">
        {THEMES.map((theme) => (
          <div key={theme.name} className="overflow-hidden rounded-3xl border border-ink/8 bg-white">
            <div className={`h-24 bg-gradient-to-br ${theme.swatch}`} />
            <p className="p-4 font-display font-semibold text-ink">{theme.name}</p>
          </div>
        ))}
      </div>
    </ContentSection>
  );
}
```

- [ ] **Step 9: Run to verify it passes**

Run: `npm run test -- ThemesTeaser`
Expected: PASS.

- [ ] **Step 10: Assemble the full Home page**

```tsx
// app/page.tsx
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { StatsBand } from "@/components/home/StatsBand";
import { ThemesTeaser } from "@/components/home/ThemesTeaser";
import { CTAButton } from "@/components/shared/CTAButton";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <StatsBand />
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

- [ ] **Step 11: Run full test suite and build**

Run: `npm run test && npm run build`
Expected: both succeed.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat: complete Home page sections (how it works, stats, themes, footer CTA)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
git push
```

---

### Task 11: Features page

**Files:**
- Create: `app/features/page.tsx` + `app/features/page.test.tsx`

**Interfaces:**
- Consumes: `ContentSection`, `FeatureGrid`, icons.

- [ ] **Step 1: Write the failing test**

```tsx
// app/features/page.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FeaturesPage from "./page";

describe("Features page", () => {
  it("covers curriculum, AI conversation, spaced repetition, gamification, social, and themes", () => {
    render(<FeaturesPage />);
    expect(screen.getByRole("heading", { name: /cefr/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /ai conversation practice/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /spaced repetition/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /gamification/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Implement the page**

```tsx
// app/features/page.tsx
import type { Metadata } from "next";
import { ContentSection } from "@/components/shared/ContentSection";
import { FeatureGrid } from "@/components/shared/FeatureGrid";
import { BookIcon, MicIcon, FlameIcon, TrophyIcon, UsersIcon, PaletteIcon } from "@/components/shared/icons";

export const metadata: Metadata = {
  title: "Features",
  description: "Everything inside Learn with Alphonso: curriculum, AI conversation, spaced repetition, and gamification.",
};

const CURRICULUM = [
  { title: "5 CEFR levels", description: "A1 through C1, so you always know where you stand.", icon: <BookIcon className="size-5" /> },
  { title: "Two courses", description: "534 English lessons and 125 French lessons, both real, complete courses.", icon: <BookIcon className="size-5" /> },
  { title: "Adaptive placement", description: "A 15-question test starts you at the right level, not lesson one.", icon: <TrophyIcon className="size-5" /> },
];

const PRACTICE = [
  { title: "AI conversation practice", description: "Voice-enabled roleplay across 6 real-world scenarios.", icon: <MicIcon className="size-5" /> },
  { title: "Spaced repetition review", description: "An SM-2-style queue resurfaces exactly what you got wrong, on a schedule built to make it stick.", icon: <BookIcon className="size-5" /> },
];

const SOCIAL = [
  { title: "Gamification", description: "XP, streaks, streak freezes, and hearts that regenerate as you play.", icon: <FlameIcon className="size-5" /> },
  { title: "Leagues", description: "Bronze through Diamond, with global, friends, and country leaderboards.", icon: <TrophyIcon className="size-5" /> },
  { title: "Friends", description: "Invite friends, see their progress, and cheer each other on.", icon: <UsersIcon className="size-5" /> },
  { title: "Themes", description: "Meadow, Studio Ink, or Manuscript — pick the look that fits you.", icon: <PaletteIcon className="size-5" /> },
];

export default function FeaturesPage() {
  return (
    <main>
      <ContentSection eyebrow="Curriculum" title="A real CEFR-leveled curriculum, not a gimmick">
        <FeatureGrid items={CURRICULUM} />
      </ContentSection>
      <ContentSection eyebrow="Practice" title="AI conversation practice and spaced repetition" tone="royal">
        <FeatureGrid items={PRACTICE} />
      </ContentSection>
      <ContentSection eyebrow="Stay motivated" title="Gamification that respects your time">
        <FeatureGrid items={SOCIAL} />
      </ContentSection>
    </main>
  );
}
```

- [ ] **Step 3: Run to verify it passes**

Run: `npm run test -- features/page`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Features page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
git push
```

---

### Task 12: Pricing page

**Files:**
- Create: `app/pricing/page.tsx` + `app/pricing/page.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// app/pricing/page.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PricingPage from "./page";

describe("Pricing page", () => {
  it("shows Free and Hector Pro, with Pro clearly marked coming soon and not purchasable", () => {
    render(<PricingPage />);
    expect(screen.getByRole("heading", { name: /^free$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /hector/i })).toBeInTheDocument();
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /subscribe|buy|purchase/i })).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Implement the page**

```tsx
// app/pricing/page.tsx
import type { Metadata } from "next";
import { ContentSection } from "@/components/shared/ContentSection";
import { CTAButton } from "@/components/shared/CTAButton";
import { HeartIcon, MicIcon } from "@/components/shared/icons";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Learn with Alphonso is free. Hector, a second AI tutor mode, is coming soon.",
};

const FREE_FEATURES = [
  "Full English and French curriculum, all 5 CEFR levels",
  "Spaced repetition review queue",
  "AI conversation practice (6 scenarios)",
  "Streaks, hearts, leagues, and achievements",
];

export default function PricingPage() {
  return (
    <main>
      <ContentSection eyebrow="Pricing" title="Free to learn. Always.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-ink/8 bg-white p-8">
            <h3 className="font-display text-2xl font-semibold text-ink">Free</h3>
            <p className="mt-1 text-3xl font-semibold text-ink">$0</p>
            <ul className="mt-6 space-y-3 text-sm text-ink-soft">
              {FREE_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <HeartIcon className="mt-0.5 size-4 shrink-0 text-coral" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <CTAButton href="https://learn.alphonsoecosystem.app/auth" external>
                Start learning free
              </CTAButton>
            </div>
          </div>

          <div className="relative rounded-3xl border border-ink/8 bg-royal p-8 text-white">
            <span className="absolute right-6 top-6 rounded-full bg-amber px-3 py-1 text-xs font-bold uppercase tracking-wide text-royal-deep">
              Coming soon
            </span>
            <h3 className="font-display text-2xl font-semibold">Hector Pro</h3>
            <p className="mt-1 text-3xl font-semibold">$9.99/mo</p>
            <p className="mt-6 flex items-start gap-2 text-sm text-white/80">
              <MicIcon className="mt-0.5 size-4 shrink-0 text-amber" />
              A second AI conversation mode, Hector, for even more speaking practice. Not
              purchasable yet — we&apos;ll announce it here first.
            </p>
          </div>
        </div>
      </ContentSection>
    </main>
  );
}
```

- [ ] **Step 3: Run to verify it passes**

Run: `npm run test -- pricing/page`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Pricing page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
git push
```

---

### Task 13: Download page

**Files:**
- Create: `app/download/page.tsx` + `app/download/page.test.tsx`

**Interfaces:**
- Consumes: `WaitlistForm` (Task 7), `CTAButton` (Task 3).

- [ ] **Step 1: Write the failing test**

```tsx
// app/download/page.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DownloadPage from "./page";

describe("Download page", () => {
  it("offers the web app as the primary path and an email waitlist for iOS", () => {
    render(<DownloadPage />);
    expect(screen.getByRole("link", { name: /start learning free/i })).toHaveAttribute(
      "href",
      "https://learn.alphonsoecosystem.app/auth",
    );
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Implement the page**

```tsx
// app/download/page.tsx
import type { Metadata } from "next";
import { ContentSection } from "@/components/shared/ContentSection";
import { CTAButton } from "@/components/shared/CTAButton";
import { WaitlistForm } from "@/components/download/WaitlistForm";

export const metadata: Metadata = {
  title: "Download",
  description: "Start learning on the web today, or join the waitlist for iOS.",
};

export default function DownloadPage() {
  return (
    <main>
      <ContentSection eyebrow="Get started" title="Learn on the web today">
        <p className="max-w-xl text-ink-soft">
          The web app works on any device, right now, free — no download needed.
        </p>
        <div className="mt-6">
          <CTAButton href="https://learn.alphonsoecosystem.app/auth" external>
            Start learning free
          </CTAButton>
        </div>
      </ContentSection>

      <ContentSection eyebrow="Coming soon" title="Get notified when iOS launches" tone="royal">
        <div className="max-w-md">
          <WaitlistForm />
        </div>
      </ContentSection>
    </main>
  );
}
```

- [ ] **Step 3: Run to verify it passes**

Run: `npm run test -- download/page`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Download page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
git push
```

---

### Task 14: About page

**Files:**
- Create: `app/about/page.tsx` + `app/about/page.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// app/about/page.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AboutPage from "./page";

describe("About page", () => {
  it("introduces Alphonso and Obsidian Media", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { name: /alphonso/i })).toBeInTheDocument();
    expect(screen.getByText(/obsidian media/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Implement the page**

```tsx
// app/about/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { ContentSection } from "@/components/shared/ContentSection";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Alphonso and Learn with Alphonso.",
};

export default function AboutPage() {
  return (
    <main>
      <ContentSection eyebrow="Our story" title="Meet Alphonso">
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
          <Image
            src="/mascot/alphonso-icon.png"
            alt="Alphonso the llama"
            width={160}
            height={160}
            className="rounded-3xl"
          />
          <p className="max-w-xl text-ink-soft">
            Alphonso is a confident, sunglasses-wearing llama who believes a language sticks best
            in small, honest reps — not marathon cram sessions. Learn with Alphonso is built by{" "}
            <strong className="text-ink">Obsidian Media</strong> around that idea: bite-size
            lessons, real spaced repetition, and gamification that respects your time instead of
            manipulating it.
          </p>
        </div>
      </ContentSection>
    </main>
  );
}
```

- [ ] **Step 3: Run to verify it passes**

Run: `npm run test -- about/page`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add About page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
git push
```

---

### Task 15: SEO metadata, sitemap, robots

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`

- [ ] **Step 1: `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";

const BASE_URL = "https://learnwithalphonsomarketing.vercel.app";
const ROUTES = ["", "/features", "/pricing", "/download", "/about"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
```

- [ ] **Step 2: `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://learnwithalphonsomarketing.vercel.app/sitemap.xml",
  };
}
```

- [ ] **Step 3: Verify**

Run: `npm run build`, then `npm run dev` and confirm `http://localhost:3000/sitemap.xml` and `/robots.txt` both return valid content.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add sitemap and robots.txt

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
git push
```

---

### Task 16: Accessibility and cross-page E2E smoke

**Files:**
- Create: `playwright.config.ts`, `e2e/site.spec.ts`

- [ ] **Step 1: `playwright.config.ts`**

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  use: { baseURL: "http://localhost:3000" },
});
```

- [ ] **Step 2: Write the E2E test**

```ts
// e2e/site.spec.ts
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
```

- [ ] **Step 3: Install Playwright browsers and run**

Run: `npx playwright install --with-deps chromium && npm run test:e2e`
Expected: all tests pass. If `axe` reports violations, fix the underlying markup (e.g. missing `alt`, insufficient contrast, missing label) in the relevant component from earlier tasks — do not suppress the rule.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "test: add accessibility and cross-page e2e smoke tests

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
git push
```

---

### Task 17: Final production verification

No new files — this task confirms the live deployment actually works end to end.

- [ ] **Step 1: Confirm auto-deploy fired**

Run: `npx vercel@latest ls`
Expected: a new `READY` deployment with `source: "git"`, timestamped after the last push.

- [ ] **Step 2: Smoke-check every route on the live URL**

For the production URL from Step 1, request each of `/`, `/features`, `/pricing`, `/download`, `/about`, `/sitemap.xml`, `/robots.txt`, `/favicon.ico` and confirm every one returns `200`.

- [ ] **Step 3: Confirm the waitlist form works against the real deployment**

Submit a real test email through the live `/download` page's form, then verify the row landed in Neon:

```bash
npx dotenv -e .env.local -- npx tsx -e "import {neon} from '@neondatabase/serverless'; const sql = neon(process.env.DATABASE_URL!); console.log(await sql\`select email, created_at from waitlist_signups order by created_at desc limit 5\`)"
```

- [ ] **Step 4: Report the live URL back to the user**

No commit — this is a verification-only task. Summarize: live URL, GitHub repo URL, and anything that fell back to a degraded state (e.g. mascot cutout skipped in Task 2, badge used instead).

---

## Self-review notes

- **Spec coverage:** Home/Features/Pricing/Download/About all covered (Tasks 9–14); brand tone, tokens, and fonts covered (Task 1, Global Constraints); mascot pipeline with explicit fallback covered (Task 2, referenced again in Task 9); iOS "coming soon" (never a dead App Store link) enforced by Hero's own test (Task 9) and the constraint list; Hector "coming soon, not purchasable" enforced by Pricing's own test (Task 12); GitHub org + Vercel + isolated storage covered (Task 5, Task 6); legal pages link out rather than duplicate (Task 4's Footer test); accessibility and cross-page CTA consistency covered (Task 16); real screenshots explicitly out of scope, no task fabricates one.
- **Placeholder scan:** no TBD/TODO markers; every code step is complete, runnable code.
- **Type consistency:** `CTAButton({ href, children, variant?, external?, className? })` used identically in Tasks 3–14. `AnimatedCounter({ value, unit?, tone? })` — `tone` added in Task 10 alongside its one new caller (`StatsBand`); no earlier caller passes a conflicting shape. `ContentSection({ eyebrow?, title, description?, tone?, children? })` and `FeatureGrid({ items: FeatureItem[] })` used identically everywhere they appear. The `/api/waitlist` request/response contract defined in Task 6 (`{email}` in; `201`/`200 {alreadyJoined}`/`400 {error}` out) matches exactly what `WaitlistForm` (Task 7) sends and expects.
