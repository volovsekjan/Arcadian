import { ContactCTA } from "@/components/sections/ContactCTA";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { OneListing } from "@/components/sections/OneListing";
import { Portfolio } from "@/components/sections/Portfolio";
import { Pricing } from "@/components/sections/Pricing";
import { Responsibilities } from "@/components/sections/Responsibilities";
import { ServiceLevels } from "@/components/sections/ServiceLevels";
import { Services } from "@/components/sections/Services";
import { Spotlight } from "@/components/sections/Spotlight";
import { TrustBar } from "@/components/sections/TrustBar";
import { faqJsonLd, serviceJsonLd } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <Hero />
      <TrustBar />
      <ServiceLevels />
      <OneListing />
      <Spotlight />
      <Services />
      <HowItWorks />
      <Portfolio />
      <Pricing />
      <Responsibilities />
      <FAQ />
      <ContactCTA />
    </>
  );
}
