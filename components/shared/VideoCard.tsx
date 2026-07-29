"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";
import { useLightbox } from "./Lightbox";

type VideoCardProps = {
  project: Project;
  className?: string;
  /** next/image sizes hint for the poster (poster-only cards). */
  sizes?: string;
  priority?: boolean;
};

/**
 * Vertical (9:16) portfolio card. Cards with a video autoplay it inline
 * (muted, looped) while on screen; cards without one show the poster.
 * Clicking opens the lightbox, where the video plays with sound and controls.
 */
export function VideoCard({
  project,
  className,
  sizes = "(min-width: 768px) 320px, 260px",
  priority = false,
}: VideoCardProps) {
  const { open } = useLightbox();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play only while the card is in the viewport — the marquee renders each
  // card more than once and the grid repeats them again, so unconditional
  // autoplay would decode a dozen streams at once. Users who prefer reduced
  // motion keep the still poster and can play the video in the lightbox.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    video.muted = true; // set as a property — React does not render the muted attribute

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.play().catch(() => {}); // if autoplay is still blocked, the poster remains
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      type="button"
      onClick={() => open(project)}
      aria-haspopup="dialog"
      aria-label={`Open video: ${project.title}, ${project.location}`}
      className={cn(
        "group/card relative block aspect-[9/16] w-full overflow-hidden rounded-2xl border border-line bg-espresso text-left",
        "focus-visible:ring-offset-4",
        className,
      )}
    >
      {project.video ? (
        <video
          ref={videoRef}
          src={project.video}
          poster={project.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out-soft group-hover/card:scale-105"
        />
      ) : (
        <Image
          src={project.poster}
          alt={`${project.title} — ${project.location}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out-soft group-hover/card:scale-105"
        />
      )}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/5 to-espresso/25"
      />
      <span className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-ivory/90 px-3 py-1.5 text-[0.625rem] font-semibold leading-normal tracking-[0.1em] text-ink backdrop-blur-sm">
        {project.tags.join(" · ")}
      </span>
      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-4">
        <span className="font-display text-lg leading-snug text-ivory">{project.title}</span>
        <span className="text-xs uppercase tracking-[0.1em] text-ivory/70">
          {project.location}
        </span>
        <span className="mt-1 text-xs text-ivory/60">{project.deliverables}</span>
      </span>
    </button>
  );
}
