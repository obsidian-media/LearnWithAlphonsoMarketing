type WaitlistCountProps = { count: number | null };

// null means the count couldn't be read (DB hiccup) -- render nothing rather
// than a stale or misleading number. 0 gets its own honest copy instead of
// "0 people," which would read as a dead/abandoned waitlist.
export function WaitlistCount({ count }: WaitlistCountProps) {
  if (count === null) return null;

  return (
    <p className="waitlist-count">
      {count > 0 ? `${count} people already waiting` : "Be the first to join the waitlist"}
    </p>
  );
}
