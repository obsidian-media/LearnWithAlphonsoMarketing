"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@vercel/analytics";
import { IPHONE_BETA_URL, START_LEARNING_URL } from "@/lib/links";
import { Icon } from "./Icon";

type Variant = "primary" | "quiet" | "ghost";

/** A pressable link in the app's button style. Primary carries the trailing arrow nub. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  trackEvent,
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  trackEvent?: string;
  external?: boolean;
}) {
  const ext = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link
      href={href}
      className={`btn btn-${variant}`}
      onClick={trackEvent ? () => track(trackEvent) : undefined}
      {...ext}
    >
      {children}
      {variant === "primary" && (
        <span className="nub">
          <Icon name="chevron" />
        </span>
      )}
    </Link>
  );
}

/** The site's one sign-up label, everywhere (one label per intent). */
export function StartLearning() {
  return (
    <ButtonLink href={START_LEARNING_URL} external trackEvent="start_learning_click">
      Start learning free
    </ButtonLink>
  );
}

export function JoinIphoneBeta({ variant = "quiet" }: { variant?: Variant }) {
  return (
    <ButtonLink
      href={IPHONE_BETA_URL}
      variant={variant}
      external
      trackEvent="join_iphone_beta_click"
    >
      Join the iPhone beta
    </ButtonLink>
  );
}
