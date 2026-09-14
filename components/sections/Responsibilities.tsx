import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/shared/Reveal";

const agencyProvides = [
  "Approved property photos",
  "Accurate listing details",
  "Agency branding",
  "Any required marketing or compliance information",
  "Final approval where required",
] as const;

const arcadianProvides = [
  "Creative production",
  "Video editing",
  "Photo presentation enhancement",
  "Reels, Stories and feed assets",
  "Captions and calls to action",
  "Formatting for your publishing channels",
] as const;

function ResponsibilityList({ heading, items }: { heading: string; items: readonly string[] }) {
  return (
    <Card className="h-full p-8">
      <h3 className="font-sans text-h3 font-medium text-ink">{heading}</h3>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Check className="icon-inline mt-0.5 text-gold" strokeWidth={2} aria-hidden="true" />
            <span className="text-body-sm leading-relaxed text-graphite">{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/**
 * Working together: who supplies what.
 *
 * Market-neutral by design. This used to name Trakheesi permits, QR codes and
 * Dubai specifically, which is wrong for a studio presenting itself globally:
 * it told every agency outside the UAE that the page was not written for them.
 * The obligation is the same everywhere, so it is stated once, generally, and
 * each market supplies its own rules.
 */
export function Responsibilities() {
  return (
    <section className="bg-bone py-section md:py-section-lg">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Working together"
            title="You provide the listing. We handle the production."
            description="Every market has its own requirements. Your team provides the approved property assets and accurate listing information; we turn them into ready-to-use marketing content."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal className="h-full">
            <ResponsibilityList heading="What we need from you" items={agencyProvides} />
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <ResponsibilityList heading="What we handle" items={arcadianProvides} />
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <p className="mt-10 max-w-3xl text-body-sm leading-relaxed text-graphite">
            Your agency remains responsible for the accuracy of listing information and for any
            permissions, disclosures or advertising requirements applicable in your market.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
