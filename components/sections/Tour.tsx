import { TourFrame } from "@/components/sections/TourFrame";
import { Reveal } from "@/components/shared/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * TEST EMBED of the external 360 tour, between the hero and What we do.
 *
 * The tour is a separate Vercel project. Nothing of it is reproduced here:
 * this is an iframe pointing at its own deployment, which keeps its code, its
 * assets and its release cycle entirely outside this repo. No dependency was
 * added for it.
 *
 * WHERE THIS IS ALLOWED TO RENDER IS NOT OUR DECISION. The tour answers with
 *
 *   Content-Security-Policy: frame-ancestors 'self'
 *     https://www.arcadian-agency.com https://arcadian-agency.com
 *     http://localhost:3000 http://127.0.0.1:3000
 *
 * and a browser refuses the frame on any origin outside that list. Dev works
 * because the last two entries were added for it; production works on the two
 * apex/www hosts.
 *
 * THE PREVIEW DEPLOYMENT IS STILL OUTSIDE IT. arcadian-agency.vercel.app is
 * not listed, so the tour is a blocked frame there and will stay one until
 * the tour project adds it. Worth knowing before anyone reviews this section
 * on a preview URL and reports the embed as broken. The fix belongs in that
 * project's headers; nothing here works around it.
 *
 * Port 3000 is load-bearing. The allowance names it explicitly, so a dev
 * server that falls back to 3001 because 3000 was busy gets a blocked frame
 * for a reason that has nothing to do with this code.
 *
 * The frame is sized by aspect ratio rather than by a fixed height, with a
 * floor from md up so a 360 view never gets a letterbox slot to look around
 * in. Below md it stays pure 16/9 so a phone is not handed a 480px wall:
 * a flat 480px floor at every width, which is what a plain inline style for
 * this would give, turns a 360px phone into a 3:4 portrait box.
 *
 * No border and no shadow on the frame, per the brief and for the same reason
 * the hero video has none: a hairline would read as a card pasted onto the
 * page. The rounding is the site's usual 2xl, clipped by the wrapper because
 * an iframe will not round its own content.
 *
 * The frame itself lives in TourFrame, which is a client component for one
 * reason: the tour scrolls its own frame into view as it boots, and the only
 * way to stop that dragging the homepage down on load is to withhold the
 * iframe until the section is already on screen. That file has the detail.
 *
 * TODO: while this is a test, the slug is hardcoded. If it stays, move the
 * tour URL into content/site.ts so it is configurable without a code change.
 */
const TOUR_URL = "https://arcadian-tours-beta.vercel.app/corner-ho0gv1/";

export function Tour() {
  return (
    <section id="tour" className="bg-ivory py-section md:py-section-lg">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Interactive property experience"
            title="Step inside the listing."
            description="Explore the property in 360°. Drag to look around and experience the space from every angle."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <TourFrame src={TOUR_URL} title="Arcadian corner flat, 360° tour" />
        </Reveal>
      </Container>
    </section>
  );
}
