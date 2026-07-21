import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { pricing } from "@/content/pricing";
import { cn } from "@/lib/utils";

/** Section 4.8 — three pricing tiers, the middle one highlighted. */
export function Pricing() {
  return (
    <section id="pricing" className="bg-ivory py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Pricing"
            title="Simple pricing. No surprises."
            description="Choose the plan that fits your volume. No hidden fees."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {pricing.map((tier, i) => (
            // min-w-0 lets the single-column grid track shrink to the container
            // on mobile; without it a long price token (e.g. the placeholder)
            // keeps the card at its min-content width and overflows the page.
            <Reveal key={tier.id} delay={i * 0.08} className="h-full min-w-0">
              <Card
                className={cn(
                  "relative flex h-full flex-col p-8",
                  tier.highlighted && "border-gold shadow-lift lg:-translate-y-3",
                )}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-4 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-ink">
                    Most popular
                  </span>
                )}

                <h3 className="font-display text-xl font-medium text-ink">{tier.name}</h3>
                <p className="mt-1 text-sm text-graphite">{tier.tagline}</p>

                <div className="mt-7 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="font-display text-4xl font-medium text-ink [overflow-wrap:anywhere]">
                    {tier.price}
                  </span>
                  {tier.period && <span className="text-sm text-graphite">{tier.period}</span>}
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

                <div className="mt-9">
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
          {/* TODO [PLACEHOLDER]: confirm billing terms before launch */}
          <p className="mt-10 text-center text-sm text-graphite">
            All prices exclude VAT. Pause or cancel the Studio plan any time.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
