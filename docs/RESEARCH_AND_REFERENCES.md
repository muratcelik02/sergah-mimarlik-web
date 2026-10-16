# Araştırma ve Referanslar

## Birincil referans
- `reference/prototype/index.html` — onaylı tasarım prototipi. Görünüm, renk, yazı tipi, açılış ekranı ve etkileşimlerin **tek doğru kaynağı**. Değiştirilmez.
- `assets-source/Site Renderlar/` — orijinal logo ve renderlar (Git'e girmez, yalnızca yerelde).

## Prototipten çıkarılan davranışlar (korunacak)
| Davranış | Prototipteki değer |
|---|---|
| Açılış ekranı | (Boyut sitede küçültüldü: işaret 96px, yazı 170px.) İşaret alttan belirir (1.2 s, 0.2 s gecikme) → yazı (0.8 s, 1.1 s gecikme) → bakır çizgi → ekran yukarı kalkar (1 s). En az 2.2 s, en çok 6 s. Tıklayınca geçilir. |
| Panel geçişi | `transform` 1.05 s, `cubic-bezier(.7,0,.2,1)`; tekerlekte 40 birim eşik; dokunmada 60 px eşik |
| Slayt | 6 s, görsel 7 s boyunca 1.06 → 1 yakınlaşma, 1.4 s geçiş |
| Proje ızgarası | >1180 px: 8 kart (4×2) · 981–1180 px: 6 kart (3×2) · ≤980 px: tümü |
| İçerik belirme | 0.45 s + sıra × 0.09 s gecikme |
| Hareketi azalt | Tüm süreler ~0; slayt otomatik dönmez |

## Teknik kaynaklar (resmî)
- Astro belgeleri — https://docs.astro.build (içerik koleksiyonları, görseller, i18n)
- Fontsource — https://fontsource.org (yazı tiplerini siteyle barındırma)
- Google arama: çok dilli siteler ve `hreflang` — https://developers.google.com/search/docs/specialty/international
- WCAG 2.2 (erişilebilirlik) — https://www.w3.org/TR/WCAG22/
- KVKK (6698 sayılı Kanun) — https://www.kvkk.gov.tr

## İleride doğrulanacaklar (rakam uydurulmaz; ilgili aşamada resmî siteden kontrol edilir)
| Konu | Aşama | Kontrol edilecek |
|---|---|---|
| Form servisi (barındırma formu / Formspree / Web3Forms) | 5 | Ücretsiz aylık gönderim limiti, spam koruması, KVKK uyumu |
| Barındırma (Netlify / Cloudflare Pages) | 7 | Ücretsiz plan limitleri, otomatik yayın, alan adı bağlama |
| CMS (Git tabanlı panel / Sanity / WordPress) | 8 | Fiyat, limit, giriş yöntemi (GitHub hesabı mı e-posta mı), TR/EN alan desteği |

## Görsel incelemesi (2026-10-16)
- 10 proje, 16 render. Kaynak genişlikleri 1447–3840 px (web için yeterli).
- O.B Evi'nin 5 görselinde eski "SM" logosu var.
- Mis Plaza, Mis Elit, Torkum (belirgin), Karakış, A.Y, F.Y (soluk) görsellerinde yeni SerGah logosu filigran olarak var — şimdilik kabul edildi.
- Logo PNG'si 4134×4134; beyaz zemin üzerinde. Vektör sürümü yok.
