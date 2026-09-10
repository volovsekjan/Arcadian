import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/shared/Reveal";
import { services } from "@/content/services";

/** Section 4.4 — the six things we produce from a client's listing photos. */
export function Services() {
  return (
    <section id="services" className="bg-ivory py-section md:py-section-lg">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="One set of photos. A month of posts."
            description="A portal upload uses your photos once. We use the same set to build a run of content that keeps the property in front of buyers for weeks after it goes live: typically one main Reel, two shorter cuts, a carousel and a set of Story frames per listing."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.08} className="h-full">
              <Card className="group flex h-full flex-col p-7 transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-card">
                <service.icon
                  className="icon-feature text-gold"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <h3 className="mt-6 font-sans text-h3 font-semibold text-ink">{service.title}</h3>
                <p className="mt-3 text-body font-medium text-graphite">{service.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
