import { site } from "./site";
import type { FaqItem } from "./types";

/**
 * FAQ content — also emitted as FAQPage JSON-LD, so keep answers plain text.
 */
export const faq: FaqItem[] = [
  {
    question: "What do you need from us?",
    answer:
      "Approved property photos, accurate listing details, your agency branding and the required permit information. If we post for you, we also need access to the agreed accounts or your scheduling tool.",
  },
  {
    question: "Do we need another property shoot?",
    answer:
      "No. We work from the photos you already have. If you also have video clips or drone footage we can use them, but they are not required.",
  },
  {
    question: "What can you create from one listing?",
    answer:
      "A typical listing gives us one main Reel, one or two shorter cuts, a carousel and a set of Story frames, plus captions. The exact mix depends on your plan and on the photos available.",
  },
  {
    question: "How quickly will we receive the first draft?",
    answer:
      "The first draft for a single listing is normally with you within three working days. Monthly plans run on a shared content calendar, so recurring work is scheduled rather than requested each time.",
  },
  {
    question: "Will you publish the content for us?",
    answer:
      "On the Content plan, no — your team receives organized, ready-to-publish files. On Managed Content and Funnel Takeover, we schedule and publish to the agreed accounts and platforms.",
  },
  {
    question: "What does the Funnel Takeover plan include?",
    answer:
      "We monitor comments and direct messages during agreed hours, reply using scripts your agency has approved, collect basic requirements from the buyer or renter, and route serious enquiries to the correct agent — with an optional WhatsApp handoff. Your agents remain responsible for property advice, viewings, negotiations and closing.",
  },
  {
    question: "Do you use AI?",
    answer:
      "Yes, as a production tool, and a person reviews every frame before it reaches you. We use it to correct and sharpen photos, extend them to vertical, tidy the presentation and animate stills into camera moves. We do not use it to invent rooms, amenities or views, to change the size or layout of a space, to remove structural defects, or to replace fitted materials. Where we furnish an empty unit, the content states that the furniture is a visualisation and is not part of the property.",
  },
  {
    question: "Who is responsible for listing accuracy and permits?",
    answer:
      "Your agency confirms the listing details, holds the authorization to market the property, and supplies the required Trakheesi permit number and QR code. We place that permit information in the agreed content. On managed plans, content that requires permit information is not published until those materials have been supplied and approved.",
  },
  {
    question: "Can we request changes?",
    answer:
      "Yes. Each plan includes a set number of revision rounds — one round on the Content plan and the pilot. Factual corrections, such as a wrong price or listing detail, are always fixed regardless of revision rounds.",
  },
  {
    question: "Can we start with one property?",
    answer: `Yes. The paid pilot is one listing at ${site.pilotPrice} and runs the full process end to end, so you see how we work before committing to a month.`,
  },
  {
    question: "Do you guarantee views, enquiries or sales?",
    answer:
      "No. Organic reach, enquiries and sales depend on many factors outside the content itself. Our job is to improve the quality, consistency and volume of your property marketing, then use performance data to improve what we create.",
  },
];
