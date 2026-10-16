# Proje Özeti — SerGah Mimarlık Web Sitesi

## Amaç
Yeni kurulan SerGah Mimarlık ofisi için iki dilli (TR varsayılan, EN), hızlı, yayına hazır bir tanıtım sitesi. Sitenin görevi; projeleri göstermek, hizmetleri anlatmak ve ziyaretçiyi iletişime (form / WhatsApp) yönlendirmek.

## Marka
- **Ad:** SerGah Mimarlık (İngilizce sayfalarda da marka adı "SerGah Mimarlık" olarak kalır; açıklama metinlerinde "SerGah Architecture" kullanılmaz — bkz. karar kaydı).
- **Hizmetler:** mimari tasarım ve projelendirme · iç mimarlık · inşaat süreci takibi ve proje koordinasyonu.
- **Verilmeyen hizmetler:** müteahhitlik, yüklenicilik, anahtar teslim inşaat. Sitede bu hizmetler varmış gibi dil **kullanılmaz**. "SerGah Mimarlık müteahhitlik hizmeti vermez; inşaatı işverenin seçtiği yüklenici yapar." notu korunur.
- **Hedef kitle:** villa yaptırmak isteyen bireyler · konut müteahhitleri ve geliştiriciler · iç mimari hizmet arayanlar.
- **Instagram:** https://www.instagram.com/sergahmimarlik/

## Kapsam
- Ana sayfa (tek ekran, 5 panel): Ana Sayfa · Projeler · Hizmetler · Hakkımızda · İletişim
- Her proje için paylaşılabilir ayrı sayfa (TR + EN)
- KVKK / Gizlilik sayfası, özel 404 sayfası
- İletişim formu (ücretsiz servis), WhatsApp düğmesi
- Sonraki aşamada: içerik yönetim paneli (CMS)

## Kapsam dışı
Blog, çoklu kullanıcı, üyelik, ödeme, sunucu / veritabanı.

## Bilinmeyenler (uydurulmaz → `src/data/site.json` içinde `null`)
Telefon · WhatsApp · e-posta · ofis adresi · Hakkımızda metni · kurucu bilgileri · alan adı · projelerin konum/yıl/alan/durum/açıklamaları · proje türlerinin doğruluğu.

## Karar kaydı
| Tarih | Karar |
|---|---|
| 2026-10-16 | Altyapı: Astro 7 (statik). React/Next.js yok. |
| 2026-10-16 | **Mobil (<981 px): prototipteki panel düzeni korunur** (uzun sayfa yapılmaz). |
| 2026-10-16 | Filigranlı renderlar (Mis Plaza, Mis Elit, Torkum, Karakış, A.Y, F.Y) şimdilik olduğu gibi kullanılır. |
| 2026-10-16 | O.B Evi renderları (eski "SM" logolu) logosuzları gelene kadar kullanılır → yapılacaklar listesinde. |
| 2026-10-16 | İngilizce sürüm ayrı adreste (`/en/`); dil düğmesi o adrese gider, bulunulan bölüm korunur. |
| 2026-10-16 | Yazı tipleri siteyle birlikte barındırılır (Google'a istek gitmez; KVKK ve hız). |
| 2026-10-16 | Ana sayfa slayt sırası prototipteki gibi (`featuredOrder`): M.E → Karakış → M.A → Mis Plaza → O.B → F.Y. |
| 2026-10-16 | İngilizce sayfalarda da marka adı "SerGah Mimarlık" (çevrilmez). |
| 2026-10-16 | Görüntüleyici açıkken adres çubuğu projenin gerçek sayfasını gösterir (paylaşılabilir). |
| 2026-10-16 | Form, Aşama 5 bağlanana kadar "henüz bağlı değil" mesajı verir. |
| 2026-10-16 | Açılış ekranı logosu küçültüldü (marka sahibi isteği): işaret 96px, yazı 170px, çizgi 150px; telefonda en çok ekranın %22 / %44 / %40'ı. |

## Yapılacaklar (marka sahibinden beklenenler)
- [ ] Telefon, WhatsApp, e-posta, ofis adresi
- [ ] Hakkımızda metni, kurucu bilgileri (TR + EN)
- [ ] Proje künyeleri (konum, yıl, m², durum, açıklama) ve türlerin onayı
- [ ] O.B Evi renderlarının logosuz sürümleri
- [ ] (İsteğe bağlı) Filigransız renderlar; vektör (SVG/PDF) logo dosyası
- [ ] (İsteğe bağlı) M.A Evi, Mis Plaza, Mis Elit, Nergis, Torkum için ≥1920px genişlikte render
- [ ] Alan adı
- [ ] KVKK metninin marka sahibi / hukukçu tarafından onayı
