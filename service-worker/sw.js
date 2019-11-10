var CACHE_NAME = 'offline-calculator';
var urlsToCache = [
  '/',
  'index.html',
  'style.css',
  'script.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function (event) {
  console.log('I am a request with url:', event.request.clone().url)
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});