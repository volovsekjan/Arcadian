import { Images, MessageSquareText, Send, Sparkles } from "lucide-react";
import type { Step } from "./types";

export const steps: Step[] = [
  {
    number: "01",
    icon: Images,
    title: "Send the listing",
    description:
      "Share the approved property photos, accurate listing details, brand assets and any information required for the content.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "We produce it",
    description: "We prepare the agreed videos, Story assets, feed content and captions.",
  },
  {
    number: "03",
    icon: MessageSquareText,
    title: "Review the work",
    description: "Your team checks the content and requests any agreed revisions before approval.",
  },
  {
    number: "04",
    icon: Send,
    title: "Publish it, or leave it to us",
    description:
      "Your team can receive everything ready to publish, or we can support scheduling and publishing where that is included in the agreed scope.",
  },
];
