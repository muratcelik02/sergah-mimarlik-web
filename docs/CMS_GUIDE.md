# İçerik Paneli Kılavuzu (Sveltia CMS)

Panel adresi: **https://sergahmimarlik.tr/admin/**
(Yedek adres: https://sergah-mimarlik-web.murat42celik.workers.dev/admin/)

Panelde yaptığınız her kayıt GitHub'a işlenir ve site **3–5 dakika** içinde kendiliğinden güncellenir. Ayrıca bir "yayınla" adımı yoktur.

---

## A. Bir kez yapılacak kurulum (giriş sistemi)

**Durum (2026-10-17): kurulum tamamlandı** — giriş aracı `https://sveltia-cms-auth.murat42celik.workers.dev`, GitHub OAuth uygulaması "Sergah İçerik Paneli". Aşağıdaki adımlar yeniden kurulum gerekirse diye duruyor.

### 1. Giriş aracını Cloudflare'e kurun
1. https://github.com/sveltia/sveltia-cms-auth adresine gidin.
2. Sayfadaki **"Deploy to Cloudflare Workers"** (Cloudflare'e kur) düğmesine basın, Cloudflare hesabınızla devam edin ve adımları onaylayın.
3. Kurulum bitince aracın adresi görünür, örn. `https://sveltia-cms-auth.murat42celik.workers.dev`. **Bu adresi not edin.**

### 2. GitHub'da "OAuth uygulaması" oluşturun
1. https://github.com/settings/applications/new adresine gidin.
2. Kutuları doldurun:
   | Kutu | Yazılacak |
   |---|---|
   | Application name | `Sergah İçerik Paneli` |
   | Homepage URL | `https://sergah-mimarlik-web.murat42celik.workers.dev` |
   | Authorization callback URL | `<1. adımdaki adres>/callback` (örn. `https://sveltia-cms-auth.murat42celik.workers.dev/callback`) |
3. **Register application** → açılan sayfada **Generate a new client secret**.
4. **Client ID** ve **Client secret** değerlerini kopyalayın. *Client secret bir şifredir; kimseyle, sohbete de yapıştırmayın — yalnızca Cloudflare'e girin.*

### 3. Değerleri Cloudflare'e girin
1. Cloudflare → **Workers & Pages** → **sveltia-cms-auth** → **Settings** → **Variables and Secrets** → **Add**.
2. Üç değer ekleyin:
   | Ad | Tür | Değer |
   |---|---|---|
   | `GITHUB_CLIENT_ID` | Text | GitHub'daki Client ID |
   | `GITHUB_CLIENT_SECRET` | **Secret** (şifreli) | GitHub'daki Client secret |
   | `ALLOWED_DOMAINS` | Text | `sergah-mimarlik-web.murat42celik.workers.dev` |
3. **Deploy** / **Save**.
4. Giriş aracının adresini (1. adım) geliştiriciye iletin; panel ayarına eklenir (`base_url`).

### 4. Marka sahibine erişim
1. Marka sahibi https://github.com/signup ile ücretsiz GitHub hesabı açar.
2. Depo sahibi: GitHub → `sergah-mimarlik-web` → **Settings** → **Collaborators** → **Add people** → marka sahibinin kullanıcı adı → rol **Write**.
3. Marka sahibi e-postasındaki daveti kabul eder.

### 5. Eski panelin erişimini kaldırın (Pages CMS)
GitHub → sağ üst profil → **Settings** → **Applications** → **Installed GitHub Apps** → **Pages CMS** → **Configure** → **Uninstall** (veya depoyu listeden çıkarın).

---

## B. Günlük kullanım

### Giriş
1. Panel adresini açın → **Sign In with GitHub** → GitHub'da **Authorize**.
2. Sol menüde iki bölüm görünür: **Projeler** ve **Site bilgileri**.

### Yeni proje eklemek
1. **Projeler** → sağ üstte **New Proje** (Yeni).
2. **Proje adı → Türkçe**: örn. `H.Ç. Evi` (zorunlu). İngilizce boşsa Türkçesi kullanılır.
3. **Proje türü**: Konut (müstakil evler dahil) / Ticari / Karma Kullanım.
4. **Görseller**: render dosyalarını kutuya **sürükleyip bırakın** (birden fazla seçebilirsiniz). Büyük PNG'ler yüklenirken **otomatik küçültülür** (WebP, en uzun kenar 2560 px) — sizin bir şey yapmanıza gerek yok.
   - **İlk görsel kapaktır.** Sırayı görsellerin yanındaki tutamaçla sürükleyerek değiştirebilirsiniz.
5. İsteğe bağlı alanlar (boş bırakılan sitede hiç görünmez): Kısa açıklama, Kapsam, Konum, Yıl, Alan (m²), Durum.
6. **Ana sayfa slaytında göster** işaretlenirse proje açılıştaki slayta girer; **Slayttaki sırası** 1 ise ilk görünür.
7. **Projeler listesindeki sırası**: küçük sayı önce (mevcut projeler 1–11).
8. Sağ üstte **Save** (Kaydet). 3–5 dakika sonra sitede görünür.

> Proje adresi adından üretilir: "Deniz Villası" → `/projeler/deniz-villasi/`.

### Projeyi düzenlemek / silmek
- **Projeler** listesinden projeye tıklayın → değiştirin → **Save**.
- Silmek için proje açıkken menüden **Delete** (Sil). *Silme geri alınabilir ama geliştirici yardımı gerekir.*

### Görsel açıklamaları (isteğe bağlı)
⚠ Açıklamalar görsellerle **sırayla** eşleşir. Görsellerin sırasını değiştirir ya da başa yeni görsel eklerseniz açıklamaların sırasını da aynı şekilde düzenleyin (emin değilseniz açıklamaları boş bırakın; otomatik metin her zaman doğrudur).

"Görsel açıklamaları" listesine görsellerle **aynı sırada** kısa açıklamalar yazabilirsiniz (ör. "bahçeden geniş verandalı cephe"). Boş bırakılırsa site "Proje adı, görsel 1" gibi otomatik açıklama kullanır. Açıklamalar arama motorları ve görme engelli ziyaretçiler için faydalıdır.

### İletişim, adres, Hakkımızda
**Site bilgileri → İletişim ve Hakkımızda**:
- Telefon, WhatsApp (yalnızca rakam: `905458718879`), e-posta, adres, harita bağlantısı.
- **Hakkımızda metni**: paragrafları **boş satırla** ayırın; **son paragraf** sitede bakır renkli, italik kapanış cümlesi olarak görünür.
- **Bilgi kutuları**: sayı (ör. 2008) + sonuna ek (ör. `+`) **ya da** sayı yerine yazı (ör. `Tasarım & Takip`), altında alt yazı.
- **Alan adı** (teknik): `https://sergahmimarlik.tr`.
- **Arama motorlarına açık** (teknik): KVKK metni onaylanınca işaretlenir. İşaretlenmeden site Google'da görünmez.

### "Henüz doğrulanmamış bilgiler"
Bazı projelerde "Proje türü" işaretli: türü tahminen girildi demektir. Tür doğruysa işareti kaldırıp kaydedin. Hepsi temizlenmeden gerçek alan adına geçilmez.

---

## Sorun olursa
- **Kaydettim ama sitede yok:** 5 dakika bekleyip sayfayı **Ctrl+F5** ile yenileyin.
- **Site güncellenmiyor:** Cloudflare → Workers & Pages → `sergah-mimarlik-web` → **Deployments**: son derleme kırmızıysa (hata) geliştiriciye haber verin; site o sırada son çalışan hâliyle açık kalır.
- **Giriş yapamıyorum:** GitHub hesabınızın depoya **Write** yetkisiyle eklendiğinden emin olun.
