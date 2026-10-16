# Proje Özeti — Sergah Mimarlık Web Sitesi

## Amaç
Yeni kurulan Sergah Mimarlık ofisi için iki dilli (TR varsayılan, EN), hızlı, yayına hazır bir tanıtım sitesi. Sitenin görevi; projeleri göstermek, hizmetleri anlatmak ve ziyaretçiyi iletişime (form / WhatsApp) yönlendirmek.

## Marka
- **Ad:** Sergah Mimarlık (İngilizce sayfalarda da marka adı "Sergah Mimarlık" olarak kalır; açıklama metinlerinde "Sergah Architecture" kullanılmaz — bkz. karar kaydı).
- **Hizmetler:** mimari tasarım ve projelendirme · iç mimarlık · inşaat süreci takibi ve proje koordinasyonu.
- **Verilmeyen hizmetler:** müteahhitlik, yüklenicilik, anahtar teslim inşaat. Sitede bu hizmetler varmış gibi dil **kullanılmaz**. Sitedeki "müteahhitlik hizmeti vermez" notu marka sahibinin isteğiyle kaldırıldı; yasak geçerli.
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
| 2026-10-16 | Hizmetler panelindeki müteahhitlik notu ve proje kartlarındaki "N görsel" etiketi kaldırıldı (marka sahibi isteği). Müteahhitlik ima eden dil yasağı sürer. |
| 2026-10-16 | Ana sayfa slaytı Mis Plaza ile açılır (marka sahibi isteği), sonra prototip sırası: Mis Plaza → M.E → Karakış → M.A → O.B → F.Y (`featuredOrder`). |
| 2026-10-16 | Marka adının yazımı **Sergah Mimarlık** (yalnızca baş harf büyük; marka sahibi düzeltmesi). İngilizce sayfalarda da çevrilmez. |
| 2026-10-16 | Görüntüleyici açıkken adres çubuğu projenin gerçek sayfasını gösterir (paylaşılabilir). |
| 2026-10-16 | Form, Aşama 5 bağlanana kadar "henüz bağlı değil" mesajı verir. |
| 2026-10-16 | İletişim formu: Web3Forms (ayda 250 ücretsiz gönderim; panel sergahmim@gmail.com ile, mesajlar bu adrese gelir); spam için görünmez tuzak alan; KVKK onayı zorunlu. |
| 2026-10-16 | Kısa telefon (≤700px yükseklik) ve alçak masaüstü (≤760px) ekranlar için ana sayfa yazısı ve form sıkılaştırıldı (prototipte taşma vardı). Stiller sayfaya gömülür. |
| 2026-10-16 | Açılış ekranı logosu küçültüldü (marka sahibi isteği): işaret 96px, yazı 170px, çizgi 150px; telefonda en çok ekranın %22 / %44 / %40'ı. |

## Yapılacaklar (marka sahibinden beklenenler)
- [ ] Telefon, WhatsApp, e-posta, ofis adresi
- [ ] Hakkımızda metni, kurucu bilgileri (TR + EN)
- [ ] Proje künyeleri (konum, yıl, m², durum, açıklama) ve türlerin onayı
- [ ] O.B Evi renderlarının logosuz sürümleri
- [ ] (İsteğe bağlı) Filigransız renderlar; vektör (SVG/PDF) logo dosyası
- [ ] (İsteğe bağlı) M.A Evi, Mis Plaza, Mis Elit, Nergis, Torkum için ≥1920px genişlikte render
- [x] Web3Forms erişim anahtarı → `.env` (2026-10-16)
- [ ] Alan adı alınınca Web3Forms panelinde "Website URL"yi `localhost` yerine gerçek adresle değiştir
- [ ] Alan adı
- [ ] KVKK metninin marka sahibi / hukukçu tarafından onayı
