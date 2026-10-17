import type { APIRoute } from 'astro';
import siteData from '../data/site.json';

// Alan adı girilene kadar (geçici adres) arama motorları siteyi taramaz.
// site.json → domain dolunca tarama açılır ve site haritası adresi eklenir.
export const GET: APIRoute = ({ site }) =>
  new Response(
    siteData.domain
      ? `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`
      : `# Geçici yayın: alan adı henüz yok\nUser-agent: *\nDisallow: /\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
