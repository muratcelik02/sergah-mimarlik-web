// Proje sayfası galerisi: oklar, küçük resimler, klavye (← →) ve yana kaydırma. Görüntüleyiciyle aynı davranış.
const figs = Array.from(document.querySelectorAll<HTMLElement>('#pv-img figure'));
const thumbs = Array.from(document.querySelectorAll<HTMLElement>('#pv-thumbs [data-vi]'));
let vi = 0;

function show(n: number) {
  if (figs.length < 2) return;
  vi = (n + figs.length) % figs.length;
  figs.forEach((f, i) => f.classList.toggle('on', i === vi));
  thumbs.forEach((b, i) => b.setAttribute('aria-current', i === vi ? 'true' : 'false'));
  // Bir sonraki görseli önceden yükle
  figs[(vi + 1) % figs.length].querySelector('img')?.setAttribute('loading', 'eager');
}

document.getElementById('pv-prev')?.addEventListener('click', () => show(vi - 1));
document.getElementById('pv-next')?.addEventListener('click', () => show(vi + 1));
document.getElementById('pv-thumbs')?.addEventListener('click', (e) => {
  const b = (e.target as HTMLElement).closest<HTMLElement>('[data-vi]');
  if (b) show(Number(b.dataset.vi));
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') show(vi + 1);
  if (e.key === 'ArrowLeft') show(vi - 1);
});
const stage = document.getElementById('pv-img');
let vx: number | null = null;
stage?.addEventListener('touchstart', (e) => { vx = e.touches[0].clientX; }, { passive: true });
stage?.addEventListener('touchend', (e) => {
  if (vx === null) return;
  const dx = vx - e.changedTouches[0].clientX; vx = null;
  if (Math.abs(dx) > 50) show(vi + (dx > 0 ? 1 : -1));
}, { passive: true });
