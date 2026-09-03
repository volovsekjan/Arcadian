import {
  Clapperboard,
  GalleryVerticalEnd,
  LayoutGrid,
  Sofa,
  MessageSquareText,
  Scissors,
} from "lucide-react";
import type { Service } from "./types";

/** The six things we make from a set of listing photos. */
export const services: Service[] = [
  {
    icon: Clapperboard,
    title: "Property Reels",
    description:
      "Short vertical videos that show the strongest rooms, features and details of the property.",
  },
  {
    icon: GalleryVerticalEnd,
    title: "Story Assets",
    description:
      "Ready-to-use Story frames for new listings, key features, location highlights and calls to action.",
  },
  {
    icon: LayoutGrid,
    title: "Feed Posts and Carousels",
    description: "Consistent posts your team can use between listing launches and video posts.",
  },
  {
    icon: Scissors,
    title: "Short Promotional Cuts",
    description: "Shorter video versions for reposting, announcements and paid promotion.",
  },
  {
    icon: MessageSquareText,
    title: "Captions and Calls to Action",
    description:
      "Clear captions written around the property and the action you want the viewer to take.",
  },
  {
    icon: Sofa,
    title: "Empty-Property Staging",
    description:
      "Empty units are the hardest to market and the easiest to skip. We show the room as it is, then furnish it on screen, so buyers can read the space instead of guessing at it.",
  },
];
