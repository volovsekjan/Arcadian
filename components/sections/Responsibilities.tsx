import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/shared/Reveal";

const agencyProvides = [
  "Approved property photos",
  "Accurate listing details",
  "Authorization to market the property",
  "Agency branding",
  "Required Trakheesi permit information",
  "Applicable QR code",
  "Final approval before publishing",
] as const;

const arcadianProvides = [
  "Creative production",
  "Photo presentation enhancement",
  "Video editing",
  "Story and feed assets",
  "Captions",
  "Placement of supplied permit information",
  "Publishing where included",
  "Revisions included in the selected plan",
] as const;

function ResponsibilityList({ heading, items }: { heading: string; items: readonly string[] }) {
  return (
    <Card className="h-full p-8">
      <h3 className="font-display text-xl font-medium text-ink">{heading}</h3>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Check className="mt-1 h-4 w-4 shrink-0 text-gold" strokeWidth={2} aria-hidden="true" />
            <span className="text-sm leading-relaxed text-graphite">{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/** Section — who does what, including Dubai advertising-permit responsibilities. */
export function Responsibilities() {
  return (
    <section className="border-y border-line bg-bone py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Responsibilities"
            title="Clear responsibilities from the start."
            description="Good property marketing in Dubai depends on accurate listings and valid permits. Here is how the work is divided."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal className="h-full">
            <ResponsibilityList heading="Your agency provides" items={agencyProvides} />
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <ResponsibilityList heading="Arcadian provides" items={arcadianProvides} />
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <div className="mt-10 max-w-3xl space-y-4 text-sm leading-relaxed text-graphite">
            <p>
              Clients remain responsible for listing accuracy, marketing authorization and
              obtaining the required advertising permits. Arcadian can place the permit number and
              QR code supplied by the client into the agreed content.
            </p>
            <p>
              For managed plans, content requiring permit information will not be published until
              the necessary materials have been supplied and approved.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
