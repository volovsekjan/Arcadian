import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/shared/Reveal";
import { services } from "@/content/services";

/** Section 4.4 — the six things we produce from a client's listing photos. */
export function Services() {
  return (
    <section id="services" className="bg-ivory py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="More ways to promote every property."
            description="One set of listing photos can be used for much more than a portal listing. We turn those photos into videos, Story assets and feed posts that keep the property visible across your social channels."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.08} className="h-full">
              <Card className="group flex h-full flex-col p-7 transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-card">
                <service.icon className="h-6 w-6 text-gold" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-6 font-display text-xl font-medium text-ink">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite">{service.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
