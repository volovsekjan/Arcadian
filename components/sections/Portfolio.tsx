import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { VideoCard } from "@/components/shared/VideoCard";
import { projects } from "@/content/projects";
import { cn } from "@/lib/utils";

// TODO [PLACEHOLDER]: drop in real videos + posters via content/projects.ts.

/** Section 4.6 — selected work: the full portfolio grid with editorial offsets. */
export function Portfolio() {
  return (
    <section id="work" className="bg-ivory py-24 md:py-32">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects that define our style."
            description="A few of the homes we have turned into films — every one starting from photos alone."
          />
          <Button variant="ghost" href="/#contact" className="hidden md:inline-flex">
            Start your project
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </Button>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:pb-12">
          {projects.map((project, i) => (
            <div
              key={project.slug}
              // Offset lives on the grid cell, not the Reveal — framer-motion
              // owns the motion.div's inline transform and would cancel it.
              className={cn(i % 2 === 1 && "lg:translate-y-12")}
            >
              <Reveal delay={(i % 4) * 0.08}>
                <VideoCard
                  project={project}
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 46vw"
                />
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
