// Service Worker CBT PWA
const CACHE_NAME = 'cbt-immanuel-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Selalu prioritaskan network untuk menjaga data ujian real-time
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
