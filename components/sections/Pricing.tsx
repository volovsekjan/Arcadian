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
 * components/shared/Price.tsx still renders them, so restoring the cards is a
 * matter of rendering them again rather than rebuilding them.
 *
 * It has no importer at all now — the comparison table's Cost row used to be
 * the last one and is qualitative since the global repositioning. TypeScript
 * still checks the file's shape, because tsconfig includes every .ts file, but
 * nothing checks its copy against the site any more. Its tier names and
 * monthly figures are therefore stale, and the header comment in
 * content/pricing.ts says so.
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
              {/*
                border-line is the same token the Responsibilities cards use
                through <Card>. Overridden here rather than on the shared
                `secondary` variant, so no other secondary button moves. The
                hover (border-ink) is untouched.
              */}
              <Button href="/#contact" variant="secondary" size="lg" className="border-line">
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
