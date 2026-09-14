import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { site } from "@/content/site";

const columnHeading = "text-eyebrow font-semibold uppercase text-gold";
const footerLink =
  "text-body-sm text-ivory/70 transition-colors hover:text-ivory focus-visible:ring-offset-midnight";

/**
 * Site footer.
 *
 * Shares the `midnight` token with the contact section directly above it, and
 * carries no border between them, so the bottom of the page reads as one
 * continuous dark block.
 *
 * The social row is gone: the profile list is empty, so it rendered nothing.
 * Put it back when there are real accounts to link.
 */
export function Footer() {
  return (
    <footer className="bg-midnight pb-10 pt-section-seam md:pt-section-seam-lg">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.8fr_1fr_1fr] lg:grid-cols-[2.6fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex focus-visible:ring-offset-midnight">
              <Wordmark tone="ivory" />
            </Link>
            <p className="mt-3 max-w-xs text-fine text-ivory/60">{site.tagline}</p>
            {/*
              The region selector is hidden while public pricing is withdrawn:
              with no figures on the page there is nothing for a currency
              choice to change, so offering one would be a control that does
              nothing.

              ONLY THE RENDER IS REMOVED. RegionProvider, the middleware
              detection, the currency data, priceIn() and the localStorage
              persistence are all untouched and still wired, so restoring this
              is putting <RegionPicker /> back.
            */}
          </div>

          <nav aria-label="Footer navigation">
            <p className={columnHeading}>Explore</p>
            <ul className="mt-5 space-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <p className={columnHeading}>Legal</p>
            <ul className="mt-5 space-y-3">
              {site.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ivory/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-fine text-ivory/50">
            &copy; {new Date().getFullYear()} Arcadian. All rights reserved.
          </p>
          <span className="text-fine text-ivory/50">More content from every property listing.</span>
        </div>
      </Container>
    </footer>
  );
}
