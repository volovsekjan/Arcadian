/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // TODO: The SVG placeholder posters in /public require this. Once real
    // photo/video posters (JPG/WebP) replace them, remove `dangerouslyAllowSVG`
    // and `contentSecurityPolicy` below.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
