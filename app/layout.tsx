import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
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

/**
 * Satoshi carries the site: headings, navigation, buttons, card titles,
 * prices, figures and every piece of UI. Self-hosted (Fontshare / ITF Free
 * Font License — see app/fonts/LICENSE.txt); one variable file covers the
 * whole 300–900 range, so every weight the UI uses costs no extra request.
 *
 * Both `font-display` and `font-sans` resolve here, so the existing tokens
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
 * Instrument Serif is the accent only — section ledes, captions, footnotes and
 * taglines, through the `.type-lede` and `.type-note` tokens in globals.css.
 * It is a display serif with fine strokes and a single weight, so it is never
 * used for headings, UI, or anything below 15px.
 */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
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
    <html lang="en" className={`${satoshi.variable} ${instrumentSerif.variable}`}>
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
