import Image from "next/image";
import { APP_SCREENS, DEMO_VIDEO, type AppScreen, type DemoVideo } from "@/lib/app-screens";
import { SectionHeading } from "../shared/SectionHeading";

type AppScreensProps = { screens?: AppScreen[]; video?: DemoVideo | null };

/** Real screenshots and the demo video. Renders nothing until the owner adds assets
 * in lib/app-screens.ts, so the page never shows an empty frame or a fake screen. */
export function AppScreens({ screens = APP_SCREENS, video = DEMO_VIDEO }: AppScreensProps) {
  if (screens.length === 0 && !video) return null;

  return (
    <section className="bg-cream px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="In the app" title="See what a session looks like" />
        {video && (
          <figure className="mx-auto mt-10 max-w-sm">
            <video
              controls
              playsInline
              preload="none"
              poster={video.poster}
              className="w-full rounded-[2rem] border border-ink/10 shadow-xl"
            >
              <source src={video.src} type="video/mp4" />
              <track kind="captions" src={video.captions} srcLang="en" label="English" default />
            </video>
            <figcaption className="mt-3 text-center text-sm text-ink-soft">
              {video.caption}
            </figcaption>
          </figure>
        )}
        {screens.length > 0 && (
          <ul className="mt-10 flex snap-x gap-6 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-5">
            {screens.map((screen) => (
              <li key={screen.src} className="w-56 shrink-0 snap-start sm:w-auto">
                <figure>
                  <Image
                    src={screen.src}
                    width={screen.width}
                    height={screen.height}
                    alt={screen.alt}
                    className="h-auto w-full rounded-[1.5rem] border border-ink/10 shadow-lg"
                  />
                  <figcaption className="mt-2 text-center text-sm text-ink-soft">
                    {screen.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
