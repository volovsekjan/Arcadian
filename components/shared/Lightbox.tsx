"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { Project } from "@/content/types";

type LightboxContextValue = {
  open: (project: Project) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function useLightbox(): LightboxContextValue {
  const ctx = useContext(LightboxContext);
  if (!ctx) {
    throw new Error("useLightbox must be used inside <LightboxProvider>.");
  }
  return ctx;
}

/**
 * Video lightbox: focus trap, Esc + backdrop close, scroll lock, video pauses
 * on close, focus restored to the trigger. aria-modal dialog.
 */
export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [project, setProject] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const open = useCallback((next: Project) => {
    lastFocused.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setProject(next);
  }, []);

  const close = useCallback(() => {
    videoRef.current?.pause();
    setProject(null);
    lastFocused.current?.focus();
    lastFocused.current = null;
  }, []);

  useEffect(() => {
    if (!project) return;

    // Lock body scroll; position is restored automatically on unlock.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const getFocusable = () =>
      dialogRef.current
        ? Array.from(
            dialogRef.current.querySelectorAll<HTMLElement>(
              'button, [href], video, [tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];

    getFocusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [project, close]);

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      {project && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title}, ${project.location}`}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
        >
          <div
            className="absolute inset-0 bg-espresso/90 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />
          <div
            className="relative z-10 w-full"
            style={{ maxWidth: "min(24rem, calc((100dvh - 12rem) * 9 / 16))" }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close video"
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors duration-300 hover:border-ivory focus-visible:ring-offset-espresso"
            >
              <X className="icon-list" strokeWidth={1.75} aria-hidden="true" />
            </button>
            <div className="overflow-hidden rounded-2xl border border-ivory/10 bg-espresso">
              <div className="relative aspect-[9/16] w-full">
                {project.video ? (
                  <video
                    ref={videoRef}
                    src={project.video}
                    poster={project.poster}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <Image
                      src={project.poster}
                      alt={`${project.title}, ${project.location}`}
                      fill
                      sizes="(min-width: 640px) 384px, 100vw"
                      className="object-cover"
                    />
                    {/* TODO: set `video` in content/projects.ts to remove this notice. */}
                    <p className="absolute inset-x-4 bottom-4 rounded-full bg-espresso/80 px-4 py-2 text-center text-fine uppercase tracking-[0.1em] text-ivory/80 backdrop-blur-sm">
                      Final video coming soon
                    </p>
                  </>
                )}
              </div>
              <div className="flex items-baseline justify-between gap-3 px-5 py-4">
                <span className="font-sans text-h3 text-ivory">{project.title}</span>
                <span className="text-fine uppercase tracking-[0.1em] text-ivory/60">
                  {project.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </LightboxContext.Provider>
  );
}
