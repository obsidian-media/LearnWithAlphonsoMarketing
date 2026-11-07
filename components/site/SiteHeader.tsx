"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ART } from "@/lib/site-art";
import { StartLearning } from "./Buttons";

export const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/download", label: "Download" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="nav-shell">
        <header className="nav">
          <Link className="brand" href="/" aria-label="Learn With Alphonso, home">
            <Image src={ART.pose.happy} alt="" width={44} height={44} priority />
            Alphonso
          </Link>
          <nav className="nav-links" aria-label="Main">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname.startsWith(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <StartLearning />
          <button
            className="burger"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </header>
      </div>
      {open && (
        <div className="menu" id="site-menu">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} className="big" href={l.href}>
              {l.label}
            </Link>
          ))}
          <StartLearning />
        </div>
      )}
    </>
  );
}
