import type { Metadata } from "next";
import Link from "next/link";
import { CookieChoice } from "@/components/shared/CookieChoice";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Which cookies and browser storage this site uses, and how to change your choice.",
  alternates: { canonical: "/cookies" },
};

type LegalSection = {
  heading: string;
  paragraphs: string[];
};

/**
 * Audited against the code before writing. The complete inventory is:
 *
 *   cookie        arcadian-country          set by middleware.ts, 30 days
 *   localStorage  arcadian:region           lib/regions.ts
 *   localStorage  arcadian:region-banner-dismissed
 *   localStorage  arcadian-cookie-consent   lib/consent.ts
 *   third party   Plausible                 components/shared/Analytics.tsx,
 *                                           consent-gated, sets NO cookies
 *
 * There is nothing else. No advertising or marketing tags, no session storage,
 * no embedded players, no social pixels, and no runtime request to a font CDN:
 * next/font downloads Prata at build time and serves it from our own domain,
 * so no font provider ever sees a visitor's IP.
 *
 * If a tool is ever added, it belongs in this table and in the banner copy
 * before it ships, not after.
 */
const sections: LegalSection[] = [
  {
    heading: "What this covers",
    paragraphs: [
      "This policy explains the cookies and similar technologies this site uses. “Similar technologies” matters here, because most of what we store is not a cookie at all but local storage, which works in much the same way and is treated the same way by this policy.",
      "We have kept the list short on purpose. There is no advertising or marketing tracking on this site, no social media pixels, and no embedded third party players.",
    ],
  },
  {
    heading: "Strictly necessary: the country cookie",
    paragraphs: [
      "One cookie, named arcadian-country, stores the two letter country code your connection resolves to, so that prices can be shown in a currency that makes sense for you. It is set by our own server, holds nothing but that code, and expires thirty days after it is set.",
      "It identifies no one. Everyone connecting from the same country receives the same value, so it cannot distinguish one visitor from another, and it is not used for analytics or advertising.",
      "This cookie is necessary for the currency feature to work, so it is not subject to consent. If you block it, the site still works: it falls back to your browser's time zone to guess a region, and you can always set the region by hand in the footer.",
    ],
  },
  {
    heading: "Strictly necessary: preferences in your browser",
    paragraphs: [
      "Three preferences are kept in your browser's local storage. They stay on your device and are never transmitted to us.",
      "The first records the country or region you selected, so that your currency choice survives a refresh. The second records that you dismissed the region banner, so that it does not reappear on every visit. The third records the cookie choice you made below, for the same reason.",
      "Clearing this site's data in your browser removes all three. The banner and the region prompt will then appear again on your next visit.",
    ],
  },
  {
    heading: "Optional: analytics",
    paragraphs: [
      "If you accept optional analytics, we load Plausible Analytics to understand which pages visitors find useful. It is loaded only after you accept, and never before.",
      "Plausible sets no cookies and stores nothing on your device. It records aggregated page views without building a profile of you or following you to other sites. We use it to see which pages are read, not who read them.",
      "If you decline, or simply do not answer, no analytics script is loaded at all.",
    ],
  },
  {
    heading: "What we do not use",
    paragraphs: [
      "We do not use advertising or retargeting cookies, marketing pixels, cross site trackers, session recording, heat mapping, or A/B testing tools. We do not sell or share personal data for advertising.",
      "The site's typefaces are served from our own domain rather than from a font provider, so no third party receives your IP address for the fonts on this page.",
    ],
  },
  {
    heading: "Changing your choice",
    paragraphs: [
      "You can change your answer at any time using the control below. Rejecting is as easy as accepting, and a rejection takes effect immediately: the analytics script is removed without needing a reload.",
      "You can also clear this site's data in your browser settings, which removes the cookie and all three preferences and makes the banner ask again.",
    ],
  },
];

export default function CookiePolicyPage() {
  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-5 font-sans text-display font-medium text-ink">Cookie Policy</h1>
        <p className="mt-4 text-body-sm text-graphite">Last updated: 11 September 2026</p>

        <div>
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="mt-12 font-sans text-h3 font-medium text-ink">{section.heading}</h2>
              {section.paragraphs.map((paragraph, i) => (
                <p key={i} className="mt-4 leading-relaxed text-graphite">
                  {paragraph}
                </p>
              ))}
              {section.heading === "Changing your choice" && <CookieChoice />}
            </div>
          ))}

          <h2 className="mt-12 font-sans text-h3 font-medium text-ink">Contact</h2>
          <p className="mt-4 leading-relaxed text-graphite">
            Questions about cookies on this site can be sent through the{" "}
            <Link
              href="/#contact"
              className="text-ink underline decoration-gold/50 underline-offset-4 transition-colors duration-300 ease-out-soft hover:decoration-gold"
            >
              contact form
            </Link>
            . For anything wider about personal data, see our{" "}
            <Link
              href="/privacy-policy"
              className="text-ink underline decoration-gold/50 underline-offset-4 transition-colors duration-300 ease-out-soft hover:decoration-gold"
            >
              Privacy Policy
            </Link>
            . {site.responseNote}
          </p>
        </div>
      </Container>
    </section>
  );
}
