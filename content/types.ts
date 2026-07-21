import type { LucideIcon } from "lucide-react";

export type Project = {
  slug: string;
  title: string;
  location: string;
  /** Short tags shown as pills on the card, e.g. ["Residential", "Penthouse"]. */
  tags: string[];
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

export type Step = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export type PricingTier = {
  id: "single" | "studio" | "agency";
  name: string;
  tagline: string;
  /** Display price, e.g. "€180" — [PLACEHOLDER] until real pricing is set. */
  price: string;
  period: string | null;
  features: string[];
  cta: string;
  highlighted: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
};

export type Stat = {
  value: string;
  label: string;
};

export type ClientLogo = {
  name: string;
  src: string;
};
