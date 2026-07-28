/**
 * Global site configuration — the single place to edit brand facts,
 * contact details, navigation, and social links.
 */
export const site = {
  name: "Arcadian",
  tagline: "Property videos and social content made from the photos you already have.",
  description:
    "Arcadian turns existing property photos into videos, Stories and feed posts for Dubai real estate agencies. Choose ready-to-publish content or fully managed posting.",
  // TODO [PLACEHOLDER]: replace with the real production domain before launch.
  url: "https://arcadian.example.com",
  // TODO [PLACEHOLDER]: replace with the real contact email before launch.
  // The landing page does not render this address while it is a placeholder —
  // it is kept for the legal pages and JSON-LD, which must be updated too.
  email: "hello@arcadian.example.com",
  responseNote: "We reply within one business day.",
  locale: "en",
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "How It Works", href: "/#process" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
  ],
  cta: { label: "Book a Call", href: "/#contact" },
  /**
   * TODO: add real profile URLs when the accounts exist, e.g.
   * { name: "Instagram", href: "https://instagram.com/..." }.
   * Kept empty on purpose — placeholder links must not render on the site.
   */
  socials: [] as { name: string; href: string }[],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
} as const;

export type Site = typeof site;
