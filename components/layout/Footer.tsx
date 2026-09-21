import Link from "next/link";

const APP_URL = "https://learn.alphonsoecosystem.app";

export function Footer() {
  return (
    <footer className="border-t border-ink/8 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold text-ink">Alphonso</p>
            <p className="mt-2 max-w-xs text-sm text-ink-soft">
              English, French, and Spanish, one bite-size lesson at a time. Built by Obsidian Media.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-ink-soft">Product</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/features" className="text-ink hover:text-coral">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-ink hover:text-coral">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/download" className="text-ink hover:text-coral">
                  Download
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-ink-soft">Legal</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={`${APP_URL}/privacy`} className="text-ink hover:text-coral">
                  Privacy
                </a>
              </li>
              <li>
                <a href={`${APP_URL}/terms`} className="text-ink hover:text-coral">
                  Terms
                </a>
              </li>
              <li>
                <a href={`${APP_URL}/cookies`} className="text-ink hover:text-coral">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-xs text-ink-soft">
          © {new Date().getFullYear()} Obsidian Media. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
