import { CalendarOff, Check, Clock, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/shared/ContactForm";
import { Reveal } from "@/components/shared/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";

const reassurances = [
  { icon: CalendarOff, text: "No additional shoot." },
  { icon: Check, text: "No obligation." },
  { icon: ShieldCheck, text: "Nothing is published without your approval." },
] as const;

/**
 * Final CTA band with the contact form.
 *
 * Sits on `midnight`, the same token the footer uses, so the two close the
 * page as one uninterrupted dark block instead of a brown band above a black
 * one.
 *
 * The direct-contact list is not decoration: the form's own failure messages
 * tell the visitor to reach us another way, and until now there was nowhere on
 * the site for them to go.
 */
export function ContactCTA() {
  return (
    <section id="contact" className="bg-midnight py-24 md:py-32">
      <Container className="grid items-start gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            tone="dark"
            eyebrow="Get started"
            title="Tell us about your listings. We will take it from there."
            description="Share a few details about your agency and monthly volume. We will walk you through the plans — or set up a single-listing pilot if you want to test the workflow first."
          />

          <ul className="mt-10 space-y-4 text-sm">
            {reassurances.map((item) => (
              <li key={item.text} className="flex items-center gap-3">
                <item.icon
                  className="h-4 w-4 shrink-0 text-gold"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span className="text-ivory/80">{item.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-3 text-sm">
            <Clock className="h-4 w-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-ivory/70">{site.responseNote}</span>
          </div>
          <div className="mt-10 border-t border-ivory/15 pt-8">
            <p className="font-sans text-eyebrow font-semibold uppercase text-gold">
              Or reach us directly
            </p>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <MessageCircle
                  className="h-4 w-4 shrink-0 text-gold"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <a
                  href={site.whatsapp.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ivory underline decoration-gold/50 underline-offset-4 transition-colors duration-300 ease-out-soft hover:decoration-gold focus-visible:ring-offset-midnight"
                >
                  WhatsApp {site.whatsapp.display}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
                <a
                  href={`mailto:${site.email}`}
                  className="text-ivory underline decoration-gold/50 underline-offset-4 transition-colors duration-300 ease-out-soft hover:decoration-gold focus-visible:ring-offset-midnight"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
