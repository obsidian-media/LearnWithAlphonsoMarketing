# Learn with Alphonso — Marketing Site Design

Status: approved 2026-09-20. Source app: `D:\AgentDevWork\repos\LearnWithAlphonso`
(`obsidian-media/LearnWithAlphonso`, production at `learn.alphonsoecosystem.app`).

## Purpose

A standalone marketing website for "Learn with Alphonso," a mobile-first
English (+ French) learning app, in its own repo/deploy (this repo). Goal:
drive sign-ups to the live web app and capture interest for the not-yet-shipped
iOS release. This is a new project — no existing marketing site to extend.

## Product facts this site must represent accurately

Pulled from the app repo's `README.md`/`ARCHITECTURE.md` on 2026-09-20 —
re-verify counts/status against that repo before reusing this doc long after
that date.

- **What it is**: bite-size, gamified English/French lessons, 5 CEFR levels
  (A1→C1) per course, spaced-repetition review (SM-2), AI voice conversation
  practice (6 scenarios, free), streaks/hearts/leagues/achievements,
  friends + leaderboards (global/friends/country).
- **Content volume**: English 534 lessons / 2,718 questions across A1–C1;
  French 125 lessons / 625 questions (complete 5-level course, thinner than
  English but not a stub).
- **Platforms**: web app (TanStack Start, `learn.alphonsoecosystem.app`) is
  live today. Native iOS app ("Learn With Alphonso",
  `com.obsidianmedia.learnwithalphonso`) has an App Store Connect record but
  **no shipped TestFlight/App Store build yet** — do not link to a real App
  Store URL; use a "coming soon" / notify-me treatment instead.
- **Pro tier**: "Hector," a second AI conversation mode, $9.99/mo via
  RevenueCat — **not purchasable yet** (Test Store key only, no real
  Offering/Package). Must be marked "coming soon," never a working buy button.
- **Themes**: 3 user-selectable in-app themes (Meadow default, Studio Ink,
  Manuscript) — worth a teaser, not a deep feature.
- **Brand**: mascot "Alphonso," a sunglasses-wearing llama in a royal
  blue/gold jacket on an orange-to-amber gradient (source asset:
  `C:\Users\AgentDev\Downloads\Gemini_Generated_Image_4frny74frny74frn.jpg`).
  The in-app UI itself is calm/editorial (Fraunces serif, muted
  parchment/moss/ember palette, "English, quietly built" tagline) — a
  deliberately different, quieter register than this marketing site.
- **Company**: Obsidian Media.

## Direction (decided with user, 2026-09-20)

- **Brand tone**: playful, mascot-led, "alive" — not a copy of the app's
  quiet interior register. Headlines keep **Fraunces** (the app's own
  display serif) as a thread of continuity; body/UI uses a friendly rounded
  sans. Color system pulls from the logo: coral-to-amber gradient, royal
  blue, gold trim, on a clean off-white base (not gradient-soup).
- **Primary CTA**: web app sign-up (`learn.alphonsoecosystem.app/auth`),
  everywhere. Secondary: iOS "notify me" — no dead App Store link.
- **GitHub org**: `obsidian-media` (confirmed org access).
- **Domain**: default Vercel subdomain for v1; custom domain later.
- **Scope**: multi-page — Home, Features, Pricing/Pro, Download, About.

## Site structure

- **Home** (`/`) — hero (mascot, value prop, primary CTA, iOS coming-soon
  badge), "how it works" strip (placement test → lessons → SRS review →
  streaks/leagues), gamification highlight reel, themes teaser, stats
  (534/125 lesson counts, 5 CEFR levels), footer CTA.
- **Features** (`/features`) — CEFR curriculum, AI voice conversation
  practice, spaced repetition explained, gamification mechanics,
  friends/leaderboards, themes.
- **Pricing** (`/pricing`) — Free tier vs. Hector Pro, Pro marked "coming
  soon," no working payment flow.
- **Download** (`/download`) — web app CTA (works today), iOS email
  waitlist capture, QR code to the web app.
- **About** (`/about`) — the Alphonso character, short mission note,
  Obsidian Media mention.
- Shared `Header` (nav + primary CTA) and `Footer` (links, socials if any,
  legal — link out to the app's own `/privacy`, `/terms`, `/cookies` rather
  than duplicating that content here).

## Tech stack

- Next.js 15, App Router, TypeScript.
- Tailwind CSS v4, hand-written components (no shadcn/UI-kit, consistent
  with the main app's own "no UI kit" convention).
- Framer Motion for scroll reveals, hero parallax, hover/tap
  micro-interactions, animated stat counters, page transitions — tuned for
  restraint, not gratuitous bounce.
- `next/font` for Fraunces + the chosen sans; `next/image` for asset
  optimization.
- No backend/database needed for v1 — the only "dynamic" bit is the iOS
  waitlist email capture, which needs a real storage target (decide at
  build time: Supabase table in the *main* app's project vs. a simple
  third-party form service — do not hardcode a provider without checking
  the `marketplace` skill first, per this environment's Vercel guidance).

## Mascot asset pipeline

Source is a square app-icon (rounded corners, baked-in gradient
background) — good as-is for favicon/logo lockup. For a free-floating hero
mascot, run it through a background-removal tool to get a transparent
cutout. If the cutout looks rough at hero scale (small source image),
fall back to using the square icon as a framed badge rather than a
stretched/blurry cutout — never ship a visibly degraded mascot image.

## Content honesty constraint

The main app's dev server does not boot in this development sandbox, so
no real in-app screenshots exist this session. Use illustrative stylized
mockups (device frames with representative, clearly-not-a-real-screenshot
UI) rather than fabricating fake screenshots. Real screenshots can be
swapped in later.

## Deployment

- New GitHub repo `obsidian-media/LearnWithAlphonsoMarketing`, pushed from
  this local repo.
- New Vercel project, Git-connected to that repo for auto-deploy-on-push,
  initial domain is the default `*.vercel.app` one.

## Out of scope for v1

- Custom domain purchase/DNS.
- Real App Store link (until a build actually ships).
- Working Pro/Hector purchase flow.
- Blog/CMS.
- Real in-app screenshots (mockups stand in for now).
