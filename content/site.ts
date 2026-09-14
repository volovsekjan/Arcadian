/**
 * Global site configuration — the single place to edit brand facts,
 * contact details, navigation, and social links.
 */
export const site = {
  name: "Arcadian",
  tagline: "Property videos and social content made from the photos you already have.",
  description:
    "Arcadian turns the listing photos real estate agencies already hold into property Reels, Story assets and feed content. Ready to publish, or published for you.",
  /*
   * TODO — REPLACE BEFORE LAUNCH. The domain was not supplied, so it is left
   * as a visible placeholder rather than invented; it has to parse as a URL
   * (metadataBase calls `new URL()` on it), so it uses the reserved `.invalid`
   * TLD, which can never resolve to somebody else's site.
   *
   * There is no `pilotPrice`. The pilot has no published figure: the copy says
   * it is confirmed before you start, so there is nothing here to fill.
   *
   * There is deliberately no `email` or `whatsapp` here. The site publishes no
   * inbox and no messaging number — the contact form is the only route in — so
   * adding one back means putting it on the page too, or it is a value nothing
   * reads.
   */
  url: "https://arcadian.invalid",
  responseNote: "We reply within one business day.",
  locale: "en",
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "Compare", href: "/#compare" },
    { label: "How It Works", href: "/#process" },
    // The section is the Work With Us consultation CTA now, not a price list.
    // The href is unchanged so the anchor, the footer link and the two ghost
    // buttons pointing at /#pricing all still land.
    { label: "Work With Us", href: "/#pricing" },
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
