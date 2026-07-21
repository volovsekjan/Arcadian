import type { ClientLogo, Stat } from "./types";

/**
 * TODO [PLACEHOLDER]: all stats below are editable placeholders — replace
 * with real, defensible numbers before launch, and remove the brackets.
 * The brackets are rendered on purpose so invented numbers cannot silently
 * ship as fact (misleading advertising risk).
 */
export const stats: Stat[] = [
  { value: "[500+]", label: "Videos delivered" },
  { value: "[120+]", label: "Agencies & agents" },
  { value: "[48h]", label: "Average turnaround" },
  { value: "[12]", label: "Countries served" },
];

/**
 * TODO [PLACEHOLDER]: Logoipsum-style placeholder marks —
 * replace with real client/partner logos (SVG, monochrome) before launch.
 */
export const clientLogos: ClientLogo[] = [
  { name: "Nordhaus Realty", src: "/logos/logo-01.svg" },
  { name: "Vantage Estates", src: "/logos/logo-02.svg" },
  { name: "Meridian & Co.", src: "/logos/logo-03.svg" },
  { name: "Alba Living", src: "/logos/logo-04.svg" },
  { name: "Stonebridge Properties", src: "/logos/logo-05.svg" },
  { name: "Casa Verde Group", src: "/logos/logo-06.svg" },
];
