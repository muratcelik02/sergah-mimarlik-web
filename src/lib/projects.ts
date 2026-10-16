// Proje kayıtlarına erişim: sıralama ve dile göre metin seçimi.
import { getCollection, type CollectionEntry } from 'astro:content';
import { useT } from '../i18n/ui';

export type Lang = 'tr' | 'en';
export type Project = CollectionEntry<'projects'>;

/** Tüm projeler, `order` alanına göre sıralı. */
export async function getProjects(): Promise<Project[]> {
  return (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id));
}

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
