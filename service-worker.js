self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('fcc-survey-form-v1').then(cache => {
      return cache.addAll([
        'index.html',
        'css/styles.css',
        'img/favicon.png',
        'img/favicon.ico',
        'img/fcc-survey-form-desktop-preview.png',
        'img/img-1-small.jpg',
        'img/img-1-medium.jpg',
        'img/img-1-large.jpg',
        'img/img-2-small.jpg',
        'img/img-2-medium.jpg',
        'img/img-2-large.jpg',
        'img/img-3-small.jpg',
        'img/img-3-medium.jpg',
        'img/img-3-large.jpg'
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
