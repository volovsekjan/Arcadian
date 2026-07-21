import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { stats, clientLogos } from "@/content/stats";

// TODO [PLACEHOLDER]: stats and client logos below are editable placeholders —
// they are flagged in /content/stats.ts; replace with real numbers and marks before launch.

/** Section 4.3 — stats and client logo cloud, a calm bone-colored band. */
export function TrustBar() {
  return (
    <section className="border-y border-line bg-bone py-16 md:py-20">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <p className="font-display text-4xl font-medium text-ink md:text-5xl">{stat.value}</p>
              <p className="mt-2 text-sm text-graphite">{stat.label}</p>
            </Reveal>
          ))}
        </div>

        <div className="my-12 border-t border-line" aria-hidden="true" />

        <Reveal>
          {/* The visible [PLACEHOLDER] marking is deliberate — a fabricated
              client roster must not be able to ship looking real. Replace the
              caption with e.g. "Trusted by agencies across Europe" at launch. */}
          <p className="mb-6 text-center text-xs uppercase tracking-[0.12em] text-graphite md:text-left">
            [Placeholder] client &amp; partner logos — replace before launch
          </p>
          <ul
            aria-label="Placeholder client and partner logos"
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:justify-between"
          >
            {clientLogos.map((logo) => (
              <li key={logo.name}>
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={140}
                  height={38}
                  className="h-8 w-auto opacity-60 transition-opacity duration-300 hover:opacity-100"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
