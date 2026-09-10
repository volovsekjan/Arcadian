import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Which cookies this site uses, when they are set, and how to withdraw consent.",
  alternates: { canonical: "/cookies" },
};

type LegalSection = {
  heading: string;
  paragraphs: string[];
};

// TODO: insert real legal text — every paragraph below is template scaffolding.
const sections: LegalSection[] = [
  {
    heading: "What cookies are",
    paragraphs: [
      "[PLACEHOLDER] Cookies are small text files a website stores in your browser to remember something about your visit: a preference, a session, or an anonymous usage statistic. Similar technologies, such as local storage, work in much the same way and are covered by this policy.",
    ],
  },
  {
    heading: "The cookies we use",
    paragraphs: [
      "[PLACEHOLDER] This site sets no cookies by default. The only optional one is a single, privacy-friendly analytics cookie (Plausible) that helps us understand which pages visitors find useful. It is set only after you choose Accept in the cookie banner. Decline, and nothing is set.",
      "[PLACEHOLDER] Your banner choice itself is kept in your browser’s local storage so we do not ask again on every visit. It contains nothing beyond the choice you made.",
      "[PLACEHOLDER] One further cookie, arcadian-country, stores a two-letter country code so prices can be shown in your currency. It is set by our own server from the region your connection resolves to, holds nothing else, and is not used for analytics or advertising. Your country or region choice, and whether you dismissed the region banner, are kept in local storage alongside the cookie choice above.",
    ],
  },
  {
    heading: "How to withdraw consent",
    paragraphs: [
      "[PLACEHOLDER] You can withdraw consent at any time by clearing this site’s data in your browser settings (cookies and site data). The banner will reappear on your next visit, and you can make a fresh choice.",
    ],
  },
];

export default function CookiePolicyPage() {
  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-5 font-sans text-display font-medium text-ink">Cookie Policy</h1>
        <p className="mt-4 text-body-sm text-graphite">Last updated: [PLACEHOLDER]</p>

        {/* TODO: insert real legal text */}
        <div className="mt-10 rounded-2xl border border-gold/40 bg-gold/10 p-5 text-body-sm leading-relaxed text-ink">
          [PLACEHOLDER] This page is a template. Replace it with your final legal text, reviewed by
          counsel, before launch.
        </div>

        <div>
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="mt-12 font-sans text-h3 font-medium text-ink">{section.heading}</h2>
              {section.paragraphs.map((paragraph, i) => (
                <p key={i} className="mt-4 leading-relaxed text-graphite">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          <h2 className="mt-12 font-sans text-h3 font-medium text-ink">Contact</h2>
          <p className="mt-4 leading-relaxed text-graphite">
            [PLACEHOLDER] Questions about cookies on this site can be sent through the{" "}
            <Link
              href="/#contact"
              className="text-ink underline decoration-gold/50 underline-offset-4 transition-colors duration-300 ease-out-soft hover:decoration-gold"
            >
              contact form
            </Link>
            . {site.responseNote}
          </p>
        </div>
      </Container>
    </section>
  );
}
