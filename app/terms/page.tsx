import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern ordering, delivery, licensing, and use of Arcadian video services.",
  alternates: { canonical: "/terms" },
};

type LegalSection = {
  heading: string;
  paragraphs: string[];
};

// TODO: insert real legal text — every paragraph below is template scaffolding.
const sections: LegalSection[] = [
  {
    heading: "Scope of services",
    paragraphs: [
      "[PLACEHOLDER] Arcadian produces short-form property videos from photos supplied by the client. These terms apply to every order placed through this website or by email, unless a separate written agreement between the parties provides otherwise.",
    ],
  },
  {
    heading: "Orders & delivery",
    paragraphs: [
      "[PLACEHOLDER] An order becomes binding once we confirm it in writing. Delivery times are stated per package and begin when we have received your photos and the listing details.",
      "[PLACEHOLDER] Finished videos are delivered as digital files via a download link. The client is responsible for downloading and storing the files; links remain active for [link validity period].",
    ],
  },
  {
    heading: "Revisions",
    paragraphs: [
      "[PLACEHOLDER] Each package includes the number of revision rounds stated at the time of ordering. Further rounds, or changes requested after final approval, are quoted and billed separately.",
    ],
  },
  {
    heading: "Licensing & usage rights of delivered videos",
    paragraphs: [
      "[PLACEHOLDER] Upon full payment, the client receives a [licence type] licence to publish the delivered videos across their own marketing channels, including social media, listing portals, and their website. Reselling or sublicensing the videos to third parties requires our prior written consent.",
      "[PLACEHOLDER] Arcadian may display delivered work in its own portfolio and marketing unless the client opts out in writing before delivery.",
    ],
  },
  {
    heading: "Client responsibilities",
    paragraphs: [
      "[PLACEHOLDER] The client confirms that they own the photos they submit, or hold all rights and permissions required for us to use them in a video and for that video to be published. The client indemnifies Arcadian against third-party claims arising from submitted material.",
    ],
  },
  {
    heading: "Payment",
    paragraphs: [
      "[PLACEHOLDER] Prices are stated per package and exclude VAT unless noted otherwise. Invoices are payable within [payment term] days of the invoice date; we may withhold delivery of final files until payment has been received.",
    ],
  },
  {
    heading: "Liability",
    paragraphs: [
      "[PLACEHOLDER] Arcadian is liable only for damage caused by intent or gross negligence, and in total up to the amount paid for the order concerned. We accept no liability for how delivered videos perform on any platform, or for changes third-party platforms make to published content.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: [
      "[PLACEHOLDER] These terms are governed by the laws of [jurisdiction]. Any dispute arising from them will be brought before the competent court of [venue], without prejudice to mandatory consumer protections that may apply.",
    ],
  },
];

export default function TermsPage() {
  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-5 font-sans text-display font-medium text-ink">Terms of Service</h1>
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
        </div>
      </Container>
    </section>
  );
}
