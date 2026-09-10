import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { steps } from "@/content/steps";

/** Section 4.5 — the four-step process, split layout on the bone band. */
export function HowItWorks() {
  return (
    <section id="process" className="bg-bone py-24 md:py-32">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Sticky lives on the grid item (full row height), not inside Reveal's
              content-sized wrapper — otherwise it has zero travel and never pins. */}
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <figure className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
                {/* TODO [PLACEHOLDER]: replace with a real portfolio still or short looping video */}
                <Image
                  src="/images/process.svg"
                  alt="Editorial interior artwork"
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
                description="No shoot to schedule, no access to arrange. Four steps, and your team only has to act on two of them."
              />
            </Reveal>

            <ol className="relative mt-12 space-y-11 before:absolute before:bottom-10 before:left-6 before:top-10 before:w-px before:bg-gold/25 before:content-['']">
              {steps.map((step, i) => (
                <li key={step.number}>
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
