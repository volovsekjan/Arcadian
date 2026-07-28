import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { benefits } from "@/content/benefits";

/**
 * Section 4.3 — a calm bone-colored band with three concrete benefits.
 * Deliberately carries no statistics or client logos: numbers and logos may
 * only be added here once they are real and verifiable (see content/benefits.ts).
 */
export function TrustBar() {
  return (
    <section className="border-y border-line bg-bone py-14 md:py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 0.08} className="flex items-start gap-4">
              <benefit.icon
                className="mt-1 h-6 w-6 shrink-0 text-gold"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div>
                <p className="font-display text-lg font-medium text-ink">{benefit.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-graphite">
                  {benefit.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
