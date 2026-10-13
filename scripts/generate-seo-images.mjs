import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "img/IMG_20261012_060714.jpg");
const pub = path.join(root, "public");

const W = 1200;
const H = 630;

const portraitBuf = await sharp(src)
  .rotate()
  .resize(520, 620, { fit: "cover", position: "top" })
  .toBuffer();

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#060708"/>
      <stop offset="100%" stop-color="#12141a"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <text x="72" y="200" fill="#f5f5f4" font-family="Arial,Helvetica,sans-serif" font-size="64" font-weight="700">Mohammad Hroub</text>
  <text x="72" y="268" fill="#8b919a" font-family="Arial,Helvetica,sans-serif" font-size="28">محمد حروب</text>
  <text x="72" y="330" fill="#c8c8c8" font-family="Arial,Helvetica,sans-serif" font-size="22" font-style="italic">Silent code / massive impact.</text>
  <text x="72" y="400" fill="#8b919a" font-family="Arial,Helvetica,sans-serif" font-size="18">Full-Stack Developer — Websites and Systems</text>
</svg>`;

await sharp(src)
  .rotate()
  .resize(1200, 1200, { fit: "cover", position: "attention" })
  .webp({ quality: 88 })
  .toFile(path.join(pub, "mohammad-hroub-portrait.webp"));

await sharp(src)
  .rotate()
  .resize(1200, 1200, { fit: "cover", position: "attention" })
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(path.join(pub, "mohammad-hroub-portrait.jpg"));

await sharp(Buffer.from(svg))
  .composite([{ input: portraitBuf, left: W - 560, top: 5 }])
  .png()
  .toFile(path.join(pub, "og.png"));

await sharp(path.join(pub, "og.png"))
  .webp({ quality: 90 })
  .toFile(path.join(pub, "og.webp"));

console.log("SEO images written to public/");
