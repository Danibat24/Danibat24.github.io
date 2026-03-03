const CACHE_NAME = 'fastreader-cache-v3';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icon.svg'
];

// Installa il Service Worker e salva i file in cache (memoria del telefono)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('File salvati in cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercetta le richieste e carica l'app anche senza internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se il file è in cache, restituiscilo, altrimenti scaricalo dalla rete
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});