import { ArrowUpRight, Clock, Mail } from "lucide-react";
import { ContactForm } from "@/components/shared/ContactForm";
import { Reveal } from "@/components/shared/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";

/** Section 4.11 — final CTA band with the contact form, on espresso. */
export function ContactCTA() {
  return (
    <section id="contact" className="bg-espresso py-24 md:py-32">
      <Container className="grid items-start gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            tone="dark"
            eyebrow="Get started"
            title="Ready to make your listings unforgettable?"
            description="Tell us about your listing — we will come back with the best way to bring it to life."
          />

          <div className="mt-10 space-y-5 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
              <a
                href={`mailto:${site.email}`}
                className="text-ivory underline decoration-gold/50 underline-offset-4 transition-colors hover:decoration-gold focus-visible:ring-offset-espresso"
              >
                {site.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
              <span className="text-ivory/70">{site.responseNote}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm">
            {site.socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-ivory/70 transition-colors hover:text-ivory focus-visible:ring-offset-espresso"
              >
                {social.name}
                <ArrowUpRight className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} aria-hidden="true" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
