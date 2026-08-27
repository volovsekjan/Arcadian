import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { site } from "@/content/site";

const columnHeading = "text-eyebrow font-semibold uppercase text-mist";
const footerLink =
  "text-sm text-ivory/70 transition-colors hover:text-ivory focus-visible:ring-offset-espresso";

/**
 * Section 4.12 — site footer on espresso. Sits directly below the espresso
 * ContactCTA, separated by a hairline border.
 */
export function Footer() {
  return (
    <footer className="border-t border-ivory/10 bg-espresso pb-10 pt-16 md:pt-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.8fr_1fr_1fr] lg:grid-cols-[2.6fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex focus-visible:ring-offset-espresso">
              <Wordmark />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/60">{site.tagline}</p>
            {/* Social links render only once real profiles exist in content/site.ts. */}
            {site.socials.length > 0 && (
              <div className="mt-7 flex gap-6">
                {site.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={footerLink}
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            )}
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
          <p className="text-xs text-ivory/50">
            &copy; {new Date().getFullYear()} Arcadian. All rights reserved.
          </p>
          <span className="text-xs text-ivory/50">More content from every property listing.</span>
        </div>
      </Container>
    </footer>
  );
}
