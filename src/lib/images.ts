// Görüntüleyici (JS ile değişen görseller) için önceden üretilmiş WebP adresleri.
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

const FULL_WIDTHS = [800, 1280, 1920, 2560];

/** Görselin izin verilen genişlikleri (asla büyütülmez). */
export function widthsFor(img: ImageMetadata, wanted: number[]): number[] {
  const w = wanted.filter((x) => x < img.width);
  return [...w, Math.min(img.width, wanted[wanted.length - 1])];
}

export async function viewerImage(img: ImageMetadata, alt: string) {
  const full = await getImage({ src: img, widths: widthsFor(img, FULL_WIDTHS), format: 'webp', quality: 82 });
  const thumb = await getImage({ src: img, width: 192, format: 'webp', quality: 70 });
  return { src: full.src, srcset: full.srcSet.attribute, thumb: thumb.src, alt, w: img.width, h: img.height };
}
