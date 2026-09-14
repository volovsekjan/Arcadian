import { Reveal } from "@/components/shared/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { capabilities } from "@/content/about";
import { cn } from "@/lib/utils";

/**
 * Who we are: the credibility section, on the black band.
 *
 * DARK BY DESIGN. It is the second of two black sections, after The problem we
 * remove, and it breaks up the run of light bands in the middle of the page:
 * Services and The alternatives come in above it, How it works, Selected work
 * and Work with us below. Same surface as Spotlight (bg-black), same dark tone
 * tokens, so no new colour enters the system.
 *
 * On dark, the palette is fixed by the sections that came first: ivory for
 * titles, ivory/70 for body, ivory/10 for hairlines, gold for the accent.
 * Nothing here invents a value.
 *
 * NOT CARDS. The four capabilities are open blocks on the section's own
 * background, separated by rules rather than boxed: a bordered card on a black
 * band reads as a white component that has been recoloured, which is exactly
 * what this section is not. Each block is opened by a two-tone hairline, a
 * short gold segment running into a long faint one, and the right-hand column
 * is divided from the left by a single vertical rule from sm up.
 *
 * Asymmetric 5/7 split on lg: the argument on the narrow side, the evidence on
 * the wide one. Row two carries a little more air than row one (sm:mt-4) so
 * the block does not tick along in four identical beats. Below sm everything
 * is one column in source order, introduction first.
 *
 * ONE TYPEFACE. Satoshi throughout, including the closing line, which an
 * earlier version set in Prata. The serif is reserved for the hero and for
 * slogans, and a statement about judgement reads stronger stated plainly than
 * dressed up. Its emphasis comes from size, a gold rule above it and the last
 * three words in gold, not from a second font.
 *
 * No em dashes anywhere in this section, in the copy or in the file.
 */

/** The rule that opens each capability block: a gold tick, then a faint line. */
function BlockRule() {
  return (
    <div aria-hidden="true" className="flex items-center">
      <span className="h-px w-10 shrink-0 bg-gold" />
      <span className="h-px flex-1 bg-ivory/10" />
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="bg-black py-section md:py-section-lg">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                tone="dark"
                eyebrow="Who we are"
                title="Creative experience, built for what comes next."
                description="Arcadian brings together years of hands-on experience in video editing, graphic design and digital content production. We combine strong creative fundamentals with modern AI-assisted workflows to create property content that feels considered, consistent and built for today's platforms."
              />
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-5 max-w-2xl text-body text-ivory/70">
                We continuously explore new creative software, AI models and production techniques,
                but technology only becomes part of our workflow when it genuinely improves quality,
                speed or consistency. This allows our process to keep evolving while the creative
                standard stays high.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2">
              {capabilities.map((capability, i) => (
                <Reveal
                  key={capability.title}
                  delay={i * 0.08}
                  className={cn(
                    // The vertical rule between the columns, drawn once per
                    // right-hand block rather than as a full-height divider, so
                    // it breaks at the row gap and reads as typography rather
                    // than as a table.
                    i % 2 === 1 && "sm:border-l sm:border-ivory/10 sm:pl-12",
                    // Row two sits slightly lower than the grid gap alone would
                    // put it. Margin, not a translate: framer-motion owns the
                    // inline transform on a Reveal and would overwrite it.
                    i >= 2 && "sm:mt-4",
                  )}
                >
                  <BlockRule />
                  <span
                    aria-hidden="true"
                    className="nums-tabular mt-6 block font-sans text-display font-medium leading-none text-gold/60"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-sans text-h3 font-semibold text-ivory">
                    {capability.title}
                  </h3>
                  <p className="mt-3 text-body-sm leading-relaxed text-ivory/70">
                    {capability.description}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal delay={0.12}>
          {/* The closing statement. The gold rule runs the full container width
              while the line itself is measured, so it reads as the section's
              last word rather than as a footnote under the right-hand column. */}
          <div className="mt-20 border-t border-gold/50 pt-10 md:mt-24 md:pt-12">
            <p className="max-w-4xl font-sans text-h3 font-medium text-ivory">
              Technology changes quickly. Good creative judgement still matters.{" "}
              <span className="text-gold">We use both.</span>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
