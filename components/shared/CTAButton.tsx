"use client";

import type { ReactNode } from "react";
import { ButtonLink } from "@/components/site/Buttons";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "secondary-inverted";
  external?: boolean;
  /** Fires a named Vercel Analytics event on click. Omit for CTAs outside the tracked conversion funnel. */
  trackEvent?: string;
};

/** The older pages' button API, drawn with the app's button styles (components/site/Buttons.tsx). */
export function CTAButton({
  href,
  children,
  variant = "primary",
  external = false,
  trackEvent,
}: CTAButtonProps) {
  const mapped = variant === "primary" ? "primary" : variant === "secondary" ? "quiet" : "ghost";
  return (
    <ButtonLink href={href} variant={mapped} external={external} trackEvent={trackEvent}>
      {children}
    </ButtonLink>
  );
}
