// Généré au build (vite.web.config.ts) : ne pas modifier.
const CACHE = 'echo-cbe01d18ac'
const ASSETS = ["./","./assets/echo-mark-DSZmdrFd.png","./assets/index-gnNAou-i.css","./assets/index-Co1nONUZ.js","./assets/web-BK6FJ8pT.js","./assets/web-D4i0qgdr.js","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png"]

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('echo-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return
  // Page : réseau d'abord (pour recevoir les mises à jour), copie en cache si hors ligne.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((c) => c.put('./', copy))
          return res
        })
        .catch(() => caches.match('./', { ignoreVary: true }))
    )
    return
  }
  // Fichiers du build (noms uniques par version) : cache d'abord.
  // ignoreVary : les scripts sont demandés avec d'autres en-têtes (Origin) qu'au moment de la mise en cache.
  event.respondWith(caches.match(req, { ignoreVary: true }).then((hit) => hit || fetch(req)))
})
