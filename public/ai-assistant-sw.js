const STATIC_CACHE = 'ic-ai-static-v3';
const RUNTIME_CACHE = 'ic-ai-runtime-v3';
const MEDIA_CACHE = 'ic-ai-media-v3';
const OFFLINE_FALLBACK_URL = '/offline-ai.html';

const STATIC_PRECACHE_URLS = [
  '/',
  OFFLINE_FALLBACK_URL,
  '/css/app.css',
  '/js/app.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_PRECACHE_URLS.map((url) => new Request(url, { cache: 'reload' }))))
      .catch(() => Promise.resolve())
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((key) => ![STATIC_CACHE, RUNTIME_CACHE, MEDIA_CACHE].includes(key))
        .map((key) => caches.delete(key)),
    );
    await self.clients.claim();
  })());
});

const isSameOrigin = (url) => {
  try {
    return new URL(url).origin === self.location.origin;
  } catch (error) {
    return false;
  }
};

const shouldHandleRequest = (request) => request.method === 'GET' && isSameOrigin(request.url);

const cacheFirst = async (request, cacheName) => {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }
  const response = await fetch(request);
  const cache = await caches.open(cacheName);
  cache.put(request, response.clone());
  return response;
};

const staleWhileRevalidate = async (request, cacheName) => {
  const cached = await caches.match(request);
  const fetchPromise = fetch(request)
    .then(async (response) => {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  return cached || fetchPromise || Response.error();
};

const networkFirst = async (request, cacheName, fallbackRequest = null) => {
  try {
    const response = await fetch(request);
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    if (fallbackRequest) {
      const fallback = await caches.match(fallbackRequest);
      if (fallback) {
        return fallback;
      }
    }
    throw error;
  }
};

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (!shouldHandleRequest(request)) {
    return;
  }

  const url = new URL(request.url);
  const destination = request.destination || '';

  if (request.mode === 'navigate') {
    event.respondWith(
      networkFirst(request, RUNTIME_CACHE, OFFLINE_FALLBACK_URL).catch(
        async () => caches.match(OFFLINE_FALLBACK_URL),
      ),
    );
    return;
  }

  if (destination === 'script' || destination === 'style' || destination === 'worker') {
    event.respondWith(networkFirst(request, STATIC_CACHE).catch(() => caches.match(request)));
    return;
  }

  if (destination === 'image' || destination === 'font' || destination === 'audio' || destination === 'video') {
    event.respondWith(cacheFirst(request, MEDIA_CACHE).catch(() => Response.error()));
    return;
  }

  if (url.pathname.startsWith('/api/') && request.method === 'GET') {
    event.respondWith(
      networkFirst(request, RUNTIME_CACHE).catch(async () => {
        const cached = await caches.match(request);
        if (cached) {
          return cached;
        }
        return new Response(
          JSON.stringify({ error: 'Offline and no cached API response is available.' }),
          {
            status: 503,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }),
    );
    return;
  }

  event.respondWith(networkFirst(request, RUNTIME_CACHE).catch(() => caches.match(request)));
});
