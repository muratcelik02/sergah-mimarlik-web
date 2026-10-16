# Arayüz Tanımı

Kural: **prototip neyse o.** Aşağıdakiler prototipten farkları ve sayfa bazında beklentileri listeler.

## Ortak öğeler
- **Üst menü:** logo (açık/koyu zemine göre lacivert/beyaz), 5 bölüm bağlantısı (bakır alt çizgi), TR/EN, Instagram. ≤980px'te hamburger + tam ekran lacivert menü.
- **Sağ noktalar** (masaüstü) ve **sol alt sayaç** (`01 — ANA SAYFA`).
- **Odak** her zaman görünür; tüm kontroller klavyeyle kullanılabilir.

## Açılış ekranı
Prototipteki sıralama aynen; logo boyutu küçültüldü (işaret 96px, yazı 170px — karar kaydı). Ek: aynı tarayıcı oturumunda ikinci ziyarette **gösterilmez** (`sessionStorage`). Sayfa çizilmeden önce karar verilir, yanıp sönme olmaz. Hareketi azalt açıksa animasyonsuz ve kısa.

## Ana sayfa — tek ekran, 5 panel (tüm ekran boyutlarında)
Geçiş: menü · noktalar · tekerlek · klavye (↑ ↓ PageUp PageDown) · dokunma kaydırması. Panel içeriği taşarsa önce panelin içi kayar, kenara gelince sonraki panele geçilir (prototipteki gibi; mobilde de aynı).
Adres çubuğu: TR `#anasayfa #projeler #hizmetler #hakkimizda #iletisim`, EN `#home #projects #services #about #contact`.

1. **Ana Sayfa:** öne çıkan projelerin renderları (6 s), öne çıkan proje adı, ← → düğmeleri ve ilerleme çizgisi. İlk görsel öncelikli yüklenir.
2. **Projeler:** Tümü / Konut / Müstakil Ev / Ticari filtreleri + sayılar; 8 kart (4×2), fazlası sayfalı. Kartta tür, ad, görsel sayısı (>1 ise).
3. **Hizmetler:** 3 kart + müteahhitlik notu.
4. **Hakkımızda:** görsel + metin (yer tutucu, `site.json`) + 6 adımlı süreç.
5. **İletişim:** WhatsApp kutusu, telefon, e-posta, Instagram, adres; form (+ KVKK onay kutusu, spam koruması); alt bilgide © ve KVKK bağlantısı.

## Proje görüntüleyici (ana sayfada)
Prototipteki gibi: sol büyük görsel + oklar + küçük resimler, sağda künye, "Benzer bir proje için yazın", önceki/sonraki proje. Esc kapatır, ← → görsel değiştirir, mobilde yana kaydırma.
**Fark:** açılınca adres çubuğu projenin gerçek sayfasını gösterir (`/projeler/ob-evi/`); kapatınca `#projeler`'e döner. Böylece adres kopyalanıp paylaşılabilir.
**Künye:** yalnızca dolu alanlar gösterilir; boş alanlar hiç görünmez. Prototipteki "bilgiler eklenecek" notu kaldırılır.

## Proje sayfası (`/projeler/[ad]/`, `/en/projects/[ad]/`)
Görüntüleyiciyle aynı görünüm, bağımsız sayfa. "Kapat" yerine "← Tüm projeler" (ana sayfa `#projeler`). Önceki/sonraki proje gerçek bağlantıdır. JavaScript kapalıysa tüm görseller alt alta görünür.

## KVKK / Gizlilik, 404
Açık zemin, üst menü + sade metin sütunu. 404: kısa mesaj + ana sayfa ve projeler bağlantısı, iki dilde.

## Dil
TR/EN düğmesi diğer dildeki **aynı sayfaya** gider ve bulunulan bölümü korur (ör. `/#projeler` → `/en/#projects`).

## Uygulama notları (Aşama 4)
- Kartlar, slaytlar ve hizmet görselleri sunucuda üretilir (AVIF + WebP, birden çok genişlik). Kartlar gerçek bağlantıdır: JavaScript kapalıyken veya Ctrl/orta tıkla proje sayfası açılır.
- Görüntüleyici açıkken arkadaki sayfa `inert` yapılır (klavye odağı görüntüleyicide kalır).
- Proje sayfasında görüntüleyicinin sağ sütununa küçük logo ve TR/EN eklendi; "Kapat" yerine "← Tüm projeler".
- Alt bilgi: "© yıl Sergah Mimarlık · KVKK ve Gizlilik" (prototipteki "KVKK · Çerez politikası" yerine; site çerez kullanmadığı için tek sayfa).
- Prototipteki görüntüleyici notu ("bilgiler eklenecek") kaldırıldı; künyede yalnızca dolu alanlar görünür.
- Öne çıkan proje etiketi görsel türünü projeden alır ("Öne çıkan proje · Render").
