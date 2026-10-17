# Araştırma ve Referanslar

## Birincil referans
- `reference/prototype/index.html` — onaylı tasarım prototipi. Görünüm, renk, yazı tipi, açılış ekranı ve etkileşimlerin **tek doğru kaynağı**. Değiştirilmez.
- `assets-source/Site Renderlar/` — orijinal logo ve renderlar (Git'e girmez, yalnızca yerelde).

## Prototipten çıkarılan davranışlar (korunacak)
| Davranış | Prototipteki değer |
|---|---|
| Açılış ekranı | (Boyut sitede küçültüldü: işaret 96px, yazı 170px.) İşaret alttan belirir (1.2 s, 0.2 s gecikme) → yazı (0.8 s, 1.1 s gecikme) → bakır çizgi → ekran yukarı kalkar (1 s). En az 2.2 s, en çok 6 s. Tıklayınca geçilir. |
| Panel geçişi | `transform` 1.05 s, `cubic-bezier(.7,0,.2,1)`; tekerlekte 40 birim eşik; dokunmada 60 px eşik |
| Slayt | 6 s, görsel 7 s boyunca 1.06 → 1 yakınlaşma, 1.4 s geçiş |
| Proje ızgarası | >1180 px: 8 kart (4×2) · 981–1180 px: 6 kart (3×2) · ≤980 px: tümü |
| İçerik belirme | 0.45 s + sıra × 0.09 s gecikme |
| Hareketi azalt | Tüm süreler ~0; slayt otomatik dönmez |

## Teknik kaynaklar (resmî)
- Astro belgeleri — https://docs.astro.build (içerik koleksiyonları, görseller, i18n)
- Fontsource — https://fontsource.org (yazı tiplerini siteyle barındırma)
- Google arama: çok dilli siteler ve `hreflang` — https://developers.google.com/search/docs/specialty/international
- WCAG 2.2 (erişilebilirlik) — https://www.w3.org/TR/WCAG22/
- KVKK (6698 sayılı Kanun) — https://www.kvkk.gov.tr

## İleride doğrulanacaklar (rakam uydurulmaz; ilgili aşamada resmî siteden kontrol edilir)
| Konu | Aşama | Kontrol edilecek |
|---|---|---|
| Form servisi (barındırma formu / Formspree / Web3Forms) | 5 | Ücretsiz aylık gönderim limiti, spam koruması, KVKK uyumu |
| Barındırma (Netlify / Cloudflare Pages) | 7 | Ücretsiz plan limitleri, otomatik yayın, alan adı bağlama |
| CMS (Git tabanlı panel / Sanity / WordPress) | 8 | Fiyat, limit, giriş yöntemi (GitHub hesabı mı e-posta mı), TR/EN alan desteği |

## Görsel incelemesi (2026-10-16)
- 10 proje, 16 render. Kaynak genişlikleri 1447–3840 px (web için yeterli).
- O.B Evi'nin 5 görselinde eski "SM" logosu var.
- Mis Plaza, Mis Elit, Torkum (belirgin), Karakış, A.Y, F.Y (soluk) görsellerinde yeni Sergah logosu filigran olarak var — şimdilik kabul edildi.
- Logo PNG'si 4134×4134; beyaz zemin üzerinde. Vektör sürümü yok.

## Form ve barındırma araştırması (2026-10-16, Aşama 5)
| Seçenek | Ücretsiz koşul | Giriş | Kaynak |
|---|---|---|---|
| **Web3Forms** (seçildi) | Ayda 250 gönderim, sınırsız form; gönderim geçmişi 30 gün; dosya yükleme ücretli | E-posta ile giriş yapılan bir panel var (2026-10-16 kurulumda görüldü; aramadaki "hesap gerekmez" bilgisi eskiydi). Form oluşturulurken "Website URL" istenir | web3forms.com/pricing (resmî sayfa erişimi engelledi; arama sonuçları ve karşılaştırma siteleri) |
| Formspree | Ayda 50 gönderim | Hesap gerekir | formspree.io/plans |
| Netlify Forms | Kredi tabanlı planlarda "ücretsiz ve sınırsız" | Netlify hesabı; yalnızca Netlify'da | docs.netlify.com/manage/forms/usage-and-billing |
| Netlify Free plan | Ayda 300 kredi; her yayın 15 kredi (≈20 yayın/ay), 1 GB trafik 20 kredi | GitHub / e-posta | netlify.com/pricing |
| Cloudflare Pages Free | Ayda 500 derleme, aynı anda 1, site başına 20.000 dosya, dosya başına 25 MiB; trafik limiti belirtilmemiş; form özelliği yok | — | developers.cloudflare.com/pages/platform/limits |

Sonuç: form barındırmadan bağımsız olsun diye Web3Forms. Barındırma kararı Aşama 7'de; Netlify'ın yayın kredisi CMS ile sık güncellemede sınırlayıcı olabilir.

## CMS (içerik yönetimi) araştırması (2026-10-17, Aşama 8)
| Seçenek | Ücret | Editör girişi | Siteye etkisi | Kaynak |
|---|---|---|---|---|
| **Pages CMS** (Git tabanlı) | Tamamen ücretsiz, açık kaynak (MIT) | GitHub hesabı **veya** e-postayla davet ("no other account needed") | Mevcut YAML/JSON dosyalarını düzenler; yalnızca `.pages.yml` ayar dosyası eklenir. Görseller depoya yüklenir. Her kayıt = yeni yayın (~5 dk) | pagescms.org |
| Sveltia CMS (Git tabanlı) | Ücretsiz, açık kaynak (MIT) | GitHub hesabı + depoya yazma yetkisi; GitHub OAuth uygulaması kaydı gerekir | Güçlü çok dil desteği; `/admin` sayfası + kimlik doğrulama için küçük bir Cloudflare Worker | github.com/sveltia/sveltia-cms, sveltiacms.app |
| Decap CMS (Git tabanlı) | Ücretsiz | GitHub hesabı; Netlify dışında ayrı OAuth sunucusu gerekir | Sveltia ile aynı yapı, daha eski | decapcms.org/docs/github-backend |
| Sanity | Free: 0 $, 20 kullanıcı, 10k belge, 100 GB görsel, 100 GB/ay trafik, 250k API isteği/ay, 2 veri seti (yalnız herkese açık). Ücretli: 15 $/kullanıcı/ay | Sanity hesabı (giriş yöntemi resmî fiyat sayfasında belirtilmiyor) | İçerik Sanity sunucularına taşınır; içerik katmanı yeniden yazılır, yayın tetikleyici (webhook) kurulur | sanity.io/pricing |
| WordPress | WordPress.com: Free (reklamlı, eklenti yok, 1 GB) · Personal 4 $ · Premium 8 $ · Business 25 $/ay (yıllık). Kendi barındırma: ayrıca sunucu ücreti | WordPress hesabı (e-posta) | En büyük değişiklik: ayrı bir WordPress kurulumu + API; geliştirici araçları Business planında | wordpress.com/pricing |
