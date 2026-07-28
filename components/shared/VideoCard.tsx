"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";
import { useLightbox } from "./Lightbox";

type VideoCardProps = {
  project: Project;
  className?: string;
  /** next/image sizes hint for the poster. */
  sizes?: string;
  priority?: boolean;
};

/**
 * Vertical (9:16) portfolio card: poster, tag pill, title/location overlay,
 * play affordance on hover/focus. Opens the video lightbox on click.
 */
export function VideoCard({
  project,
  className,
  sizes = "(min-width: 768px) 320px, 260px",
  priority = false,
}: VideoCardProps) {
  const { open } = useLightbox();

  return (
    <button
      type="button"
      onClick={() => open(project)}
      aria-haspopup="dialog"
      aria-label={`Play video: ${project.title}, ${project.location}`}
      className={cn(
        "group/card relative block aspect-[9/16] w-full overflow-hidden rounded-2xl border border-line bg-espresso text-left",
        "focus-visible:ring-offset-4",
        className,
      )}
    >
      <Image
        src={project.poster}
        alt={`${project.title} — ${project.location}`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-500 ease-out-soft group-hover/card:scale-105"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/5 to-espresso/25"
      />
      <span className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-ivory/90 px-3 py-1.5 text-[0.625rem] font-semibold leading-normal tracking-[0.1em] text-ink backdrop-blur-sm">
        {project.tags.join(" · ")}
      </span>
      <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ivory/40 bg-espresso/40 text-ivory opacity-0 backdrop-blur-sm transition-opacity duration-300 ease-out-soft group-hover/card:opacity-100 group-focus-visible/card:opacity-100">
          <Play className="ml-0.5 h-5 w-5 fill-current" strokeWidth={1.5} />
        </span>
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
