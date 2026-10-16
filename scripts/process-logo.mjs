// Orijinal logo PNG'sinden (beyaz zeminli) şeffaf logo parçaları ve site ikonları üretir.
// Kaynak dosya değiştirilmez. Çalıştırma: npm run assets:logo
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const SRC = 'assets-source/Site Renderlar/LOGO ALTERNATİF.png';
const BRAND = 'src/assets/brand';
const PUB = 'public';
const PAPER = { r: 0xf3, g: 0xf2, b: 0xee, alpha: 1 };

await mkdir(BRAND, { recursive: true });

// 1) Beyazı saydamlığa çevir. Logo renkleri (lacivert, gri, bakır) tamamen opak kalır;
//    yalnızca kenar yumuşatma pikselleri yarı saydam olur ve rengi beyazdan arındırılır.
const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height;
const color = Buffer.alloc(W * H * 4);
for (let i = 0; i < W * H * 4; i += 4) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const d = 255 - Math.min(r, g, b);
  const a = Math.max(0, Math.min(1, (d - 12) / 80));
  if (a > 0) {
    color[i] = clamp((r - (1 - a) * 255) / a);
    color[i + 1] = clamp((g - (1 - a) * 255) / a);
    color[i + 2] = clamp((b - (1 - a) * 255) / a);
  }
  color[i + 3] = Math.round(a * 255);
}
function clamp(v) { return Math.max(0, Math.min(255, Math.round(v))); }

// Beyaz sürüm: aynı saydamlık, renk beyaz
const white = Buffer.from(color);
for (let i = 0; i < white.length; i += 4) { white[i] = white[i + 1] = white[i + 2] = 255; }

// 2) Satır taraması: işaret ile yazı arasındaki boşluğu bul
const rows = [];
for (let y = 0; y < H; y++) {
  let on = false;
  for (let x = 0; x < W && !on; x++) if (color[(y * W + x) * 4 + 3] > 40) on = true;
  rows.push(on);
}
const bands = [];
for (let y = 0, s = -1; y <= H; y++) {
  if (y < H && rows[y] && s < 0) s = y;
  if ((y === H || !rows[y]) && s >= 0) { bands.push([s, y - 1]); s = -1; }
}
// En büyük boşluk işaret ile yazıyı ayırır
let gapAt = 0, gap = 0;
for (let k = 1; k < bands.length; k++) { const g = bands[k][0] - bands[k - 1][1]; if (g > gap) { gap = g; gapAt = k; } }
const markRows = [bands[0][0], bands[gapAt - 1][1]];
const wordRows = [bands[gapAt][0], bands[bands.length - 1][1]];
console.log('İşaret satırları', markRows, '· Yazı satırları', wordRows);

const raw = (buf) => sharp(buf, { raw: { width: W, height: H, channels: 4 } });
async function crop(buf, [y0, y1]) {
  const png = await raw(buf).extract({ left: 0, top: y0, width: W, height: y1 - y0 + 1 }).png().toBuffer();
  return sharp(png).trim({ threshold: 0 }).png().toBuffer();
}

const parts = {
  'logo-mark': await crop(color, markRows),
  'logo-word': await crop(color, wordRows),
  'logo-full': await crop(color, [markRows[0], wordRows[1]]),
  'logo-mark-white': await crop(white, markRows),
  'logo-word-white': await crop(white, wordRows),
};
const sizes = { 'logo-mark': { height: 600 }, 'logo-mark-white': { height: 600 }, 'logo-word': { width: 1200 }, 'logo-word-white': { width: 1200 }, 'logo-full': { width: 1200 } };
for (const [name, buf] of Object.entries(parts)) {
  await sharp(buf).resize(sizes[name]).png({ compressionLevel: 9, palette: false }).toFile(`${BRAND}/${name}.png`);
  const m = await sharp(`${BRAND}/${name}.png`).metadata();
  console.log(`${BRAND}/${name}.png  ${m.width}×${m.height}`);
}

// 3) Site ikonları (işaret, kare tuval üzerinde ortalanmış)
async function square(size, pad, bg) {
  const inner = Math.round(size * (1 - pad * 2));
  const mark = await sharp(parts['logo-mark']).resize({ width: inner, height: inner, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: mark, gravity: 'center' }]).png({ compressionLevel: 9 }).toBuffer();
}
const clear = { r: 0, g: 0, b: 0, alpha: 0 };
await writeFile(`${PUB}/favicon-32.png`, await square(32, 0.02, clear));
await writeFile(`${PUB}/apple-touch-icon.png`, await square(180, 0.14, PAPER));
await writeFile(`${PUB}/icon-192.png`, await square(192, 0.12, PAPER));
await writeFile(`${PUB}/icon-512.png`, await square(512, 0.12, PAPER));
await writeFile(`${PUB}/icon-maskable-512.png`, await square(512, 0.22, PAPER));

// favicon.ico (16, 32, 48 piksellik PNG'leri tek dosyada)
const icoSizes = [16, 32, 48];
const pngs = await Promise.all(icoSizes.map((s) => square(s, 0.02, clear)));
const header = Buffer.alloc(6 + 16 * pngs.length);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(pngs.length, 4);
let offset = header.length;
pngs.forEach((p, k) => {
  const e = 6 + 16 * k, s = icoSizes[k];
  header.writeUInt8(s, e); header.writeUInt8(s, e + 1); header.writeUInt8(0, e + 2); header.writeUInt8(0, e + 3);
  header.writeUInt16LE(1, e + 4); header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(p.length, e + 8); header.writeUInt32LE(offset, e + 12);
  offset += p.length;
});
await writeFile(`${PUB}/favicon.ico`, Buffer.concat([header, ...pngs]));

// 4) Varsayılan sosyal medya paylaşım görseli (1200×630, kâğıt zemin + tam logo)
const full = await sharp(parts['logo-full']).resize({ height: 440 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: PAPER } })
  .composite([{ input: full, gravity: 'center' }]).jpeg({ quality: 88 }).toFile(`${PUB}/og-default.jpg`);

console.log('Site ikonları ve paylaşım görseli public/ içine yazıldı.');
