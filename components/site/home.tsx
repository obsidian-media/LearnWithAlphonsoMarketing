import Image from "next/image";
import Link from "next/link";
import {
  APP_FACTS,
  COURSE_NOTE,
  LEAGUE_RANGE,
  LESSONS_TOTAL,
  LEVEL_RANGE,
  ROOMS_TOTAL,
  UNITS_TOTAL,
  courseList,
  formatCount,
  nativeName,
} from "@/lib/facts";
import { LAUNCH } from "@/lib/launch-state";
import { PRO } from "@/lib/pro-copy";
import { ART, MARQUEE_POSES, SCREENS, roomArt } from "@/lib/site-art";
import { JoinIphoneBeta, StartLearning, ButtonLink } from "./Buttons";
import { Icon } from "./Icon";
import { TryQuestion } from "./TryQuestion";

export function HomeHero() {
  const scene = APP_FACTS.heroScenario;
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 className="d1">
              <span className="mark">Talk</span> your way into a new language.
            </h1>
            <p className="lede">
              {courseList("or")}, {LEVEL_RANGE}. Short lessons, a daily review and spoken practice
              with Alphonso. Free.
            </p>
            <div className="cta-row">
              <StartLearning />
              <JoinIphoneBeta />
            </div>
          </div>
          <div className="hero-art">
            <div className="arch">
              <Image
                className="room"
                src={roomArt(scene.room)}
                alt=""
                fill
                sizes="(min-width: 900px) 500px, 92vw"
                priority
              />
            </div>
            <Image
              className="llama"
              src={ART.alphonso}
              alt="Alphonso, a llama in a navy and gold robe and blue sunglasses"
              width={1024}
              height={1024}
              sizes="(min-width: 900px) 480px, 88vw"
              priority
            />
            <div className="bubble b1">
              <span className="play" aria-hidden="true">
                <Icon name="play" solid />
              </span>
              <span>
                <span className="over">{scene.title}</span>
                <b>{scene.opener}</b>
              </span>
            </div>
            <div className="bubble b2">
              <Icon name="mic" />
              Your turn to speak
            </div>
          </div>
        </div>
        <div className="langs">
          {APP_FACTS.courses.map((c) => (
            <Link className="lang" href="/features" key={c.id}>
              <strong lang={c.id}>{nativeName(c.id)}</strong>
              <span>
                {COURSE_NOTE[c.id] ? `${COURSE_NOTE[c.id]}, ` : ""}
                {formatCount(c.units)} units
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrySection() {
  return (
    <section className="sec sec-sunk">
      <div className="wrap try-grid">
        <div className="stack rv">
          <div className="try-al">
            <Image src={ART.pose.hmm} alt="" width={132} height={132} />
          </div>
          <h2 className="d2">Try one before you sign up.</h2>
          <p className="body">
            This question is from the{" "}
            {APP_FACTS.courses.find((c) => c.id === APP_FACTS.demoQuestion.course)?.label} course,
            level {APP_FACTS.demoQuestion.level}. Pick an answer and press Check, the same way the
            app works.
          </p>
        </div>
        <TryQuestion />
      </div>
    </section>
  );
}

export function LessonSection() {
  if (!LAUNCH.lessonRoomsLive) return null;
  return (
    <section className="sec">
      <div className="wrap lesson-grid">
        <div className="stack rv">
          <h2 className="d2">Lessons with a voice, a face and a room.</h2>
          <p className="lede">
            Alphonso asks, you answer. Each lesson mixes listening, speaking and writing, and takes
            a few minutes.
          </p>
          <ul className="feat-list">
            <li>
              <span className="ico">
                <Icon name="speaker" />
              </span>
              <div>
                <b>Hear it first</b>
                <span className="body">
                  Questions are read aloud, in the voice you choose in Settings.
                </span>
              </div>
            </li>
            <li>
              <span className="ico">
                <Icon name="mic" />
              </span>
              <div>
                <b>Say it out loud</b>
                <span className="body">
                  Speaking questions check what you said, not just what you tapped.
                </span>
              </div>
            </li>
            <li>
              <span className="ico">
                <Icon name="words" />
              </span>
              <div>
                <b>Write it yourself</b>
                <span className="body">
                  Translate and fill the gap, so you produce the language too.
                </span>
              </div>
            </li>
          </ul>
          <div className="numline">
            <span className="n">{LESSONS_TOTAL}</span>
            <span className="u">
              lessons in {UNITS_TOTAL} units, across {courseList()}
            </span>
          </div>
        </div>
        <div className="cascade rv">
          <div className="phone p1">
            <Image
              src={SCREENS.listening.src}
              alt={SCREENS.listening.alt}
              width={520}
              height={1127}
            />
          </div>
          <div className="phone p2">
            <Image
              src={SCREENS.question.src}
              alt={SCREENS.question.alt}
              width={520}
              height={1127}
            />
          </div>
          <div className="phone p3">
            <Image src={SCREENS.right.src} alt={SCREENS.right.alt} width={520} height={1127} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function RoomsMarquee() {
  if (!LAUNCH.lessonRoomsLive) return null;
  const figure = (r: (typeof APP_FACTS.rooms)[number], i: number, hidden: boolean) => (
    <figure
      className="room"
      key={`${hidden ? "b" : "a"}-${r.id}`}
      aria-hidden={hidden || undefined}
    >
      <div className="ph">
        <Image className="bg" src={roomArt(r.id)} alt="" fill sizes="240px" />
        <Image
          className="al"
          src={MARQUEE_POSES[i % MARQUEE_POSES.length]!}
          alt=""
          width={640}
          height={640}
          sizes="240px"
        />
      </div>
      <figcaption>{r.name}</figcaption>
    </figure>
  );
  return (
    <section className="sec sec-sunk">
      <div className="wrap rooms-head rv">
        <h2 className="d2">{ROOMS_TOTAL} painted rooms, one for every topic.</h2>
        <p className="lede">
          Order in the café, check in at the hotel, argue in the debate hall. The room tells you
          what the unit is about before a word is said.
        </p>
      </div>
      <div className="marquee">
        <div className="track">
          {APP_FACTS.rooms.map((r, i) => figure(r, i, false))}
          {APP_FACTS.rooms.map((r, i) => figure(r, i, true))}
        </div>
      </div>
    </section>
  );
}

export function AroundTheLesson() {
  const middle = APP_FACTS.levels[Math.floor(APP_FACTS.levels.length / 2)];
  return (
    <section className="sec">
      <div className="wrap">
        <h2 className="d2 rv" style={{ maxWidth: "16ch" }}>
          Everything around the lesson.
        </h2>
        <div className="bento">
          <article className="cell gold b-level rv">
            <Icon name="target" className="cell-ico" />
            <h3 className="d3">Start where you really are.</h3>
            <p className="body">
              A short adaptive level test places you from {LEVEL_RANGE}, so nobody starts at
              &quot;hello&quot; by default.
            </p>
            <Image
              className="cell-al"
              src={ART.pose.wow}
              alt=""
              width={640}
              height={640}
              sizes="330px"
            />
            <ul className="levels" aria-label="Levels">
              {APP_FACTS.levels.map((l) => (
                <li key={l} className={l === middle ? "here" : undefined}>
                  {l}
                </li>
              ))}
            </ul>
          </article>
          <article className="cell b-review rv">
            <Icon name="words" className="cell-ico" />
            <h3 className="d3">A review that knows what you forget.</h3>
            <p className="body">Missed words come back on a schedule, right before they slip.</p>
            <div className="cards" aria-label="Example review cards">
              <div className="wcard" lang="es">
                la cuenta <small lang="en">the bill</small>
              </div>
              <div className="wcard" lang="fr">
                le quai <small lang="en">the platform</small>
              </div>
              <div className="wcard">
                to run late <small>be behind time</small>
              </div>
            </div>
          </article>
          <article className="cell photo b-listen rv">
            <Image
              className="bg"
              src={roomArt("radio")}
              alt=""
              fill
              sizes="(min-width: 900px) 400px, 92vw"
            />
            <div className="scrim">
              <h3 className="d3">Listen on the go.</h3>
              <p className="body">Short audio episodes with transcripts, on the web and iPhone.</p>
            </div>
          </article>
          <article className="cell b-streak rv">
            <p className="flame">
              <Icon name="flame" solid />
              Streaks and leagues
            </p>
            <p className="body">
              Weekly leagues from {LEAGUE_RANGE}, plus teams and duels if you like company.
            </p>
            <ul className="tiers" aria-label="Leagues">
              {APP_FACTS.leagues.map((t) => (
                <li key={t.label} style={{ ["--t" as string]: `var(--c-league-${t.token})` }}>
                  <i aria-hidden="true" />
                  {t.label}
                </li>
              ))}
            </ul>
          </article>
          {LAUNCH.profileAvatarsLive && (
            <article className="cell navy b-avatar rv">
              <h3 className="d3">Pick your animal.</h3>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}

export function HectorBand() {
  return (
    <section className="sec hector on-hero">
      <div className="wrap hector-grid">
        <div className="h-art rv">
          <div className="arch">
            <Image
              className="room"
              src={roomArt("library")}
              alt=""
              fill
              sizes="(min-width: 900px) 470px, 92vw"
            />
          </div>
          <Image
            className="llama"
            src={ART.hector}
            alt="Hector, a llama in a green jacket with goggles and a headset"
            width={1024}
            height={1024}
            sizes="(min-width: 900px) 460px, 90vw"
          />
          <div className="procard" aria-hidden="true">
            <span className="over">{PRO.name}</span>
            <span className="chipgold" />
            <b>Hector</b>
          </div>
        </div>
        <div className="stack rv" style={{ gap: 22 }}>
          <span className="over">{PRO.name}</span>
          <h2 className="d2">Hector, a tutor who remembers you.</h2>
          <p className="lede">
            An AI voice tutor for free conversation. He keeps track of your level and your weak
            spots between calls.
          </p>
          <div className="call" aria-label="Example call">
            <span className="over">Example call</span>
            <p className="msg him">
              Last week you said{" "}
              <span className="hl" lang="es">
                &quot;soy cansado&quot;
              </span>
              . How are you feeling today?
            </p>
            <p className="msg me" lang="es">
              Estoy cansado, pero feliz.
            </p>
            <p className="msg him">
              <span lang="es">¡Perfecto!</span> Estar for feelings. Nailed it.
            </p>
          </div>
          <ul className="facts">
            <li className="fact">
              <b>Any topic</b>
              <span>No script</span>
            </li>
            <li className="fact">
              <b>Remembers</b>
              <span>Your weak spots</span>
            </li>
            <li className="fact">
              <b>Every day</b>
              <span>A long conversation</span>
            </li>
          </ul>
          <p className="free-line">
            <Icon name="check" />
            Hector is the only paid part. Everything else stays free.
          </p>
          {PRO.status && <span className="soon">{PRO.status}</span>}
          <div className="cta-row">
            <ButtonLink href="/pricing" variant="ghost">
              How {PRO.name} works
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section className="closing">
      <div className="wrap">
        <Image className="peek rv" src={ART.pose.wow} alt="" width={220} height={220} />
        <div className="panel rv">
          <h2 className="d2">Your first lesson takes a few minutes.</h2>
          <p className="body">Free account with email or Google.</p>
          <div className="cta-row" style={{ justifyContent: "center" }}>
            <StartLearning />
            <JoinIphoneBeta />
          </div>
        </div>
      </div>
    </section>
  );
}
