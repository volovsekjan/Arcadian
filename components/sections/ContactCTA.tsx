import { CalendarOff, Check, Clock, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/shared/ContactForm";
import { Reveal } from "@/components/shared/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";

/*
 * All four points, in ONE list. The response note used to sit in its own
 * block below with mt-8, so the gaps ran 16/16/32px; as a fourth list item it
 * inherits the same space-y-4 as the rest.
 */
const reassurances = [
  { icon: CalendarOff, text: "No additional shoot." },
  { icon: Check, text: "No obligation." },
  { icon: ShieldCheck, text: "Nothing is published without your approval." },
  { icon: Clock, text: site.responseNote },
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
    <section
      id="contact"
      // Standard gap above, seam below: the footer shares this
      // background with no border, so the two are one dark block.
      className="bg-midnight pb-section-seam pt-section md:pb-section-seam-lg md:pt-section-lg"
    >
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
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
