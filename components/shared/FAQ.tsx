import { SectionHeading } from "./SectionHeading";

const FAQS = [
  {
    q: "Is Learn with Alphonso free?",
    a: "Yes. The full curriculum, AI conversation practice, spaced repetition review and gamification are free.",
  },
  {
    q: "What languages can I learn?",
    a: "English, French, and Spanish, each with a full curriculum from A1 (beginner) to C1 (advanced).",
  },
  {
    q: "Is there an iPhone app?",
    a: "An iPhone beta is open through TestFlight, free to join. The web app works on any device today with no download. Android is planned for later.",
  },
  {
    q: "Do I need an account?",
    a: "Yes, a free one. Sign up with your email (we send a confirmation link) or with Google, then take the level test and start your first lesson.",
  },
  {
    q: "Is the AI chat optional? What does it send?",
    a: "AI features run only after you allow them, and you can turn them off any time. When on, your conversation text and written answers go to NVIDIA for replies and grading, and your voice recordings go to Deepgram for speech recognition. Lessons, review and the level test keep working with AI off. The app is rated 13+. See the Privacy Policy for the full list.",
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
