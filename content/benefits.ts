import { CalendarOff, Images, SmartphoneNfc } from "lucide-react";
import type { Benefit } from "./types";

/**
 * The band under the hero. These replace the earlier placeholder statistics —
 * only add numbers here once they are real and verifiable.
 */
export const benefits: Benefit[] = [
  {
    icon: CalendarOff,
    title: "No additional shoot",
    description: "No crews to book, no access to arrange, no waiting on a filming date.",
  },
  {
    icon: Images,
    title: "Made from your existing photos",
    description: "We work from the listing photos your agency already has on file.",
  },
  {
    icon: SmartphoneNfc,
    title: "Ready for Reels, Stories and feed posts",
    description: "Delivered in the right formats for Instagram, TikTok and Facebook.",
  },
];
