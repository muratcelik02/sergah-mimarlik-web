# Tasarım Sistemi

Tüm belirteçler **tek dosyada** tanımlıdır: `src/styles/tokens.css`. Bileşenler renk/yazı tipi/boşluk değerini doğrudan yazmaz, değişken kullanır.

## Renkler (logodan)
| Değişken | Değer | Kullanım |
|---|---|---|
| `--paper` | `#F3F2EE` | Sayfa zemini |
| `--navy` | `#1E3C54` | Ana metin, koyu düğmeler, Hakkımızda zemini |
| `--navy-deep` | `#12283A` | Ana sayfa / görüntüleyici zemini, mobil menü |
| `--steel` | `#6C7880` | İkincil metin, etiketler |
| `--copper` | `#C47A4A` | **Tek vurgu**: aktif durum, odak çizgisi, üzerine gelme |
| `--copper-light` | `#E6B28C` | Koyu zeminde vurgu metni |
| `--line` | `#D8DAD6` | İnce çizgiler, kart zemini |
| `--white` | `#FFFFFF` | Form ve hizmet kartı zemini |
| `--text-soft` | `#45576A` | Hizmet açıklamaları |
| `--error` | `#A3412A` | Form hata mesajı |

Bakır yalnızca vurgu içindir; büyük alan boyamak için kullanılmaz.

Hakkımızda paneli (taslak): zemin `--navy-deep` `#12283A` (ana sayfa slaytıyla aynı; saydam zeminli eskiz bu zemine oturur, bakır vurgular korunur).

## Yazı tipleri
- **Başlık:** Cormorant Garamond 500 / 600 / 500 italik — `--serif`
- **Gövde:** Hanken Grotesk 300–600 (değişken) — `--sans`
- Siteyle birlikte barındırılır (`@fontsource`), Latin + Latin Genişletilmiş (Türkçe karakterler) alt kümeleri.

| Öğe | Boyut |
|---|---|
| Ana başlık (h1) | `clamp(42px, 5.4vw, 84px)` |
| Panel başlıkları (h2) | `clamp(38–44px, ~5vw, 64–78px)` |
| Gövde | 16px / 1.6 |
| Etiket (`.lbl`) | 600 11px, harf aralığı .2em, BÜYÜK HARF |

## Boşluk ve ölçüler
| Değişken | Değer |
|---|---|
| `--head` | 84px (kısa ekran 72px, ≤980px 70px) — üst menü yüksekliği |
| `--gutter-l` / `--gutter-r` | 40px / 72px (≤980px: 20px / 20px) |
| `--space-1…6` | 4 · 8 · 12 · 18 · 24 · 48 px |

## Hareket
- `--ease: cubic-bezier(.7, 0, .2, 1)` — tüm büyük geçişler
- `--dur-panel: 1.05s`, `--dur-loader: 1s`, `--slide-interval: 6s`
- `prefers-reduced-motion: reduce` → tüm animasyon ve geçişler ~0.

## Kırılım noktaları
- `> 1180px` masaüstü · `981–1180px` küçük masaüstü/yatay tablet · `≤ 980px` mobil düzen · `≤ 560px` dar telefon.

## Logo dosyaları (`src/assets/brand/` ve `public/`)
`logo-mark.png` (işaret) · `logo-word.png` (yazı) · `logo-mark-white.png` · `logo-word-white.png` · `logo-full.png` · `favicon.ico` · `favicon-32.png` · `apple-touch-icon.png` · `icon-192.png` · `icon-512.png`. Hepsi `scripts/process-logo.mjs` ile orijinalden üretilir.

## Odak ve erişilebilirlik
- `:focus-visible` → 2px bakır çerçeve, 3px boşluk. Hiçbir yerde kaldırılmaz.
- Metin/zemin kontrastı en az WCAG AA.
