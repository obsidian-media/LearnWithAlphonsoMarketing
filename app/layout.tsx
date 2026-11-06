import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { IconSprite } from "@/components/site/Icon";
import { LESSONS_TOTAL, LEVEL_RANGE, courseList } from "@/lib/facts";

export const metadata: Metadata = {
  metadataBase: new URL("https://discover.alphonsoecosystem.app"),
  title: {
    default: `Learn With Alphonso: Learn ${courseList()}`,
    template: "%s | Learn With Alphonso",
  },
  description: `Learn ${courseList("or")} in a few minutes a day. ${LESSONS_TOTAL} short lessons, a free level test (${LEVEL_RANGE}) and a daily review of the words you are about to forget. Free on the web, iPhone beta open.`,
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
    title: `Learn With Alphonso: Learn ${courseList()}`,
    description: `Learn ${courseList("or")} in a few minutes a day. ${LESSONS_TOTAL} short lessons, a free level test and a daily review. Free on the web, iPhone beta open.`,
    siteName: "Learn With Alphonso",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alphonso the llama, in a navy and gold robe and blue sunglasses, in his study",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Learn With Alphonso: Learn ${courseList()}`,
    description: `Learn ${courseList("or")} in a few minutes a day. ${LESSONS_TOTAL} short lessons, a free level test and a daily review. Free on the web, iPhone beta open.`,
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
    <html lang="en">
      <body>
        <IconSprite />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(ORGANIZATION_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(SOFTWARE_APPLICATION_JSON_LD) }}
        />
        <div className="site">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
