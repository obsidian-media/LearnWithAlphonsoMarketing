import { ContentSection } from "../shared/ContentSection";

const THEMES = [
  { name: "Meadow", swatch: "from-[#f6f0e4] to-[#5c7a5c]" },
  { name: "Studio Ink", swatch: "from-[#20263a] to-[#4a6fd4]" },
  { name: "Manuscript", swatch: "from-[#f6f5f4] to-[#7a2733]" },
];

export function ThemesTeaser() {
  return (
    <ContentSection
      eyebrow="Make it yours"
      title="Three themes, one you"
      description="Switch between Meadow, Studio Ink, and Manuscript any time — your pick syncs across devices."
    >
      <div className="grid gap-5 sm:grid-cols-3">
        {THEMES.map((theme) => (
          <div key={theme.name} className="overflow-hidden rounded-3xl border border-ink/8 bg-white">
            <div className={`h-24 bg-gradient-to-br ${theme.swatch}`} />
            <p className="p-4 font-display font-semibold text-ink">{theme.name}</p>
          </div>
        ))}
      </div>
    </ContentSection>
  );
}
