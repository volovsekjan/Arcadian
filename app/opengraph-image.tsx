import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { ACCENT, ACCENT_SOFT } from "@/lib/brand";

// Edge runtime: @vercel/og's Node bundle fails to resolve its font asset on
// Windows builds; the Edge bundle works everywhere (including Vercel).
export const runtime = "edge";

export const alt = `${site.name}: property videos and social content made from your listing photos`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Branded Open Graph image, generated at build time.
 * TODO: optionally replace with a designed static image (public/og.jpg) and
 * reference it via openGraph.images in lib/metadata.ts.
 */
// Satori parses neither woff2 nor variable fonts, so the image routes load
// static TTF cuts of Satoshi. Loaded lazily on first request, not at module
// scope: the build imports this module in Node, where the relative asset URL
// cannot be resolved.
let fonts: Promise<[ArrayBuffer, ArrayBuffer]> | undefined;

function loadFonts() {
  fonts ??= Promise.all([
    fetch(new URL("./fonts/Satoshi-Regular.ttf", import.meta.url)).then((res) => res.arrayBuffer()),
    fetch(new URL("./fonts/Satoshi-Medium.ttf", import.meta.url)).then((res) => res.arrayBuffer()),
  ]);
  return fonts;
}

export default async function OpenGraphImage() {
  const [regular, medium] = await loadFonts();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#201D16",
        color: "#FAF8F3",
        fontFamily: "Satoshi",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: ACCENT,
          }}
        />
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: ACCENT_SOFT,
          }}
        >
          {site.name}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            fontSize: 84,
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: 980,
          }}
        >
          Your listings already have everything we need.
        </div>
        <div style={{ fontSize: 30, color: "#8C877A", maxWidth: 900 }}>
          Property Reels, Story sets and feed posts for Dubai agencies, made from the listing photos
          you already have.
        </div>
      </div>
      <div style={{ display: "flex", width: 220, height: 3, background: ACCENT }} />
    </div>,
    {
      ...size,
      fonts: [
        { name: "Satoshi", data: regular, weight: 400, style: "normal" },
        { name: "Satoshi", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
