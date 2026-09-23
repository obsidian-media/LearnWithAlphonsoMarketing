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
