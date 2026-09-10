import { ArrowRight, CalendarCheck, Inbox, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BeforeAfterSlider } from "@/components/shared/BeforeAfterSlider";
import { Reveal } from "@/components/shared/Reveal";

const points = [
  { icon: Inbox, text: "One place to send every new listing." },
  { icon: CalendarCheck, text: "An agreed schedule of Reels, Stories and feed posts." },
  { icon: ShieldCheck, text: "Your team approves everything before it goes out." },
] as const;

/** Section — the operational problem Arcadian removes, on the black band. */
export function Spotlight() {
  return (
    <section className="bg-black py-section md:py-section-lg">
      <Container className="grid gap-14 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-7">
          <div className="mx-auto w-full max-w-sm">
            <BeforeAfterSlider
              before="/images/before.png"
              after="/images/after.png"
              beforeAlt="Listing photo before enhancement, dark and low resolution"
              afterAlt="The same listing photo after photo correction and enhancement"
            />
            {/* The affordance. Without it the handle is the only hint that the
                image does anything, and on touch there is no cursor to change. */}
            <p className="mt-4 text-center text-fine text-ivory/60">
              Drag to compare the same listing photo, before and after.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <SectionHeading
            tone="dark"
            eyebrow="The problem we remove"
            title="Your agents should not be chasing editors and planning posts."
            description="Most agencies already have property photos. The problem is turning them into enough useful content, and making sure that content actually gets posted."
          />

          <p className="mt-5 text-body-sm text-ivory/70">
            Arcadian gives your team a repeatable process. You send the listing assets, review the
            work and choose whether your team publishes it or we do.
          </p>

          <ul className="mt-10 space-y-5">
            {points.map((point) => (
              <li key={point.text} className="flex items-start gap-4">
                <point.icon className="icon-list text-gold" strokeWidth={1.75} aria-hidden="true" />
                <span className="text-ivory/80">{point.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button
              variant="ghost"
              href="/#process"
              className="text-ivory decoration-gold/60 hover:decoration-gold focus-visible:ring-offset-black"
            >
              See how it works
              <ArrowRight className="icon-inline" strokeWidth={1.75} aria-hidden="true" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
