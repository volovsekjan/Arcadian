import Image from "next/image";
import { ArrowRight, CalendarOff, Film, Star, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { testimonials } from "@/content/testimonials";
import { cn } from "@/lib/utils";

const features = [
  { icon: Zap, text: "Fast by design — most videos are back within days." },
  { icon: Film, text: "Cinematic quality, consistent on every single listing." },
  { icon: CalendarOff, text: "Zero coordination — no appointments, no crews, no waiting." },
] as const;

/** Floating proof card shared by the desktop overlay and the mobile fallback. */
function SpotlightTestimonial({ className }: { className?: string }) {
  const t = testimonials[2];

  return (
    <div className={cn("rounded-2xl bg-paper p-6 shadow-lift", className)}>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className="h-3.5 w-3.5 fill-gold text-gold"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        ))}
        <span className="sr-only">Rated 5 out of 5</span>
      </div>
      {/* TODO [PLACEHOLDER]: template testimonial — replace before launch */}
      <blockquote className="mt-4 text-sm leading-relaxed text-graphite">{t.quote}</blockquote>
      <footer className="mt-4 flex items-center gap-3">
        <Image
          src={t.avatar}
          alt=""
          aria-hidden="true"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full border border-line"
        />
        <div>
          <p className="text-sm font-medium text-ink">{t.name}</p>
          <p className="text-xs text-graphite">{t.role}</p>
        </div>
      </footer>
    </div>
  );
}

/** Section 4.7 — "Why Arcadian" feature spotlight, the dark cinematic moment of the page. */
export function Spotlight() {
  return (
    <section className="bg-espresso py-24 md:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-7">
          {/* Bottom margin keeps the overlapping card clear of the stacked text column below lg. */}
          <div className="relative sm:mb-10 lg:mb-0">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ivory/10">
              <Image
                src="/images/spotlight.svg"
                alt="Cinematic architectural artwork — placeholder for a portfolio still"
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover"
              />
            </figure>
            <SpotlightTestimonial className="absolute -bottom-10 right-6 hidden max-w-sm sm:block lg:-right-8" />
            <SpotlightTestimonial className="mt-6 sm:hidden" />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <SectionHeading
            tone="dark"
            eyebrow="Why Arcadian"
            title={
              <>
                Discover content <em className="italic text-gold">tailored</em> to every space.
              </>
            }
            description="From a folder of photos to a finished film — without a single appointment. Every video is edited to flatter the property’s light, proportions, and character, then delivered in the formats your buyers actually watch."
          />

          <ul className="mt-10 space-y-5">
            {features.map((feature) => (
              <li key={feature.text} className="flex items-start gap-4">
                <feature.icon
                  className="mt-1 h-5 w-5 shrink-0 text-gold"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span className="text-ivory/80">{feature.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button
              variant="ghost"
              href="/#pricing"
              className="text-ivory decoration-gold/60 hover:decoration-gold focus-visible:ring-offset-espresso"
            >
              See pricing
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
