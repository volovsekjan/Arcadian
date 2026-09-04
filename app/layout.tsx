import type { Metadata, Viewport } from "next";
import { Source_Serif_4 } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { AccentPicker } from "@/components/shared/AccentPicker";
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
 * Source Serif 4 is the secondary voice: section ledes, descriptions,
 * captions and footnotes, through the `.type-lede` and `.type-note` tokens in
 * globals.css.
 *
 * A transitional text serif rather than a display one — low stroke contrast,
 * upright axis, no calligraphic flourish, and a real weight range. That is
 * what makes it safe at 15px, where a high-contrast display serif thins out
 * and breaks up.
 */
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Georgia", "Cambria", "Times New Roman", "serif"],
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
    <html lang="en" className={`${satoshi.variable} ${sourceSerif.variable}`}>
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
        {/* Live accent control. Delete this line (and the file) to remove it. */}
        <AccentPicker />
      </body>
    </html>
  );
}
