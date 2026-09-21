import { PhoneFrame } from "./PhoneFrame";
import { HeartIcon } from "./icons";

export function LessonMockup() {
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between text-xs font-semibold text-ink-soft">
        <span className="flex items-center gap-1 text-rose-500">
          <HeartIcon className="size-4" />5
        </span>
        <span>Lesson 3 of 12</span>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-ink/10">
        <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-coral to-amber" />
      </div>
      <p className="mt-5 font-display text-base font-semibold text-ink">Choose the correct word:</p>
      <p className="mt-1 text-sm text-ink-soft">&ldquo;I ___ coffee every morning.&rdquo;</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm font-semibold">
        <div className="rounded-xl border-2 border-emerald-500 bg-emerald-50 px-3 py-2 text-emerald-700">
          drink
        </div>
        <div className="rounded-xl border-2 border-ink/10 px-3 py-2 text-ink-soft">drinking</div>
        <div className="rounded-xl border-2 border-ink/10 px-3 py-2 text-ink-soft">drinks</div>
        <div className="rounded-xl border-2 border-ink/10 px-3 py-2 text-ink-soft">drank</div>
      </div>
    </PhoneFrame>
  );
}
