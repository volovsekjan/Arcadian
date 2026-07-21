/**
 * Generates the SVG placeholder assets under /public.
 * Run with: npm run placeholders
 *
 * TODO: these are development placeholders only. Before launch replace:
 *   /public/posters/*  -> real video poster frames (JPG/WebP, 720×1280)
 *   /public/images/*   -> real interior/architecture photography
 *   /public/logos/*    -> real client/partner logos
 *   /public/avatars/*  -> real client photos (with permission)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

// Brand tokens (mirrors tailwind.config.ts)
const C = {
  ivory: "#FAF8F3",
  bone: "#F1ECE3",
  ink: "#17150F",
  graphite: "#4A463D",
  mist: "#8C877A",
  line: "#E4DDD0",
  gold: "#A9834C",
  goldSoft: "#C7A472",
  espresso: "#201D16",
  espressoLight: "#2B2720",
  sand: "#E7DDC9",
  clay: "#D9CBB2",
};

function write(relPath, svg) {
  const file = join(root, relPath);
  mkdirSync(dirname(file), { recursive: true });
  // The XML declaration is required: Next's image optimizer sniffs content
  // types by magic bytes and only recognizes SVGs that start with "<?xml".
  writeFileSync(file, `<?xml version="1.0" encoding="UTF-8"?>\n` + svg.trim() + "\n", "utf8");
  console.log("wrote", relPath);
}

/* ---------------------------------- posters --------------------------------- */

// Architectural line-art motifs, one per poster, drawn in a 900×1600 frame.
const motifs = [
  // 1: tall arched window + horizon
  (s) => `
    <path d="M300 1150 V760 A150 150 0 0 1 600 760 V1150" ${s}/>
    <line x1="450" y1="640" x2="450" y2="1150" ${s}/>
    <line x1="180" y1="1150" x2="720" y2="1150" ${s}/>
    <circle cx="640" cy="460" r="70" ${s}/>`,
  // 2: villa roofline + palm-ish fronds
  (s) => `
    <path d="M180 980 L450 720 L720 980" ${s}/>
    <line x1="240" y1="980" x2="240" y2="1220" ${s}/>
    <line x1="660" y1="980" x2="660" y2="1220" ${s}/>
    <line x1="150" y1="1220" x2="750" y2="1220" ${s}/>
    <circle cx="250" cy="480" r="60" ${s}/>`,
  // 3: loft grid windows
  (s) => `
    <rect x="240" y="640" width="420" height="540" ${s}/>
    <line x1="450" y1="640" x2="450" y2="1180" ${s}/>
    <line x1="240" y1="820" x2="660" y2="820" ${s}/>
    <line x1="240" y1="1000" x2="660" y2="1000" ${s}/>`,
  // 4: chalet gable + mountains
  (s) => `
    <path d="M160 1060 L360 800 L520 1000 L640 860 L800 1060" ${s}/>
    <path d="M300 1180 L450 1020 L600 1180" ${s}/>
    <line x1="450" y1="1020" x2="450" y2="1180" ${s}/>`,
  // 5: colonnade
  (s) => `
    <line x1="270" y1="720" x2="270" y2="1160" ${s}/>
    <line x1="390" y1="720" x2="390" y2="1160" ${s}/>
    <line x1="510" y1="720" x2="510" y2="1160" ${s}/>
    <line x1="630" y1="720" x2="630" y2="1160" ${s}/>
    <line x1="210" y1="700" x2="690" y2="700" ${s}/>
    <line x1="210" y1="1160" x2="690" y2="1160" ${s}/>`,
  // 6: orchard rows + house
  (s) => `
    <rect x="330" y="860" width="240" height="220" ${s}/>
    <path d="M300 860 L450 740 L600 860" ${s}/>
    <circle cx="220" cy="1180" r="46" ${s}/>
    <circle cx="450" cy="1220" r="46" ${s}/>
    <circle cx="680" cy="1180" r="46" ${s}/>`,
  // 7: coastal horizon + sail
  (s) => `
    <line x1="160" y1="1040" x2="740" y2="1040" ${s}/>
    <path d="M470 1020 V760 L610 1020 Z" ${s}/>
    <circle cx="280" cy="560" r="80" ${s}/>
    <path d="M160 1120 Q 300 1090 450 1120 T 740 1120" ${s}/>`,
  // 8: tower + garden terraces
  (s) => `
    <rect x="380" y="620" width="140" height="560" ${s}/>
    <line x1="380" y1="760" x2="520" y2="760" ${s}/>
    <line x1="380" y1="900" x2="520" y2="900" ${s}/>
    <line x1="380" y1="1040" x2="520" y2="1040" ${s}/>
    <path d="M240 1180 Q 300 1120 360 1180" ${s}/>
    <path d="M540 1180 Q 600 1120 660 1180" ${s}/>`,
];

const posterThemes = [
  { from: C.bone, to: C.sand, line: C.graphite, accent: C.gold, label: C.mist, dark: false },
  { from: C.espresso, to: C.espressoLight, line: C.goldSoft, accent: C.gold, label: C.mist, dark: true },
  { from: C.ivory, to: C.clay, line: C.graphite, accent: C.gold, label: C.mist, dark: false },
  { from: C.espressoLight, to: C.espresso, line: C.mist, accent: C.goldSoft, label: C.mist, dark: true },
];

for (let i = 0; i < 8; i++) {
  const theme = posterThemes[i % posterThemes.length];
  const stroke = `stroke="${theme.line}" stroke-width="2.5" fill="none" opacity="0.55"`;
  write(
    `posters/project-${String(i + 1).padStart(2, "0")}.svg`,
    `
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1600" viewBox="0 0 900 1600">
  <defs>
    <linearGradient id="g${i}" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="${theme.from}"/>
      <stop offset="1" stop-color="${theme.to}"/>
    </linearGradient>
  </defs>
  <rect width="900" height="1600" fill="url(#g${i})"/>
  <rect x="48" y="48" width="804" height="1504" fill="none" stroke="${theme.line}" stroke-width="1.5" opacity="0.35"/>
  <g>${motifs[i](stroke)}</g>
  <circle cx="450" cy="360" r="5" fill="${theme.accent}"/>
  <text x="450" y="1480" text-anchor="middle" font-family="Georgia, serif" font-size="30" letter-spacing="10" fill="${theme.label}">PLACEHOLDER</text>
</svg>`,
  );
}

/* ------------------------------- feature images ------------------------------ */

// Wide cinematic image for the Spotlight section (4:3-ish)
write(
  "images/spotlight.svg",
  `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200" viewBox="0 0 1600 1200">
  <defs>
    <linearGradient id="sp" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.espresso}"/>
      <stop offset="1" stop-color="${C.graphite}"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="1200" fill="url(#sp)"/>
  <g stroke="${C.goldSoft}" stroke-width="2.5" fill="none" opacity="0.5">
    <line x1="140" y1="880" x2="1460" y2="880"/>
    <path d="M400 880 V420 A200 200 0 0 1 800 420 V880"/>
    <line x1="600" y1="300" x2="600" y2="880"/>
    <rect x="980" y="470" width="330" height="410"/>
    <line x1="1145" y1="470" x2="1145" y2="880"/>
    <line x1="980" y1="675" x2="1310" y2="675"/>
  </g>
  <circle cx="1330" cy="240" r="90" stroke="${C.gold}" stroke-width="2.5" fill="none" opacity="0.6"/>
  <text x="800" y="1090" text-anchor="middle" font-family="Georgia, serif" font-size="34" letter-spacing="12" fill="${C.mist}">PLACEHOLDER</text>
</svg>`,
);

// Tall image for the How-it-works split (3:4)
write(
  "images/process.svg",
  `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500" viewBox="0 0 1200 1500">
  <defs>
    <linearGradient id="pr" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0" stop-color="${C.bone}"/>
      <stop offset="1" stop-color="${C.clay}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="1500" fill="url(#pr)"/>
  <rect x="56" y="56" width="1088" height="1388" fill="none" stroke="${C.graphite}" stroke-width="1.5" opacity="0.3"/>
  <g stroke="${C.graphite}" stroke-width="2.5" fill="none" opacity="0.55">
    <line x1="180" y1="1080" x2="1020" y2="1080"/>
    <path d="M340 1080 V640 A160 160 0 0 1 660 640 V1080"/>
    <line x1="500" y1="520" x2="500" y2="1080"/>
    <rect x="760" y="720" width="220" height="360"/>
    <line x1="870" y1="720" x2="870" y2="1080"/>
  </g>
  <circle cx="920" cy="330" r="70" stroke="${C.gold}" stroke-width="2.5" fill="none" opacity="0.6"/>
  <text x="600" y="1360" text-anchor="middle" font-family="Georgia, serif" font-size="30" letter-spacing="10" fill="${C.mist}">PLACEHOLDER</text>
</svg>`,
);

/* ---------------------------------- avatars ---------------------------------- */

const avatars = [
  { initials: "AK", bg: C.bone, fg: C.espresso },
  { initials: "MR", bg: C.clay, fg: C.espresso },
  { initials: "LP", bg: C.espresso, fg: C.goldSoft },
];

avatars.forEach((avatar, i) => {
  write(
    `avatars/avatar-${String(i + 1).padStart(2, "0")}.svg`,
    `
<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
  <circle cx="80" cy="80" r="80" fill="${avatar.bg}"/>
  <text x="80" y="98" text-anchor="middle" font-family="Georgia, serif" font-size="52" fill="${avatar.fg}">${avatar.initials}</text>
</svg>`,
  );
});

/* ----------------------------------- logos ----------------------------------- */

const logos = [
  { name: "NORDHAUS", mark: `<rect x="6" y="18" width="28" height="28" fill="none" stroke="${C.graphite}" stroke-width="2.5"/><line x1="6" y1="18" x2="34" y2="46" stroke="${C.graphite}" stroke-width="2.5"/>` },
  { name: "VANTAGE", mark: `<path d="M8 46 L20 18 L32 46" fill="none" stroke="${C.graphite}" stroke-width="2.5"/>` },
  { name: "MERIDIAN & CO", mark: `<circle cx="20" cy="32" r="14" fill="none" stroke="${C.graphite}" stroke-width="2.5"/><line x1="6" y1="32" x2="34" y2="32" stroke="${C.graphite}" stroke-width="2.5"/>` },
  { name: "ALBA LIVING", mark: `<path d="M6 44 A14 14 0 0 1 34 44" fill="none" stroke="${C.graphite}" stroke-width="2.5"/><circle cx="20" cy="24" r="5" fill="none" stroke="${C.graphite}" stroke-width="2.5"/>` },
  { name: "STONEBRIDGE", mark: `<path d="M6 44 Q20 20 34 44" fill="none" stroke="${C.graphite}" stroke-width="2.5"/><line x1="6" y1="44" x2="34" y2="44" stroke="${C.graphite}" stroke-width="2.5"/>` },
  { name: "CASA VERDE", mark: `<path d="M8 44 V28 L20 18 L32 28 V44 Z" fill="none" stroke="${C.graphite}" stroke-width="2.5"/>` },
];

logos.forEach((logo, i) => {
  write(
    `logos/logo-${String(i + 1).padStart(2, "0")}.svg`,
    `
<svg xmlns="http://www.w3.org/2000/svg" width="240" height="64" viewBox="0 0 240 64">
  <g transform="translate(8,0)">${logo.mark}</g>
  <text x="56" y="39" font-family="Georgia, serif" font-size="17" letter-spacing="3" fill="${C.graphite}">${logo.name}</text>
</svg>`,
  );
});

console.log("All placeholder assets generated.");
