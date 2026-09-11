import type { PricingTier } from "./types";

/**
 * The three service levels. Prices are "from" figures — final scope depends on
 * monthly listing volume, number of accounts and required deliverables.
 *
 * Each `price` is a PriceSet holding all four markets. These are FIXED LIST
 * PRICES, not conversions: each is what the studio charges in that market, so
 * none of them drifts when an exchange rate moves. Each string is printed
 * exactly as written, which is why the symbol and its placement differ.
 *
 * content/comparison.ts reads pricing[0].price directly, so the comparison
 * table's Cost row and the Content card can never disagree.
 */
export const pricing: PricingTier[] = [
  {
    id: "content",
    name: "Content",
    tagline: "We make the content. Your team posts it.",
    price: { AED: "AED 3,500", EUR: "€850", GBP: "£750", USD: "$950" },
    period: "/month",
    features: [
      "3 property Reels",
      "3 feed posts or carousels",
      "8–10 individual Story frames",
      "Captions and calls to action",
      "Photo correction and presentation enhancement",
      "Agency branding",
      "One revision round",
      "Organized, ready-to-publish delivery",
    ],
    scopeNote: "Scheduling, posting and account management are not included.",
    cta: "Get Started",
    highlighted: false,
  },
  {
    id: "managed-content",
    name: "Managed Content",
    tagline: "We make it, schedule it and post it.",
    price: { AED: "AED 7,500", EUR: "€1,850", GBP: "£1,600", USD: "$2,050" },
    period: "/month",
    features: [
      "10 property Reels per month",
      "4 feed posts or carousels",
      "Up to 30 individual Story frames",
      "Captions and calls to action",
      "Photo correction and presentation enhancement",
      "Empty-property staging",
      "Custom agency templates",
      "Monthly content calendar",
      "Scheduling and publishing",
      "Monthly performance summary",
    ],
    scopeNote: "Scope is based on an agreed number of listings, accounts and platforms.",
    cta: "Get Started",
    highlighted: true,
  },
  {
    id: "funnel-takeover",
    name: "Funnel Takeover",
    tagline: "We manage the content and the first response.",
    price: { AED: "AED 15,000", EUR: "€3,700", GBP: "£3,200", USD: "$4,100" },
    period: "/month",
    features: [
      "20 property Reels per month",
      "Regular feed posts and Story assets",
      "Empty-property staging",
      "Custom agency templates",
      "Content scheduling and publishing",
      "Comment and direct-message monitoring during agreed hours",
      "Replies using client-approved scripts",
      "Collection of basic buyer or renter requirements",
      "Routing enquiries to the correct agent",
      "Optional WhatsApp handoff",
      "Monthly content and enquiry reporting",
    ],
    scopeNote:
      "Arcadian manages the initial conversation and handoff. Your agents remain responsible for property advice, viewings, negotiations and closing.",
    cta: "Book a Call",
    highlighted: false,
  },
];

/** The paid single-listing pilot, shown below the plans. */
export const pilot = {
  title: "Want to test the workflow first?",
  description:
    "Start with one paid listing before committing to a monthly plan. One property, the full process end to end. Pilot pricing is confirmed before you start.",
  includes: [
    "1 main Reel",
    "2 shorter video cuts",
    "1 carousel",
    "5 Story frames",
    "1 revision round",
  ],
  cta: "Ask About a Pilot",
} as const;
