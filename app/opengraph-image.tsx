import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Edge runtime: @vercel/og's Node bundle fails to resolve its font asset on
// Windows builds; the Edge bundle works everywhere (including Vercel).
export const runtime = "edge";

export const alt = `${site.name} — Property videos and social content made from your listing photos`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Branded Open Graph image, generated at build time.
 * TODO: optionally replace with a designed static image (public/og.jpg) and
 * reference it via openGraph.images in lib/metadata.ts.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
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
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#A9834C",
            }}
          />
          <div
            style={{
              fontSize: 28,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#C7A472",
            }}
          >
            {site.name}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 84,
              fontFamily: "Georgia, serif",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 980,
            }}
          >
            Better content that sells faster.
          </div>
          <div style={{ fontSize: 30, color: "#8C877A", maxWidth: 900 }}>
            Videos, Stories and feed posts for Dubai agencies — made from your listing photos.
          </div>
        </div>
        <div style={{ display: "flex", width: 220, height: 3, background: "#A9834C" }} />
      </div>
    ),
    size,
  );
}
