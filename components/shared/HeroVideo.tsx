"use client";

import { useEffect, useRef } from "react";

type HeroVideoProps = {
  /** Path under /public, e.g. "/videos/hero-section-video.mp4". */
  src: string;
  /** 1 is the file's own speed; below 1 slows it down. */
  playbackRate?: number;
  className?: string;
};

/**
 * The hero's looping showreel. Served straight from /public as a native
 * <video>, which is the right setup here: next/image does not handle video,
 * and the file is 2.4MB, so a streaming host would be ceremony for no gain.
 *
 * A CLIENT COMPONENT FOR ONE REASON. React does not write the `muted`
 * attribute into server-rendered HTML; it treats muted as a DOM property, so
 * the markup that reaches the browser describes an UNMUTED autoplaying video,
 * which every browser blocks. The block is decided before hydration can set
 * the property, so the JSX attribute alone is not enough. The element is
 * therefore muted imperatively on mount and playback requested explicitly.
 *
 * The play() rejection is swallowed on purpose. A browser that still refuses
 * (a battery saver, an OS-level setting) leaves the first decoded frame on
 * screen, which is a still image rather than a broken element.
 *
 * `preload="metadata"` rather than "auto": the browser fetches dimensions and
 * the first frame up front and pulls the rest only as it plays.
 *
 * PLAYS ONCE. No `loop`, and deliberately no `ended` handler either. A video
 * element holds whatever frame it stopped on, so when playback finishes the
 * completed building simply stays on screen; the way to break that is to
 * touch currentTime or set a poster, and this does neither. play() is called
 * once from the mount effect and nothing calls it again.
 *
 * aria-hidden because it is decorative, exactly as the line-art motif it
 * replaced was. It carries no audio, no captions and no information that the
 * h1 and subhead beside it do not already state.
 */
export function HeroVideo({ src, playbackRate = 1, className }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    // Both, not just playbackRate: the spec resets playbackRate to
    // defaultPlaybackRate whenever the load algorithm runs, so setting only
    // the former can be undone by a reload the effect never sees.
    video.defaultPlaybackRate = playbackRate;
    video.playbackRate = playbackRate;
    void video.play().catch(() => {});
  }, [playbackRate]);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
