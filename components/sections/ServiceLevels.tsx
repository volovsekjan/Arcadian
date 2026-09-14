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
    <section className="bg-ivory py-section md:py-section-lg">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title="What we can take off your plate."
            description="From one set of listing photos, we can create the content your team needs to keep properties visible across social channels."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {serviceLevels.map((level, i) => (
            <Reveal key={level.name} delay={i * 0.08} className="h-full">
              <Card className="flex h-full flex-col p-7">
                <span className="font-sans text-eyebrow font-semibold uppercase text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-sans text-h3 font-medium text-ink">{level.name}</h3>
                <p className="mt-3 text-body-sm text-graphite">{level.summary}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10">
            <Button variant="ghost" href="/#services">
              Explore our services
              <ArrowRight className="icon-inline" strokeWidth={1.75} aria-hidden="true" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
