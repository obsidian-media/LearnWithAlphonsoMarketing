"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@vercel/analytics";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "secondary-inverted";
  external?: boolean;
  className?: string;
  /** Fires a named Vercel Analytics event on click. Omit for CTAs that
   * aren't part of the tracked conversion funnel. */
  trackEvent?: string;
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
  trackEvent,
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-coral to-amber text-white shadow-sm hover:shadow-md hover:opacity-95"
      : variant === "secondary-inverted"
        ? "border border-white/30 text-white hover:bg-white/10"
        : "border border-ink/15 text-ink hover:bg-ink/5";

  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Link
      href={href}
      className={`${base} ${styles} ${className}`}
      onClick={trackEvent ? () => track(trackEvent) : undefined}
      {...externalProps}
    >
      {children}
    </Link>
  );
}
