import type { PricingTier } from "./types";

/**
 * TODO [PLACEHOLDER]: prices are placeholder figures — confirm all three
 * before launch.
 */
export const pricing: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Your listing content, done for you",
    price: "€300",
    period: "/ month",
    features: [
      "We fix & enhance the photos you upload",
      "3 cinematic property videos per month",
      "Stories for every day of the month",
      "2–3 posts per week",
      "Music & branding",
    ],
    cta: "Get started",
    highlighted: false,
  },
  {
    id: "management",
    name: "Management",
    tagline: "Your social media, fully managed",
    price: "€799",
    period: "/ month",
    features: [
      "We fix & enhance the photos you upload",
      "10 videos per month (2–3 per week)",
      "Stories every day + weekly posts",
      "All social formats (9:16, 1:1, 16:9)",
      "We schedule & post everything for you",
      "Music & custom branding templates",
    ],
    cta: "Choose Management",
    highlighted: true,
  },
  {
    id: "funnel-takeover",
    name: "Funnel Takeover",
    tagline: "We run your entire selling process",
    price: "€2,000",
    period: "/ month",
    features: [
      "We fix & enhance the photos you upload",
      "20 videos per month, all formats",
      "Stories every day + 3–4 posts per week",
      "Everything scheduled & posted for you",
      "We handle all comments & DMs",
      "Lead qualification & funnel to WhatsApp",
      "Ongoing funnel optimization",
      "Music & custom branding templates",
    ],
    cta: "Talk to us",
    highlighted: false,
  },
];
