import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { steps } from "@/content/steps";
import { cn } from "@/lib/utils";

/** Section 4.5 — the four-step process, split layout on the bone band. */
export function HowItWorks() {
  return (
    <section id="process" className="bg-bone py-section md:py-section-lg">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Sticky lives on the grid item (full row height), not inside Reveal's
              content-sized wrapper — otherwise it has zero travel and never pins. */}
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <figure className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
                {/* TODO: replace with a real portfolio still or short looping video */}
                <Image
                  src="/images/process.svg"
                  aria-hidden="true"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="object-cover"
                />
              </figure>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <SectionHeading
                eyebrow="How it works"
                title="Send the photos once. Here is what happens next."
                description="No shoot to schedule and no new production day to arrange. Send us the approved listing assets and we take the content from there."
              />
            </Reveal>

            {/*
              The connector is drawn per step and omitted on the last one, so
              nothing continues past 04. It used to be a single line on the
              <ol> inset by a fixed 40px top and bottom; the bottom inset is
              measured from the list's edge, not from the last circle, so
              whenever the final step's text ran taller than its 48px circle
              the line carried on below it.

              Geometry per item: top-6 is the circle's vertical centre, and
              -bottom-11 reaches exactly the space-y-11 gap to the next
              circle's top edge. The circles sit above it on z-10 with an
              opaque fill, so the line reads as running between them.
            */}
            <ol className="mt-12 space-y-11">
              {steps.map((step, i) => (
                <li
                  key={step.number}
                  className={cn(
                    "relative",
                    i < steps.length - 1 &&
                      "before:absolute before:-bottom-11 before:left-6 before:top-6 before:w-px before:bg-gold/25 before:content-['']",
                  )}
                >
                  <Reveal delay={i * 0.08} className="grid grid-cols-[3rem_1fr] gap-x-6">
                    <span
                      aria-hidden="true"
                      className="nums-tabular relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-bone font-sans text-body font-medium text-gold-deep"
                    >
                      {step.number}
                    </span>
                    <div>
                      <h3 className="flex items-center gap-2.5 pt-2.5 font-sans text-h3 font-semibold text-ink">
                        <step.icon
                          className="icon-list text-gold"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        {step.title}
                      </h3>
                      <p className="mt-2.5 text-body font-medium text-graphite">
                        {step.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
