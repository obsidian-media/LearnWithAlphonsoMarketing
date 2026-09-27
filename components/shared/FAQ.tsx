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
