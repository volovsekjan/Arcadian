import { CalendarOff, Check, Clock, ShieldCheck } from "lucide-react";
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
 * The form is the only route in by design — no public inbox, no messaging
 * number. Its failure states say to try again rather than naming a channel.
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
            description="Share a few details about your agency and monthly volume. We will walk you through the plans, or set up a single-listing pilot if you want to test the workflow first."
          />

          <ul className="mt-10 space-y-4 text-body-sm">
            {reassurances.map((item) => (
              <li key={item.text} className="flex items-center gap-3">
                <item.icon className="icon-list text-gold" strokeWidth={1.75} aria-hidden="true" />
                <span className="text-ivory/80">{item.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-3 text-body-sm">
            <Clock className="icon-list text-gold" strokeWidth={1.75} aria-hidden="true" />
            <span className="text-ivory/70">{site.responseNote}</span>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
