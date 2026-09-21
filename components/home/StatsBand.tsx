import { AnimatedCounter } from "../shared/AnimatedCounter";

// Per-course stats (534 English / 500 French / 125 Spanish) would need a
// new line here every time a course grows or a new one ships -- rolling up
// to total lessons + language count scales without a rewrite, and stays
// honest without implying Spanish (125 lessons, launched 2026-09-21) has
// the same depth as English/French yet.
const STATS = [
  { value: 1159, unit: "total lessons" },
  { value: 3, unit: "languages" },
  { value: 5, unit: "CEFR levels, A1–C1" },
];

export function StatsBand() {
  return (
    <section className="bg-cream px-6 py-6">
      {/* A floating rotated card instead of a full-bleed rectangle -- the
          flat navy strip was the single most "generic SaaS template" moment
          on the page. */}
      <div className="mx-auto max-w-4xl -rotate-1 rounded-[2.5rem] bg-royal px-6 py-14 shadow-2xl sm:px-10">
        <div className="grid gap-10 rotate-1 text-center sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.unit} className="flex flex-col items-center">
              <AnimatedCounter value={stat.value} unit={stat.unit} tone="white" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
