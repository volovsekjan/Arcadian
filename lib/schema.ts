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
    email: site.email,
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
    areaServed: {
      "@type": "City",
      name: "Dubai",
    },
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
