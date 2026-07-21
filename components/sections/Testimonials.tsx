// TODO: template testimonials — replace with real, permissioned client quotes
// before launch (edit content/testimonials.ts).

import Image from "next/image";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/shared/Reveal";
import { testimonials } from "@/content/testimonials";

/** Section 4.9 — client voices on a bone band. */
export function Testimonials() {
  return (
    <section className="border-y border-line bg-bone py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Clients"
            title="Loved by agents and agencies."
            description="What partners say after their first few listings with us."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name + t.avatar} delay={i * 0.08} className="h-full">
              <Card className="flex h-full flex-col p-7">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }, (_, star) => (
                    <Star
                      key={star}
                      className="h-3.5 w-3.5 fill-gold text-gold"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  ))}
                  <span className="sr-only">Rated {t.rating} out of 5</span>
                </div>

                <blockquote className="mt-5 flex-1 text-[0.9375rem] leading-relaxed text-graphite">
                  {t.quote}
                </blockquote>

                <footer className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                  <Image
                    src={t.avatar}
                    alt=""
                    aria-hidden="true"
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full border border-line"
                  />
                  <div>
                    <p className="text-sm font-medium text-ink">{t.name}</p>
                    <p className="mt-0.5 text-xs text-graphite">{t.role}</p>
                  </div>
                </footer>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
