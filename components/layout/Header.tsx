"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CTAButton } from "../shared/CTAButton";

const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/download", label: "Download" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/mascot/alphonso-icon.png" alt="" width={36} height={36} className="rounded-xl" />
          <span className="font-display text-lg font-semibold text-ink">Alphonso</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-ink-soft hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <CTAButton href="https://learn.alphonsoecosystem.app/auth" external>
            Start learning free
          </CTAButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-full border border-ink/10 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink/8 md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-semibold text-ink"
                >
                  {link.label}
                </Link>
              ))}
              <CTAButton href="https://learn.alphonsoecosystem.app/auth" external>
                Start learning free
              </CTAButton>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
