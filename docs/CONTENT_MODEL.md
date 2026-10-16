# İçerik Modeli

## 1. Site ayarları — `src/data/site.json` (yer tutucuların tek kaynağı)
Bilinmeyen her değer **`null`**'dır. Sitede `null` alan için görünür bir "eklenecek" yer tutucusu basılır ve HTML'de `data-placeholder` ile işaretlenir. `npm run check:launch` bu işaretlerden biri kalırsa yayını durdurur.

| Alan | Tür | Şu an |
|---|---|---|
| `domain` | metin (`https://…`) | `null` |
| `phone` | metin (`+90…`) | `null` |
| `whatsapp` | metin (yalnızca rakam, `905…`) | `null` |
| `whatsappMessage.tr/.en` | metin | hazır mesaj |
| `email` | metin | `null` |
| `address.tr/.en` | metin | `null` |
| `instagram` | URL | `https://www.instagram.com/sergahmimarlik/` |
| `about.tr/.en` | metin | `null` |
| `founders[]` | `{ name, title.tr, title.en }` | `[]` |

## 2. Proje kaydı — `src/content/projects/<ad>.yaml`
Dosya adı = adres (`ob-evi.yaml` → `/projeler/ob-evi/`). Küçük harf, Türkçe karakter yok, kelimeler `-` ile.

| Alan | Zorunlu | Tür | Not |
|---|---|---|---|
| `name.tr` / `name.en` | **tr zorunlu** | metin | `en` boşsa `tr` kullanılır |
| `type` | **evet** | `konut` · `mustakil-ev` · `ticari` | |
| `cover` | **evet** | görsel yolu | kart, slayt, paylaşım görseli |
| `gallery[]` | hayır | `{ image, alt.tr, alt.en }` | kapak dahil sıralı tüm görseller |
| `summary.tr/.en` | hayır | kısa açıklama (1–2 cümle) | |
| `scope.tr/.en` | hayır | kapsam (ör. "Mimari proje, iç mimari") | |
| `location.tr/.en` | hayır | metin | |
| `year` | hayır | sayı | |
| `area` | hayır | sayı (m²) | |
| `status` | hayır | `konsept` · `proje` · `ruhsat` · `insaat` · `tamamlandi` | iki dilde sabit çeviri |
| `imageType` | hayır (vars. `render`) | `render` · `fotograf` | |
| `featured` | hayır (vars. `false`) | evet/hayır | ana sayfa slaytında görünür |
| `order` | hayır | sayı | küçük önce |
| `toVerify[]` | hayır | alan adları listesi | ör. `[type]` → tür tahminidir |

**Kural:** boş alan sayfada hiç görünmez. Uydurma değer yazılmaz. `toVerify` dolu bir proje varsa `check:launch` hata verir (yayın durur).

## 3. Arayüz metinleri — `src/i18n/tr.ts`, `src/i18n/en.ts`
Menü, düğme, hizmet ve süreç metinleri. Prototipteki çeviriler aynen taşınır.

## Örnek
```yaml
name: { tr: O.B Evi }            # en boş → "O.B Evi" kullanılır
type: mustakil-ev
cover: ../../assets/projects/ob-evi/01.jpg
gallery:
  - image: ../../assets/projects/ob-evi/01.jpg
    alt: { tr: "O.B Evi, sütunlu girişi olan ön cephe", en: "O.B Evi, front façade with a columned entrance" }
imageType: render
featured: true
order: 2
toVerify: [type]
```
