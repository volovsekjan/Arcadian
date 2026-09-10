import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="flex min-h-[65vh] items-center py-24">
      <Container>
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-5 font-sans text-display font-medium text-ink">
          This page has left the listing.
        </h1>
        <p className="mt-5 max-w-xl text-body text-graphite">
          The address you are looking for does not exist, or has recently been sold. Let us take you
          somewhere worth seeing.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href="/" size="lg">
            Back to home
          </Button>
          <Button variant="ghost" href="/#work">
            See our work
            <ArrowRight className="icon-inline" strokeWidth={1.75} aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
