import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * The consultation CTA that stands where the pricing cards used to.
 *
 * The three tiers, their features, the Most Popular badge, the scope
 * disclaimer and the pilot card were temporary: the final packages and prices
 * are not settled, so publishing them invited questions nobody can answer yet.
 * This section asks for the conversation instead.
 *
 * NOTHING IN THE PRICING SYSTEM WAS DELETED. content/pricing.ts still holds
 * all three tiers in four currencies, lib/regions.ts still resolves them, and
 * components/shared/Price.tsx still renders them. The data stayed live rather
 * than being commented out, so it does not rot: content/comparison.ts imports
 * it for the Cost row, and TypeScript still type-checks every field. Restoring
 * the cards later is a matter of rendering them again, not rebuilding them.
 *
 * The id is unchanged, so the Pricing nav link, the footer link and the two
 * ghost buttons that point at /#pricing all still land here.
 */
export function Pricing() {
  return (
    <section id="pricing" className="bg-ivory py-section md:py-section-lg">
      <Container>
        <Reveal>
          {/*
            A bordered panel rather than bare copy on the page. With the cards
            gone this section would otherwise be three short lines floating in
            a lot of white, which reads as something unfinished. The frame is
            the one the pricing and pilot cards already used, so it carries
            weight without introducing anything new.
          */}
          <div className="mx-auto max-w-3xl rounded-2xl border border-line px-7 py-14 text-center sm:px-12 sm:py-20">
            <SectionHeading
              align="center"
              eyebrow="Work with us"
              title="Built around how your agency works."
              description="Every agency has a different listing volume, team structure and publishing workflow. Tell us how you work and where you need support, and we’ll recommend the right setup, scope and pricing for your team."
            />

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button href="/#contact" size="lg">
                Book a Call
              </Button>
              <Button href="/#contact" variant="secondary" size="lg">
                Tell Us About Your Listings
              </Button>
            </div>

            <p className="mt-6 text-fine text-graphite">
              No obligation. Scope and pricing are confirmed before any work begins.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
