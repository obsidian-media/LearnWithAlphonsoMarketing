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
