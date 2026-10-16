# Yayına Alma Rehberi

Kod GitHub'da **özel (private)** bir depoda durur. **Cloudflare Pages** depoya bağlanır; her `git push` sonrası site otomatik derlenip yayınlanır. Ücretsiz plan (2026-10): ayda 500 derleme, trafik limiti belirtilmemiş.

## 1. GitHub deposu (bir kez)
1. https://github.com → hesabınızla giriş yapın (yoksa **Sign up**).
2. Sağ üstte **+** → **New repository**.
3. **Repository name:** `sergah-mimarlik-web` · **Private** seçili · README / .gitignore / license **eklemeyin** (boş depo).
4. **Create repository**.
5. Proje klasöründe (asistan bunu yapar):
   ```
   git remote add origin https://github.com/<kullanıcı-adı>/sergah-mimarlik-web.git
   git push -u origin main
   ```
   İlk gönderimde tarayıcıda GitHub girişi açılır (Git Credential Manager); onaylayın.

## 2. Cloudflare Pages (bir kez)
1. https://dash.cloudflare.com → hesap açın / giriş yapın (ücretsiz).
2. **Workers & Pages** → **Create application** → **Pages** → **Connect to Git** → **GitHub** → yetki verin (yalnızca `sergah-mimarlik-web` deposunu seçmeniz yeterli) → **Install & Authorize** → depoyu seçin → **Begin setup**.
3. **Set up builds and deployments:**
   | Alan | Değer |
   |---|---|
   | Project name | `sergah-mimarlik` (geçici adres: `sergah-mimarlik.pages.dev`) |
   | Production branch | `main` |
   | Framework preset | `Astro` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
4. **Environment variables** (Production):
   | Ad | Değer |
   |---|---|
   | `PUBLIC_WEB3FORMS_KEY` | Web3Forms erişim anahtarı (`.env` dosyasındaki) |
   | `SITE_URL` | `https://sergah-mimarlik.pages.dev` (alan adı gelince değişir) |
   | `NODE_VERSION` | `24` (yedek; `.nvmrc` zaten 24 — Cloudflare varsayılanı 22.16, Astro 7 için yetmez) |
5. **Save and Deploy**. Derleme ~1–2 dk.

## Güncelleme akışı
Kodda değişiklik → `git push` → Cloudflare otomatik yayınlar. Panelde **Deployments** listesinde her yayın ve geri alma (rollback) düğmesi görünür.

## Geçici yayın ↔ gerçek yayın
- `src/data/site.json → domain` boşken: tüm sayfalar `noindex`, `robots.txt` → `Disallow: /`. Geçici adres arama motorlarında görünmez.
- Gerçek alan adına geçmeden önce zorunlu kontrol:
  ```
  npm run build && npm run check:site && npm run check:launch
  ```
  `check:launch` temiz olmalı: boş site bilgisi, "eklenecek" yazısı, doğrulanmamış proje türü, boş `domain` kalmamalı.

## Alan adı bağlama (alan adı alınınca)
1. Alan adı: Cloudflare'in kendi alan adı satışı (**Domain Registration**) en kolayıdır; başka firmadan (ör. `.com.tr` için Türk firmaları) da alınabilir.
2. Cloudflare Pages projesi → **Custom domains** → **Set up a custom domain** → alan adını yazın.
   - Alan adı Cloudflare'deyse DNS kaydı otomatik eklenir.
   - Başka firmadaysa: Cloudflare'in gösterdiği **CNAME** kaydını (`www` → `sergah-mimarlik.pages.dev`) o firmanın DNS paneline girin; kök alan adı (`@`) için alan adının DNS yönetimini Cloudflare'e taşımak (nameserver değişikliği) önerilir.
3. HTTPS sertifikası otomatik gelir (birkaç dakika – birkaç saat).
4. Sonra projede:
   - `src/data/site.json → "domain": "https://<alan-adı>"`
   - Cloudflare → **Settings → Environment variables** → `SITE_URL` aynı adres
   - Web3Forms paneli → form → **Website URL** → gerçek adres
   - `git push` → site arama motorlarına açılır, site haritası `robots.txt`'ye eklenir.
5. İsteğe bağlı: Google Search Console'a site haritasını (`/sitemap-index.xml`) gönderin.

## Gizli bilgiler
`PUBLIC_WEB3FORMS_KEY` yalnızca `.env` (yerel, Git dışı) ve Cloudflare ortam değişkenlerinde durur; depoya yazılmaz.
