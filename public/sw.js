// Network-first with cache fallback: always fresh after a rebuild, still opens when the local server is not running.
const CACHE = 'get-profi-v1'

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()))

self.addEventListener('fetch', (e) => {
  const req = e.request
  const url = new URL(req.url)
  if (req.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return
  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone()
        void caches.open(CACHE).then((c) => c.put(req, copy))
        return res
      })
      .catch(() => caches.match(req).then((hit) => hit ?? caches.match('/'))),
  )
})
