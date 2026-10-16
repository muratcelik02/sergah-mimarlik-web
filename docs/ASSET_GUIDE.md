# Görsel Rehberi

## Kaynak → işlenmiş
Orijinaller `assets-source/Site Renderlar/` içinde durur ve **değiştirilmez**. Betikler kopyalarını üretir:

| Betik | Girdi | Çıktı |
|---|---|---|
| `npm run assets:logo` | `LOGO ALTERNATİF.png` | `src/assets/brand/*.png`, `public/favicon*`, `public/icon-*.png`, `public/apple-touch-icon.png` |
| `npm run assets:renders` | proje renderları | `src/assets/projects/<ad>/NN.jpg` (uzun kenar ≤ 2560px, kalite 86) |

Astro bu ara dosyalardan siteye AVIF + WebP, birden fazla genişlikte kopya üretir. Siteye hiçbir zaman 2–12 MB'lık orijinal gitmez.

## Proje ↔ kaynak dosya eşleşmesi
| Proje (dosya adı) | Kaynak | Not |
|---|---|---|
| `me-evi` | `M.E Evi.jpg` | |
| `ob-evi` | `O.B Evi/2logolu.png` (kapak), `1, 3, 4, 5logolu.png` | ⚠ eski "SM" logosu — logosuz sürüm bekleniyor |
| `ma-evi` | `M.A Evi/1.png`, `2.png` | 1672px — daha büyüğü istenebilir |
| `mis-plaza` | `Mis Plaza.png` | filigran (kabul) · 1585px |
| `karakis` | `Karakış Konutları.png` | soluk filigran (kabul) |
| `fy-konut` | `F.Y Konut Projesi.png`, `(2).png` | soluk filigran (kabul) |
| `ay-konut` | `A.Y Konut Projesi.png` | soluk filigran (kabul) |
| `mis-elit` | `Mis Elit Konutları.png` | filigran (kabul) · 1584px |
| `nergis` | `Nergis Konutları.png` | 1768px — daha büyüğü istenebilir |
| `torkum` | `Torkum İnşaat Konut Projesi.png` | belirgin filigran (kabul) · 1447px |

## Yeni görsel eklerken
- En az 1920px genişlik; tercihen 2560px+. PNG veya yüksek kaliteli JPG.
- Logo / filigran olmamalı.
- Dosya adı önemli değil; sıra kayıttaki `gallery` listesinden gelir.

## Alt metin (erişilebilirlik ve arama)
- Görselde **ne göründüğünü** anlat: "Nergis Konutları, zemin katta dükkânlı köşe cephe".
- Her görselde aynı anahtar kelimeyi tekrarlama ("mimarlık ofisi" vb. yazma).
- Süs amaçlı görsellerde (`alt=""`) boş bırakılır (ör. hizmet kartı arka planları).

## Otomatik görsel testi — `npm run test:images`
Her proje kaydı için: kapak ve galeri dosyaları var mı · kapak galerinin ilk görseli mi · genişlik ≥ 1400px (1920px altı uyarı) · dosya ≤ 1200 KB · JPEG ve sRGB mi · her görselde TR ve EN alt metin var mı · alt metinler birbirini tekrar ediyor mu · alt metne marka/anahtar kelime doldurulmuş mu · kayıtta kullanılmayan görsel dosyası kaldı mı. Hata varsa test başarısız olur.
