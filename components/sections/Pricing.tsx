import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { pricing, pilot } from "@/content/pricing";
import { cn } from "@/lib/utils";

/** Section 4.8 — three service levels, the middle one highlighted, plus the paid pilot. */
export function Pricing() {
  return (
    <section id="pricing" className="bg-ivory py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Pricing"
            title="Choose how much we take on."
            description="Every plan starts from the photos you already have. The difference is whether your team posts the work — or we do."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {pricing.map((tier, i) => (
            // min-w-0 lets the single-column grid track shrink to the container
            // on mobile; without it a long price token keeps the card at its
            // min-content width and overflows the page.
            <Reveal key={tier.id} delay={i * 0.08} className="h-full min-w-0">
              <Card
                className={cn(
                  "relative flex h-full flex-col p-8",
                  tier.highlighted && "border-gold shadow-lift lg:-translate-y-3",
                )}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-4 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-ink">
                    Most Popular
                  </span>
                )}

                <h3 className="font-display text-xl font-medium text-ink">{tier.name}</h3>
                <p className="mt-1 text-sm text-graphite">{tier.tagline}</p>

                <div className="mt-7">
                  <p className="text-sm text-graphite">From</p>
                  <p className="mt-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="font-display text-4xl font-medium text-ink [overflow-wrap:anywhere]">
                      {tier.price}
                    </span>
                    {tier.period && <span className="text-sm text-graphite">{tier.period}</span>}
                  </p>
                </div>

                <ul className="mt-8 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-gold"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-relaxed text-graphite">{feature}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-graphite">
                  {tier.scopeNote}
                </p>

                <div className="mt-7">
                  <Button
                    href="/#contact"
                    variant={tier.highlighted ? "primary" : "secondary"}
                    className="w-full"
                  >
                    {tier.cta}
                  </Button>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16}>
          <p className="mt-10 text-center text-sm text-graphite">
            Final scope depends on monthly listing volume, number of accounts and required
            deliverables. All prices exclude VAT and advertising spend.
          </p>
        </Reveal>

        {/* Lower-commitment way in: the paid single-listing pilot. */}
        <Reveal className="mx-auto mt-16 max-w-2xl">
          <Card className="p-8">
            <h3 className="font-display text-xl font-medium text-ink">{pilot.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-graphite">{pilot.description}</p>
            <p className="mt-6 text-sm font-medium text-ink">The pilot can include:</p>
            <ul className="mt-3 space-y-2.5">
              {pilot.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    className="mt-1 h-4 w-4 shrink-0 text-gold"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed text-graphite">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <Button href="/#contact" variant="secondary" className="w-full sm:w-auto">
                {pilot.cta}
              </Button>
            </div>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}
