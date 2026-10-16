# Teknik Mimari

## Yığın
- **Astro 7** (statik çıktı, `output: 'static'`). Sunucu, veritabanı, React/Next.js yok.
- **sharp** (Astro ile gelir): görsel küçültme, AVIF/WebP üretimi, logo işleme betikleri.
- **@astrojs/sitemap**: site haritası.
- **@fontsource/cormorant-garamond**, **@fontsource-variable/hanken-grotesk**: yazı tipleri siteyle barındırılır.
- Etkileşimler sade TypeScript (prototip JS'inin modüllere ayrılmış hâli). Başka çalışma zamanı kütüphanesi yok.

## Klasör yapısı
```
src/
  assets/brand/         işlenmiş logo parçaları
  assets/projects/<ad>/ işlenmiş proje görselleri (01.jpg, 02.jpg…)
  content/projects/     proje kayıtları (.yaml)
  content.config.ts     proje şeması (zorunlu/isteğe bağlı alanlar)
  data/site.json        site ayarları ve yer tutucular
  i18n/                 arayüz metinleri (tr, en) + yardımcılar
  layouts/              Base.astro (head, meta, hreflang, yazı tipleri)
  components/           Loader, Header, Panels, Viewer, ContactForm…
  scripts/              tarayıcı tarafı TS (deck, slider, grid, viewer, form)
  styles/tokens.css     tasarım belirteçleri (tek kaynak)
  styles/global.css     prototip stilleri
  pages/                adresler (aşağıda)
public/                 favicon, robots.txt, site.webmanifest
scripts/                Node betikleri: process-logo, process-renders, check-launch
reference/, assets-source/  kaynak (değiştirilmez; assets-source Git'e girmez)
```

## Adresler
| Adres | Dosya |
|---|---|
| `/` | `pages/index.astro` |
| `/en/` | `pages/en/index.astro` |
| `/projeler/[ad]/` | `pages/projeler/[slug].astro` |
| `/en/projects/[ad]/` | `pages/en/projects/[slug].astro` |
| `/kvkk/` · `/en/privacy/` | `pages/kvkk.astro` · `pages/en/privacy.astro` |
| 404 | `pages/404.astro` (iki dilli) |

Her sayfa: `<title>`, açıklama, Open Graph/Twitter görseli, `canonical`, `hreflang` (tr, en, x-default). `sitemap-index.xml` ve `robots.txt` otomatik. Alan adı belirlenene kadar `site` değeri `site.json → domain`'den okunur; `null` ise geçici adres kullanılır ve `check:launch` uyarır.

## Veri akışı
Proje kayıtları → derleme sırasında (1) ızgara ve slayt HTML'i, (2) görüntüleyici için küçük bir JSON (`<script type="application/json">`), (3) her proje için ayrı sayfa üretir. Görüntüleyici ile proje sayfası **aynı kaydı** kullanır.

## Görseller
Kaynak → `scripts/process-renders.mjs` → `src/assets/projects/<ad>/NN.jpg` (uzun kenar en çok 2560px). Astro derlemede AVIF + WebP ve 480/800/1200/1600/2400px genişlikler üretir. Slaytın ilk görseli `fetchpriority="high"`, diğerleri gecikmeli yüklenir.

## Komutlar
| Komut | Ne yapar |
|---|---|
| `npm run dev` | Yerel önizleme (http://localhost:4321) |
| `npm run build` | Yayın dosyalarını `dist/` içine üretir |
| `npm run preview` | Üretilen siteyi yerelde açar |
| `npm run assets:logo` | Logoyu parçalara ayırır, favicon üretir |
| `npm run assets:renders` | Renderları işler |
| `npm run check:launch` | Yer tutucu / eksik bilgi kontrolü (yayın öncesi zorunlu) |

## Gizli bilgiler
API anahtarı / şifre koda yazılmaz. Gerekirse `.env` (Git'e girmez) ve barındırma panelindeki ortam değişkenleri kullanılır. Örnek değerler `.env.example`'da.

## Form, barındırma, CMS
Aşama 5, 7 ve 8'de güncel koşullar kontrol edilerek seçilir (bkz. `RESEARCH_AND_REFERENCES.md`). Kod her iki barındırmada (Netlify / Cloudflare Pages) çalışacak şekilde platformdan bağımsız tutulur.
