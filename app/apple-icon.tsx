import { ImageResponse } from "next/og";

// Edge runtime: @vercel/og's Node bundle fails to resolve its font asset on
// Windows builds; the Edge bundle works everywhere (including Vercel).
export const runtime = "edge";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon — generated at build time, matches app/icon.svg.
// Satori parses neither woff2 nor variable fonts, so the image routes load a
// static TTF cut of Satoshi. Loaded lazily on first request, not at module
// scope: the build imports this module in Node, where the relative asset URL
// cannot be resolved.
let font: Promise<ArrayBuffer> | undefined;

function loadFont() {
  font ??= fetch(new URL("./fonts/Satoshi-Medium.ttf", import.meta.url)).then((res) =>
    res.arrayBuffer(),
  );
  return font;
}

export default async function AppleIcon() {
  const medium = await loadFont();

  return new ImageResponse(
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
        fontFamily: "Satoshi",
        fontWeight: 500,
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
          background: "#D8A25C",
        }}
      />
    </div>,
    {
      ...size,
      fonts: [{ name: "Satoshi", data: medium, weight: 500, style: "normal" }],
    },
  );
}
