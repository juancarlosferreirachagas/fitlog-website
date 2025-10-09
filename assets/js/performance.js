/* FitLog Performance Optimization */

// Lazy Loading para imagens
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Preload de recursos críticos
function preloadCriticalResources() {
    const criticalResources = [
        'assets/css/main.css',
        'assets/images/fitlog-logo.jpg',
        'https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&family=Outfit:wght@200;300;400;500;600;700;800;900&display=swap'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'image';
        document.head.appendChild(link);
    });
}

// Otimização de scroll
function optimizeScroll() {
    let ticking = false;
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrollProgress + '%';
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollProgress);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Debounce para eventos de resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Otimização de resize
function optimizeResize() {
    const handleResize = debounce(() => {
        // Recalcular layouts se necessário
        const event = new CustomEvent('optimizedResize');
        window.dispatchEvent(event);
    }, 250);
    
    window.addEventListener('resize', handleResize, { passive: true });
}

// Service Worker para cache (se disponível)
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Otimização de animações
function optimizeAnimations() {
    // Reduzir animações em dispositivos com preferência por movimento reduzido
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-fast', 'none');
        document.documentElement.style.setProperty('--transition-normal', 'none');
        document.documentElement.style.setProperty('--transition-slow', 'none');
        document.documentElement.style.setProperty('--transition-bounce', 'none');
    }
}

// Inicialização de performance
function initPerformanceOptimizations() {
    // Aguardar DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initPerformanceOptimizations();
        });
        return;
    }
    
    // Aplicar otimizações
    preloadCriticalResources();
    initLazyLoading();
    optimizeScroll();
    optimizeResize();
    optimizeAnimations();
    registerServiceWorker();
    
    console.log('🚀 Performance optimizations initialized');
}

// Inicializar quando o script carregar
initPerformanceOptimizations();
