/**
 * Sistema de Monitoramento de Performance
 * Monitora métricas de performance em tempo real
 * 
 * @description
 * Este módulo implementa:
 * - Core Web Vitals monitoring
 * - Performance API tracking
 * - Real User Monitoring (RUM)
 * - Error tracking
 * - Performance budgets
 * - Analytics integration
 * 
 * @author FitLog Performance Team
 * @version 2.0.0
 * @since 2024-12-19
 */

class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.thresholds = {
            LCP: 2500,  // Largest Contentful Paint
            FID: 100,   // First Input Delay
            CLS: 0.1,   // Cumulative Layout Shift
            FCP: 1800,  // First Contentful Paint
            TTFB: 600,  // Time to First Byte
            TTI: 3800   // Time to Interactive
        };
        this.observers = [];
        this.isEnabled = true;
        
        this.init();
    }
    
    /**
     * Inicializa o monitor de performance
     */
    init() {
        if (!this.isEnabled) return;
        
        console.log('📊 Inicializando monitor de performance...');
        
        // Monitora Core Web Vitals
        this.observeCoreWebVitals();
        
        // Monitora Performance API
        this.observePerformanceAPI();
        
        // Monitora erros
        this.observeErrors();
        
        // Monitora recursos
        this.observeResources();
        
        // Monitora navegação
        this.observeNavigation();
        
        // Monitora interações do usuário
        this.observeUserInteractions();
        
        console.log('✅ Monitor de performance inicializado');
    }
    
    /**
     * Monitora Core Web Vitals
     */
    observeCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        if ('PerformanceObserver' in window) {
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.LCP = lastEntry.startTime;
                this.checkThreshold('LCP', this.metrics.LCP);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            this.observers.push(lcpObserver);
        }
        
        // First Input Delay (FID)
        if ('PerformanceObserver' in window) {
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    this.metrics.FID = entry.processingStart - entry.startTime;
                    this.checkThreshold('FID', this.metrics.FID);
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
            this.observers.push(fidObserver);
        }
        
        // Cumulative Layout Shift (CLS)
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                this.metrics.CLS = clsValue;
                this.checkThreshold('CLS', this.metrics.CLS);
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
            this.observers.push(clsObserver);
        }
        
        // First Contentful Paint (FCP)
        if ('PerformanceObserver' in window) {
            const fcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.name === 'first-contentful-paint') {
                        this.metrics.FCP = entry.startTime;
                        this.checkThreshold('FCP', this.metrics.FCP);
                    }
                });
            });
            fcpObserver.observe({ entryTypes: ['paint'] });
            this.observers.push(fcpObserver);
        }
    }
    
    /**
     * Monitora Performance API
     */
    observePerformanceAPI() {
        // Time to First Byte (TTFB)
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation) {
                this.metrics.TTFB = navigation.responseStart - navigation.requestStart;
                this.checkThreshold('TTFB', this.metrics.TTFB);
            }
        });
        
        // Time to Interactive (TTI)
        this.calculateTTI();
        
        // DOM Content Loaded
        window.addEventListener('DOMContentLoaded', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation) {
                this.metrics.DOMContentLoaded = navigation.domContentLoadedEventEnd - navigation.navigationStart;
            }
        });
        
        // Window Load
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation) {
                this.metrics.WindowLoad = navigation.loadEventEnd - navigation.navigationStart;
            }
        });
    }
    
    /**
     * Calcula Time to Interactive (TTI)
     */
    calculateTTI() {
        // Implementação simplificada do TTI
        window.addEventListener('load', () => {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                    this.metrics.TTI = navigation.loadEventEnd - navigation.navigationStart;
                    this.checkThreshold('TTI', this.metrics.TTI);
                }
            }, 1000);
        });
    }
    
    /**
     * Monitora erros
     */
    observeErrors() {
        // JavaScript errors
        window.addEventListener('error', (event) => {
            this.trackError({
                type: 'javascript',
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                stack: event.error?.stack
            });
        });
        
        // Promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.trackError({
                type: 'promise',
                message: event.reason?.message || 'Unhandled promise rejection',
                stack: event.reason?.stack
            });
        });
        
        // Resource loading errors
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                this.trackError({
                    type: 'resource',
                    message: `Failed to load ${event.target.tagName}`,
                    src: event.target.src || event.target.href
                });
            }
        }, true);
    }
    
    /**
     * Monitora recursos
     */
    observeResources() {
        if ('PerformanceObserver' in window) {
            const resourceObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    this.trackResource(entry);
                });
            });
            resourceObserver.observe({ entryTypes: ['resource'] });
            this.observers.push(resourceObserver);
        }
    }
    
    /**
     * Monitora navegação
     */
    observeNavigation() {
        if ('PerformanceObserver' in window) {
            const navigationObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    this.trackNavigation(entry);
                });
            });
            navigationObserver.observe({ entryTypes: ['navigation'] });
            this.observers.push(navigationObserver);
        }
    }
    
    /**
     * Monitora interações do usuário
     */
    observeUserInteractions() {
        // Click tracking
        document.addEventListener('click', (event) => {
            this.trackInteraction('click', {
                target: event.target.tagName,
                className: event.target.className,
                id: event.target.id,
                timestamp: Date.now()
            });
        });
        
        // Scroll tracking
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.trackInteraction('scroll', {
                    scrollY: window.scrollY,
                    scrollX: window.scrollX,
                    timestamp: Date.now()
                });
            }, 100);
        });
        
        // Form submissions
        document.addEventListener('submit', (event) => {
            this.trackInteraction('form_submit', {
                formId: event.target.id,
                formClass: event.target.className,
                timestamp: Date.now()
            });
        });
    }
    
    /**
     * Verifica se métrica excede threshold
     * @param {string} metric - Nome da métrica
     * @param {number} value - Valor da métrica
     */
    checkThreshold(metric, value) {
        const threshold = this.thresholds[metric];
        if (threshold && value > threshold) {
            this.trackPerformanceIssue(metric, value, threshold);
        }
    }
    
    /**
     * Rastreia problema de performance
     * @param {string} metric - Nome da métrica
     * @param {number} value - Valor atual
     * @param {number} threshold - Threshold
     */
    trackPerformanceIssue(metric, value, threshold) {
        const issue = {
            type: 'performance_threshold_exceeded',
            metric,
            value,
            threshold,
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };
        
        console.warn(`⚠️ Performance issue: ${metric} = ${value}ms (threshold: ${threshold}ms)`);
        this.sendToAnalytics(issue);
    }
    
    /**
     * Rastreia erro
     * @param {Object} error - Objeto de erro
     */
    trackError(error) {
        const errorData = {
            ...error,
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };
        
        console.error('🚨 Error tracked:', errorData);
        this.sendToAnalytics(errorData);
    }
    
    /**
     * Rastreia recurso
     * @param {PerformanceEntry} entry - Entrada de performance
     */
    trackResource(entry) {
        const resourceData = {
            type: 'resource',
            name: entry.name,
            duration: entry.duration,
            size: entry.transferSize,
            timestamp: Date.now()
        };
        
        // Rastreia recursos lentos (>1s)
        if (entry.duration > 1000) {
            this.trackPerformanceIssue('slow_resource', entry.duration, 1000);
        }
        
        this.sendToAnalytics(resourceData);
    }
    
    /**
     * Rastreia navegação
     * @param {PerformanceEntry} entry - Entrada de navegação
     */
    trackNavigation(entry) {
        const navigationData = {
            type: 'navigation',
            duration: entry.duration,
            domContentLoaded: entry.domContentLoadedEventEnd - entry.navigationStart,
            loadComplete: entry.loadEventEnd - entry.navigationStart,
            timestamp: Date.now()
        };
        
        this.sendToAnalytics(navigationData);
    }
    
    /**
     * Rastreia interação do usuário
     * @param {string} type - Tipo de interação
     * @param {Object} data - Dados da interação
     */
    trackInteraction(type, data) {
        const interactionData = {
            type: 'user_interaction',
            interactionType: type,
            ...data
        };
        
        this.sendToAnalytics(interactionData);
    }
    
    /**
     * Envia dados para analytics
     * @param {Object} data - Dados para enviar
     */
    sendToAnalytics(data) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'performance_metric', {
                custom_parameter: JSON.stringify(data)
            });
        }
        
        // Custom analytics endpoint
        if (this.analyticsEndpoint) {
            fetch(this.analyticsEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).catch(error => {
                console.error('Failed to send analytics data:', error);
            });
        }
    }
    
    /**
     * Obtém métricas atuais
     * @returns {Object} Métricas de performance
     */
    getMetrics() {
        return { ...this.metrics };
    }
    
    /**
     * Obtém relatório de performance
     * @returns {Object} Relatório completo
     */
    getReport() {
        const report = {
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            metrics: this.getMetrics(),
            thresholds: this.thresholds,
            performance: {
                memory: performance.memory ? {
                    usedJSHeapSize: performance.memory.usedJSHeapSize,
                    totalJSHeapSize: performance.memory.totalJSHeapSize,
                    jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
                } : null,
                timing: performance.timing ? {
                    navigationStart: performance.timing.navigationStart,
                    loadEventEnd: performance.timing.loadEventEnd,
                    domContentLoadedEventEnd: performance.timing.domContentLoadedEventEnd
                } : null
            }
        };
        
        return report;
    }
    
    /**
     * Define endpoint de analytics
     * @param {string} endpoint - URL do endpoint
     */
    setAnalyticsEndpoint(endpoint) {
        this.analyticsEndpoint = endpoint;
    }
    
    /**
     * Define thresholds personalizados
     * @param {Object} thresholds - Novos thresholds
     */
    setThresholds(thresholds) {
        this.thresholds = { ...this.thresholds, ...thresholds };
    }
    
    /**
     * Habilita/desabilita monitoramento
     * @param {boolean} enabled - Status do monitoramento
     */
    setEnabled(enabled) {
        this.isEnabled = enabled;
        if (!enabled) {
            this.observers.forEach(observer => observer.disconnect());
            this.observers = [];
        }
    }
    
    /**
     * Limpa observers
     */
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
        this.metrics = {};
    }
}

// Inicializa o monitor de performance
document.addEventListener('DOMContentLoaded', () => {
    window.performanceMonitor = new PerformanceMonitor();
    
    // Configura endpoint de analytics se disponível
    if (window.FITLOG_ANALYTICS_ENDPOINT) {
        window.performanceMonitor.setAnalyticsEndpoint(window.FITLOG_ANALYTICS_ENDPOINT);
    }
    
    // Configura thresholds personalizados se disponíveis
    if (window.FITLOG_PERFORMANCE_THRESHOLDS) {
        window.performanceMonitor.setThresholds(window.FITLOG_PERFORMANCE_THRESHOLDS);
    }
});

// Exporta para uso global
window.PerformanceMonitor = PerformanceMonitor;