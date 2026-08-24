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
    <section className="bg-ivory py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title="Three ways to work with us."
            description="Arcadian is a content studio for real estate agencies. We take the listing photos you already have and turn them into videos, Stories and feed posts. How much of the posting we take on is up to you."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {serviceLevels.map((level, i) => (
            <Reveal key={level.name} delay={i * 0.08} className="h-full">
              <Card className="flex h-full flex-col border-espresso bg-espresso p-7">
                <span className="font-display text-base text-bone/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-medium text-bone">{level.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/70">{level.summary}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10">
            <Button variant="ghost" href="/#pricing">
              Compare the plans
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
