type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "cream" | "royal";
  level?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "cream",
  level = "h2",
}: SectionHeadingProps) {
  const isRoyal = tone === "royal";
  const Heading = level;
  return (
    <div>
      {eyebrow && (
        <p
          className={
            isRoyal
              ? "text-xs font-bold uppercase tracking-[0.2em] text-amber"
              : "text-xs font-bold uppercase tracking-[0.2em] text-coral-deep"
          }
        >
          {eyebrow}
        </p>
      )}
      <Heading
        className={`mt-2 font-display text-3xl font-semibold sm:text-4xl ${isRoyal ? "text-white" : "text-ink"}`}
      >
        {title}
      </Heading>
      {description && (
        <p className={`mt-4 max-w-2xl text-base leading-relaxed ${isRoyal ? "text-white/80" : "text-ink-soft"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
