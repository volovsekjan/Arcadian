import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { serviceLevels } from "@/content/levels";

/** What Arcadian does, explained through the three levels of service. */
export function ServiceLevels() {
  return (
    <section className="bg-ivory pb-24 pt-16 md:pb-32 md:pt-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title="Three ways to work with us."
            description="Arcadian is a production studio for real estate agencies. Every plan starts from the photos you already have. What changes is how much of the publishing you hand over."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {serviceLevels.map((level, i) => (
            <Reveal key={level.name} delay={i * 0.08} className="h-full">
              <Card className="flex h-full flex-col p-7">
                <span className="font-sans text-eyebrow font-semibold uppercase text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-medium text-ink">{level.name}</h3>
                <p className="type-note mt-3 text-graphite">{level.summary}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10">
            <Button variant="ghost" href="/#pricing">
              Compare the plans
              <ArrowRight className="icon-inline" strokeWidth={1.75} aria-hidden="true" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
