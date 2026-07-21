import type { PricingTier } from "./types";

/**
 * TODO [PLACEHOLDER]: replace every price and the delivery/volume numbers in
 * brackets with real figures before launch.
 */
export const pricing: PricingTier[] = [
  {
    id: "single",
    name: "Single",
    tagline: "For one-off listings",
    price: "€[PLACEHOLDER]",
    period: "/ video",
    features: [
      "1 cinematic property video",
      "1 vertical (9:16) format",
      "1 round of revisions",
      "Delivery in [X] days",
    ],
    cta: "Get started",
    highlighted: false,
  },
  {
    id: "studio",
    name: "Studio",
    tagline: "For active agents",
    price: "€[PLACEHOLDER]",
    period: "/ month",
    features: [
      "[N] videos per month",
      "All social formats (9:16, 1:1, 16:9)",
      "Priority turnaround",
      "2 rounds of revisions",
      "Music & branding",
    ],
    cta: "Choose Studio",
    highlighted: true,
  },
  {
    id: "agency",
    name: "Agency",
    tagline: "For teams & brokerages",
    price: "Custom pricing",
    period: null,
    features: [
      "Volume video packages",
      "Dedicated account manager",
      "Custom branding & templates",
      "Fastest turnaround",
      "Bulk intake for large portfolios",
    ],
    cta: "Talk to us",
    highlighted: false,
  },
];
