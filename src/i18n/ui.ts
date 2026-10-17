// Arayüz metinleri (prototipten aynen). Marka adı her iki dilde "Sergah Mimarlık".
// Site geneli bilinmeyen bilgiler burada değil, src/data/site.json içindedir.
export type Lang = 'tr' | 'en';

const tr = {
  // Menü ve gezinme
  n0: 'Ana Sayfa', n1: 'Projeler', n2: 'Hizmetler', n3: 'Hakkımızda', n4: 'İletişim',
  skip: 'Geçmek için tıklayın', loading: 'Sergah Mimarlık yükleniyor',
  homeLabel: 'Sergah Mimarlık — Ana sayfa', mainMenu: 'Ana menü', mobileMenu: 'Mobil menü', menu: 'Menü',
  sections: 'Bölümler', language: 'Dil', otherLang: 'English', skipToContent: 'İçeriğe geç',

  // Ana sayfa paneli
  'h.lbl': 'Mimari tasarım · İç mekân tasarımı · Süreç takibi',
  'h.a': 'Mekâna anlam,', 'h.b': 'yaşama değer.',
  'h.p': 'İhtiyaçlardan ilham alan, bulunduğu yerle bağ kuran ve geleceğe değer katan mekânlar tasarlıyoruz.',
  'h.cta': 'Projeleri inceleyin', 'h.cta2': 'Bize ulaşın →', 'h.now': 'Öne çıkan proje',
  prevImg: 'Önceki görsel', nextImg: 'Sonraki görsel',

  // Projeler
  'p.lbl': 'Portföy',
  'p.p': 'Konut, müstakil ev ve ticari projelerimizden seçkiler. Bir projeye tıklayarak tüm görsellerini inceleyin.',
  'c.all': 'Tümü', 'c.konut': 'Konut', 'c.mustakil-ev': 'Müstakil Ev', 'c.ticari': 'Ticari',
  projectType: 'Proje türü', prevPage: 'Önceki sayfa', nextPage: 'Sonraki sayfa', images: 'görsel',

  // Hizmetler
  's.lbl': 'Ne yapıyoruz',
  's.p': 'Tasarımı çizen ekip uygulamayı da takip eder; böylece fikir ile yapı arasındaki mesafe kısalır.',
  's1.h': 'Mimari tasarım', 's1.p': 'Arsa analizinden ruhsat ve uygulama projelerine kadar mimari projelendirme.',
  's1.a': 'İmar ve arsa analizi', 's1.b': 'Konsept ve avan proje', 's1.c': 'Ruhsat projesi', 's1.d': 'Uygulama projesi',
  's2.h': 'İç mekân tasarımı', 's2.p': 'Yeni yapılarda ve yenilemelerde iç mekân, sabit mobilya ve aydınlatma tasarımı.',
  's2.a': 'Mekân kurgusu', 's2.b': 'Malzeme ve renk', 's2.c': 'Sabit mobilya', 's2.d': 'Aydınlatma',
  's3.h': 'İnşaat süreci takibi', 's3.p': 'Uygulamanın projeye uygunluğunu işveren adına takip eder, ekipleri koordine ederiz.',
  's3.a': 'Şantiye ziyaretleri', 's3.b': 'Raporlama', 's3.c': 'Koordinasyon', 's3.d': 'Teslim kontrolü',

  // Hakkımızda
  'a.lbl': 'Ofis', 'a.h': 'Yere, ihtiyaca ve bütçeye göre tasarım.',
  'a.ph': 'Kurucuların kısa biyografisi ve ofisin çalışma yaklaşımı eklenecek.',
  t1: 'Tanışma', t1s: 'İhtiyaç, arsa, bütçe', t2: 'Konsept', t2s: 'Kütle ve ilk görseller',
  t3: 'Avan proje', t3s: 'Planlar netleşir', t4: 'Ruhsat', t4s: 'Belediye onayı',
  t5: 'Uygulama projesi', t5s: 'Detay ve iç mekân', t6: 'Şantiye takibi', t6s: 'Teslime kadar',

  // İletişim
  'k.lbl': 'İletişim', 'k.h': 'Projenizi konuşalım.', 'k.wa': 'Mesaj gönderin →',
  'k.tel': 'Telefon', 'k.mail': 'E-posta', 'k.addr': 'Adres',
  'ph.phone': 'Telefon eklenecek', 'ph.email': 'E-posta adresi eklenecek', 'ph.addr': 'Ofis adresi eklenecek',
  'f.h': 'Teklif ve görüşme talebi', 'f.name': 'Ad soyad', 'f.phone': 'Telefon', 'f.type': 'Proje türü',
  'f.ic': 'İç mekân tasarımı', 'f.loc': 'Arsa / mekân konumu', 'f.msg': 'Kısaca projeniz', 'f.send': 'Gönder',
  'f.consentA': 'Kişisel verilerimin talebime yanıt verilmesi amacıyla işlenmesine ilişkin ', 'f.consentLink': 'KVKK aydınlatma metnini', 'f.consentB': ' okudum ve onaylıyorum.',
  'f.hp': 'Bu alanı boş bırakın',
  'form.ok': 'Teşekkürler, mesajınız bize ulaştı. En kısa sürede dönüş yapacağız.',
  'form.sending': 'Gönderiliyor…',
  'form.fail': 'Mesaj gönderilemedi. Lütfen biraz sonra tekrar deneyin ya da WhatsApp ile ulaşın.',
  'form.off': 'Form henüz bağlı değil; mesajınız gönderilmedi. Lütfen WhatsApp veya telefonla ulaşın.',
  'form.errName': 'Lütfen adınızı yazın.', 'form.errPhone': 'Lütfen geçerli bir telefon numarası yazın.', 'form.errConsent': 'Devam etmek için KVKK onayını işaretleyin.',
  'form.subject': 'Web sitesinden yeni talep',
  'form.err': 'Lütfen işaretli alanları kontrol edin.',
  privacy: 'KVKK ve Gizlilik',

  // Görüntüleyici ve proje sayfası
  'v.close': 'Kapat ✕', 'v.cta': 'Benzer bir proje için yazın', 'v.all': '← Tüm projeler',
  'v.type': 'Tür', 'v.imgs': 'Görsel', 'v.kind': 'Görsel türü', 'v.loc': 'Konum', 'v.year': 'Yıl',
  'v.area': 'Alan', 'v.status': 'Durum', 'v.scope': 'Kapsam',
  render: 'Render', fotograf: 'Fotoğraf', prev: 'Önceki proje', next: 'Sonraki proje', gallery: 'Galeri',
  'st.konsept': 'Konsept', 'st.proje': 'Proje aşamasında', 'st.ruhsat': 'Ruhsat aşamasında',
  'st.insaat': 'İnşaat aşamasında', 'st.tamamlandi': 'Tamamlandı',

  // Sayfa başlıkları
  'meta.home.title': 'Sergah Mimarlık — Mimari Tasarım ve İç Mekân Tasarımı',
  'meta.home.desc': 'Sergah Mimarlık: villa, konut ve ticari yapılar için mimari tasarım, iç mekân tasarımı ve inşaat süreci takibi.',
  'meta.project.desc': '{name}: Sergah Mimarlık {type} projesi. {count} {kind} görseli.',
  '404.title': 'Sayfa bulunamadı', '404.p': 'Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.',
  '404.home': 'Ana sayfaya dön', '404.projects': 'Projeleri inceleyin',
} as const;

export type UIKey = keyof typeof tr;

const en: Record<UIKey, string> = {
  n0: 'Home', n1: 'Projects', n2: 'Services', n3: 'About', n4: 'Contact',
  skip: 'Click to skip', loading: 'Sergah Mimarlık is loading',
  homeLabel: 'Sergah Mimarlık — Home', mainMenu: 'Main menu', mobileMenu: 'Mobile menu', menu: 'Menu',
  sections: 'Sections', language: 'Language', otherLang: 'Türkçe', skipToContent: 'Skip to content',

  'h.lbl': 'Architecture · Interior design · Project supervision',
  'h.a': 'Meaning to space,', 'h.b': 'value to life.',
  'h.p': 'We design spaces that draw on real needs, connect with their setting and add lasting value for the future.',
  'h.cta': 'View projects', 'h.cta2': 'Contact us →', 'h.now': 'Featured project',
  prevImg: 'Previous image', nextImg: 'Next image',

  'p.lbl': 'Portfolio',
  'p.p': 'A selection of our housing, detached house and commercial projects. Click a project to see all its images.',
  'c.all': 'All', 'c.konut': 'Housing', 'c.mustakil-ev': 'Detached House', 'c.ticari': 'Commercial',
  projectType: 'Project type', prevPage: 'Previous page', nextPage: 'Next page', images: 'images',

  's.lbl': 'What we do',
  's.p': 'The team that draws the design also supervises construction, closing the gap between idea and building.',
  's1.h': 'Architectural design', 's1.p': 'From site analysis to permit and construction drawings.',
  's1.a': 'Zoning and site analysis', 's1.b': 'Concept and schematic design', 's1.c': 'Permit drawings', 's1.d': 'Construction drawings',
  's2.h': 'Interior design', 's2.p': 'Interiors, built-in joinery and lighting for new buildings and renovations.',
  's2.a': 'Spatial planning', 's2.b': 'Materials and colour', 's2.c': 'Built-in joinery', 's2.d': 'Lighting',
  's3.h': 'Construction supervision', 's3.p': 'We check on the client’s behalf that construction follows the design, and coordinate the teams.',
  's3.a': 'Site visits', 's3.b': 'Reporting', 's3.c': 'Coordination', 's3.d': 'Handover check',

  'a.lbl': 'Studio', 'a.h': 'Design shaped by site, needs and budget.',
  'a.ph': 'Short founder biographies and the studio’s approach will be added.',
  t1: 'First meeting', t1s: 'Brief, site, budget', t2: 'Concept', t2s: 'Massing and first images',
  t3: 'Schematic design', t3s: 'Plans take shape', t4: 'Permit', t4s: 'Municipal approval',
  t5: 'Construction drawings', t5s: 'Details and interiors', t6: 'Site supervision', t6s: 'Through to handover',

  'k.lbl': 'Contact', 'k.h': 'Let’s talk about your project.', 'k.wa': 'Send a message →',
  'k.tel': 'Phone', 'k.mail': 'Email', 'k.addr': 'Address',
  'ph.phone': 'Phone number to be added', 'ph.email': 'Email address to be added', 'ph.addr': 'Office address to be added',
  'f.h': 'Quote and meeting request', 'f.name': 'Full name', 'f.phone': 'Phone', 'f.type': 'Project type',
  'f.ic': 'Interior design', 'f.loc': 'Site / space location', 'f.msg': 'Your project in brief', 'f.send': 'Send',
  'f.consentA': 'I have read and accept the ', 'f.consentLink': 'privacy notice', 'f.consentB': ' on processing my personal data to answer my enquiry.',
  'f.hp': 'Leave this field empty',
  'form.ok': 'Thank you, your message has reached us. We will get back to you shortly.',
  'form.sending': 'Sending…',
  'form.fail': 'Your message could not be sent. Please try again shortly or reach us on WhatsApp.',
  'form.off': 'The form is not connected yet; your message was not sent. Please reach us by WhatsApp or phone.',
  'form.errName': 'Please enter your name.', 'form.errPhone': 'Please enter a valid phone number.', 'form.errConsent': 'Please tick the privacy consent to continue.',
  'form.subject': 'New enquiry from the website',
  'form.err': 'Please check the highlighted fields.',
  privacy: 'Privacy',

  'v.close': 'Close ✕', 'v.cta': 'Ask about a similar project', 'v.all': '← All projects',
  'v.type': 'Type', 'v.imgs': 'Images', 'v.kind': 'Image type', 'v.loc': 'Location', 'v.year': 'Year',
  'v.area': 'Area', 'v.status': 'Status', 'v.scope': 'Scope',
  render: 'Render', fotograf: 'Photograph', prev: 'Previous project', next: 'Next project', gallery: 'Gallery',
  'st.konsept': 'Concept', 'st.proje': 'In design', 'st.ruhsat': 'In permitting',
  'st.insaat': 'Under construction', 'st.tamamlandi': 'Completed',

  'meta.home.title': 'Sergah Mimarlık — Architecture and Interior Design',
  'meta.home.desc': 'Sergah Mimarlık: architectural design, interior design and construction supervision for villas, housing and commercial buildings.',
  'meta.project.desc': '{name}: a {type} project by Sergah Mimarlık. {count} {kind} images.',
  '404.title': 'Page not found', '404.p': 'The page you are looking for may have moved or never existed.',
  '404.home': 'Back to home', '404.projects': 'View projects',
};

export const ui: Record<Lang, Record<UIKey, string>> = { tr, en };

/** Bir dil için çeviri işlevi döndürür: const t = useT('tr'); t('n1') → "Projeler" */
export function useT(lang: Lang) {
  return (key: UIKey, vars: Record<string, string | number> = {}) =>
    ui[lang][key].replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}

/** Ana sayfa bölümlerinin adres çubuğundaki adları (#projeler / #projects). */
export const sectionIds: Record<Lang, string[]> = {
  tr: ['anasayfa', 'projeler', 'hizmetler', 'hakkimizda', 'iletisim'],
  en: ['home', 'projects', 'services', 'about', 'contact'],
};

export const homePath: Record<Lang, string> = { tr: '/', en: '/en/' };
export const privacyPath: Record<Lang, string> = { tr: '/kvkk/', en: '/en/privacy/' };
