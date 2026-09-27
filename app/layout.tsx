import type { Metadata } from "next";
import { Fraunces, Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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
  metadataBase: new URL("https://discover.alphonsoecosystem.app"),
  title: {
    default: "Learn with Alphonso — English that actually sticks",
    template: "%s — Learn with Alphonso",
  },
  description:
    "Bite-size English, French, and Spanish lessons, AI conversation practice, and gamified streaks — with Alphonso the llama as your guide.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Learn with Alphonso — English that actually sticks",
    description:
      "Bite-size English, French, and Spanish lessons, AI conversation practice, and gamified streaks.",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn with Alphonso — English that actually sticks",
    description:
      "Bite-size English, French, and Spanish lessons, AI conversation practice, and gamified streaks.",
    images: ["/og-image.png"],
  },
};

// Real fields only -- no fabricated ratings/review counts. Kept as plain
// objects (not a shared lib) since layout.tsx is the only place either is
// used.
const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Obsidian Media",
  url: "https://discover.alphonsoecosystem.app",
  logo: "https://discover.alphonsoecosystem.app/icon-512.png",
};

const SOFTWARE_APPLICATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Learn with Alphonso",
  applicationCategory: "EducationalApplication",
  operatingSystem: "iOS, Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

function jsonLdScript(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${nunito.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(ORGANIZATION_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(SOFTWARE_APPLICATION_JSON_LD) }}
        />
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
