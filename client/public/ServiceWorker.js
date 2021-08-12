let CACHE_NAME = 'reunion';
const urlsToCache = [
  '/',
  '/index.html',
  '/reUnion_Logo.png',
  '/reUnion_Title.png',
];

// Install the serviceworker
self.addEventListener('install', (installEvent) => {
  installEvent.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache')
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});

// Activate the serviceworker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName)
        }
      })
    ))
  )
});

self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('Push Recieved...');
  self.ServiceWorkerRegistration.showNotification(data.title), {
    body: 'check your invites',
  }
})

