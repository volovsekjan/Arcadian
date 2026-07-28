import { Images, MessageSquareText, Send, Sparkles } from "lucide-react";
import type { Step } from "./types";

export const steps: Step[] = [
  {
    number: "01",
    icon: Images,
    title: "Send the listing",
    description:
      "Share the property photos, correct listing details, brand assets and required permit information.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "We create the assets",
    description: "We prepare the agreed videos, Story frames, feed posts and captions.",
  },
  {
    number: "03",
    icon: MessageSquareText,
    title: "Review the work",
    description:
      "Your team checks the property details and requests any revisions included in the plan.",
  },
  {
    number: "04",
    icon: Send,
    title: "Publish it, or leave it to us",
    description:
      "On the Content plan you receive everything ready to use. On managed plans, Arcadian schedules and publishes it for you.",
  },
];
