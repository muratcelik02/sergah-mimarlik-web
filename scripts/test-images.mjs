// Proje görselleri için otomatik test. Çalıştırma: npm run test:images
// Hata (✗) varsa çıkış kodu 1 olur; uyarılar (!) bilgi amaçlıdır.
import sharp from 'sharp';
import { parse } from 'yaml';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, resolve, dirname, relative } from 'node:path';

const CONTENT = 'src/content/projects';
const ASSETS = 'src/assets/projects';
const MIN_WIDTH = 1400;        // altı hata
const GOOD_WIDTH = 1920;       // altı uyarı (tam ekran slaytta yumuşak görünebilir)
const MAX_KB = 1200;           // ara kopya en çok bu kadar olmalı
const BANNED_ALT = /mimarlık ofisi|architecture firm|sergah/i; // alt metne marka/anahtar kelime doldurulmaz

const errors = [], warnings = [];
const referenced = new Set();
const alts = new Map();
const exists = (p) => stat(p).then(() => true, () => false);

const files = (await readdir(CONTENT)).filter((f) => f.endsWith('.yaml'));
for (const f of files) {
  const slug = f.replace(/\.yaml$/, '');
  const data = parse(await readFile(join(CONTENT, f), 'utf8'));
  // "@assets/..." (içerik panelinin yazdığı biçim) → src/assets/...; diğerleri dosyaya göre göreli
  const at = (p) => p.startsWith('@assets/') ? resolve('src/assets', p.slice('@assets/'.length)) : resolve(dirname(join(CONTENT, f)), p);
  const tag = `[${slug}]`;

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) warnings.push(`${tag} dosya adı sadeleştirilerek adres yapılacak (Türkçe karakter/boşluk)`);
  if (!data?.name?.tr) errors.push(`${tag} name.tr eksik`);
  if (!data?.type) errors.push(`${tag} type eksik`);
  if (!data?.gallery?.length) { errors.push(`${tag} en az bir galeri görseli gerekli`); continue; }

  const first = typeof data.gallery[0] === 'string' ? data.gallery[0] : data.gallery[0].image;
  const cover = at(data.cover || first); // kapak yoksa galerinin ilk görseli
  // gallery: yol listesi (panel biçimi) ya da { image, alt }; açıklamalar galleryAlt'ta da olabilir
  const gallery = (data.gallery || []).map((g, i) => { const image = typeof g === 'string' ? g : g.image; return { image, alt: (typeof g === 'object' && g.alt) || data.galleryAlt?.[i], path: at(image) }; });
  if (!gallery.length) warnings.push(`${tag} galeri boş`);
  else if (gallery[0].path !== cover) errors.push(`${tag} kapak, galerinin ilk görseli olmalı`);

  for (const p of new Set([cover, ...gallery.map((g) => g.path)])) {
    const rel = relative('.', p).replace(/\\/g, '/');
    referenced.add(rel);
    if (!(await exists(p))) { errors.push(`${tag} dosya yok: ${rel}`); continue; }
    const m = await sharp(p).metadata();
    const kb = Math.round((await stat(p)).size / 1024);
    if (m.width < MIN_WIDTH) errors.push(`${tag} ${rel} çok küçük (${m.width}px < ${MIN_WIDTH}px)`);
    else if (m.width < GOOD_WIDTH) warnings.push(`${tag} ${rel} ${m.width}px — daha büyük sürüm (≥${GOOD_WIDTH}px) tam ekranda daha net olur`);
    if (m.width < m.height) warnings.push(`${tag} ${rel} dikey görsel; kartlarda kırpılabilir`);
    if (kb > MAX_KB) warnings.push(`${tag} ${rel} ${kb} KB (en çok ${MAX_KB} KB) — büyük dosya; site otomatik küçültür ama depo büyür`);
    if (!['jpeg', 'png', 'webp'].includes(m.format)) errors.push(`${tag} ${rel} desteklenmeyen biçim (${m.format}); JPG, PNG veya WebP olmalı`);
    if (m.space !== 'srgb') errors.push(`${tag} ${rel} renk uzayı sRGB değil (${m.space})`);
  }

  gallery.forEach((g, i) => {
    for (const l of ['tr', 'en']) {
      const a = g.alt?.[l]?.trim();
      if (!a) { warnings.push(`${tag} galeri ${i + 1}: alt.${l} boş (otomatik metin kullanılır)`); continue; }
      if (a.length < 15) warnings.push(`${tag} galeri ${i + 1}: alt.${l} çok kısa`);
      if (BANNED_ALT.test(a)) errors.push(`${tag} galeri ${i + 1}: alt.${l} içinde marka/anahtar kelime var`);
      const k = `${l}:${a.toLocaleLowerCase('tr')}`;
      if (alts.has(k)) errors.push(`${tag} galeri ${i + 1}: alt.${l} şu görselle aynı: ${alts.get(k)}`);
      else alts.set(k, `${slug} #${i + 1}`);
    }
  });
}

// Hiçbir kayıtta kullanılmayan görsel dosyası
for (const dir of await readdir(ASSETS)) {
  if (!files.includes(`${dir}.yaml`)) warnings.push(`[${dir}] görsel klasörü var ama proje kaydı yok`);
  for (const img of await readdir(join(ASSETS, dir))) {
    const rel = `${ASSETS}/${dir}/${img}`;
    if (!referenced.has(rel)) warnings.push(`[${dir}] kullanılmayan görsel: ${rel}`);
  }
}

console.log(`\n${files.length} proje, ${referenced.size} görsel kontrol edildi.`);
for (const w of warnings) console.log('  ! ' + w);
for (const e of errors) console.log('  ✗ ' + e);
if (errors.length) { console.log(`\n✗ ${errors.length} hata.\n`); process.exit(1); }
console.log(`\n✓ Görsel testi geçti (${warnings.length} uyarı).\n`);
