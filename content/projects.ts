import type { Project } from "./types";

/**
 * Work shown in the hero marquee and the Selected Work grid, in display order —
 * the strongest pieces first (videos live in /public; the numbering has gaps
 * where retired entries were removed).
 *
 * Every entry below is CONCEPT work — creative demonstrations of the format,
 * not active property listings and not client projects. They are labelled as
 * such on the cards and in the section copy. When real client work exists,
 * add it with `kind: "client"` and accurate title and location.
 */
export const projects: Project[] = [
  {
    slug: "countryside-cottage",
    title: "Countryside Cottage",
    location: "Concept project",
    kind: "concept",
    poster: "/posters/project-01.webp",
    video: "/1.webm",
  },
  {
    slug: "skyline-apartment",
    title: "Skyline Apartment",
    location: "Concept project",
    kind: "concept",
    poster: "/posters/project-02.webp",
    video: "/2.webm",
  },
  {
    slug: "cozy-family-apartment",
    title: "Cozy Family Apartment",
    location: "Concept project",
    kind: "concept",
    poster: "/posters/project-04.webp",
    video: "/4.webm",
  },
  {
    slug: "beachfront-apartment",
    title: "Beachfront Apartment",
    location: "Concept project",
    kind: "concept",
    poster: "/posters/project-06.webp",
    video: "/6.webm",
  },
  {
    slug: "grand-villa",
    title: "Grand Villa",
    location: "Concept project",
    kind: "concept",
    poster: "/posters/project-07.webp",
    video: "/7.webm",
  },
  {
    slug: "classic-city-apartment",
    title: "Classic City Apartment",
    location: "Concept project",
    kind: "concept",
    poster: "/posters/project-08.webp",
    video: "/8.webm",
  },
  {
    slug: "suburban-family-home",
    title: "Suburban Family Home",
    location: "Concept project",
    kind: "concept",
    poster: "/posters/project-09.webp",
    video: "/9.webm",
  },
  {
    slug: "mountain-chalet",
    title: "Mountain Chalet",
    location: "Concept project",
    kind: "concept",
    poster: "/posters/project-10.webp",
    video: "/10.webm",
  },
];
