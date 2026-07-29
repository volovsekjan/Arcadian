import type { Project } from "./types";

/**
 * Work shown in the hero marquee and the Selected Work grid.
 *
 * Every entry below is CONCEPT work — creative demonstrations of the format,
 * not active property listings and not client projects. They are labelled as
 * such on the cards and in the section copy. When real client work exists:
 *  1. Add it with `kind: "client"` and accurate title/location/deliverables.
 *  2. Replace the SVG posters in /public/posters with real video poster frames
 *     (JPG/WebP, 9:16, ~720×1280).
 *  3. Set `video` to the hosted stream URL — use Mux or Cloudflare Stream,
 *     do NOT ship raw multi-MB mp4s from /public.
 */
export const projects: Project[] = [
  {
    slug: "beachfront-apartment",
    title: "Beachfront Apartment",
    location: "Concept project",
    tags: ["Apartment", "Concept"],
    kind: "concept",
    deliverables: "1 Reel · 6 Story frames · 1 carousel",
    poster: "/posters/project-01.webp",
    video: "/hf_20260727_094016.webm",
  },
  {
    slug: "grand-villa",
    title: "Grand Villa",
    location: "Concept project",
    tags: ["Villa", "Concept"],
    kind: "concept",
    deliverables: "1 Reel · 2 short cuts · 4 Story frames",
    poster: "/posters/project-02.webp",
    video: "/hf_20260727_110039.webm",
  },
  {
    slug: "classic-city-apartment",
    title: "Classic City Apartment",
    location: "Concept project",
    tags: ["Apartment", "Concept"],
    kind: "concept",
    deliverables: "1 Reel · 1 carousel · 5 Story frames",
    poster: "/posters/project-03.webp",
    video: "/hf_20260727_143639.webm",
  },
  {
    slug: "family-home",
    title: "Suburban Family Home",
    location: "Concept project",
    tags: ["Family Home", "Concept"],
    kind: "concept",
    deliverables: "1 Reel · 2 short cuts · 1 carousel",
    poster: "/posters/project-04.webp",
    video: "/hf_20260729_095753.webm",
  },
  {
    slug: "mountain-chalet",
    title: "Mountain Chalet",
    location: "Concept project",
    tags: ["Chalet", "Concept"],
    kind: "concept",
    deliverables: "1 Reel · 6 Story frames",
    poster: "/posters/project-05.webp",
    video: "/hf_20260729_095839.webm",
  },
  {
    slug: "garden-family-home",
    title: "Garden Family Home",
    location: "Concept project",
    tags: ["Family Home", "Concept"],
    kind: "concept",
    deliverables: "1 Reel · 1 carousel · 4 Story frames",
    poster: "/posters/project-06.svg",
    video: null,
  },
  {
    slug: "coastal-villa",
    title: "Coastal Villa",
    location: "Concept project",
    tags: ["Villa", "Concept"],
    kind: "concept",
    deliverables: "1 Reel · 2 short cuts · 6 Story frames",
    poster: "/posters/project-07.svg",
    video: null,
  },
  {
    slug: "sky-garden-residence",
    title: "Sky Garden Residence",
    location: "Concept project",
    tags: ["New Build", "Concept"],
    kind: "concept",
    deliverables: "1 Reel · 1 carousel · 5 Story frames",
    poster: "/posters/project-08.svg",
    video: null,
  },
];
