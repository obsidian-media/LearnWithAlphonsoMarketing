import { AnimatedCounter } from "../shared/AnimatedCounter";

const STATS = [
  { value: 534, unit: "English lessons" },
  { value: 125, unit: "French lessons" },
  { value: 5, unit: "CEFR levels, A1–C1" },
];

export function StatsBand() {
  return (
    <section className="bg-royal py-16">
      <div className="mx-auto grid max-w-5xl gap-8 px-6 text-center sm:grid-cols-3">
        {STATS.map((stat) => (
          <div key={stat.unit} className="flex flex-col items-center">
            <AnimatedCounter value={stat.value} unit={stat.unit} tone="white" />
          </div>
        ))}
      </div>
    </section>
  );
}
