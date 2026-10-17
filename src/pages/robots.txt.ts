import type { APIRoute } from 'astro';
import siteData from '../data/site.json';

// site.json → domain dolu ve searchEngines açık olana kadar arama motorları siteyi taramaz.
// İkisi de hazır olunca tarama açılır ve site haritası adresi eklenir.
export const GET: APIRoute = ({ site }) =>
  new Response(
    siteData.domain && siteData.searchEngines
      ? `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`
      : `# Site henüz arama motorlarına kapalı\nUser-agent: *\nDisallow: /\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
