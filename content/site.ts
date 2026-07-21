/**
 * Global site configuration — the single place to edit brand facts,
 * contact details, navigation, and social links.
 */
export const site = {
  name: "Arcadian",
  tagline: "Cinematic property videos, made from your photos.",
  description:
    "Arcadian turns your property photos into scroll-stopping, cinematic videos made for Instagram, TikTok, and Reels — no shoot to schedule, no crew to coordinate.",
  // TODO [PLACEHOLDER]: replace with the real production domain before launch.
  url: "https://arcadian.example.com",
  // TODO [PLACEHOLDER]: replace with the real contact email before launch.
  email: "hello@arcadian.example.com",
  responseNote: "We reply within one business day.",
  locale: "en",
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "How it works", href: "/#process" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
  ],
  cta: { label: "Get a video", href: "/#contact" },
  socials: [
    // TODO [PLACEHOLDER]: replace with real profile URLs.
    { name: "Instagram", href: "https://instagram.com/arcadian.example" },
    { name: "TikTok", href: "https://tiktok.com/@arcadian.example" },
    { name: "YouTube", href: "https://youtube.com/@arcadian.example" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
} as const;

export type Site = typeof site;
