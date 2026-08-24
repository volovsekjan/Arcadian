import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { Analytics } from "@/components/shared/Analytics";
import { CookieConsent } from "@/components/shared/CookieConsent";
import { LightboxProvider } from "@/components/shared/Lightbox";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { defaultMetadata } from "@/lib/metadata";
import { organizationJsonLd } from "@/lib/schema";

const prata = localFont({
  src: "./fonts/Prata-Regular.ttf",
  weight: "400",
  variable: "--font-prata",
  display: "swap",
});

// Satoshi Medium doubles as the regular body weight (400 and 500) per the
// design spec ("Body — Satoshi Medium"); Black serves as the bold weight —
// no Bold cut was supplied.
const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/Satoshi-Medium.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Black.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

// Revalidate the fully static pages daily so build-time values (e.g. the
// footer's copyright year) can never go stale on a long-lived deployment.
export const revalidate = 86400;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Token: ivory (#F3F3F4) — raw value required by the Viewport API.
  themeColor: "#F3F3F4",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${prata.variable} ${satoshi.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-[110] rounded-full bg-espresso px-5 py-2.5 text-sm text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <LightboxProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </LightboxProvider>
        <CookieConsent />
        <Analytics />
        <ScrollToTop />
      </body>
    </html>
  );
}
