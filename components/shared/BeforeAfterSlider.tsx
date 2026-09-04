"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";

type BeforeAfterSliderProps = {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  /** next/image sizes hint for both layers. */
  sizes?: string;
};

/**
 * Draggable before/after comparison. The "after" image is the base layer;
 * the "before" image sits on top, clipped to the left of the divider.
 * Drag anywhere (pointer or touch) or focus the handle and use arrow keys.
 */
export function BeforeAfterSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
  sizes = "(min-width: 1024px) 384px, 90vw",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50); // divider position, 0–100 (%)
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const positionFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    positionFromClientX(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) positionFromClientX(event.clientX);
  };

  const endDrag = () => {
    draggingRef.current = false;
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const step = 5;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      setPosition((current) => Math.max(0, current - step));
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      setPosition((current) => Math.min(100, current + step));
    } else if (event.key === "Home") {
      event.preventDefault();
      setPosition(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setPosition(100);
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className="relative aspect-[9/16] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl border border-ivory/10"
      // pan-y keeps vertical page scrolling working on touch; horizontal
      // drags are handled by the slider.
      style={{ touchAction: "pan-y" }}
    >
      {/* After — base layer */}
      <Image
        src={after}
        alt={afterAlt}
        fill
        sizes={sizes}
        draggable={false}
        className="object-cover"
      />

      {/* Before — clipped to the left of the divider */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image src={before} alt="" fill sizes={sizes} draggable={false} className="object-cover" />
      </div>
      {/* The before layer is aria-hidden (it duplicates the same room); expose
          its description to AT without rendering a second image. */}
      <span className="sr-only">{beforeAlt}</span>

      <span className="absolute left-3 top-3 rounded-full bg-espresso/70 px-3 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-ivory backdrop-blur-sm">
        Before
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-ivory/90 px-3 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-ink backdrop-blur-sm">
        After
      </span>

      {/* Divider + handle */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 w-px bg-ivory/90"
        style={{ left: `${position}%` }}
      />
      <button
        type="button"
        role="slider"
        aria-label="Compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}% before, ${100 - Math.round(position)}% after`}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/40 bg-espresso/70 text-ivory shadow-lift backdrop-blur-sm transition-colors hover:bg-espresso/90 focus-visible:ring-offset-espresso"
        style={{ left: `${position}%` }}
      >
        <ChevronsLeftRight className="icon-list" strokeWidth={1.75} aria-hidden="true" />
      </button>
    </div>
  );
}
