// Proje kayıtlarına erişim: sıralama ve dile göre metin seçimi.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Lang = 'tr' | 'en';
export type Project = CollectionEntry<'projects'>;

/** Tüm projeler, `order` alanına göre sıralı. */
export async function getProjects(): Promise<Project[]> {
  return (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id));
}

/** Ana sayfa slaytındaki öne çıkan projeler. */
export async function getFeatured(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.data.featured);
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
