"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";

type VideoCardProps = {
  project: Project;
  className?: string;
  /** next/image sizes hint for the poster (poster-only cards). */
  sizes?: string;
  priority?: boolean;
};

/**
 * Vertical (9:16) portfolio tile. Cards with a video autoplay it inline
 * (muted, looped) while on screen; cards without one show the poster.
 * Purely presentational — no click interaction.
 */
export function VideoCard({
  project,
  className,
  sizes = "(min-width: 768px) 320px, 260px",
  priority = false,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play only while the card is in the viewport — the marquee renders each
  // card more than once and the grid repeats them again, so unconditional
  // autoplay would decode a dozen streams at once. Users who prefer reduced
  // motion keep the still poster.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    video.muted = true; // set as a property — React does not render the muted attribute

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.play().catch(() => {}); // if autoplay is blocked, the poster remains
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
    <div
      className={cn(
        "relative block aspect-[9/16] w-full overflow-hidden rounded-2xl border border-line bg-espresso",
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
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <Image
          src={project.poster}
          alt={`${project.title}, ${project.location}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      )}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/5 to-espresso/25"
      />
      <span className="absolute inset-x-0 bottom-0 p-4">
        <span className="font-sans text-h3 leading-snug text-ivory">{project.title}</span>
      </span>
    </div>
  );
}
