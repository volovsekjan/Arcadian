import type { FaqItem } from "./types";

/**
 * FAQ content, also emitted as FAQPage JSON-LD, so answers stay plain text.
 *
 * Rewritten for the global, scope-on-request positioning. Three things are
 * deliberately absent, because the page no longer claims them:
 *   - plan names and tiers, since the packages are not settled
 *   - any figure, since public pricing is withdrawn
 *   - Dubai permit specifics, which told every agency elsewhere that the page
 *     was not written for them
 *
 * The last answer still refuses to promise reach or leads. That refusal is
 * load-bearing: the rest of the site avoids performance claims, and this is
 * where a visitor comes looking for one.
 */
export const faq: FaqItem[] = [
  {
    question: "What do you need from us?",
    answer:
      "Approved property photos, accurate listing details, your agency branding, and any marketing or compliance information required in your market. If we support publishing, we also need access to the agreed accounts or to your scheduling tool.",
  },
  {
    question: "Do we need another property shoot?",
    answer:
      "No. We work from the photos you already have. If you also hold video clips or drone footage we will use them, but nothing about the process requires a new shoot.",
  },
  {
    question: "What can you create from existing listing photos?",
    answer:
      "From one approved set we can produce vertical property Reels, shorter promotional cuts, feed posts and carousels, Story assets, and the captions to go with them. Where a unit is empty we can also furnish it on screen as a clearly labelled visualisation. The exact mix depends on what the photos support and what your channels need.",
  },
  {
    question: "How quickly will we receive the first draft?",
    answer:
      "The first draft for a single listing is normally with you within three working days of receiving everything we need. Ongoing work runs on a shared calendar, so it is scheduled rather than requested each time.",
  },
  {
    question: "Can you publish the content for us?",
    answer:
      "Yes, where that is part of the agreed scope. We can prepare everything organised and ready for your team to post, or take on scheduling and publishing to the accounts and platforms you approve. Nothing is published without your approval.",
  },
  {
    question: "Can you follow our brand guidelines?",
    answer:
      "Yes. Send us your fonts, colours, logo usage and any tone-of-voice notes, and we will work inside them so the content looks like it came from your agency rather than from a studio. If you do not have written guidelines, we can work from your existing material.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Scope and pricing depend on your monthly listing volume, the deliverables you need, the number of accounts and platforms involved, and how much of the publishing workflow you would like us to handle. We agree the scope and the price in writing before any work begins, so there is nothing to discover later.",
  },
  {
    question: "Can we start with one listing?",
    answer:
      "Yes. Starting with a single property is the usual way in. It runs the full process end to end, so you can see how we work before committing to anything ongoing.",
  },
  {
    question: "Do you work with agencies internationally?",
    answer:
      "Yes. The work is produced from assets you send us, so location is not a constraint. Your agency remains responsible for the accuracy of listing information and for any permissions, disclosures or advertising requirements that apply in your market, and we place the information you supply into the agreed content.",
  },
  {
    question: "Do you use AI?",
    answer:
      "Yes, as a production tool, and a person reviews every frame before it reaches you. We use it to correct and sharpen photos, extend them to vertical, tidy the presentation and animate stills into camera moves. We do not use it to invent rooms, amenities or views, to change the size or layout of a space, to remove structural defects, or to replace fitted materials. Where we furnish an empty unit, the content states that the furniture is a visualisation and is not part of the property.",
  },
  {
    question: "Can we request changes?",
    answer:
      "Yes. Every engagement includes an agreed number of revision rounds, set when we scope the work. Factual corrections, such as a wrong price or a wrong listing detail, are always fixed regardless of how many rounds remain.",
  },
  {
    question: "Do you guarantee views, enquiries or sales?",
    answer:
      "No, and treat anyone who does with caution. Organic reach and enquiries depend on far more than the content itself. What we control is the quality, the consistency and the volume of what goes out, and we use the performance data to improve what we make next.",
  },
];
