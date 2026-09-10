import { ArrowRight } from "lucide-react";
import { Accordion } from "@/components/shared/Accordion";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faq } from "@/content/faq";

/**
 * Section 4.10 — FAQ. Two-column layout: sticky-feeling heading on the left,
 * single-open accordion on the right. FAQPage JSON-LD for these items is
 * emitted by app/page.tsx — do not duplicate it here.
 */
export function FAQ() {
  return (
    <section id="faq" className="py-section md:py-section-lg">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                eyebrow="FAQ"
                title="Frequently asked questions."
                description="Everything you need to know before your first listing. If your question is not here, we are one message away."
              />
              <div className="mt-8">
                <Button variant="ghost" href="/#contact">
                  Ask us directly
                  <ArrowRight className="icon-inline" aria-hidden="true" strokeWidth={1.75} />
                </Button>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <Accordion items={faq} />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
