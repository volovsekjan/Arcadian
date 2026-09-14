import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern ordering, delivery, licensing, and use of Arcadian's content services.",
  alternates: { canonical: "/terms" },
};

type LegalSection = {
  heading: string;
  paragraphs: string[];
};

/**
 * Drafted against the service the site actually describes: the service areas
 * in content/levels.ts, the four step process in content/steps.ts, the
 * division of work in components/sections/Responsibilities.tsx, and the
 * disclaimers already made in content/faq.ts.
 *
 * Written without plan names, fixed prices or a single home market, because
 * the site no longer has any of the three. An engagement is defined by its
 * written scope here, and everything that used to hang off a tier now hangs
 * off what that scope includes.
 *
 * Still covers what the earlier template did not: account access, publishing
 * on the client's behalf, and the limits of the first response to enquiries.
 *
 * STILL TO CONFIRM BEFORE LAUNCH: the legal entity and address, governing law
 * and forum, payment terms and invoicing period, and the notice period for
 * ongoing work. Those are marked in the accompanying report; nothing has been
 * invented here.
 */
const sections: LegalSection[] = [
  {
    heading: "These terms",
    paragraphs: [
      "These terms apply to every order placed with Arcadian through this website or by email, unless we have signed a separate written agreement with you, in which case that agreement takes precedence over anything inconsistent here.",
      "In these terms, “you” means the agency or business placing the order, and “we” and “us” mean Arcadian.",
    ],
  },
  {
    heading: "What we provide",
    paragraphs: [
      "We produce marketing content for property listings from the photographs and listing details you supply. Depending on the agreed scope, that can include vertical property videos, shorter promotional cuts, feed posts and carousels, Story frames, empty property staging as a labelled visualisation, and captions.",
      "We are a production studio. We are not a real estate brokerage, we do not market property on our own account, and we do not advise buyers or renters.",
    ],
  },
  {
    heading: "Scope and ordering",
    paragraphs: [
      "We agree a written scope before any work begins. It sets out the deliverables, the volume, the platforms and accounts involved, how much of the publishing workflow we handle, the revision rounds included, and the price. An order becomes binding when we confirm it, and the confirmed scope is what we are engaged to deliver.",
      "This site does not publish prices. Scope and price depend on your listing volume, the deliverables you need, the number of accounts and platforms involved, and how much of the workflow you would like us to take on, so both are quoted for your agency rather than read off a page.",
      "Ongoing work is scheduled against an agreed content calendar rather than produced on demand. You can also start with a single paid listing, which runs the full process end to end so that you can see how we work before committing to anything ongoing.",
    ],
  },
  {
    heading: "What you provide",
    paragraphs: [
      "To produce the work we need approved property photographs, accurate listing details, your agency branding, and any permit, licence or disclosure information required for the property in your market. Where we publish on your behalf we also need access to the agreed accounts or to your scheduling tool.",
      "Turnaround times run from the point at which we have received everything on that list. If material arrives late or incomplete, delivery dates move accordingly.",
    ],
  },
  {
    heading: "Delivery",
    paragraphs: [
      "Finished assets are delivered as digital files through a download or shared folder, organised and ready to publish. You are responsible for downloading and storing your own copies; we do not undertake to host delivered files indefinitely.",
      "We agree turnaround times when we scope the work. As a guide, the first draft for a single listing is normally with you within three working days of receiving the material.",
    ],
  },
  {
    heading: "Review and revisions",
    paragraphs: [
      "Each engagement includes an agreed number of revision rounds, stated at the time of ordering. Further rounds, and changes requested after final approval, are quoted and billed separately.",
      "Factual corrections are not revisions. If we have misstated a price, a measurement or any other listing detail you supplied correctly, we will fix it regardless of how many revision rounds remain.",
    ],
  },
  {
    heading: "Approval before publishing",
    paragraphs: [
      "Nothing is published without your approval. Where your team publishes, that is inherent. Where we publish on your behalf, you approve the content, or the content calendar it sits within, before it goes out.",
      "Approval is your confirmation that the property details, the branding and any permit or disclosure information in the asset are correct.",
    ],
  },
  {
    heading: "Managed publishing",
    paragraphs: [
      "Where the agreed scope includes scheduling and publishing, you grant us the access we need to the agreed accounts and platforms for that purpose only. You remain the owner of those accounts, and you can withdraw access at any time, which will end our ability to perform that part of the service.",
      "We publish to the accounts, platforms and schedule agreed with you. We are not responsible for a post failing to appear where the cause is outside our control, including platform outages, API changes, account restrictions or content removal by the platform.",
    ],
  },
  {
    heading: "Enquiry support: scope and limits",
    paragraphs: [
      "Where enquiry support is part of the agreed scope, we monitor comments and direct messages during agreed hours, reply using scripts you have approved in writing, collect basic requirements from the person enquiring, and route serious enquiries to the right agent.",
      "That is the whole of it. We do not give property advice, quote or negotiate prices, confirm availability, arrange or conduct viewings, or do anything else that requires a licensed agent. Your agents remain responsible for advice, viewings, negotiation and closing.",
      "Replies are made from scripts you approve. If you change what we may say, tell us in writing, and the change applies from the point we confirm it.",
    ],
  },
  {
    heading: "Listing accuracy and marketing permissions",
    paragraphs: [
      "You confirm the accuracy of the listing details you give us, and you hold the authorisation required to market the property.",
      "You supply any advertising permit, licence, reference number, QR code or disclosure that your market requires for the property. We place the information you supply into the agreed content. We do not obtain permits or licences, we do not verify them, and we do not advise on what your market requires.",
      "Where we publish on your behalf, content that requires such information will not be published until it has been supplied and approved. If it is missing when a post is due, we hold the post and tell you. We will not publish first and correct afterwards.",
    ],
  },
  {
    heading: "Rights in what you supply",
    paragraphs: [
      "You confirm that you own the photographs and other materials you send us, or that you hold all the rights and permissions needed for us to use them to produce content and for that content to be published.",
      "You will indemnify us against third party claims arising from material you supplied, including claims about image rights, property rights or the accuracy of a listing.",
    ],
  },
  {
    heading: "Intellectual property and your licence",
    paragraphs: [
      "Your photographs, branding and listing materials remain yours. We claim no ownership of them.",
      "On payment in full, we grant you a perpetual, worldwide, non-exclusive licence to publish and use the delivered content across your own marketing channels, including social media, listing portals, paid promotion and your website.",
      "Reselling the delivered content, or sublicensing it to a third party as a standalone product, requires our prior written consent. Using it to market the property it was made for, including where a portal or partner republishes it, does not.",
      "Project files, working files and the templates and methods we use to produce the work remain ours.",
    ],
  },
  {
    heading: "Portfolio use",
    paragraphs: [
      "We may show delivered work in our own portfolio and marketing, including on this website and on our social accounts.",
      "If you would rather we did not, tell us in writing, either before delivery or at any point afterwards, and we will not publish it and will remove it from material we control within a reasonable period. We do not require a reason, and it does not affect your price or your service.",
    ],
  },
  {
    heading: "Fees, VAT and payment",
    paragraphs: [
      "Prices are quoted per engagement or per project and exclude VAT and any other applicable tax, which is added where it applies. Prices also exclude advertising spend, which you pay directly to the platform.",
      "The invoicing period and the currency of invoicing are set in the written scope. We may withhold delivery of final files where an invoice is overdue.",
    ],
  },
  {
    heading: "Term, cancellation and suspension",
    paragraphs: [
      "Ongoing engagements continue until either of us gives notice. Work already produced or scheduled in the billing period in which notice is given remains payable.",
      "We may suspend or end the service where an invoice is significantly overdue, where permit, licence or listing accuracy problems are not resolved, or where we are asked to publish something that would breach a platform's rules, advertising regulations or the law.",
      "On termination we hand back the assets you supplied, and access to your accounts ends.",
    ],
  },
  {
    heading: "Third party platforms",
    paragraphs: [
      "Publication depends on platforms we do not control, including Instagram and the wider Meta family, TikTok, YouTube and listing portals. Their rules, their formats and their behaviour can change without notice.",
      "We follow the disclosure rules those platforms set, including labelling realistic AI assisted content where they require it. Where we publish on your behalf we apply the label; where your team publishes, we tell you what to switch on.",
    ],
  },
  {
    heading: "No guarantee of results",
    paragraphs: [
      "We do not guarantee views, reach, engagement, enquiries, viewings or sales, and nothing on this website should be read as promising them. Organic performance depends on many factors outside the content itself and outside our control.",
      "What we undertake is the quality, the consistency and the agreed volume of what we produce and, where included, publish.",
    ],
  },
  {
    heading: "Liability",
    paragraphs: [
      "Nothing in these terms limits liability for death or personal injury caused by negligence, for fraud, or for anything else that cannot lawfully be limited.",
      "Subject to that, our total liability arising from an order is limited to the amount paid for that order, and we are not liable for loss of profit, loss of business, loss of goodwill, or for indirect or consequential loss.",
      "We are not liable for how delivered content performs on any platform, or for changes a platform makes to content after it has been published.",
    ],
  },
  {
    heading: "Force majeure",
    paragraphs: [
      "Neither of us is liable for a failure or delay caused by events beyond reasonable control, including infrastructure or platform outages, loss of connectivity, industrial action, acts of government, or natural events. Where such an event continues for an extended period, either of us may end the affected work.",
    ],
  },
  {
    heading: "Changes to these terms",
    paragraphs: [
      "We may update these terms. The version in force for an order is the one published when we confirmed that order. Material changes affecting ongoing work will be notified to you before they take effect.",
    ],
  },
];

export default function TermsPage() {
  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-5 font-sans text-display font-medium text-ink">Terms of Service</h1>
        <p className="mt-4 text-body-sm text-graphite">Last updated: 14 September 2026</p>

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

          <h2 className="mt-12 font-sans text-h3 font-medium text-ink">Questions</h2>
          <p className="mt-4 leading-relaxed text-graphite">
            If anything here is unclear before you place an order, ask us through the{" "}
            <Link
              href="/#contact"
              className="text-ink underline decoration-gold/50 underline-offset-4 transition-colors duration-300 ease-out-soft hover:decoration-gold"
            >
              contact form
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
