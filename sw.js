// FitLog Service Worker - Cache Strategy
const CACHE_NAME = 'fitlog-v1.0.0';
const STATIC_CACHE = 'fitlog-static-v1.0.0';
const DYNAMIC_CACHE = 'fitlog-dynamic-v1.0.0';

// Recursos estáticos para cache
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/assets/css/main.css',
    '/assets/js/main.js',
    '/assets/js/i18n.js',
    '/assets/js/performance.js',
    '/assets/images/fitlog-logo.jpg',
    '/assets/images/hero-background.jpg',
    '/assets/images/services-banner.jpg',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&family=Outfit:wght@200;300;400;500;600;700;800;900&display=swap',
    'https://unpkg.com/aos@2.3.1/dist/aos.css'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('Service Worker: Installation complete');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker: Installation failed', error);
            })
    );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activation complete');
                return self.clients.claim();
            })
    );
});

// Interceptação de requisições
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Estratégia Cache First para assets estáticos
    if (STATIC_ASSETS.includes(url.pathname) || 
        url.pathname.startsWith('/assets/') ||
        url.hostname === 'cdn.jsdelivr.net' ||
        url.hostname === 'cdnjs.cloudflare.com' ||
        url.hostname === 'fonts.googleapis.com' ||
        url.hostname === 'fonts.gstatic.com') {
        
        event.respondWith(
            caches.match(request)
                .then(response => {
                    if (response) {
                        return response;
                    }
                    
                    return fetch(request)
                        .then(fetchResponse => {
                            if (fetchResponse.status === 200) {
                                const responseClone = fetchResponse.clone();
                                caches.open(STATIC_CACHE)
                                    .then(cache => {
                                        cache.put(request, responseClone);
                                    });
                            }
                            return fetchResponse;
                        });
                })
        );
    }
    // Estratégia Network First para páginas HTML
    else if (request.destination === 'document') {
        event.respondWith(
            fetch(request)
                .then(response => {
                    if (response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(DYNAMIC_CACHE)
                            .then(cache => {
                                cache.put(request, responseClone);
                            });
                    }
                    return response;
                })
                .catch(() => {
                    return caches.match(request)
                        .then(response => {
                            return response || caches.match('/index.html');
                        });
                })
        );
    }
    // Estratégia Stale While Revalidate para outros recursos
    else {
        event.respondWith(
            caches.match(request)
                .then(response => {
                    const fetchPromise = fetch(request)
                        .then(fetchResponse => {
                            if (fetchResponse.status === 200) {
                                const responseClone = fetchResponse.clone();
                                caches.open(DYNAMIC_CACHE)
                                    .then(cache => {
                                        cache.put(request, responseClone);
                                    });
                            }
                            return fetchResponse;
                        });
                    
                    return response || fetchPromise;
                })
        );
    }
});

// Limpeza de cache antigo
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAN_CACHE') {
        event.waitUntil(
            caches.keys()
                .then(cacheNames => {
                    return Promise.all(
                        cacheNames.map(cacheName => {
                            return caches.delete(cacheName);
                        })
                    );
                })
        );
    }
});

// Background sync para formulários offline
self.addEventListener('sync', event => {
    if (event.tag === 'contact-form') {
        event.waitUntil(syncContactForm());
    }
});

function syncContactForm() {
    // Implementar sincronização de formulário de contato offline
    return Promise.resolve();
}

console.log('Service Worker: Loaded successfully');
