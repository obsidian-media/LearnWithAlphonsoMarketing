"use client";

import { useState } from "react";
import { ContentSection } from "../shared/ContentSection";

// Approximate surface/ink pairs from the real app's own theme tokens
// (src/styles.css) -- illustrative, not a pixel-exact reproduction. Only
// ink-on-surface is ever used for text (both verified light/dark pairs);
// each theme's accent color is decorative-only (a swatch dot, never text),
// since it wasn't worth re-deriving exact contrast-safe text pairings for
// three different accent hues on a teaser section.
const THEMES = [
  { name: "Meadow", surface: "#f4efe3", ink: "#23352a", accent: "#5c7a5c" },
  { name: "Studio Ink", surface: "#1f2436", ink: "#f2eee2", accent: "#4a6fd4" },
  { name: "Manuscript", surface: "#f6f5f4", ink: "#25242b", accent: "#7a2733" },
];

export function ThemesTeaser() {
  const [selected, setSelected] = useState(0);
  const theme = THEMES[selected];

  return (
    <ContentSection
      eyebrow="Make it yours"
      title="Three themes, one you"
      description="Switch between Meadow, Studio Ink, and Manuscript any time — your pick syncs across devices. Try one below."
    >
      <div className="grid gap-8 sm:grid-cols-[1fr_1fr]">
        <div className="grid grid-cols-3 gap-3 self-start sm:gap-4">
          {THEMES.map((t, index) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setSelected(index)}
              aria-pressed={index === selected}
              className={`overflow-hidden rounded-3xl border bg-white text-left transition ${
                index === selected ? "border-coral ring-2 ring-coral" : "border-ink/8 hover:border-ink/20"
              }`}
            >
              <div
                className="h-16 sm:h-20"
                style={{ background: `linear-gradient(to bottom right, ${t.surface}, ${t.accent})` }}
              />
              <p className="p-3 text-sm font-display font-semibold text-ink">{t.name}</p>
            </button>
          ))}
        </div>

        <div
          className="rounded-3xl border border-ink/8 p-6 transition-colors duration-300"
          style={{ backgroundColor: theme.surface, color: theme.ink }}
        >
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="size-3 rounded-full" style={{ backgroundColor: theme.accent }} />
            <span className="size-3 rounded-full opacity-40" style={{ backgroundColor: theme.ink }} />
          </div>
          <p className="mt-4 font-display text-lg font-semibold">{theme.name}</p>
          <p className="mt-1 text-sm">This is roughly how your lessons would look in this theme.</p>
          <button
            type="button"
            className="mt-4 rounded-full border px-4 py-2 text-xs font-semibold"
            style={{ borderColor: theme.ink }}
          >
            Sample lesson
          </button>
        </div>
      </div>
    </ContentSection>
  );
}
