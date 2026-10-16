// Proje kaydı şeması. Ayrıntı: docs/CONTENT_MODEL.md
// Zorunlu: name.tr, type, cover. Diğer her şey isteğe bağlıdır; boş alan sayfada görünmez.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const text = z.object({ tr: z.string().min(1).optional(), en: z.string().min(1).optional() }).optional();

export const PROJECT_TYPES = ['konut', 'mustakil-ev', 'ticari'] as const;
export const PROJECT_STATUSES = ['konsept', 'proje', 'ruhsat', 'insaat', 'tamamlandi'] as const;

const projects = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      name: z.object({ tr: z.string().min(1), en: z.string().min(1).optional() }),
      type: z.enum(PROJECT_TYPES),
      cover: image(),
      gallery: z
        .array(z.object({ image: image(), alt: z.object({ tr: z.string().min(1), en: z.string().min(1) }) }))
        .default([]),
      summary: text,
      scope: text,
      location: text,
      year: z.number().int().min(1900).max(2100).optional(),
      area: z.number().positive().optional(),
      status: z.enum(PROJECT_STATUSES).optional(),
      imageType: z.enum(['render', 'fotograf']).default('render'),
      featured: z.boolean().default(false),
      order: z.number().default(100),
      toVerify: z.array(z.string()).default([]),
    }),
});

export const collections = { projects };
