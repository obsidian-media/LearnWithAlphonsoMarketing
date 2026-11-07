import type { Metadata } from "next";
import Image from "next/image";
import { Icon } from "@/components/site/Icon";
import type { IconName } from "@/components/shared/icon-sprite.generated";
import { LEVEL_RANGE, SCENARIOS_TOTAL, courseList } from "@/lib/facts";
import { ART, roomArt } from "@/lib/site-art";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Alphonso, Hector and Learn With Alphonso.",
};

const VALUES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "flame",
    title: "Small, honest reps",
    text: "Short daily lessons beat marathon cram sessions. Spaced repetition brings words back right before you would forget them.",
  },
  {
    icon: "mic",
    title: "Real conversations, not flashcards",
    text: `${SCENARIOS_TOTAL} Practice scenarios adapt to your level, from ordering coffee to a job interview.`,
  },
  {
    icon: "league",
    title: "Game mechanics that respect your time",
    text: "Streaks, hearts and leagues built to keep you consistent, not to pull you back into the app.",
  },
  {
    icon: "book",
    title: `${courseList()}, ${LEVEL_RANGE}`,
    text: "Every course runs the whole way, from your first words to confident conversation.",
  },
];

function Portrait({ room, art, alt }: { room: string; art: string; alt: string }) {
  return (
    <div className="h-art">
      <div className="arch">
        <Image
          className="room"
          src={roomArt(room)}
          alt=""
          fill
          sizes="(min-width: 900px) 470px, 92vw"
        />
      </div>
      <Image
        className="llama"
        src={art}
        alt={alt}
        width={1024}
        height={1024}
        sizes="(min-width: 900px) 460px, 90vw"
      />
    </div>
  );
}

export default function AboutPage() {
  return (
    <main>
      <section className="sec">
        <div className="wrap hector-grid">
          <Portrait
            room="room-light"
            art={ART.alphonso}
            alt="Alphonso, a llama in a navy and gold robe and blue sunglasses"
          />
          <div className="stack rv">
            <h1 className="d1">Meet Alphonso.</h1>
            <p className="lede">
              A confident llama in a navy and gold robe who believes a language sticks best in
              small, honest reps. Learn With Alphonso is built by Obsidian Media around that idea:
              short lessons, real spaced repetition, and game mechanics that respect your time.
            </p>
          </div>
        </div>
      </section>
      <section className="sec hector on-hero">
        <div className="wrap hector-grid">
          <Portrait
            room="library"
            art={ART.hector}
            alt="Hector, a llama in a green jacket with goggles and a headset"
          />
          <div className="stack rv">
            <h2 className="d2">And then there&apos;s Hector.</h2>
            <p className="lede">
              Where Alphonso keeps you moving through lessons, Hector is the AI voice tutor for free
              conversation. He remembers your level and what you are working on between calls. Like
              every AI feature, he only runs after you allow AI in the app, and you can turn it off
              any time.
            </p>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap lesson-grid">
          <h2 className="d2 rv">Built on a few rules we don&apos;t break.</h2>
          <ul className="feat-list rv">
            {VALUES.map((v) => (
              <li key={v.title}>
                <span className="ico">
                  <Icon name={v.icon} />
                </span>
                <div>
                  <b>{v.title}</b>
                  <span className="body">{v.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
