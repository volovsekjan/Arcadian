"use client";

import { ChevronDown, Globe, X } from "lucide-react";
import { useRegion } from "@/components/shared/RegionProvider";
import { Container } from "@/components/ui/Container";
import { baseRegion, regionById, regions, type RegionId } from "@/lib/regions";

/**
 * Top banner offering a region switch, in the pattern Revolut and Stripe use.
 *
 * Sits above the sticky navbar in normal flow, so it scrolls away and the
 * navbar takes the top edge after it — the banner never eats viewport height
 * permanently, and `scroll-padding-top` keeps working for anchor links.
 *
 * Shown only to a visitor detection places outside the home market who has
 * not already chosen or dismissed. Either action is remembered, so it appears
 * at most once per browser.
 *
 * Region is shown as an ISO code chip rather than a flag: emoji flags do not
 * render on Windows (Chrome and Edge draw the two letters instead), and an
 * accurate Union Jack or US flag at 16px is artwork rather than markup. The
 * chip renders identically everywhere and matches the eyebrow style already
 * on the page. Swap in real flag SVGs if you would rather have them.
 */
function RegionCode({ id }: { id: RegionId }) {
  const code = id === "intl" ? "WW" : id.toUpperCase();
  return (
    <span
      aria-hidden="true"
      className="nums-tabular rounded border border-gold/40 bg-gold/10 px-1.5 py-0.5 font-sans text-fine font-semibold uppercase tracking-[0.08em] text-gold"
    >
      {code}
    </span>
  );
}

export function RegionBanner() {
  const { bannerVisible, detected, chooseRegion, dismiss } = useRegion();

  if (!bannerVisible || detected === null) return null;

  return (
    <aside
      aria-label="Choose your country or region"
      className="border-b border-ivory/10 bg-midnight"
    >
      <Container className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:gap-5">
        <p className="flex items-start gap-2.5 text-body-sm leading-relaxed text-ivory/80">
          <Globe className="icon-inline mt-0.5 text-gold" strokeWidth={1.75} aria-hidden="true" />
          <span>
            You&rsquo;re on the {baseRegion.label} website. Choose your country or region to see
            location-specific content.
          </span>
        </p>

        <div className="flex items-center gap-2 sm:ml-auto">
          <RegionCode id={detected} />

          <label className="relative">
            <span className="sr-only">Country or region</span>
            <select
              defaultValue={detected}
              onChange={(event) => chooseRegion(event.target.value as RegionId)}
              className="h-9 appearance-none rounded-full border border-ivory/25 bg-ivory/10 pl-3.5 pr-9 text-body-sm text-ivory transition-colors hover:border-ivory/50 focus-visible:ring-offset-midnight"
            >
              {regions.map((region) => (
                <option key={region.id} value={region.id} className="bg-midnight text-ivory">
                  {region.label} ({region.currency})
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ivory/50"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </label>

          <button
            type="button"
            onClick={dismiss}
            aria-label={`Dismiss and stay on the ${baseRegion.label} website`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ivory/60 transition-colors hover:text-ivory focus-visible:ring-offset-midnight"
          >
            <X className="icon-inline" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </Container>
    </aside>
  );
}

/**
 * The same selector, for the footer. Always available, so a visitor who
 * dismissed the banner — or whose region was guessed correctly — can still
 * change currency.
 */
export function RegionPicker() {
  const { region, chooseRegion } = useRegion();

  return (
    <label className="relative inline-block">
      <span className="sr-only">Country or region</span>
      <select
        value={region.id}
        onChange={(event) => chooseRegion(event.target.value as RegionId)}
        className="h-9 w-full appearance-none rounded-full border border-ivory/20 bg-ivory/5 pl-3.5 pr-9 text-body-sm text-ivory/80 transition-colors hover:border-ivory/40 focus-visible:ring-offset-midnight"
      >
        {regions.map((option) => (
          <option key={option.id} value={option.id} className="bg-midnight text-ivory">
            {regionById(option.id).label} ({option.currency})
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ivory/50"
        strokeWidth={1.75}
        aria-hidden="true"
      />
    </label>
  );
}
