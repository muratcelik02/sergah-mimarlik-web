// Orijinal renderlardan siteye girecek ara kopyaları üretir (orijinaller değişmez).
// Çıktı: src/assets/projects/<proje>/01.jpg, 02.jpg… (uzun kenar en çok 2560 px).
// Astro derlemede bunlardan AVIF/WebP ve farklı genişlikler üretir.
// Çalıştırma: npm run assets:renders
import sharp from 'sharp';
import { mkdir, rm, stat } from 'node:fs/promises';

const SRC = 'assets-source/Site Renderlar';
const OUT = 'src/assets/projects';
const MAX = 2560;

// Sıra önemlidir: ilk dosya kapak görselidir (01.jpg).
const MAP = {
  'me-evi': ['M.E Evi.jpg'],
  'ob-evi': ['O.B Evi/2logolu.png', 'O.B Evi/1logolu.png', 'O.B Evi/3logolu.png', 'O.B Evi/4logolu.png', 'O.B Evi/5logolu.png'],
  'ma-evi': ['M.A Evi/1.png', 'M.A Evi/2.png'],
  'mis-plaza': ['Mis Plaza.png'],
  'karakis': ['Karakış Konutları.png'],
  'fy-konut': ['F.Y Konut Projesi.png', 'F.Y Konut Projesi (2).png'],
  'ay-konut': ['A.Y Konut Projesi.png'],
  'mis-elit': ['Mis Elit Konutları.png'],
  'nergis': ['Nergis Konutları.png'],
  'torkum': ['Torkum İnşaat Konut Projesi.png'],
};

const only = process.argv[2]; // isteğe bağlı: tek proje, ör. npm run assets:renders -- ob-evi
let total = 0;
for (const [slug, files] of Object.entries(MAP)) {
  if (only && slug !== only) continue;
  const dir = `${OUT}/${slug}`;
  await rm(dir, { recursive: true, force: true });
  await mkdir(dir, { recursive: true });
  for (const [i, file] of files.entries()) {
    const out = `${dir}/${String(i + 1).padStart(2, '0')}.jpg`;
    const info = await sharp(`${SRC}/${file}`)
      .rotate()
      .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
      .toColorspace('srgb')
      .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: '4:4:4' })
      .toFile(out);
    const kb = Math.round((await stat(out)).size / 1024);
    total += kb;
    console.log(`${out}  ${info.width}×${info.height}  ${kb} KB  ← ${file}`);
  }
}
console.log(`Toplam ${(total / 1024).toFixed(1)} MB`);
