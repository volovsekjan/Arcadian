import { ArrowRight } from "lucide-react";
import { Marquee } from "@/components/shared/Marquee";
import { Reveal } from "@/components/shared/Reveal";
import { VideoCard } from "@/components/shared/VideoCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { projects } from "@/content/projects";

/**
 * Hero — the page's h1, subhead, primary CTAs, and a full-bleed auto-moving
 * marquee of portfolio video cards. Sits on ivory directly under the navbar.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pb-section pt-8 md:pb-section-lg md:pt-12">
      {/* Faint architectural line-art motif — decorative only. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 460 420"
        className="pointer-events-none absolute right-0 top-0 hidden h-[420px] w-auto text-gold opacity-[0.08] md:block"
        stroke="currentColor"
        strokeWidth={1.75}
        fill="none"
      >
        {/* Tall arch */}
        <path d="M150 420 V190 C150 121 205 66 274 66 C343 66 398 121 398 190 V420" />
        {/* Inner arch echo */}
        <path d="M186 420 V196 C186 147 225 108 274 108 C323 108 362 147 362 196 V420" />
        {/* Vertical datum lines */}
        <path d="M70 420 V150" />
        <path d="M440 420 V96" />
        {/* Horizontal datum lines */}
        <path d="M0 330 H110" />
        <path d="M398 258 H460" />
        {/* Small circle */}
        <circle cx="96" cy="88" r="16" />
      </svg>

      <Container>
        <div className="max-w-3xl">
          <Reveal delay={0.08}>
            <h1 className="font-sans text-display font-medium text-ink">
              Your listings already have{" "}
              <em className="type-slogan not-italic text-gold">everything we need.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-body text-graphite">
              Send us the photos your agency has on file. We turn them into property Reels, Story
              sets and feed posts your agents can publish this week, or we schedule and publish them
              for you.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href="/#contact" size="lg">
                Book a Call
              </Button>
              <Button variant="ghost" href="/#work">
                See Our Work{" "}
                <ArrowRight className="icon-inline" strokeWidth={1.75} aria-hidden="true" />
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Full-bleed portfolio marquee — VideoCard opens the lightbox itself. */}
      <Reveal delay={0.3} className="mt-14 md:mt-16">
        <Marquee speed={32}>
          {projects.map((project, i) => (
            <VideoCard
              key={project.slug}
              project={project}
              priority={i === 0}
              className="w-[240px] sm:w-[270px] md:w-[300px]"
              sizes="300px"
            />
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
