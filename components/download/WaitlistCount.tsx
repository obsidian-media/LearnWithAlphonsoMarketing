type WaitlistCountProps = { count: number | null };

// null means the count couldn't be read (DB hiccup) -- render nothing rather
// than a stale or misleading number. 0 gets its own honest copy instead of
// "0 people," which would read as a dead/abandoned waitlist.
export function WaitlistCount({ count }: WaitlistCountProps) {
  if (count === null) return null;

  return (
    <p className="flex items-center gap-2 text-xs font-semibold text-white/70">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
      </span>
      {count > 0 ? `${count} people already waiting` : "Be the first to join the waitlist"}
    </p>
  );
}
