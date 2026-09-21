import type { ReactNode } from "react";

// A lightweight illustrated device frame -- not a real screenshot (we have
// none to show; the app's dev server doesn't boot in this environment), but
// a stylized, honest mockup of what's inside, built from the same design
// tokens as the rest of the site so it reads as intentional rather than
// stock. Used to break up pages that were otherwise wall-to-wall text.
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-[300px] rounded-[2rem] border border-ink/10 bg-white p-5 shadow-xl">
      {children}
    </div>
  );
}
