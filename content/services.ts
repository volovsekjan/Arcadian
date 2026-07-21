import { Clapperboard, Film, Megaphone, UserRound } from "lucide-react";
import type { Service } from "./types";

export const services: Service[] = [
  {
    icon: Clapperboard,
    title: "Signature Property Reels",
    description: "Vertical, social-first videos that showcase the whole home.",
  },
  {
    icon: Film,
    title: "Cinematic Walkthroughs",
    description: "Smooth, flowing tours that move through every room.",
  },
  {
    icon: Megaphone,
    title: "Listing Ad Cuts",
    description: "Short, punchy edits built to convert in paid campaigns.",
  },
  {
    icon: UserRound,
    title: "Agent Brand Content",
    description: "Consistent, on-brand content that grows your personal presence.",
  },
];
