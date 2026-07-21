import { Images, MessageSquareText, Send, Sparkles } from "lucide-react";
import type { Step } from "./types";

export const steps: Step[] = [
  {
    number: "01",
    icon: Images,
    title: "Share your photos",
    description: "Send us your listing photos and a few details. That's all we need.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "We craft your video",
    description:
      "Our studio produces a polished, cinematic edit tailored to the property and your brand.",
  },
  {
    number: "03",
    icon: MessageSquareText,
    title: "Review & refine",
    description: "You review the draft and we fine-tune it until it's exactly right.",
  },
  {
    number: "04",
    icon: Send,
    title: "Post & impress",
    description: "Receive your social-ready video, correctly formatted for every platform.",
  },
];
