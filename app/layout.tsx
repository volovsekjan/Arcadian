import type { Metadata, Viewport } from "next";
import { Prata } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { Analytics } from "@/components/shared/Analytics";
import { CookieConsent } from "@/components/shared/CookieConsent";
import { LightboxProvider } from "@/components/shared/Lightbox";
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
        {/*
          Skip link. In the DOM for keyboard and screen reader users, painted
          only while it holds focus.

          EVERY DECORATIVE UTILITY IS BEHIND focus:, and that is the whole
          point. They used to be unconditional, which quietly defeated sr-only:
          that class hides an element by collapsing it to 1px and zeroing its
          padding, but Tailwind emits the padding utilities later in the
          stylesheet than the accessibility ones, so px-5 and py-2.5 won the
          cascade and restored a 40x20px box. The result was an espresso pill
          sitting in the top left corner of every page load.

          Guarding them means the resting state is sr-only and nothing else,
          with no utility left to override it. On focus, not-sr-only lifts the
          clip and the rest paint; fixed positioning keeps it out of the flow
          in both states, so it can never shift the layout.
        */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-espresso focus:px-5 focus:py-2.5 focus:text-body-sm focus:text-ivory"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <RegionProvider>
          <LightboxProvider>
            {/*
              The region banner is hidden for the same reason as the footer
              region picker. It greeted anyone detected outside the base market
              with "You are on the United Arab Emirates website" and a currency
              dropdown: a single-market framing on a site that now presents
              Arcadian globally, offering a currency switch when no figure
              appears anywhere on the page.

              ONLY THE RENDER IS REMOVED. RegionProvider still wraps the tree,
              middleware still detects the country, and RegionBanner itself is
              untouched, so restoring this is putting <RegionBanner /> back here
              (it belongs above the sticky navbar and in normal flow, so it
              scrolls away and the navbar takes the top edge after it).
            */}
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
          </LightboxProvider>
        </RegionProvider>
        <CookieConsent />
        <Analytics />
        <ScrollToTop />
      </body>
    </html>
  );
}
