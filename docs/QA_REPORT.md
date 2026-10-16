# Kalite Kontrol Raporu — Aşama 6 (2026-10-16)

Ölçümler yerel yayın sürümünde (`npm run build` + `astro preview`) yapıldı. Lighthouse 13.5.0, Chrome (headless), mobil = Lighthouse varsayılan yavaş 4G + orta seviye telefon.

## Özet
| Alan | Sonuç |
|---|---|
| Kırık bağlantı / eksik kaynak (25 sayfa) | ✅ 0 hata (`npm run check:site`) |
| Meta (başlık, açıklama, canonical, hreflang, Open Graph, h1, alt, site haritası, robots) | ✅ 0 hata, 0 uyarı |
| Görsel testi (10 proje, 16 görsel) | ✅ geçti · 6 uyarı: 5 projenin görseli 1920px'ten dar |
| Ekran boyutları (320 → 1920 px, 11 boyut) | ✅ yatay taşma yok · 2 sorun bulundu ve düzeltildi |
| Lighthouse | ✅ Performans 93–100 · Erişilebilirlik 95–100 · En iyi uygulamalar 100 · SEO 100 |
| Yer tutucu (`npm run check:launch`) | ⛔ yayına hazır değil: 9 site bilgisi, 10 proje türü onayı, 4 sayfada yer tutucu (beklenen) |

## Lighthouse
| Sayfa | Mobil (Perf / Erş / EİU / SEO) | Masaüstü | Mobil FCP · LCP · CLS |
|---|---|---|---|
| `/` (TR ana sayfa) | 93 / 100 / 100 / 100 | 99 / 100 / 100 / 100 | 1.7 s · 3.1 s · 0.002 |
| `/en/` | 92 / 100 / 100 / 100 | 99 / 100 / 100 / 100 | — · 3.2 s · 0.046 |
| `/projeler/ob-evi/` | 99 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | 1.2 s · 2.1 s · 0 |
| `/kvkk/` | 100 / 95 / 100 / 100 | 100 / 95 / 100 / 100 | 1.2 s · 1.4 s · 0.032 |

- **Ana sayfa mobil LCP (3.1 s):** açılış ekranı tasarım gereği en az 2.2 s gösterilir; ana görsel ondan sonra açılır. Aynı oturumda ikinci ziyarette açılış ekranı atlanır. Masaüstünde 0.9 s.
- **Ana sayfa JavaScript:** tek dosya, 9 KB. Harici betik, çerez, izleme yok.

## Bulunan ve düzeltilen sorunlar
1. TR ve EN ana sayfa başlıkları aynıydı → ayrı başlıklar ("…Mimari Tasarım ve İç Mimarlık" / "…Architecture and Interior Design").
2. 404 sayfası var olmayan `/404/` adresine canonical veriyordu → dizinlenmeyen sayfalarda canonical yok.
3. EN gizlilik sayfasının açıklaması kısaydı → uzatıldı.
4. **Kısa telefon ekranları (375×667, 320×568):** ana sayfa üst etiketi menünün altına giriyordu (prototipten gelen sorun) → bu ekranlarda başlık 34/30 px, boşluklar sıkılaştırıldı; 320×568'de açıklama paragrafı gizlenir. 390×844 ve üstü değişmedi.
5. **Alçak masaüstü (1366×650):** KVKK satırı eklenen form 19 px taşıyordu → bu ekranlarda form boşlukları azaltıldı; artık taşmıyor.
6. Sayfayı geciktiren CSS dosyaları (≈0.9 s) → stiller sayfaya gömüldü (`inlineStylesheets: 'always'`).
7. "Eklenecek" yazıları soluk görünüyordu (kontrast 3.3) → soluklaştırma kaldırıldı (yalnızca italik).
8. Adres çubuğunda yalnızca `#bölüm` değişince panel değişmiyordu → değişiyor.

## Ekran boyutu taraması
Masaüstü (1920×1080, 1440×900, 1366×650, 1280×800, 1180×820, 1024×768): her 5 panel tek ekrana sığıyor, üst menü öğeleri çakışmıyor.
Tablet / telefon (768×1024, 414×896, 390×844, 375×812, 375×667, 320×568): prototipteki panel düzeni; paneller içten kayar (beklenen), yatay taşma yok.

## Erişilebilirlik
- ✅ Tüm form alanlarının etiketi var · tekrarlanan `id` yok · her sayfada 1 `h1` · `main` ve `nav` bölgeleri · tüm görsellerde `alt` (süs görsellerinde boş) · yakınlaştırma engellenmiyor · "hareketi azalt" ayarı çalışıyor · klavye: ↑ ↓ PageUp PageDown, görüntüleyicide ← → Esc · görüntüleyici açıkken arka plan `inert`.
- ⚠ **Renk kontrastı (WCAG AA 4.5:1 altında, prototipten / marka renklerinden):**
  | Kullanım | Şimdi | Öneri |
  |---|---|---|
  | Gri küçük metin (etiketler, alt bilgi) — `#6C7880` / kâğıt | 4.04 | `#636E76` → 4.64 |
  | Bakır küçük metin (hizmet numaraları) — `#C47A4A` / beyaz | 3.37 | `#995F3A` → 5.18 |
  | Üzerine gelince düğme: beyaz / bakır | 3.37 | düğme bakırı `#A4663E` → 4.63 |
  | Pasif dil düğmesi (TR/EN, %55 saydam) | 3.01 | saydamlık %75 |
  Logo renkleri, büyük başlıklar ve odak çerçevesi (3:1 yeterli) değişmez. **Marka sahibinin kararı bekleniyor.**
- ⚠ Form kutularında odak, prototipteki gibi kenar çizgisinin koyulaşmasıyla gösteriliyor (çerçeve yok). Klavye kullanıcıları için bakır çerçeve eklenebilir.
- ⚠ Görüntüleyici açılınca odağın "Kapat"a gitmesi kodda var; test tarayıcısı penceresi odakta olmadığı için otomatik doğrulanamadı → elle kontrol önerilir (Tab tuşu).

## Doğrulanamayanlar
- Gerçek telefonda (iOS Safari / Android Chrome) dokunma kaydırması ve çentikli ekran boşlukları — yayından sonra geçici adresle telefonda kontrol edilmeli.
- Açılış animasyonunun tam hâli: test tarayıcısında "hareketi azalt" açıktı; marka sahibi kendi tarayıcısında onayladı.
- Test aracına özgü not: ekran boyutu sayfa yenilenmeden değiştirildiğinde tarayıcı emülasyonu CSS değişkenlerini güncellemedi (prototipte de aynı); gerçek tarayıcılarda bu olmaz, ölçümler her boyutta sayfa yenilenerek yapıldı.

## Komutlar
```
npm run build
npm run test:images
npm run check:site
npm run check:launch
```
