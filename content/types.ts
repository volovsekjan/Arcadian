import type { LucideIcon } from "lucide-react";
import type { PriceSet } from "@/lib/regions";

export type Project = {
  slug: string;
  title: string;
  location: string;
  /** "concept" work is labelled as such on the card and must never read as client work. */
  kind: "client" | "concept";
  /** Poster image path under /public (9:16). */
  poster: string;
  /**
   * Final video URL. `null` shows a "preview coming soon" state in the lightbox.
   * TODO: host production videos on Mux or Cloudflare Stream — do NOT ship raw
   * multi-MB mp4s from /public.
   */
  video: string | null;
};

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

/** One of the three levels of working with Arcadian, explained in one line. */
export type ServiceLevel = {
  name: string;
  summary: string;
};

export type Step = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export type PricingTier = {
  id: "content" | "managed-content" | "funnel-takeover";
  name: string;
  /** One-line plain-language summary, e.g. "We make the content. Your team posts it." */
  tagline: string;
  /** Display price per currency, without the "From" prefix. See PriceSet. */
  price: PriceSet;
  period: string | null;
  features: string[];
  /** Scope boundary shown under the feature list. */
  scopeNote: string;
  cta: string;
  highlighted: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
};

/** A concrete benefit shown in the band under the hero (replaces unverifiable stats). */
export type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
};
