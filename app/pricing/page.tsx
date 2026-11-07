import type { Metadata } from "next";
import Image from "next/image";
import { StartLearning } from "@/components/site/Buttons";
import { Icon } from "@/components/site/Icon";
import { LEVEL_RANGE, UNITS_TOTAL, courseList } from "@/lib/facts";
import { PRO } from "@/lib/pro-copy";
import { ART } from "@/lib/site-art";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Learn With Alphonso is free: ${courseList()} from ${LEVEL_RANGE}, the level test, the review, Practice with Alphonso and the leagues. Hector, the AI voice tutor, is the only paid part.`,
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

export default function PricingPage() {
  return (
    <main>
      <section className="wrap ph-head">
        <h1 className="d1" style={{ maxWidth: "14ch" }}>
          Free to learn. Hector is the extra.
        </h1>
        <p className="lede">
          The whole course is free and stays free. {PRO.name} adds one thing: Hector.
        </p>
      </section>
      <section className="wrap ph-body">
        <div className="plans">
          <article className="plan free rv">
            <Image
              className="fal"
              src={ART.pose.happy}
              alt=""
              width={640}
              height={640}
              sizes="250px"
            />
            <h2 className="d3">The whole course</h2>
            <div className="price">Free</div>
            <Checks
              items={[
                `${courseList()}: ${UNITS_TOTAL} units, ${LEVEL_RANGE}`,
                "The level test and the daily review",
                "Practice calls with Alphonso: scenarios and campaigns",
                "Listening episodes",
                "Streaks, leagues, teams and duels",
              ]}
            />
            <div>
              <StartLearning />
            </div>
          </article>
          <article className="plan pro rv">
            <div className="duo" aria-hidden="true">
              <Image
                className="a"
                src={ART.pose.talk}
                alt=""
                width={640}
                height={640}
                sizes="190px"
              />
              <Image
                className="h"
                src={ART.pose.hectorHappy}
                alt=""
                width={640}
                height={640}
                sizes="190px"
              />
            </div>
            <span className="over">{PRO.name}</span>
            <h2 className="d2">Hector</h2>
            <Checks
              items={[
                "An AI voice tutor for free conversation",
                "Remembers your level and weak spots",
                "A long conversation every day",
              ]}
            />
            <p className="price-slot">
              <b>{PRO.priceNote}</b>
              {PRO.priceDetail}
            </p>
            {PRO.status && <span className="soon">{PRO.status}</span>}
          </article>
        </div>
      </section>
    </main>
  );
}
