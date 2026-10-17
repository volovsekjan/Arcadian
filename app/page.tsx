import { About } from "@/components/sections/About";
import { Comparison } from "@/components/sections/Comparison";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Portfolio } from "@/components/sections/Portfolio";
import { Pricing } from "@/components/sections/Pricing";
import { Responsibilities } from "@/components/sections/Responsibilities";
import { ServiceLevels } from "@/components/sections/ServiceLevels";
import { Services } from "@/components/sections/Services";
import { Spotlight } from "@/components/sections/Spotlight";
import { Tour } from "@/components/sections/Tour";
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
      {/* TEST EMBED. External 360 tour, iframed from its own deployment. That
          project's frame-ancestors CSP decides where it may render: dev and
          the apex/www domains yes, the vercel.app preview no. See Tour.tsx. */}
      <Tour />
      <ServiceLevels />
      <Spotlight />
      <Services />
      <Comparison />
      {/* Who we are answers the question the comparison table raises: the table
          argues the studio is the right kind of option, and this says why this
          studio in particular. It also puts a black band between two light
          sections, ahead of How it works. */}
      <About />
      <HowItWorks />
      <Portfolio />
      <Pricing />
      <Responsibilities />
      <FAQ />
      <ContactCTA />
    </>
  );
}
