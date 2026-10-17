// Derlenmiş sitede (dist/) kırık bağlantı ve eksik meta bilgisi kontrolü.
// Çalıştırma: npm run build && npm run check:site
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, posix } from 'node:path';

const DIST = 'dist';
const errors = [], warnings = [];
const exists = (p) => stat(p).then(() => true, () => false);

async function* walk(dir) {
  for (const name of await readdir(dir)) {
    const p = join(dir, name);
    if ((await stat(p)).isDirectory()) yield* walk(p);
    else yield p;
  }
}

const pages = new Map(); // "/projeler/ob-evi/" → html
for await (const f of walk(DIST)) {
  if (!f.endsWith('.html')) continue;
  const rel = '/' + f.slice(DIST.length + 1).replace(/\\/g, '/');
  const url = rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel;
  pages.set(url, await readFile(f, 'utf8'));
}

const attr = (tag, name) => (tag.match(new RegExp(`\\s${name}="([^"]*)"`)) || [])[1];
const metas = (html, re) => [...html.matchAll(re)].map((m) => m[0]);
const siteData = JSON.parse(await readFile('src/data/site.json', 'utf8'));
// Sitenin kendi adresleri (bunlara giden bağlantılar dış bağlantı sayılmaz)
const internalOrigins = ['http://localhost:4321', siteData.domain, siteData.previewUrl, process.env.SITE_URL]
  .filter(Boolean).map((u) => new URL(u).origin);
const titles = new Map();
const external = new Set();

for (const [url, html] of pages) {
  if (url.startsWith("/admin/")) continue; // içerik paneli sayfası (Sveltia) site sayfası değildir
  const is404 = url === '/404.html';
  const tag = `[${url}]`;

  // --- Meta bilgileri
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  const desc = attr((html.match(/<meta name="description"[^>]*>/) || [''])[0], 'content');
  if (!title) errors.push(`${tag} <title> yok`);
  else { if (titles.has(title)) errors.push(`${tag} başlık şu sayfayla aynı: ${titles.get(title)}`); titles.set(title, url); }
  if (!desc) errors.push(`${tag} açıklama (description) yok`);
  else if (desc.length < 50 || desc.length > 170) warnings.push(`${tag} açıklama ${desc.length} karakter (önerilen 50–160)`);
  if (!/<html lang="(tr|en)"/.test(html)) errors.push(`${tag} <html lang> yok`);
  if (!/name="viewport" content="[^"]*width=device-width/.test(html)) errors.push(`${tag} viewport meta yok`);
  if (/user-scalable=no|maximum-scale=1[^0-9]/.test(html)) errors.push(`${tag} yakınlaştırma engelleniyor`);
  for (const p of ['og:title', 'og:description', 'og:image', 'og:url']) if (!html.includes(`property="${p}"`)) errors.push(`${tag} ${p} yok`);
  if (!is404 && !html.includes('rel="canonical"')) errors.push(`${tag} canonical yok`);
  if (!is404) {
    for (const l of ['tr', 'en', 'x-default']) if (!html.includes(`hreflang="${l}" href=`)) errors.push(`${tag} hreflang="${l}" yok`);
  } else if (!html.includes('name="robots" content="noindex"')) errors.push(`${tag} 404 sayfası noindex değil`);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) errors.push(`${tag} ${h1} adet <h1> (1 olmalı)`);

  // --- Görseller: alt metni olmayan <img>
  for (const img of metas(html, /<img\b[^>]*>/g)) {
    if (!/\salt(="|\s|>|\/>)/.test(img)) errors.push(`${tag} alt özelliği olmayan görsel: ${img.slice(0, 80)}`);
  }

  // --- Bağlantılar ve kaynaklar
  const refs = [
    ...metas(html, /<a\b[^>]*>/g).map((t) => attr(t, 'href')),
    ...metas(html, /<(img|script|source|link)\b[^>]*>/g).flatMap((t) => [attr(t, 'src'), attr(t, 'href'), ...(attr(t, 'srcset') || '').split(',').map((s) => s.trim().split(/\s+/)[0])]),
    ...metas(html, /<meta property="og:image"[^>]*>/g).map((t) => attr(t, 'content')),
  ].filter(Boolean);
  for (let ref of refs) {
    ref = ref.replace(/&amp;/g, '&');
    if (/^(mailto:|tel:|data:|#$)/.test(ref)) continue;
    if (/^https?:/.test(ref) && internalOrigins.includes(new URL(ref).origin)) ref = new URL(ref).pathname + new URL(ref).hash;
    if (/^https?:/.test(ref)) { external.add(ref.split('?')[0]); continue; }
    const [path, hash] = ref.split('#');
    const target = path === '' ? url : posix.resolve(posix.dirname(url.endsWith('/') ? url + 'x' : url), path);
    let file = join(DIST, decodeURIComponent(target));
    if (target.endsWith('/')) file = join(file, 'index.html');
    if (!(await exists(file))) { errors.push(`${tag} kırık bağlantı: ${ref}`); continue; }
    if (hash && target.endsWith('/')) {
      const dest = pages.get(target) || '';
      const sectionIds = ['anasayfa', 'projeler', 'hizmetler', 'hakkimizda', 'iletisim', 'home', 'projects', 'services', 'about', 'contact'];
      if (!sectionIds.includes(hash) && !dest.includes(`id="${hash}"`)) errors.push(`${tag} bulunamayan bölüm: ${ref}`);
    }
  }
}

// Site haritası: her dizinlenebilir sayfa haritada olmalı
const sitemap = await readFile(join(DIST, 'sitemap-0.xml'), 'utf8').catch(() => '');
for (const url of pages.keys()) {
  if (url === '/404.html' || url.startsWith('/admin/')) continue;
  if (!sitemap.includes(`${url}</loc>`)) errors.push(`[${url}] site haritasında yok`);
}
const robots = await readFile(join(DIST, 'robots.txt'), 'utf8').catch(() => '');
const site = JSON.parse(await readFile('src/data/site.json', 'utf8'));
if (site.domain && site.searchEngines && !/Sitemap: https?:\/\/\S+sitemap-index\.xml/.test(robots)) errors.push('robots.txt site haritası adresi eksik');
if (!site.domain || !site.searchEngines) warnings.push('Site arama motorlarına kapalı (robots.txt Disallow + noindex): alan adı veya searchEngines ayarı kapalı');

console.log(`\n${pages.size} sayfa kontrol edildi. Dış bağlantılar (elle kontrol edilir):`);
for (const e of external) console.log('  · ' + e);
for (const w of warnings) console.log('  ! ' + w);
for (const e of errors) console.log('  ✗ ' + e);
if (errors.length) { console.log(`\n✗ ${errors.length} hata.\n`); process.exit(1); }
console.log(`\n✓ Bağlantı ve meta kontrolü geçti (${warnings.length} uyarı).\n`);
