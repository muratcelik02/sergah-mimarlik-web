// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import siteData from './src/data/site.json' with { type: 'json' };

// Alan adı henüz yok: site.json → domain dolunca otomatik kullanılır.
// Geçici yayında barındırma adresi SITE_URL ortam değişkeniyle verilir.
const site = process.env.SITE_URL || siteData.domain || 'http://localhost:4321';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  // Stiller sayfaya gömülür: ayrı CSS dosyası beklenmeden sayfa çizilir (Lighthouse önerisi)
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [sitemap()],
});
