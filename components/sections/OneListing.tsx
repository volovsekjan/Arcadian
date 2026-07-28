import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/shared/Reveal";

// TODO: when real client work exists, show the original listing photos next to
// the finished Reel, carousel and Story frames here instead of the count tiles.

/** An example of the deliverables one listing's photos can turn into. */
const exampleOutput = [
  { count: "1", label: "Main property Reel" },
  { count: "2", label: "Shorter video cuts" },
  { count: "1", label: "Carousel" },
  { count: "6", label: "Story frames" },
] as const;

/** Section — what a single listing's photos can become. */
export function OneListing() {
  return (
    <section className="border-y border-line bg-bone py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="One listing"
            title="See how far one listing can go."
            description="Send us the photos once. We can use them to create several pieces of content for the days and weeks that follow."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {exampleOutput.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08} className="h-full">
              <Card className="flex h-full flex-col p-7">
                <p className="font-display text-5xl font-medium text-gold-deep">{item.count}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink">{item.label}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.32}>
          <p className="mt-8 max-w-2xl text-sm text-graphite">
            Every piece comes with captions and calls to action. This is an example breakdown — the
            exact mix depends on your plan and on the photos available.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
