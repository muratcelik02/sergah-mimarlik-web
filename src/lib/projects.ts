// Proje kayıtlarına erişim: sıralama ve dile göre metin seçimi.
import { getCollection, type CollectionEntry } from 'astro:content';
import { useT } from '../i18n/ui';

export type Lang = 'tr' | 'en';
export type Project = CollectionEntry<'projects'>;

/** Dosya adından adres parçası: Türkçe karakterler sadeleşir, boşluklar "-" olur (ör. "Karakış Evi" → "karakis-evi"). */
export function toSlug(s: string): string {
  const map: Record<string, string> = { ı: 'i', İ: 'i', ş: 's', Ş: 's', ğ: 'g', Ğ: 'g', ü: 'u', Ü: 'u', ö: 'o', Ö: 'o', ç: 'c', Ç: 'c', â: 'a', î: 'i', û: 'u' };
  return s.replace(/[ıİşŞğĞüÜöÖçÇâîû]/g, (c) => map[c]).toLowerCase()
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'proje';
}

/** Tüm projeler, `order` alanına göre sıralı. İçerik panelinden gelen eksikler tamamlanır:
 *  kapak yoksa galerinin ilk görseli, alt metin yoksa "Proje adı, görsel N", adres Türkçe karaktersiz. */
export async function getProjects(): Promise<Project[]> {
  const list = await getCollection('projects');
  for (const p of list) {
    p.id = toSlug(p.id);
    const d = p.data;
    d.cover ??= d.gallery[0].image;
    d.gallery.forEach((g, i) => {
      const n = d.gallery.length > 1 ? `, görsel ${i + 1}` : '';
      const nEn = d.gallery.length > 1 ? `, image ${i + 1}` : '';
      g.alt = { tr: g.alt?.tr ?? `${d.name.tr}${n}`, en: g.alt?.en ?? `${d.name.en ?? d.name.tr}${nEn}` };
    });
  }
  return list.sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id));
}

/** Kapak görseli (her zaman dolu: getProjects tamamlar). */
export const coverOf = (p: Project) => p.data.cover ?? p.data.gallery[0].image;
/** Görselin dildeki alt metni (her zaman dolu: getProjects tamamlar). */
export const altOf = (g: Project['data']['gallery'][number], lang: Lang) => g.alt?.[lang] ?? g.alt?.tr ?? '';

/** Ana sayfa slaytındaki öne çıkan projeler. */
export async function getFeatured(): Promise<Project[]> {
  return (await getProjects())
    .filter((p) => p.data.featured)
    .sort((a, b) => (a.data.featuredOrder ?? a.data.order) - (b.data.featuredOrder ?? b.data.order));
}

/** İki dilli alandan istenen dili seçer; İngilizce boşsa Türkçeye düşer. Boşsa undefined. */
export function pick(field: { tr?: string; en?: string } | undefined, lang: Lang): string | undefined {
  if (!field) return undefined;
  return (lang === 'en' ? field.en : undefined) ?? field.tr;
}

/** Projenin sayfa adresi. */
export function projectUrl(id: string, lang: Lang): string {
  return lang === 'en' ? `/en/projects/${id}/` : `/projeler/${id}/`;
}


/** Projenin dildeki adı. */
export function projectName(p: Project, lang: Lang): string {
  return pick(p.data.name, lang)!;
}

/** Künye satırları: yalnızca dolu alanlar. [etiket, değer] */
export function projectFacts(p: Project, lang: Lang): [string, string][] {
  const t = useT(lang);
  const d = p.data;
  const rows: [string, string | undefined][] = [
    [t('v.type'), t(`c.${d.type}`)],
    [t('v.loc'), pick(d.location, lang)],
    [t('v.year'), d.year?.toString()],
    [t('v.area'), d.area ? `${d.area.toLocaleString(lang === 'tr' ? 'tr-TR' : 'en-GB')} m²` : undefined],
    [t('v.status'), d.status ? t(`st.${d.status}`) : undefined],
    [t('v.scope'), pick(d.scope, lang)],
    [t('v.imgs'), String(d.gallery.length)],
    [t('v.kind'), t(d.imageType)],
  ];
  return rows.filter((r): r is [string, string] => !!r[1]);
}
