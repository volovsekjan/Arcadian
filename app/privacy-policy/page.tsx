import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Arcadian collects, uses, and protects the personal data you share with us.",
  alternates: { canonical: "/privacy-policy" },
};

type LegalSection = {
  heading: string;
  paragraphs: string[];
};

// TODO: insert real legal text — every paragraph below is template scaffolding.
const sections: LegalSection[] = [
  {
    heading: "Who we are",
    paragraphs: [
      "[PLACEHOLDER] Arcadian ([legal entity name], [registered address]) operates this website and produces property videos and social media content from photos supplied by clients. For the purposes of the GDPR, Arcadian is the controller of the personal data described in this policy.",
    ],
  },
  {
    heading: "What data we collect",
    paragraphs: [
      "[PLACEHOLDER] When you send an enquiry through the contact form, we collect the details you enter: your name, email address, company, and message.",
      "[PLACEHOLDER] If you accept analytics in the cookie banner, we also receive aggregated, privacy-friendly usage statistics about how the site is used. See the Cookie Policy for details.",
    ],
  },
  {
    heading: "How we use it",
    paragraphs: [
      "[PLACEHOLDER] We use your contact details to reply to your enquiry, prepare a quote, and deliver the work you order. We do not sell personal data, and we do not use it for third-party advertising.",
    ],
  },
  {
    heading: "Legal basis (GDPR)",
    paragraphs: [
      "[PLACEHOLDER] We process enquiry data to take steps at your request prior to entering into a contract (Art. 6(1)(b) GDPR) and on the basis of our legitimate interest in responding to business enquiries (Art. 6(1)(f) GDPR). Analytics run only with your consent (Art. 6(1)(a) GDPR).",
    ],
  },
  {
    heading: "Data retention",
    paragraphs: [
      "[PLACEHOLDER] Enquiry messages are kept for [retention period] after our last exchange. Where a project follows, the related records are kept for as long as applicable accounting and tax law requires.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "[PLACEHOLDER] You may request access to, correction of, or deletion of your personal data, ask us to restrict processing or object to it, and request a copy of your data in a portable format. Where processing is based on consent, you may withdraw it at any time.",
      "[PLACEHOLDER] You also have the right to lodge a complaint with your local data protection supervisory authority.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-5 font-display text-display-sm font-medium text-ink">Privacy Policy</h1>
        <p className="mt-4 text-sm text-graphite">Last updated: [PLACEHOLDER]</p>

        {/* TODO: insert real legal text */}
        <div className="mt-10 rounded-2xl border border-gold/40 bg-gold/10 p-5 text-sm leading-relaxed text-ink">
          [PLACEHOLDER] This page is a template. Replace it with your final legal text, reviewed by
          counsel, before launch.
        </div>

        <div>
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="mt-12 font-display text-h3 font-medium text-ink">{section.heading}</h2>
              {section.paragraphs.map((paragraph, i) => (
                <p key={i} className="mt-4 leading-relaxed text-graphite">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          <h2 className="mt-12 font-display text-h3 font-medium text-ink">Contact</h2>
          <p className="mt-4 leading-relaxed text-graphite">
            [PLACEHOLDER] Questions about this policy, or a request concerning your data, can be
            sent through the{" "}
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
