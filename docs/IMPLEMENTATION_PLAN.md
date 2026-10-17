# Uygulama Planı

Her aşamanın sonunda durulur; marka sahibinin onayı olmadan sonrakine geçilmez. Bir hata çözülmeden aşama bitmiş sayılmaz.

| # | Aşama | Çıktı | Durum |
|---|---|---|---|
| 0 | Hazırlık | Node/Git kontrolü, prototip incelemesi, Git başlatma | ✅ 2026-10-16 |
| 1 | Proje belgeleri | `docs/*`, `CLAUDE.md` | ✅ 2026-10-16 |
| 2 | Astro iskeleti + tasarım sistemi | Proje kurulumu, `tokens.css`, yazı tipleri, logo parçaları, favicon, yerel önizleme | ✅ 2026-10-16 |
| 3 | İçerik modeli + görseller | 10 proje kaydı, işlenmiş renderlar, otomatik görsel testi | ✅ 2026-10-16 |
| 4 | Sayfalar | Açılış ekranı, 5 panel (masaüstü + mobil), görüntüleyici, proje sayfaları, KVKK, 404 — TR + EN | ✅ 2026-10-16 |
| 5 | İletişim | Form (+spam koruması, KVKK onayı), WhatsApp, Instagram; deneme gönderimi | ✅ 2026-10-16 (deneme e-postası ulaştı) |
| 6 | Kalite kontrol | Masaüstü/tablet/telefon, kırık bağlantı, meta, yer tutucu, erişilebilirlik, Lighthouse raporu | ✅ 2026-10-16 (`docs/QA_REPORT.md`; renk: prototip renkleri kalır) |
| 7 | Yayına alma | GitHub deposu, ücretsiz barındırma, geçici adres; alan adı talimatı | ✅ 2026-10-17 — https://sergah-mimarlik-web.murat42celik.workers.dev |
| 8 | İçerik yönetimi | CMS karşılaştırması → seçim → kurulum → "Yeni proje nasıl eklenir" kılavuzu | ✅ 2026-10-17 Sveltia CMS (`/admin`), GitHub girişi (Cloudflare Worker `sveltia-cms-auth`), kılavuz `docs/CMS_GUIDE.md` |

## Aşama sonu raporu (her seferinde)
1. Oluşturulan/değiştirilen dosyalar · 2. Ne test edildi · 3. Sitenin bilgisayarda nasıl açılacağı · 4. Sıradaki aşama · 5. Toplu onay soruları
