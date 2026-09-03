/**
 * Global site configuration — the single place to edit brand facts,
 * contact details, navigation, and social links.
 */
export const site = {
  name: "Arcadian",
  tagline: "Property videos and social content made from the photos you already have.",
  description:
    "Arcadian turns existing property photos into videos, Stories and feed posts for Dubai real estate agencies. Choose ready-to-publish content or fully managed posting.",
  /*
   * TODO — REPLACE BEFORE LAUNCH.
   * These four values were not supplied, so they are left as visible
   * placeholders rather than invented. `{{...}}` tokens are greppable and
   * obviously wrong on sight; the domain has to parse as a URL (metadataBase
   * calls `new URL()` on it), so it uses the reserved `.invalid` TLD, which
   * can never resolve to somebody else's site.
   *
   * They now render on the page — in the contact block, the footer, the form
   * error messages and the pricing pilot — so nothing here can ship unnoticed.
   */
  url: "https://arcadian.invalid",
  email: "{{EMAIL}}",
  whatsapp: {
    display: "{{WHATSAPP_NUMBER}}",
    href: "https://wa.me/{{WHATSAPP_NUMBER}}",
  },
  pilotPrice: "{{PILOT_PRICE}}",
  responseNote: "We reply within one business day.",
  locale: "en",
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "Compare", href: "/#compare" },
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
