import { ImageResponse } from "next/og";

// Edge runtime: @vercel/og's Node bundle fails to resolve its font asset on
// Windows builds; the Edge bundle works everywhere (including Vercel).
export const runtime = "edge";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon — generated at build time, matches app/icon.svg.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#201D16",
          borderRadius: 40,
          color: "#FAF8F3",
          fontFamily: "Georgia, serif",
          fontSize: 104,
        }}
      >
        A
        <div
          style={{
            position: "absolute",
            top: 44,
            right: 40,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#A9834C",
          }}
        />
      </div>
    ),
    size,
  );
}
