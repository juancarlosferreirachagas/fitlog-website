/**
 * Service Worker - FitLog Website
 * Cache offline e otimizações de performance
 * 
 * @description
 * Este Service Worker implementa:
 * - Cache offline para recursos críticos
 * - Estratégia de cache inteligente
 * - Atualizações automáticas
 * - Fallback para offline
 * 
 * @author FitLog Development Team
 * @version 1.4.9
 * @since 2024-12-19
 */

const CACHE_NAME = 'fitlog-v1.4.9';
const STATIC_CACHE = 'fitlog-static-v1.4.9';
const DYNAMIC_CACHE = 'fitlog-dynamic-v1.4.9';

// Recursos críticos para cache offline
const CRITICAL_RESOURCES = [
    './',
    './index.html',
    './manifest.json',
    './assets/css/main.css?v=1.4.9',
    './assets/css/design-system.css',
    './assets/css/transport-icons.css',
    './assets/js/main.js',
    './assets/js/accessibility-manager.js',
    './assets/js/performance-monitor.js',
    './assets/js/transport-icons.js',
    './assets/images/fitlog-logo.jpg',
    './assets/images/IMAGEM NOVA.jpg',
    './assets/images/IMAGEM NOVA 2.webp',
    'https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&family=Outfit:wght@200;300;400;500;600;700;800;900&display=swap',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
];

// Recursos para cache dinâmico
const DYNAMIC_RESOURCES = [
    'https://www.google.com/maps/embed',
    'https://waze.com/ul',
    'https://www.google.com/maps/dir'
];

/**
 * Instalação do Service Worker
 */
self.addEventListener('install', event => {
    console.log('🔧 Service Worker: Instalando...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('📦 Service Worker: Cacheando recursos críticos...');
                return cache.addAll(CRITICAL_RESOURCES);
            })
            .then(() => {
                console.log('✅ Service Worker: Instalação concluída');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ Service Worker: Erro na instalação:', error);
            })
    );
});

/**
 * Ativação do Service Worker
 */
self.addEventListener('activate', event => {
    console.log('🚀 Service Worker: Ativando...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('🗑️ Service Worker: Removendo cache antigo:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✅ Service Worker: Ativação concluída');
                return self.clients.claim();
            })
    );
});

/**
 * Interceptação de requisições
 */
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Estratégia para recursos críticos (Cache First)
    if (CRITICAL_RESOURCES.includes(url.pathname) || 
        CRITICAL_RESOURCES.includes(request.url)) {
        event.respondWith(cacheFirst(request));
        return;
    }
    
    // Estratégia para recursos dinâmicos (Network First)
    if (url.hostname.includes('google.com') || 
        url.hostname.includes('waze.com') ||
        url.hostname.includes('maps.googleapis.com')) {
        event.respondWith(networkFirst(request));
        return;
    }
    
    // Estratégia para imagens (Cache First com fallback)
    if (request.destination === 'image') {
        event.respondWith(imageCacheFirst(request));
        return;
    }
    
    // Estratégia padrão (Network First)
    event.respondWith(networkFirst(request));
});

/**
 * Estratégia Cache First
 * Para recursos críticos que raramente mudam
 */
async function cacheFirst(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.error('❌ Cache First Error:', error);
        return new Response('Recurso não disponível offline', { status: 503 });
    }
}

/**
 * Estratégia Network First
 * Para recursos que precisam estar sempre atualizados
 */
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('🌐 Network First: Tentando cache...');
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        return new Response('Recurso não disponível', { status: 503 });
    }
}

/**
 * Estratégia para imagens
 * Cache First com fallback para imagem placeholder
 */
async function imageCacheFirst(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        // Fallback para imagem placeholder
        return new Response(
            '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999">Imagem não disponível</text></svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
        );
    }
}

/**
 * Mensagens do Service Worker
 */
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
});

/**
 * Sincronização em background
 */
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    console.log('🔄 Service Worker: Sincronização em background...');
    // Implementar lógica de sincronização se necessário
}

/**
 * Notificações push (futuro)
 */
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/assets/images/fitlog-logo.jpg',
            badge: '/assets/images/fitlog-logo.jpg',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            }
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

/**
 * Clique em notificação
 */
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('/')
    );
});

console.log('🎯 Service Worker: Carregado e pronto!');
