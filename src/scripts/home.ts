// Ana sayfa etkileşimleri — prototipteki kodun (reference/prototype/index.html) aynısı;
// farklar: veriler sayfadaki JSON'dan gelir, kartlar ve slaytlar sunucuda üretilir,
// dil düğmesi diğer dildeki sayfaya gider, görüntüleyici adres çubuğunda proje sayfasını gösterir,
// açılış ekranı aynı oturumda tekrar gösterilmez.

type Img = { src: string; srcset: string; thumb: string; alt: string };
type Proj = { id: string; name: string; type: string; typeLabel: string; kind: string; url: string; summary: string | null; facts: [string, string][]; imgs: Img[] };
type Data = {
  lang: 'tr' | 'en'; ids: string[]; names: string[]; home: string;
  other: { lang: string; home: string; ids: string[] };
  t: Record<'images' | 'prev' | 'next' | 'formOk' | 'formErr', string>;
  hero: string[]; projects: Proj[];
};

const D: Data = JSON.parse(document.getElementById('site-data')!.textContent!);
const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const P = D.projects;
const byId = (id: string) => P.find((p) => p.id === id)!;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const upper = (s: string) => s.toLocaleUpperCase(D.lang === 'tr' ? 'tr-TR' : 'en-GB');
const setUrl = (u: string) => { try { history.replaceState(null, '', u); } catch { /* yok say */ } };

/* ---------- Panel gezinmesi (kaydırmasız) ---------- */
const panels = Array.from(document.querySelectorAll<HTMLElement>('.panel'));
const burger = document.querySelector<HTMLButtonElement>('.burger')!;
let cur = 0, busy = false;

function go(n: number, instant = false) {
  n = Math.max(0, Math.min(panels.length - 1, n));
  document.body.classList.remove('menu-open');
  burger.setAttribute('aria-expanded', 'false');
  if (n === cur && !instant) return;
  busy = true;
  panels.forEach((p, i) => {
    p.classList.toggle('moving', i === cur || i === n);
    p.classList.toggle('active', i === n);
    p.classList.toggle('before', i < n);
    p.setAttribute('aria-hidden', i === n ? 'false' : 'true');
    if (i === n) p.removeAttribute('inert'); else p.setAttribute('inert', '');
  });
  cur = n;
  document.body.setAttribute('data-tone', panels[n].getAttribute('data-tone')!);
  document.querySelectorAll('[data-go]').forEach((b) => b.setAttribute('aria-current', b.getAttribute('data-go') === String(n) ? 'true' : 'false'));
  $('cnt').textContent = '0' + (n + 1);
  $('cnt-name').textContent = upper(D.names[n]);
  const sc = panels[n].querySelector('.scroller'); if (sc) sc.scrollTop = 0;
  if (!viewerOpen) setUrl(D.home + '#' + D.ids[n]);
  // Dil bağlantısı aynı bölüme gitsin
  document.querySelectorAll<HTMLAnchorElement>(`[data-lang-link="${D.other.lang}"]`).forEach((a) => { a.href = D.other.home + '#' + D.other.ids[n]; });
  setTimeout(() => { busy = false; panels.forEach((p, i) => { if (i !== cur) p.classList.remove('moving'); }); }, reduce ? 50 : 1100);
}

document.addEventListener('click', (e) => {
  const g = (e.target as HTMLElement).closest('[data-go]');
  if (g) { e.preventDefault(); go(Number(g.getAttribute('data-go'))); }
});
burger.addEventListener('click', () => {
  const o = document.body.classList.toggle('menu-open');
  burger.setAttribute('aria-expanded', o ? 'true' : 'false');
});

// Panelin içi taşarsa önce içerik kayar; kenara gelince bölüm değişir
function atEdge(dir: number) {
  const sc = panels[cur].querySelector('.scroller'); if (!sc) return true;
  if (dir > 0) return sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 2;
  return sc.scrollTop <= 1;
}
let wheelAcc = 0, wheelT: number | undefined;
window.addEventListener('wheel', (e) => {
  if (viewerOpen || document.body.classList.contains('loading')) return;
  const dir = e.deltaY > 0 ? 1 : -1;
  if (!atEdge(dir)) return;
  e.preventDefault();
  if (busy) return;
  wheelAcc += e.deltaY; clearTimeout(wheelT); wheelT = window.setTimeout(() => { wheelAcc = 0; }, 200);
  if (Math.abs(wheelAcc) > 40) { wheelAcc = 0; go(cur + dir); }
}, { passive: false });

let ty: number | null = null;
window.addEventListener('touchstart', (e) => { ty = e.touches[0].clientY; }, { passive: true });
window.addEventListener('touchend', (e) => {
  if (ty === null || viewerOpen || busy || document.body.classList.contains('menu-open')) return;
  const dy = ty - e.changedTouches[0].clientY, dir = dy > 0 ? 1 : -1; ty = null;
  if (Math.abs(dy) > 60 && atEdge(dir)) go(cur + dir);
}, { passive: true });

document.addEventListener('keydown', (e) => {
  if (viewerOpen) {
    if (e.key === 'Escape') closeViewer();
    if (e.key === 'ArrowRight') showImg(vi + 1);
    if (e.key === 'ArrowLeft') showImg(vi - 1);
    return;
  }
  if (e.key === 'Escape') { document.body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); }
  if (/INPUT|TEXTAREA|SELECT/.test((e.target as HTMLElement).tagName)) return;
  if ((e.key === 'ArrowDown' || e.key === 'PageDown') && atEdge(1)) { e.preventDefault(); if (!busy) go(cur + 1); }
  if ((e.key === 'ArrowUp' || e.key === 'PageUp') && atEdge(-1)) { e.preventDefault(); if (!busy) go(cur - 1); }
  if (cur === 0 && e.key === 'ArrowRight') slide(si + 1);
  if (cur === 0 && e.key === 'ArrowLeft') slide(si - 1);
});

/* ---------- Ana sayfa slaytı ---------- */
let si = 0, sTimer: number | undefined;
const slideEls = Array.from($('slides').children) as HTMLElement[];
function slide(n: number) {
  si = (n + slideEls.length) % slideEls.length;
  slideEls.forEach((s, i) => s.classList.toggle('on', i === si));
  const p = byId(D.hero[si]);
  $('now-name').textContent = p.name;
  $('now-kind').textContent = p.kind;
  const pr = $('prog'); pr.classList.remove('run'); void pr.offsetWidth;
  if (!reduce) pr.classList.add('run');
  clearTimeout(sTimer);
  if (!reduce) sTimer = window.setTimeout(() => { if (cur === 0 && !viewerOpen) slide(si + 1); else slide(si); }, 6000);
}
$('s-prev').onclick = () => slide(si - 1);
$('s-next').onclick = () => slide(si + 1);
$('now-open').onclick = () => openViewer(D.hero[si], 0);

/* ---------- Projeler: filtre ve sayfalama ---------- */
let cat = 'all', page = 0;
const grid = $('grid');
const cards = Array.from(grid.querySelectorAll<HTMLAnchorElement>('.card'));
const perPage = () => { const w = window.innerWidth; return w > 1180 ? 8 : w > 980 ? 6 : 99; };
const list = () => P.filter((p) => cat === 'all' || p.type === cat);
function renderGrid(anim: boolean) {
  const L = cards.filter((c) => cat === 'all' || c.dataset.type === cat);
  const pp = perPage(), pages = Math.max(1, Math.ceil(L.length / pp));
  page = Math.min(page, pages - 1);
  const shown = new Set(L.slice(page * pp, page * pp + pp));
  let k = 0;
  cards.forEach((c) => { const on = shown.has(c); c.hidden = !on; if (on) c.style.setProperty('--i', String(k++)); });
  grid.classList.remove('swap'); if (anim) { void grid.offsetWidth; grid.classList.add('swap'); }
  $('pg-info').textContent = (page + 1) + ' / ' + pages;
  $<HTMLButtonElement>('pg-prev').disabled = page === 0;
  $<HTMLButtonElement>('pg-next').disabled = page >= pages - 1;
}
document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach((b) => {
  b.addEventListener('click', () => {
    cat = b.dataset.filter!; page = 0;
    document.querySelectorAll('[data-filter]').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    renderGrid(true);
  });
});
$('pg-prev').onclick = () => { page--; renderGrid(true); };
$('pg-next').onclick = () => { page++; renderGrid(true); };
grid.addEventListener('click', (e) => {
  const c = (e.target as HTMLElement).closest<HTMLAnchorElement>('[data-open]');
  if (!c || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return; // yeni sekmede açma serbest
  e.preventDefault();
  openViewer(c.dataset.open!, 0, c);
});
let rT: number | undefined;
window.addEventListener('resize', () => { clearTimeout(rT); rT = window.setTimeout(() => renderGrid(false), 150); });

/* ---------- Proje görüntüleyici ---------- */
const viewer = $('viewer');
const outside = [document.querySelector('header')!, $('deck'), document.querySelector('.dots')!, document.querySelector('.mnav')!];
let viewerOpen = false, vp: Proj | null = null, vi = 0, vFrom: HTMLElement | null = null;

function openViewer(id: string, idx: number, from?: HTMLElement) {
  vp = byId(id); vFrom = from || (document.activeElement as HTMLElement); viewerOpen = true;
  fillViewer(); showImg(Math.max(0, idx || 0), true);
  viewer.classList.add('open');
  outside.forEach((el) => el.setAttribute('inert', ''));
  $('v-close').focus();
  setUrl(vp.url);
}
function fillViewer() {
  if (!vp) return;
  const L = list().includes(vp) ? list() : P, k = L.indexOf(vp);
  const prevP = L[(k - 1 + L.length) % L.length], nextP = L[(k + 1) % L.length];
  $('v-cat').textContent = vp.typeLabel;
  $('v-title').textContent = vp.name;
  const sum = $('v-sum'); sum.textContent = vp.summary ?? ''; sum.hidden = !vp.summary;
  const dl = $('v-dl'); dl.replaceChildren();
  vp.facts.forEach(([k2, v]) => { const dt = document.createElement('dt'), dd = document.createElement('dd'); dt.textContent = k2; dd.textContent = v; dl.append(dt, dd); });
  const th = $('v-thumbs'); th.replaceChildren();
  if (vp.imgs.length > 1) vp.imgs.forEach((im, i) => {
    const b = document.createElement('button'); b.type = 'button'; b.dataset.vi = String(i); b.setAttribute('aria-label', String(i + 1));
    const img = document.createElement('img'); img.src = im.thumb; img.alt = ''; img.loading = 'lazy'; b.append(img); th.append(b);
  });
  const pp = $('v-pp'), np = $('v-np');
  pp.innerHTML = ''; pp.append('← ' + D.t.prev, Object.assign(document.createElement('b'), { textContent: prevP.name })); pp.dataset.id = prevP.id;
  np.innerHTML = ''; np.append(D.t.next + ' →', Object.assign(document.createElement('b'), { textContent: nextP.name })); np.dataset.id = nextP.id;
  const many = vp.imgs.length > 1;
  $('v-prev').hidden = !many; $('v-next').hidden = !many;
}
function showImg(n: number, instant = false) {
  if (!vp) return;
  const p = vp;
  vi = (n + p.imgs.length) % p.imgs.length;
  const im = $<HTMLImageElement>('v-img');
  const set = () => { const g = p.imgs[vi]; im.srcset = g.srcset; im.sizes = window.innerWidth > 980 ? 'calc(100vw - 380px)' : '100vw'; im.src = g.src; im.alt = g.alt; im.classList.remove('fade'); };
  if (instant || reduce) set(); else { im.classList.add('fade'); setTimeout(set, 220); }
  document.querySelectorAll<HTMLElement>('#v-thumbs [data-vi]').forEach((b) => b.setAttribute('aria-current', Number(b.dataset.vi) === vi ? 'true' : 'false'));
}
function closeViewer() {
  viewer.classList.remove('open'); viewerOpen = false;
  outside.forEach((el) => el.removeAttribute('inert'));
  panels.forEach((p, i) => { if (i !== cur) p.setAttribute('inert', ''); });
  setUrl(D.home + '#' + D.ids[cur]);
  if (vFrom && vFrom.focus) vFrom.focus();
}
$('v-close').onclick = closeViewer;
$('v-prev').onclick = () => showImg(vi - 1);
$('v-next').onclick = () => showImg(vi + 1);
$('v-thumbs').addEventListener('click', (e) => { const b = (e.target as HTMLElement).closest<HTMLElement>('[data-vi]'); if (b) showImg(Number(b.dataset.vi)); });
$('v-pp').onclick = function () { vp = byId((this as HTMLElement).dataset.id!); fillViewer(); showImg(0); setUrl(vp.url); };
$('v-np').onclick = function () { vp = byId((this as HTMLElement).dataset.id!); fillViewer(); showImg(0); setUrl(vp.url); };
$('v-contact').onclick = () => { closeViewer(); go(4); };
let vx: number | null = null;
viewer.addEventListener('touchstart', (e) => { vx = e.touches[0].clientX; }, { passive: true });
viewer.addEventListener('touchend', (e) => { if (vx === null) return; const dx = vx - e.changedTouches[0].clientX; vx = null; if (Math.abs(dx) > 50) showImg(vi + (dx > 0 ? 1 : -1)); }, { passive: true });

/* ---------- Form ve WhatsApp (form servisi Aşama 5'te bağlanacak) ---------- */
$<HTMLFormElement>('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const f = this as HTMLFormElement & { name: HTMLInputElement; phone: HTMLInputElement };
  const ok = (f.elements.namedItem('name') as HTMLInputElement).value.trim() && (f.elements.namedItem('phone') as HTMLInputElement).value.trim();
  const m = $('form-msg');
  m.textContent = ok ? D.t.formOk : D.t.formErr; m.setAttribute('data-state', ok ? 'ok' : 'err');
});
$('wa-link').addEventListener('click', (e) => { if ((e.currentTarget as HTMLElement).getAttribute('aria-disabled') === 'true') e.preventDefault(); });

/* ---------- Başlat + açılış ekranı ---------- */
const start = D.ids.indexOf(location.hash.slice(1));
go(start > 0 ? start : 0, true);
renderGrid(false);

const loader = $('loader'), bar = $('loadbar');
let seen = false;
try { seen = !!sessionStorage.getItem('sg-intro'); } catch { /* yok say */ }
let ended = false;
function finish() {
  if (ended) return; ended = true;
  try { sessionStorage.setItem('sg-intro', '1'); } catch { /* yok say */ }
  bar.style.transform = 'scaleX(1)';
  setTimeout(() => {
    loader.classList.add('out'); document.body.classList.remove('loading');
    panels[cur].classList.remove('active'); void panels[cur].offsetWidth; panels[cur].classList.add('active');
    slide(0);
    setTimeout(() => { loader.hidden = true; }, 1100);
  }, reduce ? 0 : 350);
}
if (seen) {
  loader.hidden = true;
  slide(0);
} else {
  document.body.classList.add('loading');
  let minDone = false, imgDone = false;
  const check = () => { bar.style.transform = 'scaleX(' + ((minDone ? .5 : .2) + (imgDone ? .4 : 0)) + ')'; if (minDone && imgDone) finish(); };
  const first = slideEls[0]?.querySelector('img');
  if (!first || first.complete) imgDone = true;
  else { first.addEventListener('load', () => { imgDone = true; check(); }); first.addEventListener('error', () => { imgDone = true; check(); }); }
  setTimeout(() => { minDone = true; check(); }, reduce ? 0 : 2200);
  setTimeout(finish, 6000);
  loader.addEventListener('click', finish);
}
