import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { site } from "@/content/site";

const columnHeading = "text-eyebrow font-semibold uppercase text-gold";
const footerLink =
  "text-sm text-ivory/70 transition-colors hover:text-ivory focus-visible:ring-offset-midnight";

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
    <footer className="bg-midnight pb-10 pt-16 md:pt-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[2.2fr_1fr_1fr_1.3fr]">
          <div>
            <Link href="/" className="inline-flex focus-visible:ring-offset-midnight">
              <Wordmark />
            </Link>
            <p className="type-note mt-3 max-w-xs text-ivory/60">{site.tagline}</p>
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

          <div>
            <p className={columnHeading}>Contact</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={`mailto:${site.email}`} className={footerLink}>
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp.href}
                  target="_blank"
                  rel="noreferrer"
                  className={footerLink}
                >
                  WhatsApp {site.whatsapp.display}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ivory/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ivory/50">
            &copy; {new Date().getFullYear()} Arcadian. All rights reserved.
          </p>
          <span className="text-xs text-ivory/50">More content from every property listing.</span>
        </div>
      </Container>
    </footer>
  );
}
