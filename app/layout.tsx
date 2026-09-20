import type { Metadata } from "next";
import { Fraunces, Nunito } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fraunces",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://learnwithalphonsomarketing.vercel.app"),
  title: {
    default: "Learn with Alphonso — English that actually sticks",
    template: "%s — Learn with Alphonso",
  },
  description:
    "Bite-size English and French lessons, AI conversation practice, and gamified streaks — with Alphonso the llama as your guide.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
