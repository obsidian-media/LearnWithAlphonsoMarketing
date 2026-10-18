import { PhoneFrame } from "./PhoneFrame";
import { FlameIcon } from "./icons";

const ROWS = [
  { rank: 1, name: "Nadia", xp: 2140, tone: "from-amber to-coral", text: "text-ink" },
  { rank: 2, name: "You", xp: 1980, tone: "from-royal to-royal-deep", text: "text-white" },
  { rank: 3, name: "Theo", xp: 1865, tone: "from-emerald-700 to-emerald-800", text: "text-white" },
];

export function GamificationMockup() {
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm font-bold text-coral-deep">
          <FlameIcon className="size-4" />
          12-day streak
        </span>
        <span className="text-xs font-semibold text-ink-soft">Top league</span>
      </div>
      <ul className="mt-4 space-y-2">
        {ROWS.map((row) => (
          <li
            key={row.name}
            className={`flex items-center gap-3 rounded-xl px-2 py-2 ${
              row.name === "You" ? "bg-royal/5" : ""
            }`}
          >
            <span className="w-4 text-center text-xs font-bold text-ink-soft">{row.rank}</span>
            <span
              className={`grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br ${row.tone} ${row.text} text-xs font-bold`}
            >
              {row.name.slice(0, 1)}
            </span>
            <span className="flex-1 text-sm font-semibold text-ink">{row.name}</span>
            <span className="text-xs font-semibold text-ink-soft">{row.xp} XP</span>
          </li>
        ))}
      </ul>
    </PhoneFrame>
  );
}
