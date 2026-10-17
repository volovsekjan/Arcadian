import { ArrowRight } from "lucide-react";
import { HeroVideo } from "@/components/shared/HeroVideo";
import { Marquee } from "@/components/shared/Marquee";
import { Reveal } from "@/components/shared/Reveal";
import { VideoCard } from "@/components/shared/VideoCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { projects } from "@/content/projects";

/**
 * Hero — the page's h1, subhead, primary CTAs, a looping showreel beside them,
 * and a full-bleed auto-moving marquee of portfolio video cards. Sits on ivory
 * directly under the navbar.
 *
 * The showreel replaced a faint arch line-art SVG that used to be pinned to
 * the section's top right corner at 8% opacity.
 *
 * NO FRAME. It is a bare video on the white page: no border, no radius, no
 * surface behind it, no shadow. It was briefly given the rounded hairline that
 * HowItWorks puts around its figure, which made it read as a card sitting on
 * the hero rather than as part of it.
 *
 * SIZED BY THE VIEWPORT, NOT BY A COLUMN. From lg up it leaves the flow
 * entirely: a left offset in percent starts it partway across the container,
 * and the negative right offset is the full-bleed trick, resolving a
 * percentage against the container and a viewport unit against the screen so
 * the right edge lands exactly on the screen edge however wide the window is.
 * (Written out rather than quoted, because Tailwind scans this file as plain
 * text and will happily emit a rule for a class name it finds in a comment.)
 * That works out to about 62vw at lg and 69vw from xl, and it bleeds off the
 * page the same way the marquee below it does, so the hero has one idiom
 * rather than two.
 *
 * THE COLUMN IS SIZED BY THE HEADLINE, AND THE NUMBER IS MEASURED. The brief
 * is two lines on desktop, and the longer of them is the Satoshi half:
 *
 *   "Your listings already have"   10.712em  (Satoshi Medium, -0.03em)
 *   "everything we need."           9.543em  (Prata, tracking reset to 0)
 *
 * taken from the advance widths in app/fonts and Prata's own file, not
 * estimated. At the top of the display clamp that first line wants 600px, and
 * it needs about 47% of the content column everywhere the clamp is live. 54%
 * at lg and 52% at xl clear that by roughly 60px, which is the margin for
 * Satoshi-Variable at 500 differing slightly from the static Medium the
 * numbers came from. Narrow this below 47% and the headline silently goes to
 * three lines again; that is what 26% was doing.
 *
 * THE BREAK IS FORCED, NOT HOPED FOR. The em is lg:block, so the two halves
 * are separate lines from lg up by construction rather than by arithmetic.
 * Width alone would put the break wherever the measure happened to land, and
 * "exactly two lines" would be a coincidence that a copy edit or a font swap
 * could quietly end. Below lg it is inline again and wraps naturally.
 *
 * THE TWO LAYERS OVERLAP, AND THE ORDER IS EXPLICIT. The column is wide
 * enough now that it reaches well into the video's half, so they share
 * horizontal space and the order is the only thing keeping the copy legible.
 * The copy is a positioned layer at z-10, the video a positioned layer at
 * z-0, both children of the same Container. Container is position:relative
 * with z-index:auto, so it does not open a stacking context of its own and
 * the two compare directly: text paints over video, always, at every width.
 *
 * Nothing about the video enters the column's own sizing. Its percentages are
 * resolved against the Container, it is out of flow from lg up, and the column
 * is capped by its own max-width, so the video cannot clip, push, constrain or
 * resize the text. The influence only ran the other way, and no longer does.
 *
 * Position is what makes that stick. z-index is inert on a static element, so
 * the copy carries `relative` for no other reason than to make its z-index
 * mean something. The video is already absolute from lg up.
 *
 * The video also keeps pointer-events-none, which matters more now than it
 * did when the layers were apart: the overlap band crosses the headline and
 * can reach the CTAs, and without it the video would be swallowing clicks
 * meant for Book a Call.
 *
 * What this does NOT do is guarantee contrast. Ink on white is still ink over
 * whatever the video is showing in the overlap band. The geometry below keeps
 * that band narrow, but it is a judgement about this clip, not a rule.
 *
 * THE HEIGHT CAP AND THE CONTAINER FLOOR ARE ONE PAIR, AND MUST STAY EQUAL.
 * The video is centred on the Container, so it overhangs top and bottom by
 * half of whatever it exceeds the Container's height by, and the section
 * clips at overflow-hidden. Matching the cap to the floor is what makes that
 * overhang zero: the video can never be taller than the box it is centred in,
 * so its top edge cannot climb into the navbar and its bottom cannot reach
 * the marquee, whatever the copy does.
 *
 * This used to be arithmetic on the text block's height, which worked only
 * while the headline was four lines tall. Two lines took about 150px out of
 * it, and under the old 44rem cap the video's top edge crossed the section
 * boundary and was cut off. A floor is the version of that guarantee that
 * does not depend on the copy.
 *
 * The floor is also why the column is vertically centred rather than sitting
 * at the top: the Container is now taller than the copy by design, and the
 * video is centred in it, so the copy has to be centred too or the two drift
 * apart as the copy gets shorter.
 *
 * Past the cap, object-contain fits the frame inside the wider box and
 * object-right holds it against the bleed edge, so the video still reaches
 * the screen edge and still is not cropped.
 *
 * Below lg it returns to the flow and stacks under the CTAs at container
 * width, which is the reading order anyway. The text keeps max-w-3xl there,
 * so its wrapping on those widths is exactly what it always was.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pb-section pt-hero-top md:pb-section-lg md:pt-hero-top-lg">
      <Container className="relative lg:flex lg:min-h-[28rem] lg:flex-col lg:justify-center xl:min-h-[34rem]">
        {/* max-w-3xl is the pre-existing cap and still governs below lg. The
            percentages from lg up are the measured ones: 47% of the content
            column is what the headline's first line needs at the top of the
            display clamp, and these clear it with room to spare. They are a
            floor with a margin, not a preference. */}
        <div className="relative z-10 max-w-3xl lg:max-w-[54%] xl:max-w-[52%]">
          <Reveal delay={0.08}>
            <h1 className="font-sans text-display font-medium text-ink">
              Your listings already have{" "}
              {/* lg:block is the line break. Inline below lg so the phrase
                  still wraps with the sentence on a phone. */}
              <em className="type-slogan not-italic text-gold lg:block">everything we need.</em>
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

        {/*
          The positioning lives on this plain div, not on the Reveal inside it.
          -translate-y-1/2 is a transform, and framer-motion writes its own
          transform inline on a Reveal's element, which would overwrite it.
          Same reason Portfolio offsets its grid cells rather than its Reveals.

          The aspect ratio is the file's true 1916x1080 rather than a rounded
          16/9, so object-contain fits it exactly and leaves no letterbox at
          all on the widths where the height cap is not doing anything.
        */}
        <div className="relative z-0 mt-12 aspect-[1916/1080] lg:pointer-events-none lg:absolute lg:left-[40%] lg:right-[calc(50%_-_50vw)] lg:top-1/2 lg:mt-0 lg:max-h-[28rem] lg:-translate-y-1/2 xl:left-[34%] xl:max-h-[34rem]">
          <Reveal delay={0.2} className="h-full">
            <HeroVideo
              src="/videos/hero-section-video.mp4"
              // Slightly under the file's own speed. The build assembles
              // itself quickly enough that it reads as a transition rather
              // than as something to watch; 0.9 lets the last few seconds
              // land instead of snapping shut.
              playbackRate={0.9}
              className="h-full w-full object-contain object-right"
            />
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
