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
