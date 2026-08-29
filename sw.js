const BUILD_ID = '20260829-120331';
const CACHE = `top-design-${BUILD_ID}`;
const CORE = [
  './',
  `./index.html?v=${BUILD_ID}`,
  `./styles.css?v=${BUILD_ID}`,
  `./app.js?v=${BUILD_ID}`,
  `./version.js?v=${BUILD_ID}`,
  `./manifest.webmanifest?v=${BUILD_ID}`,
  `./assets/anastasia-profile.webp?v=${BUILD_ID}`,
  `./assets/icon-192.png?v=${BUILD_ID}`,
  `./assets/icon-512.png?v=${BUILD_ID}`
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('top-design-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', event => { if (event.data?.type === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  // HTML and version checks are always network-first so an old cache cannot pin the app.
  if (req.mode === 'navigate' || url.pathname.endsWith('/version.json') || url.pathname.endsWith('/version.js')) {
    event.respondWith(fetch(req, {cache:'no-store'}).then(r => {
      const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return r;
    }).catch(() => caches.match(req).then(r => r || caches.match('./'))));
    return;
  }
  event.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    const copy=r.clone(); caches.open(CACHE).then(c=>c.put(req,copy)); return r;
  })));
});
