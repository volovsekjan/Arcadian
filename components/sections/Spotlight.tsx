import Image from "next/image";
import { ArrowRight, CalendarCheck, Inbox, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";

const points = [
  { icon: Inbox, text: "One place to send every new listing." },
  { icon: CalendarCheck, text: "An agreed schedule of Reels, Stories and feed posts." },
  { icon: ShieldCheck, text: "Your team approves everything before it goes out." },
] as const;

/** Section — the operational problem Arcadian removes, on the dark espresso band. */
export function Spotlight() {
  return (
    <section className="bg-espresso py-24 md:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-7">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ivory/10">
            {/* TODO [PLACEHOLDER]: replace with a real portfolio still or short looping video */}
            <Image
              src="/images/spotlight.svg"
              alt="Architectural artwork"
              fill
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover"
            />
          </figure>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <SectionHeading
            tone="dark"
            eyebrow="The problem we remove"
            title="Your agents should not be chasing editors and planning posts."
            description="Most agencies already have property photos. The problem is turning them into enough useful content — and making sure that content actually gets posted."
          />

          <p className="mt-5 text-ivory/70">
            Arcadian gives your team a repeatable process. You send the listing assets, review the
            work and choose whether your team publishes it or we do.
          </p>

          <ul className="mt-10 space-y-5">
            {points.map((point) => (
              <li key={point.text} className="flex items-start gap-4">
                <point.icon
                  className="mt-1 h-5 w-5 shrink-0 text-gold"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span className="text-ivory/80">{point.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button
              variant="ghost"
              href="/#process"
              className="text-ivory decoration-gold/60 hover:decoration-gold focus-visible:ring-offset-espresso"
            >
              See how it works
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
