type IconProps = { className?: string };

// 2.6 stroke weight + round caps throughout -- matches the mascot artwork's
// own chunky, confident linework instead of reading as generic thin-line
// SaaS iconography.
const W = "2.6";

export function BookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5A2.5 2.5 0 0 1 17.5 21H4V5.5Z"
        stroke="currentColor"
        strokeWidth={W}
        strokeLinejoin="round"
      />
      <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" stroke="currentColor" strokeWidth={W} />
    </svg>
  );
}

export function MicIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth={W} />
      <path
        d="M5 11a7 7 0 0 0 14 0M12 18v3"
        stroke="currentColor"
        strokeWidth={W}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FlameIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2c1 3-3 4-3 8a3 3 0 0 0 6 0c0-1-1-2-1-2 2 1 3 3 3 5a5 5 0 0 1-10 0c0-5 3-6 5-11Z"
        stroke="currentColor"
        strokeWidth={W}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrophyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M7 4h10v4a5 5 0 0 1-10 0V4Z"
        stroke="currentColor"
        strokeWidth={W}
        strokeLinejoin="round"
      />
      <path
        d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3M9 21h6M12 16v5"
        stroke="currentColor"
        strokeWidth={W}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth={W} />
      <path
        d="M3 20a6 6 0 0 1 12 0M16 8.5a2.5 2.5 0 1 0 0-5M21 19a5 5 0 0 0-5.5-5"
        stroke="currentColor"
        strokeWidth={W}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PaletteIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3a9 8 0 1 0 0 16c1.5 0 2-.9 2-2s-.6-1.7 0-2.4c.5-.6 1.3-.6 2-.6h1a4 4 0 0 0 4-4c0-4-4-7-9-7Z"
        stroke="currentColor"
        strokeWidth={W}
        strokeLinejoin="round"
      />
      <circle cx="8" cy="10" r="1.1" fill="currentColor" />
      <circle cx="12" cy="8" r="1.1" fill="currentColor" />
      <circle cx="16" cy="10" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 20s-7-4.35-9.5-8.5C.7 8.2 2.4 4.5 6 4.5c2 0 3.4 1.1 4 2.4.6-1.3 2-2.4 4-2.4 3.6 0 5.3 3.7 3.5 7C19 15.65 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth={W}
        strokeLinejoin="round"
      />
    </svg>
  );
}

// A shield-with-team-dots shape, deliberately NOT another two-circle
// person pair -- UsersIcon already owns that motif for "Friends" on the
// same Features page, and reusing it for "Teams" would read as the same
// icon twice.
export function TeamsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3 5 6v5c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6l-7-3Z"
        stroke="currentColor"
        strokeWidth={W}
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="10.5" r="1.3" fill="currentColor" />
      <circle cx="14.5" cy="10.5" r="1.3" fill="currentColor" />
      <circle cx="12" cy="14" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function SwordsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 4l16 16M6 4l2 2M18 20l2 2M20 4 4 20M4 18l2 2M20 6l-2-2"
        stroke="currentColor"
        strokeWidth={W}
        strokeLinecap="round"
      />
      <circle cx="4" cy="4" r="1.3" fill="currentColor" />
      <circle cx="20" cy="4" r="1.3" fill="currentColor" />
    </svg>
  );
}
