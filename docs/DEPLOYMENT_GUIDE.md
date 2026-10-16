# Yayına Alma Rehberi

Bu belge Aşama 7'de adım adım (ekran ekran) doldurulacak. Şimdilik akış:

## Genel akış
1. Kod GitHub'da özel (private) bir depoda durur.
2. Barındırma (Netlify veya Cloudflare Pages — Aşama 7'de güncel koşullarla seçilecek) depoya bağlanır.
3. Her `git push` sonrası site otomatik olarak yeniden derlenip yayınlanır (`npm run build` → `dist/`).
4. Önce ücretsiz geçici adres (ör. `sergah.netlify.app` / `sergah.pages.dev`).
5. Alan adı alınınca DNS kayıtları girilir, HTTPS otomatik açılır.

## Yayın öncesi zorunlu kontrol
```
npm run build && npm run check:site && npm run check:launch
```
- `site.json` içinde `null` kalmışsa,
- sayfalarda `data-placeholder` (eklenecek) yazısı varsa,
- bir projede `toVerify` doluysa,
- `domain` boşsa

hata verir. Geçici adresle deneme yayını yapılabilir; **gerçek alan adına geçmeden önce** bu kontrol temiz olmalıdır.

## Barındırma ayarları (her iki platform için)
| Ayar | Değer |
|---|---|
| Derleme komutu | `npm run build` |
| Yayın klasörü | `dist` |
| Node sürümü | 24 (`.nvmrc`) |

## Alan adı bağlama
Aşama 7'de seçilen platforma ve alan adının alındığı firmaya göre talimat buraya yazılacak.

## Gizli bilgiler
Form anahtarı barındırma panelindeki "Environment variables" bölümüne `PUBLIC_WEB3FORMS_KEY` adıyla girilir; depoya yazılmaz.
