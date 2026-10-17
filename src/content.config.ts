// Proje kaydı şeması. Ayrıntı: docs/CONTENT_MODEL.md
// Zorunlu: name.tr, type ve en az bir galeri görseli (ilki kapaktır). Diğer her şey isteğe bağlıdır; boş alan sayfada görünmez.
// İçerik paneli (Pages CMS) boş alanları "" ya da null yazabilir; bunlar "yok" sayılır.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** "" ve null değerleri undefined'a çevirir (boş alan = yok). */
const blank = <T extends z.ZodType>(schema: T) =>
  z.preprocess((v) => (v === '' || v === null ? undefined : v), schema);

const text = blank(z.object({ tr: blank(z.string().optional()), en: blank(z.string().optional()) }).optional());

export const PROJECT_TYPES = ['konut', 'mustakil-ev', 'ticari'] as const;
export const PROJECT_STATUSES = ['konsept', 'proje', 'ruhsat', 'insaat', 'tamamlandi'] as const;

const projects = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      name: z.object({ tr: z.string().min(1, 'Proje adı (TR) zorunlu'), en: blank(z.string().optional()) }),
      type: z.enum(PROJECT_TYPES),
      cover: blank(image().optional()), // boşsa galerinin ilk görseli kapak olur
      // Görseller: yol listesi (panelin toplu yükleme biçimi) ya da { image, alt } (eski biçim); ilki kapaktır
      gallery: z
        .array(z.union([image(), z.object({ image: image(), alt: text })]))
        .min(1, 'En az bir görsel gerekli'),
      // gallery ile aynı sırada isteğe bağlı açıklamalar; boşsa "Proje adı, görsel N" kullanılır
      galleryAlt: blank(z.array(blank(z.object({ tr: blank(z.string().optional()), en: blank(z.string().optional()) }).optional())).optional()),
      summary: text,
      scope: text,
      location: text,
      year: blank(z.number().int().min(1900).max(2100).optional()),
      area: blank(z.number().positive().optional()),
      status: blank(z.enum(PROJECT_STATUSES).optional()),
      imageType: blank(z.enum(['render', 'fotograf']).default('render')),
      featured: blank(z.boolean().default(false)),
      featuredOrder: blank(z.number().optional()), // slayt sırası (yoksa order kullanılır)
      order: blank(z.number().default(100)),
      toVerify: blank(z.array(z.string()).default([])),
    }),
});

export const collections = { projects };
