/* Service worker: guarda o app no aparelho para funcionar sem internet */
const CACHE = 'treinos-fdef357b8a';
const ASSETS = ["./", "app.js", "engine.js", "fonts/barlow-latin-400-normal.woff2", "fonts/barlow-latin-500-normal.woff2", "fonts/barlow-latin-600-normal.woff2", "fonts/barlow-latin-700-normal.woff2", "fonts/big-shoulders-display-latin-700-normal.woff2", "fonts/big-shoulders-display-latin-800-normal.woff2", "fonts/fonts.css", "fonts/ibm-plex-mono-latin-400-normal.woff2", "fonts/ibm-plex-mono-latin-500-normal.woff2", "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "index.html", "manifest.webmanifest", "seed.js", "styles.css", "vendor/xlsx.full.min.js"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('message', e => { if (e.data === 'skip') self.skipWaiting(); });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url); if (u.origin !== location.origin) return;
  if (r.mode === 'navigate') { e.respondWith(caches.match('index.html').then(m => m || fetch(r))); return; }
  e.respondWith(caches.match(r, {ignoreSearch: true}).then(m => m || fetch(r).then(res => { if (res.ok) { const c = res.clone(); caches.open(CACHE).then(k => k.put(r, c)); } return res; })));
});
