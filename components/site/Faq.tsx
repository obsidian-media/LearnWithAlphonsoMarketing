import { Icon } from "./Icon";

/** Answers checked against the app on 2026-11-06 (privacy policy src/routes/privacy.tsx, lib/links.ts). */
export const FAQ_ITEMS = [
  {
    q: "Is it really free?",
    a: "Yes. Every course, the level test, the review, Practice with Alphonso, listening and the leagues are free. Hector, the AI voice tutor, is the only paid part.",
  },
  {
    q: "Which English does it teach?",
    a: "American English: American spelling, words and pronunciation.",
  },
  {
    q: "Is there an iPhone or Android app?",
    a: "The iPhone app is in a free public beta through Apple's TestFlight: anyone with the link can join. Android is planned. The web app works on any device today.",
  },
  {
    q: "Do the AI features send my voice anywhere?",
    a: "AI features run only after you allow them, and you can turn them off at any time. When they are on, your recorded speech goes to Deepgram to be turned into text, and your conversation text goes through OpenRouter to the AI model that replies. Neither trains on it. Lessons, review and the level test work with AI off. The Privacy Policy lists every provider.",
  },
  {
    q: "Can I delete my account and data?",
    a: "Yes, in the app, along with a full export of your data. No support ticket needed.",
  },
] as const;

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function Faq() {
  return (
    <section className="sec">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD).replace(/</g, "\\u003c") }}
      />
      <div className="wrap">
        <h2 className="d2 rv" style={{ textAlign: "center" }}>
          Questions people ask.
        </h2>
        <div className="faq">
          {FAQ_ITEMS.map((item, i) => (
            <details className="rv" key={item.q} open={i === 0}>
              <summary>
                {item.q}
                <Icon name="chevron" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
