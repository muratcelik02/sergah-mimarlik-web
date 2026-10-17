# Yayına Alma Rehberi

Kod GitHub'da **özel (private)** bir depoda durur (`muratcelik02/sergah-mimarlik-web`). **Cloudflare** (Workers, statik site) depoya bağlanır; her `git push` sonrası site otomatik derlenip yayınlanır.

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

## 2. Cloudflare (bir kez) — Workers, statik site
Projede `wrangler.jsonc` var: Cloudflare yalnızca `dist` klasörünü yayınlar, sunucu eklentisi eklemez. Ücretsiz plan: statik dosya istekleri sınırsız, derleme ayda 3.000 dakika (bir derleme ≈ 4–5 dk).

1. https://dash.cloudflare.com → **Workers & Pages** → **Create application**.
2. Var olan bir GitHub deposunu içe aktarın (**Import a repository** / **Continue with GitHub**). "Clone / template / Deploy to Cloudflare" seçenekleri **kullanılmaz** — bunlar GitHub'da depo kopyası açar (2026-10-16'da `sergah-mimarlik-web1` böyle oluştu).
3. Depo: **`sergah-mimarlik-web`**.
4. Ayarlar:
   | Alan | Değer |
   |---|---|
   | Project / Worker name | `sergah-mimarlik-web` (`wrangler.jsonc` içindeki `name` ile **aynı** olmalı) |
   | Build command | `npm run build` |
   | Deploy command | `npx wrangler deploy` |
   | Build variables | `PUBLIC_WEB3FORMS_KEY` = Web3Forms anahtarı (zorunlu; yoksa form "bağlı değil" der) |
5. **Deploy**. Node sürümü `.nvmrc`'den (24) okunur; Cloudflare varsayılanı Astro 7 için yetmez.
6. Geçici yayın adresi: **https://sergah-mimarlik-web.murat42celik.workers.dev** — `site.json → previewUrl` içinde kayıtlı (sayfa adresleri ve paylaşım görselleri bunu kullanır).

> Not: Klasik **Pages** akışı da çalışır (Build command `npm run build`, output `dist`); o durumda `wrangler.jsonc` yok sayılır.

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
