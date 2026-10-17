// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import siteData from './src/data/site.json' with { type: 'json' };

// Sayfaların kendi adresi: SITE_URL (barındırma ortam değişkeni) → site.json domain (gerçek alan adı)
// → site.json previewUrl (geçici yayın adresi) → yerel önizleme.

const site = process.env.SITE_URL || siteData.domain || siteData.previewUrl || 'http://localhost:4321';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  // Stiller sayfaya gömülür: ayrı CSS dosyası beklenmeden sayfa çizilir (Lighthouse önerisi)
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [sitemap()],
});
