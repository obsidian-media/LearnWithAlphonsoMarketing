type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "cream" | "royal";
};

export function SectionHeading({ eyebrow, title, description, tone = "cream" }: SectionHeadingProps) {
  const isRoyal = tone === "royal";
  return (
    <div>
      {eyebrow && (
        <p
          className={
            isRoyal
              ? "text-xs font-bold uppercase tracking-[0.2em] text-amber"
              : "text-xs font-bold uppercase tracking-[0.2em] text-coral"
          }
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-2 font-display text-3xl font-semibold sm:text-4xl ${isRoyal ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 max-w-2xl text-base leading-relaxed ${isRoyal ? "text-white/80" : "text-ink-soft"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
