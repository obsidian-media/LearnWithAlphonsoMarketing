import { Hero } from "@/components/home/Hero";
import { AppScreens } from "@/components/home/AppScreens";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LessonDemo } from "@/components/home/LessonDemo";
import { StatsBand } from "@/components/home/StatsBand";
import { CompeteTeaser } from "@/components/home/CompeteTeaser";
import { ListenTeaser } from "@/components/home/ListenTeaser";
import { ThemesTeaser } from "@/components/home/ThemesTeaser";
import { CTAButton } from "@/components/shared/CTAButton";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FAQ } from "@/components/shared/FAQ";
import { IPHONE_BETA_URL, START_LEARNING_URL } from "@/lib/links";

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <SectionHeading
            eyebrow="Try one now"
            title="This is an actual question from the course"
            description="Not a screenshot: a real multiple-choice item, same format as the app. You do not need an account to try this one."
          />
        </div>
        <div className="mt-10 px-6">
          <LessonDemo />
        </div>
      </section>
      <HowItWorks />
      <AppScreens />
      <StatsBand />
      <CompeteTeaser />
      <ListenTeaser />
      <ThemesTeaser />
      <FAQ />
      <section className="bg-cream py-20 text-center">
        <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Ready when you are.
        </h2>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <CTAButton href={START_LEARNING_URL} external trackEvent="start_learning_click">
            Start learning free
          </CTAButton>
          <CTAButton
            href={IPHONE_BETA_URL}
            variant="secondary"
            external
            trackEvent="join_iphone_beta_click"
          >
            Join the iPhone beta
          </CTAButton>
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          Free account with email or Google. iPhone beta via TestFlight. Android coming later.
        </p>
      </section>
    </main>
  );
}
