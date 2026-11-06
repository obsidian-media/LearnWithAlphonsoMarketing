import type { Metadata } from "next";
import Image from "next/image";
import { Icon } from "@/components/site/Icon";
import {
  APP_FACTS,
  CAMPAIGNS_TOTAL,
  COURSE_NOTE,
  LEAGUE_RANGE,
  LEVEL_RANGE,
  SCENARIOS_TOTAL,
  UNITS_TOTAL,
  courseList,
  formatCount,
} from "@/lib/facts";
import { LAUNCH } from "@/lib/launch-state";
import { PRO } from "@/lib/pro-copy";
import { ART, roomArt } from "@/lib/site-art";

export const metadata: Metadata = {
  title: "Features",
  description: `What is inside Learn With Alphonso: ${courseList()} from ${LEVEL_RANGE}, spoken practice with Alphonso, a daily review, listening and leagues. Hector is the only paid part.`,
};

function Checks({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((t) => (
        <li key={t}>
          <Icon name="check" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function FeaturesPage() {
  const perCourse = APP_FACTS.courses
    .map(
      (c, i) =>
        `${i === 0 ? `${c.label}${COURSE_NOTE[c.id] ? ` (${COURSE_NOTE[c.id]})` : ""}` : c.label} ${formatCount(c.units)}${i === 0 ? " units" : ""}`,
    )
    .join(", ");
  return (
    <main>
      <section className="wrap ph-head">
        <h1 className="d1" style={{ maxWidth: "13ch" }}>
          What&apos;s inside the app.
        </h1>
        <p className="lede">
          {courseList()}, from your first words to {LEVEL_RANGE.split(" to ")[1]}. Here is
          everything you get, and what is free.
        </p>
      </section>
      <section className="wrap ph-body">
        <div className="chapters">
          <article className="chapter wide rv">
            <div className="pic">
              <Image
                src={roomArt("classroom")}
                alt=""
                fill
                sizes="(min-width: 900px) 640px, 92vw"
              />
              <Image className="llama-s" src={ART.pose.talk} alt="" width={640} height={640} />
            </div>
            <div className="txt">
              <h2 className="d3">Learn</h2>
              <p className="body">
                {UNITS_TOTAL} units{LAUNCH.lessonRoomsLive ? ", each with its own room" : ""} and a
                few minutes per lesson.
              </p>
              <Checks
                items={[
                  perCourse,
                  "Listening, speaking, translating and fill-the-gap questions",
                  `Adaptive level test, ${LEVEL_RANGE}`,
                  "Hearts, XP and a daily streak",
                ]}
              />
            </div>
          </article>
          <article className="chapter rv">
            <div className="pic">
              <Image
                src={roomArt("restaurant")}
                alt=""
                fill
                sizes="(min-width: 900px) 600px, 92vw"
              />
              <Image className="llama-s" src={ART.pose.happy} alt="" width={640} height={640} />
            </div>
            <div className="txt">
              <h2 className="d3">Speak</h2>
              <p className="body">Call Alphonso in painted scenes. Free.</p>
              <Checks
                items={[
                  `${SCENARIOS_TOTAL} scenarios and ${CAMPAIGNS_TOTAL} story campaigns`,
                  "Every reply judged, every slip saved for review",
                ]}
              />
            </div>
          </article>
          <article className="chapter rv">
            <div className="pic">
              <Image src={roomArt("library")} alt="" fill sizes="(min-width: 900px) 600px, 92vw" />
              <Image className="llama-s" src={ART.hector} alt="" width={1024} height={1024} />
            </div>
            <div className="txt">
              <h2 className="d3">Talk freely with Hector</h2>
              <p className="body">
                No script, any topic. He remembers you between calls. {PRO.name}
                {PRO.status ? `, ${PRO.status.toLowerCase()}.` : "."}
              </p>
              <Checks
                items={["A long conversation every day", "Your level and weak spots, carried over"]}
              />
            </div>
          </article>
          <article className="chapter third rv">
            <div className="txt">
              <Icon name="words" className="cell-ico" />
              <h2 className="d3">Remember</h2>
              <p className="body">
                A spaced review of the words and mistakes you are about to lose.
              </p>
            </div>
          </article>
          <article className="chapter third rv">
            <div className="txt">
              <Icon name="speaker" className="cell-ico" />
              <h2 className="d3">Listen</h2>
              <p className="body">
                Audio episodes with transcripts and a player that remembers where you were.
              </p>
            </div>
          </article>
          <article className="chapter third rv">
            <div className="txt">
              <Icon name="league" className="cell-ico" />
              <h2 className="d3">Keep going</h2>
              <p className="body">Leagues from {LEAGUE_RANGE}, teams, duels and a study buddy.</p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
