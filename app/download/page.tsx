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
import { IPHONE_BETA_URL, START_LEARNING_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Start learning on the web today, or join the free iPhone beta through TestFlight. Android is planned for later.",
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
          <CTAButton href={START_LEARNING_URL} external trackEvent="start_learning_click">
            Start learning free
          </CTAButton>
        </div>
      </ContentSection>

      <ContentSection
        eyebrow="iPhone app"
        title="Join the iPhone beta"
        tone="royal"
        visual={<GamificationMockup />}
      >
        <div className="max-w-md">
          <p className="text-sm text-white/80">
            The iPhone beta is open through TestFlight and free to join. You need an iPhone and the
            TestFlight app from Apple. It is a beta, so expect rough edges, and tell us what you
            find. Android is planned for later.
          </p>
          <div className="mt-5">
            <CTAButton
              href={IPHONE_BETA_URL}
              variant="secondary-inverted"
              external
              trackEvent="join_iphone_beta_click"
            >
              Join the iPhone beta
            </CTAButton>
          </div>
          <p className="mt-6 text-sm text-white/80">
            Prefer to wait for the App Store release? Leave your email and we&apos;ll tell you the
            day it&apos;s available.
          </p>
          <div className="mt-3">
            <WaitlistForm />
          </div>
          <p className="mt-3 text-xs text-white/60">
            We use your email only to tell you about the launch. See our{" "}
            <a
              href="https://learn.alphonsoecosystem.app/privacy"
              className="underline hover:text-white"
            >
              Privacy Policy
            </a>
            .
          </p>
          <div className="mt-4">
            <WaitlistCount count={waitlistCount} />
          </div>
        </div>
      </ContentSection>
    </main>
  );
}
