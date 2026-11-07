import type { Metadata } from "next";
import Image from "next/image";
import { count } from "drizzle-orm";
import { getDb } from "@/db";
import { waitlistSignups } from "@/db/schema";
import { JoinIphoneBeta, StartLearning } from "@/components/site/Buttons";
import { Icon } from "@/components/site/Icon";
import { WaitlistForm } from "@/components/download/WaitlistForm";
import { WaitlistCount } from "@/components/download/WaitlistCount";
import { LAUNCH } from "@/lib/launch-state";
import { ART, SCREENS, roomArt } from "@/lib/site-art";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Start learning on the web today, or join the free iPhone beta through TestFlight. Android is planned for later.",
};

// Without this, Next.js would statically prerender this page once at build time and the count would only
// update on the next deploy. Re-checking the database every 60s keeps it current without a query per request.
export const revalidate = 60;

async function getWaitlistCount(): Promise<number | null> {
  try {
    const [row] = await getDb().select({ value: count() }).from(waitlistSignups);
    return row?.value ?? 0;
  } catch {
    // A database hiccup should not take the page down: WaitlistCount renders nothing for null.
    return null;
  }
}

export default async function DownloadPage() {
  const waitlistCount = await getWaitlistCount();
  const stillWaiting = [
    !LAUNCH.iosOnAppStore && "App Store",
    !LAUNCH.androidOnPlay && "Android",
  ].filter(Boolean);

  return (
    <main>
      <section className="wrap ph-head">
        <h1 className="d1" style={{ maxWidth: "14ch" }}>
          Start on the web today.
        </h1>
        <p className="lede">
          The web app works on any phone or computer. The iPhone app is in public beta.
        </p>
      </section>
      <section className="wrap ph-body">
        <div className="dl">
          <article className="dl-card web rv">
            <Image
              className="wroom"
              src={roomArt("library")}
              alt=""
              fill
              sizes="(min-width: 900px) 1140px, 92vw"
            />
            <span className="ico-chip">
              <Icon name="book" />
            </span>
            <span className="over">Ready today</span>
            <h2 className="d2">Web app</h2>
            <p className="body">
              Open it in your browser and start your first lesson in a minute. Your progress follows
              you to the iPhone app.
            </p>
            <ul className="wfacts">
              {[
                "Nothing to install",
                "Any phone, tablet or computer",
                "Sign in with email or Google",
              ].map((t) => (
                <li key={t}>
                  <Icon name="check" />
                  {t}
                </li>
              ))}
            </ul>
            <div>
              <StartLearning />
            </div>
            {LAUNCH.lessonRoomsLive && (
              <div className="pair" aria-hidden="true">
                <div className="phone pa">
                  <Image src={SCREENS.start.src} alt="" width={520} height={1127} />
                </div>
                <div className="phone pb">
                  <Image src={SCREENS.question.src} alt="" width={520} height={1127} />
                </div>
                <Image
                  className="peek"
                  src={ART.pose.happy}
                  alt=""
                  width={640}
                  height={640}
                  sizes="200px"
                />
              </div>
            )}
          </article>
          <article className="dl-card rv">
            <h2 className="d3">iPhone beta</h2>
            <ol className="steps">
              <li>Install TestFlight from the App Store</li>
              <li>Open the beta invite on your iPhone</li>
              <li>Sign in with the same account</li>
            </ol>
            <p className="small-note">
              It is a beta, so expect rough edges, and tell us what you find.
            </p>
            <div>
              <JoinIphoneBeta />
            </div>
          </article>
          {stillWaiting.length > 0 && (
            <article className="dl-card rv">
              <h2 className="d3">{stillWaiting.join(" and ")}</h2>
              <p className="body">
                Not out yet. Leave your email and we will tell you the day it is ready.
              </p>
              <WaitlistForm />
              <p className="small-note">
                We use your email only to tell you about the launch. See our{" "}
                <a href="https://learn.alphonsoecosystem.app/privacy">Privacy Policy</a>.
              </p>
              <WaitlistCount count={waitlistCount} />
            </article>
          )}
        </div>
      </section>
    </main>
  );
}
