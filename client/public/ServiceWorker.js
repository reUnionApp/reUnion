// let CACHE_NAME = 'reunion';
// const urlsToCache = [
//   '/',
//   '/index.html',
//   '/src/styles/reUnion_Logo.png',
//   '/src/styles/reUnion_Title.png',
// ];
// self.addEventListener('install', (installEvent) => {
//   installEvent.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener('fetch', (fetchEvent) => {
//   fetchEvent.respondWith(
//     caches.match(fetchEvent.request).then((res) => {
//       return res || fetch(fetchEvent.request);
//     })
//   );
// });

