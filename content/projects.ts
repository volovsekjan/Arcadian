import type { Project } from "./types";

/**
 * Portfolio projects shown in the hero marquee and the Selected Work grid.
 *
 * TODO [PLACEHOLDER]: every entry below is placeholder content. Before launch:
 *  1. Replace titles, locations, and tags with real projects.
 *  2. Replace the SVG posters in /public/posters with real video poster frames
 *     (JPG/WebP, 9:16, ~720×1280).
 *  3. Set `video` to the hosted stream URL — use Mux or Cloudflare Stream,
 *     do NOT ship raw multi-MB mp4s from /public.
 */
export const projects: Project[] = [
  {
    slug: "lakeside-penthouse",
    title: "Lakeside Penthouse",
    location: "Vienna",
    tags: ["Residential", "Penthouse"],
    poster: "/posters/project-01.svg",
    video: null,
  },
  {
    slug: "villa-miramar",
    title: "Villa Miramar",
    location: "Lisbon",
    tags: ["Residential", "Villa"],
    poster: "/posters/project-02.svg",
    video: null,
  },
  {
    slug: "meridian-loft",
    title: "The Meridian Loft",
    location: "Berlin",
    tags: ["Residential", "Loft"],
    poster: "/posters/project-03.svg",
    video: null,
  },
  {
    slug: "chalet-aurora",
    title: "Chalet Aurora",
    location: "Kitzbühel",
    tags: ["Residential", "Chalet"],
    poster: "/posters/project-04.svg",
    video: null,
  },
  {
    slug: "palazzo-serena",
    title: "Palazzo Serena",
    location: "Milan",
    tags: ["Residential", "Apartment"],
    poster: "/posters/project-05.svg",
    video: null,
  },
  {
    slug: "orchard-house",
    title: "The Orchard House",
    location: "Ljubljana",
    tags: ["Residential", "Family Home"],
    poster: "/posters/project-06.svg",
    video: null,
  },
  {
    slug: "villa-adriatica",
    title: "Villa Adriatica",
    location: "Split",
    tags: ["Residential", "Villa"],
    poster: "/posters/project-07.svg",
    video: null,
  },
  {
    slug: "sky-garden-residence",
    title: "Sky Garden Residence",
    location: "Zagreb",
    tags: ["Residential", "New Build"],
    poster: "/posters/project-08.svg",
    video: null,
  },
];
