import { faq } from "@/content/faq";
import { site } from "@/content/site";

/** Organization JSON-LD — emitted once in the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    description: site.description,
    sameAs: site.socials.map((social) => social.href),
  };
}

/** Service JSON-LD — emitted on the home page. */
export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Real estate social media content",
    serviceType: "Property videos, Stories and feed posts made from listing photos",
    description: site.description,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    // Served worldwide: the work is produced from assets the client sends, so
    // there is no geography to narrow this to. A single City here told search
    // engines the opposite of what the site now says.
    areaServed: "Worldwide",
  };
}

/** FAQPage JSON-LD — emitted on the home page, mirrors the FAQ accordion. */
export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
