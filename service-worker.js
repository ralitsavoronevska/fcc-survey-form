self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('fcc-survey-form-v1').then(cache => {
      return cache.addAll([
        '/',
        '/dist/index.html',
        '/css/styles.css',
        '/img/favicon.png',
        '/img/favicon.ico',
        // Add other assets you want to cache
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== 'fcc-survey-form-v1')
          .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
