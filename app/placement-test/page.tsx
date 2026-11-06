import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/site/Buttons";
import { Icon } from "@/components/site/Icon";
import type { IconName } from "@/components/shared/icon-sprite.generated";
import { APP_FACTS, LEVEL_RANGE, courseList, formatCount } from "@/lib/facts";
import { START_LEARNING_URL } from "@/lib/links";
import { ART, roomArt } from "@/lib/site-art";

const MAX = formatCount(APP_FACTS.placement.maxQuestions);

export const metadata: Metadata = {
  title: "Free CEFR Placement Test",
  description: `A free adaptive test of up to ${MAX} questions finds your CEFR level (${LEVEL_RANGE}) in ${courseList("or")}, so you do not have to guess which lesson to start on.`,
};

/** How the page describes each placement question type the app draws from. A new type fails the build here. */
const TYPE_COPY: Record<string, { title: string; text: string; icon: IconName }> = {
  mc: {
    title: "Multiple choice",
    text: "Recognising vocabulary and grammar at each level.",
    icon: "book",
  },
  listening: {
    title: "Listening",
    text: "Understanding spoken language, not just reading it. Skipped when your device cannot play audio.",
    icon: "speaker",
  },
  translate: {
    title: "Written translation",
    text: "Producing the language yourself, not just recognising it.",
    icon: "words",
  },
};

export default function PlacementTestPage() {
  const types = APP_FACTS.placement.questionTypes.map((t) => {
    const copy = TYPE_COPY[t];
    if (!copy) throw new Error(`placement question type "${t}" has no description on the site`);
    return copy;
  });
  return (
    <main>
      <section className="sec">
        <div className="wrap hector-grid">
          <div className="h-art">
            <div className="arch">
              <Image
                className="room"
                src={roomArt("classroom")}
                alt=""
                fill
                sizes="(min-width: 900px) 470px, 92vw"
              />
            </div>
            <Image
              className="llama"
              src={ART.alphonso}
              alt="Alphonso in the classroom"
              width={1024}
              height={1024}
              sizes="(min-width: 900px) 460px, 90vw"
            />
          </div>
          <div className="stack rv">
            <h1 className="d1">Find your level before your first lesson.</h1>
            <p className="lede">
              Starting everyone at lesson one wastes time for anyone who already knows some of the
              language. A free adaptive test of up to {MAX} questions places you from {LEVEL_RANGE},
              in {courseList("or")}.
            </p>
            <div className="cta-row">
              <ButtonLink href={START_LEARNING_URL} external trackEvent="start_learning_click">
                Take the placement test free
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
      <section className="sec sec-sunk">
        <div className="wrap lesson-grid">
          <h2 className="d2 rv">The same question types the course uses.</h2>
          <ul className="feat-list rv">
            {types.map((t) => (
              <li key={t.title}>
                <span className="ico">
                  <Icon name={t.icon} />
                </span>
                <div>
                  <b>{t.title}</b>
                  <span className="body">{t.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="sec">
        <div className="wrap stack rv" style={{ maxWidth: 820 }}>
          <h2 className="d2">Why no speaking questions?</h2>
          <p className="body">
            Speaking is part of the course itself, but not the placement test. Asking for microphone
            access before you have even seen the app risks a question you can never answer, because
            a denial would leave it blank.
          </p>
        </div>
      </section>
    </main>
  );
}
