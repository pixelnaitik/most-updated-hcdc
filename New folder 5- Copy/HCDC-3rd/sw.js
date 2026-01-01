/**
 * Service Worker for Health Care Diagnostic Center
 * Provides offline caching and PWA functionality
 * @version 1.0.0
 */

const CACHE_NAME = 'hcdc-cache-v2';
const OFFLINE_URL = './';

// Assets to cache on install
const STATIC_ASSETS = [
    './',
    './index.html',
    './about/',
    './services/',
    './technology/',
    './partners/',
    './contact/',
    './css/styles.min.css',
    './js/script.min.js',
    './js/translate.min.js',
    './js/backHandler.min.js',
    './js/catalog.min.js',
    './js/packages_data.js',
    './js/test_data.js',
    './assets/logos/healthcare-logo.png',
    './assets/logos/healthcare-logo.webp',
    './assets/images/hero-lab.webp',
    './manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Install');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[ServiceWorker] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[ServiceWorker] Cache failed:', error);
            })
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activate');
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => cacheName !== CACHE_NAME)
                        .map((cacheName) => {
                            console.log('[ServiceWorker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached response and update cache in background
                    event.waitUntil(updateCache(event.request));
                    return cachedResponse;
                }

                // Not in cache, fetch from network
                return fetch(event.request)
                    .then((networkResponse) => {
                        // Cache successful responses
                        if (networkResponse && networkResponse.status === 200) {
                            const responseClone = networkResponse.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseClone);
                                });
                        }
                        return networkResponse;
                    })
                    .catch((error) => {
                        console.error('[ServiceWorker] Fetch failed:', error);
                        // Return offline page for navigation requests
                        if (event.request.mode === 'navigate') {
                            return caches.match(OFFLINE_URL);
                        }
                        return new Response('Offline', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});

// Update cache in background (stale-while-revalidate)
async function updateCache(request) {
    try {
        const cache = await caches.open(CACHE_NAME);
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.status === 200) {
            await cache.put(request, networkResponse);
        }
    } catch (error) {
        // Network request failed, that's OK - we have cached version
    }
}
