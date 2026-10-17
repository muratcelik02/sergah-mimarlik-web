# CLAUDE.md — Sergah Mimarlık web sitesi

Bu dosya, bu projede çalışan her yapay zekâ asistanı ve geliştirici için kurallardır. Ayrıntı `docs/` içindedir.

## Kullanıcı
Marka tarafı web geliştirme bilmiyor ve Windows kullanıyor. Teknik kararları sen ver, her birini tek cümleyle ve basit Türkçeyle açıkla. Komut gerekiyorsa tam olarak yaz ve ne yaptığını söyle.

## Kesin kurallar
1. **Müteahhitlik yasağı:** Sergah Mimarlık müteahhitlik, yüklenicilik ve anahtar teslim inşaat hizmeti **vermez**. Hiçbir metin bu hizmetler varmış gibi yazılmaz. Hizmetler panelindeki "müteahhitlik hizmeti vermez" notu marka sahibinin isteğiyle kaldırıldı (2026-10-16); yasak geçerliliğini korur. İstisna (marka sahibi onayı, 2026-10-17): Hakkımızda metni marka sahibinin yazdığı hâliyle müteahhitlik ve inşaat süreci yönetimindeki **geçmiş deneyimi** anar; bu, hizmet sunumu olarak genişletilmez (hizmet listesine, düğmelere veya başka metinlere eklenmez). Verilen hizmetler: mimari tasarım ve projelendirme, iç mekân tasarımı, inşaat süreci takibi ve proje koordinasyonu.
2. **Yer tutucu kuralı:** Bilinmeyen marka bilgisi (telefon, adres, e-posta, künye, referans, kurucu, hakkımızda) **uydurulmaz**. Site geneli bilgiler `src/data/site.json` içinde `null` olarak durur. Proje alanları boş bırakılır; boş alan sayfada görünmez. Tahmin edilen bilgi `toVerify` ile işaretlenir. Yayından önce `npm run check:launch` temiz olmalıdır.
3. **Kaynak dosyalar değiştirilmez:** `reference/prototype/` ve `assets-source/`. İşlenmiş kopyaları betikler üretir.
4. **Prototip esastır:** Görünüm ve davranış `reference/prototype/index.html` ile aynı olmalıdır. Prototipte iyi çalışan bir davranışı değiştirmeden önce kullanıcıya nedenini söyle.
5. **Gizli bilgi** (API anahtarı, şifre) koda yazılmaz, GitHub'a gönderilmez.
6. **Gereksiz paket, backend veya veritabanı eklenmez.** Ücretli servis, abonelik veya geri alınamaz işlemden önce kullanıcıya sorulur.

## Tasarım belirteçleri (tek kaynak: `src/styles/tokens.css`)
- Renkler: paper `#F3F2EE` · navy `#1E3C54` · navy-deep `#12283A` · steel `#6C7880` · copper `#C47A4A` (tek vurgu) · copper-light `#E6B28C` · line `#D8DAD6`
- Yazı: başlık **Cormorant Garamond** 500/600/500i · gövde **Hanken Grotesk** 300–600
- Hareket: `cubic-bezier(.7,0,.2,1)`, panel 1.05 s, slayt 6 s; `prefers-reduced-motion` → animasyonsuz
- Kırılımlar: 1180 / 980 / 560 px. Mobilde de prototipteki panel düzeni korunur.

## Çalışma yöntemi
- Aşamalar `docs/IMPLEMENTATION_PLAN.md`'de. Her aşamanın sonunda dur. Değişen dosyaları, yapılan testleri, sitenin nasıl açılacağını ve sıradaki aşamayı raporla. Onay sorularını toplu sor. Onay almadan sonraki aşamaya geçme.
- Bir tasarım veya teknik karar değişirse ilgili `docs/` belgesini ve `docs/PROJECT_BRIEF.md` karar kaydını güncelle.
- Hata çözülmediyse aşama bitmiş sayılmaz. Ne denendiğini basitçe anlat.
- Komutlar: `npm run dev` (önizleme, http://localhost:4321) · `npm run build` · `npm run check:launch` · `npm run assets:logo` · `npm run assets:renders` · `npm run test:images` · `npm run check:site`
