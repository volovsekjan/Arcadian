"use client";

import { Check, Copy, Palette, RotateCcw, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ACCENT } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * Live accent control.
 *
 * Rewrites `--accent-rgb` and `--accent-soft-rgb` on <html>. Every gold on the
 * site — buttons, borders, icons, rules, ticks, focus rings, the pricing
 * highlight, the comparison column tint — reads those two properties through
 * the `gold` token family, so the whole page repaints on input with no
 * re-render and no reload.
 *
 * The hover tint is derived rather than picked. If only the base moved,
 * `hover:bg-gold-soft` would stay on the old brand tint and clash with every
 * new accent; deriving it keeps the pair in step whatever is chosen.
 *
 * To remove: delete the <AccentPicker /> line in app/layout.tsx and this file.
 * To keep it out of production instead, wrap that line in
 * `process.env.NODE_ENV === "development" && ...`.
 */

/** Brand default, from the single hex source. Matches :root in globals.css. */
const DEFAULT_ACCENT = ACCENT.toUpperCase();

const STORAGE_KEY = "arcadian:accent";

/** Lightness delta from the brand accent to its hover tint (#D8A25C -> #E5BE8B). */
const SOFT_LIGHTEN = 0.118;

type Rgb = { r: number; g: number; b: number };
type Hsl = { h: number; s: number; l: number };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function hexToRgb(hex: string): Rgb {
  const value = parseInt(hex.slice(1), 16);
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 };
}

function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  let h = 0;
  if (delta !== 0) {
    if (max === rn) h = ((gn - bn) / delta) % 6;
    else if (max === gn) h = (bn - rn) / delta + 2;
    else h = (rn - gn) / delta + 4;
    h = (h * 60 + 360) % 360;
  }

  return { h, s, l };
}

/** Channel order per 60° hue sector: 0 = min, 1 = max, 2 = mid. */
const HSL_SECTORS = [
  [1, 2, 0],
  [2, 1, 0],
  [0, 1, 2],
  [0, 2, 1],
  [2, 0, 1],
  [1, 0, 2],
] as const;

function hslToRgb({ h, s, l }: Hsl): Rgb {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const parts = [0, c, x] as const;
  const sector = HSL_SECTORS[Math.floor(h / 60) % 6];

  return {
    r: Math.round((parts[sector[0]] + m) * 255),
    g: Math.round((parts[sector[1]] + m) * 255),
    b: Math.round((parts[sector[2]] + m) * 255),
  };
}

const channels = ({ r, g, b }: Rgb) => `${r} ${g} ${b}`;

const toHex = ({ r, g, b }: Rgb) =>
  `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`.toUpperCase();

/** WCAG relative luminance, for the contrast readout. */
function luminance({ r, g, b }: Rgb) {
  // sRGB piecewise transfer function, per WCAG 2.1.
  const lin = (v: number) => {
    const n = v / 255;
    return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** Contrast ratio against white, where all the small accent text sits. */
function contrastOnWhite(rgb: Rgb) {
  return (1 + 0.05) / (luminance(rgb) + 0.05);
}

/** Base accent plus its derived hover tint. */
function accentPair(hex: string) {
  const base = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(base);
  return {
    base,
    soft: hslToRgb({ h, s, l: clamp(l + SOFT_LIGHTEN, 0, 0.97) }),
  };
}

function applyAccent(hex: string) {
  const { base, soft } = accentPair(hex);
  const root = document.documentElement.style;
  root.setProperty("--accent-rgb", channels(base));
  root.setProperty("--accent-soft-rgb", channels(soft));
}

/** Drop the inline overrides so the stylesheet defaults take over again. */
function clearAccent() {
  const root = document.documentElement.style;
  root.removeProperty("--accent-rgb");
  root.removeProperty("--accent-soft-rgb");
}

const isHex = (value: string) => /^#[0-9a-f]{6}$/i.test(value);

export function AccentPicker() {
  const [accent, setAccent] = useState(DEFAULT_ACCENT);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Restore the accent under test so it survives reloads while iterating.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && isHex(stored) && stored.toUpperCase() !== DEFAULT_ACCENT) {
      setAccent(stored.toUpperCase());
      applyAccent(stored);
    }
  }, []);

  const update = useCallback((next: string) => {
    const hex = next.toUpperCase();
    setAccent(hex);
    if (hex === DEFAULT_ACCENT) {
      clearAccent();
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      applyAccent(hex);
      window.localStorage.setItem(STORAGE_KEY, hex);
    }
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(accent);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  const pair = accentPair(accent);
  const ratio = contrastOnWhite(pair.base);
  const isDefault = accent === DEFAULT_ACCENT;

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="Accent colour"
        aria-label="Open the accent colour picker"
        className="fixed bottom-6 right-20 z-[100] flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper/90 text-mist shadow-card backdrop-blur transition-colors duration-300 ease-out-soft hover:text-ink"
      >
        <Palette className="icon-inline" aria-hidden />
        <span
          className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border border-paper"
          style={{ background: accent }}
          aria-hidden
        />
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-label="Accent colour picker"
      className="fixed bottom-6 right-20 z-[100] w-64 rounded-2xl border border-line bg-paper/95 p-4 shadow-lift backdrop-blur"
    >
      <div className="flex items-start justify-between">
        <p className="font-sans text-eyebrow font-semibold uppercase text-mist">Accent colour</p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close the accent colour picker"
          className="-mr-1.5 -mt-1.5 flex h-7 w-7 items-center justify-center rounded-full text-mist transition-colors hover:text-ink"
        >
          <X className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>

      <label className="mt-3 block">
        <span className="sr-only">Pick an accent colour</span>
        <input
          type="color"
          value={accent}
          onChange={(event) => update(event.target.value)}
          className="h-11 w-full cursor-pointer rounded-lg border border-line bg-transparent p-1 [&::-moz-color-swatch]:rounded-md [&::-moz-color-swatch]:border-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-0"
        />
      </label>

      <div className="mt-3 flex items-center gap-2">
        <span className="text-xs text-mist">Current</span>
        <button
          type="button"
          onClick={copy}
          title="Copy to clipboard"
          className="nums-tabular ml-auto inline-flex items-center gap-1.5 rounded-md border border-line px-2 py-1 font-mono text-xs text-ink transition-colors hover:border-ink/40"
        >
          {accent}
          {copied ? (
            <Check className="h-3 w-3 text-mist" aria-hidden />
          ) : (
            <Copy className="h-3 w-3 text-mist" aria-hidden />
          )}
          <span className="sr-only">Copy {accent} to the clipboard</span>
        </button>
      </div>

      <div className="mt-3 flex gap-1.5" aria-hidden>
        <span
          title={`accent: ${toHex(pair.base)}`}
          className="h-5 flex-1 rounded border border-ink/10"
          style={{ background: toHex(pair.base) }}
        />
        <span
          title={`hover tint: ${toHex(pair.soft)}`}
          className="h-5 flex-1 rounded border border-ink/10"
          style={{ background: toHex(pair.soft) }}
        />
      </div>

      {/*
        Small accent text (eyebrows, the "01/02/03" markers) sits on white.
        WCAG AA wants 4.5:1 there, and the brand gold is well under it — so the
        readout is a live warning, not decoration.
      */}
      <p className="mt-3 flex items-baseline justify-between gap-2 text-xs">
        <span className="text-mist">On white</span>
        <span className={cn("nums-tabular font-medium", ratio >= 4.5 ? "text-ink" : "text-mist")}>
          {ratio.toFixed(2)}:1 {ratio >= 4.5 ? "AA" : "below AA"}
        </span>
      </p>

      <button
        type="button"
        onClick={() => update(DEFAULT_ACCENT)}
        disabled={isDefault}
        className={cn(
          "mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-line px-3 py-2 text-xs text-graphite transition-colors duration-300 ease-out-soft",
          isDefault ? "cursor-default opacity-45" : "hover:border-ink hover:text-ink",
        )}
      >
        <RotateCcw className="h-3 w-3" aria-hidden />
        Reset to {DEFAULT_ACCENT}
      </button>
    </div>
  );
}
