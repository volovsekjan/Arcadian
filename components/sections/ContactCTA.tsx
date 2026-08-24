import { CalendarOff, Check, Clock, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/shared/ContactForm";
import { Reveal } from "@/components/shared/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";

// TODO: when the real contact email and social profiles exist, add them back
// to this column (see content/site.ts) — placeholders must not render here.

const reassurances = [
  { icon: CalendarOff, text: "No additional shoot." },
  { icon: Check, text: "No obligation." },
  { icon: ShieldCheck, text: "Nothing is published without your approval." },
] as const;

/** Section 4.11 — final CTA band with the contact form, on espresso. */
export function ContactCTA() {
  return (
    <section id="contact" className="bg-espresso py-24 md:py-32">
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
                <item.icon className="h-4 w-4 shrink-0 text-bone" strokeWidth={1.5} aria-hidden="true" />
                <span className="text-ivory/80">{item.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-3 text-sm">
            <Clock className="h-4 w-4 text-bone" strokeWidth={1.5} aria-hidden="true" />
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
