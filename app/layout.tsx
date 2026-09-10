import type { Metadata, Viewport } from "next";
import { Prata } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { AccentPicker } from "@/components/shared/AccentPicker";
import { Analytics } from "@/components/shared/Analytics";
import { CookieConsent } from "@/components/shared/CookieConsent";
import { LightboxProvider } from "@/components/shared/Lightbox";
import { RegionBanner } from "@/components/shared/RegionBanner";
import { RegionProvider } from "@/components/shared/RegionProvider";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { defaultMetadata } from "@/lib/metadata";
import { organizationJsonLd } from "@/lib/schema";

/**
 * Satoshi carries the site: headings, navigation, buttons, card titles,
 * prices, figures and every piece of UI. Self-hosted (Fontshare / ITF Free
 * Font License — see app/fonts/LICENSE.txt); one variable file covers the
 * whole 300–900 range, so every weight the UI uses costs no extra request.
 *
 * Both `font-sans` and `font-sans` resolve here, so the existing tokens
 * keep working untouched across every component.
 */
const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Variable.woff2", weight: "300 900", style: "normal" },
    { path: "./fonts/Satoshi-VariableItalic.woff2", weight: "300 900", style: "italic" },
  ],
  variable: "--font-satoshi",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
});

/**
 * Prata is the accent face, and nothing else. It sets the section titles and
 * the one emphasised phrase in the H1 — every other word on the site is
 * Satoshi, including card titles, FAQ questions, prices and all body copy.
 *
 * One weight (400) and no italic exist for this family, so headings that carry
 * it are set to `font-normal` rather than inheriting `font-medium`, and the
 * hero phrase is upright: a synthetic slant on a high-contrast display serif
 * shears the thin strokes and reads as a rendering fault.
 */
const prata = Prata({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const metadata: Metadata = defaultMetadata;

// Revalidate the fully static pages daily so build-time values (e.g. the
// footer's copyright year) can never go stale on a long-lived deployment.
export const revalidate = 86400;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Token: ivory (#FFFFFF) — raw value required by the Viewport API.
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${satoshi.variable} ${prata.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-[110] rounded-full bg-espresso px-5 py-2.5 text-body-sm text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <RegionProvider>
          <LightboxProvider>
            {/* Above the sticky navbar and in normal flow, so it scrolls away
                and the navbar takes the top edge after it. */}
            <RegionBanner />
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
          </LightboxProvider>
        </RegionProvider>
        <CookieConsent />
        <Analytics />
        <ScrollToTop />
        {/* Live accent control. Delete this line (and the file) to remove it. */}
        <AccentPicker />
      </body>
    </html>
  );
}
