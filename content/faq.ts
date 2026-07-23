import type { FaqItem } from "./types";

/**
 * FAQ content — also emitted as FAQPage JSON-LD, so keep answers plain text.
 * TODO [PLACEHOLDER]: replace "[X] days" with the real turnaround time.
 */
export const faq: FaqItem[] = [
  {
    question: "What do you need from me?",
    answer:
      "Just your property photos and a few details about the listing. We handle the rest.",
  },
  {
    question: "How fast will I get my video?",
    answer:
      "Turnaround depends on your plan — typically [X] days for a video, with priority delivery on the Management and Funnel Takeover plans.",
  },
  {
    question: "Which platforms are the videos made for?",
    answer:
      "Instagram Reels, TikTok, YouTube Shorts, and Facebook — delivered in the formats you need (9:16, 1:1, 16:9).",
  },
  {
    question: "Can I request changes?",
    answer:
      "If something doesn't feel right, let us know — we'll work with you to make sure the content fits your brand.",
  },
  {
    question: "What formats do I receive?",
    answer:
      "Ready-to-post video files optimized for each platform, plus any aspect ratios included in your plan.",
  },
  {
    question: "How do I get started?",
    answer:
      "Pick a plan or send us a message below — we'll take it from there.",
  },
];
