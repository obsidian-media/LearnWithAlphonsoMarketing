import {
  AroundTheLesson,
  Closing,
  HectorBand,
  HomeHero,
  LessonSection,
  RoomsMarquee,
  TrySection,
} from "@/components/site/home";
import { Faq } from "@/components/site/Faq";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <TrySection />
      <LessonSection />
      <RoomsMarquee />
      <AroundTheLesson />
      <HectorBand />
      <Faq />
      <Closing />
    </main>
  );
}
