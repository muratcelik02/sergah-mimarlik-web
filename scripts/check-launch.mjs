// Yayın öncesi kontrol: boş (null) site bilgisi, sayfalarda kalan "eklenecek" yazısı,
// doğrulanmamış proje bilgisi. Sorun varsa çıkış kodu 1 olur.
// Çalıştırma: npm run build && npm run check:launch
import { readFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const problems = [];
const site = JSON.parse(await readFile('src/data/site.json', 'utf8'));

// 1) site.json içinde boş kalan alanlar
(function walk(obj, path) {
  if (obj === null) return problems.push(`site.json → ${path} boş`);
  if (Array.isArray(obj)) { if (!obj.length) problems.push(`site.json → ${path} boş liste`); return; }
  if (typeof obj === 'object') for (const [k, v] of Object.entries(obj)) walk(v, path ? `${path}.${k}` : k);
})(site, '');

// 2) Projelerde "doğrulanacak" işareti (Aşama 3'te proje kayıtları eklenince çalışır)
try {
  for (const f of await readdir('src/content/projects')) {
    if (!f.endsWith('.yaml')) continue;
    const txt = await readFile(join('src/content/projects', f), 'utf8');
    const m = txt.match(/^toVerify:\s*\[(.+)\]/m);
    if (m) problems.push(`proje ${f} → doğrulanacak: ${m[1].trim()}`);
  }
} catch { /* henüz proje klasörü yok */ }

// 3) Derlenmiş sayfalarda yer tutucu
async function* htmlFiles(dir) {
  for (const name of await readdir(dir)) {
    const p = join(dir, name);
    if ((await stat(p)).isDirectory()) yield* htmlFiles(p);
    else if (p.endsWith('.html')) yield p;
  }
}
try {
  for await (const f of htmlFiles('dist')) {
    const n = ((await readFile(f, 'utf8')).match(/data-placeholder/g) || []).length;
    if (n) problems.push(`${f.replace(/\\/g, '/')} → ${n} yer tutucu`);
  }
} catch { problems.push('dist/ bulunamadı — önce "npm run build" çalıştırın'); }

if (problems.length) {
  console.error(`\n✗ Yayına hazır değil (${problems.length} sorun):\n`);
  for (const p of problems) console.error('  - ' + p);
  console.error('');
  process.exit(1);
}
console.log('✓ Yer tutucu kalmadı, yayına hazır.');
