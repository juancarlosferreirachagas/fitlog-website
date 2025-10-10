/**
 * Sistema Avançado de Otimização de Imagens
 * Implementa lazy loading, WebP/AVIF, e otimizações de performance
 * 
 * @description
 * Este módulo implementa:
 * - Lazy loading com Intersection Observer
 * - Detecção automática de suporte a formatos modernos
 * - Fallbacks para navegadores antigos
 * - Otimização de qualidade baseada na conexão
 * - Preload de imagens críticas
 * 
 * @author FitLog Performance Team
 * @version 2.0.0
 * @since 2024-12-19
 */

class ImageOptimizer {
    constructor() {
        this.supportedFormats = this.detectSupportedFormats();
        this.connectionType = this.detectConnectionType();
        this.observer = null;
        this.criticalImages = new Set();
        this.loadedImages = new Set();
        
        this.init();
    }
    
    /**
     * Detecta formatos de imagem suportados pelo navegador
     * @returns {Object} Objeto com formatos suportados
     */
    detectSupportedFormats() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        
        return {
            webp: canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0,
            avif: canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0,
            jpeg: canvas.toDataURL('image/jpeg').indexOf('data:image/jpeg') === 0,
            png: canvas.toDataURL('image/png').indexOf('data:image/png') === 0
        };
    }
    
    /**
     * Detecta o tipo de conexão do usuário
     * @returns {string} Tipo de conexão
     */
    detectConnectionType() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            return {
                effectiveType: connection.effectiveType,
                downlink: connection.downlink,
                rtt: connection.rtt,
                saveData: connection.saveData
            };
        }
        return { effectiveType: '4g', downlink: 10, rtt: 50, saveData: false };
    }
    
    /**
     * Determina a qualidade da imagem baseada na conexão
     * @returns {number} Qualidade (0-1)
     */
    getOptimalQuality() {
        const { effectiveType, downlink, saveData } = this.connectionType;
        
        if (saveData) return 0.6; // Modo economia de dados
        
        switch (effectiveType) {
            case 'slow-2g':
            case '2g':
                return 0.5;
            case '3g':
                return 0.7;
            case '4g':
                return downlink > 5 ? 0.9 : 0.8;
            default:
                return 0.8;
        }
    }
    
    /**
     * Gera URL otimizada para imagem
     * @param {string} src - URL original da imagem
     * @param {Object} options - Opções de otimização
     * @returns {string} URL otimizada
     */
    generateOptimizedUrl(src, options = {}) {
        const {
            width = null,
            height = null,
            quality = this.getOptimalQuality(),
            format = this.getBestFormat()
        } = options;
        
        // Se for uma imagem externa ou já otimizada, retorna original
        if (src.startsWith('http') || src.includes('?')) {
            return src;
        }
        
        // Para imagens locais, tenta usar formato moderno
        if (this.supportedFormats[format]) {
            const extension = src.split('.').pop();
            const baseName = src.replace(`.${extension}`, '');
            return `${baseName}.${format}`;
        }
        
        return src;
    }
    
    /**
     * Determina o melhor formato baseado no suporte e conexão
     * @returns {string} Formato recomendado
     */
    getBestFormat() {
        const { saveData, effectiveType } = this.connectionType;
        
        // Para conexões lentas, prioriza WebP
        if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
            return this.supportedFormats.webp ? 'webp' : 'jpeg';
        }
        
        // Para conexões rápidas, prioriza AVIF
        if (this.supportedFormats.avif) return 'avif';
        if (this.supportedFormats.webp) return 'webp';
        
        return 'jpeg';
    }
    
    /**
     * Cria elemento picture com fallbacks
     * @param {string} src - URL original
     * @param {Object} options - Opções
     * @returns {HTMLPictureElement} Elemento picture otimizado
     */
    createOptimizedPicture(src, options = {}) {
        const {
            alt = '',
            width = null,
            height = null,
            loading = 'lazy',
            critical = false
        } = options;
        
        const picture = document.createElement('picture');
        const img = document.createElement('img');
        
        // Adiciona sources para diferentes formatos
        if (this.supportedFormats.avif) {
            const avifSource = document.createElement('source');
            avifSource.srcset = this.generateOptimizedUrl(src, { ...options, format: 'avif' });
            avifSource.type = 'image/avif';
            picture.appendChild(avifSource);
        }
        
        if (this.supportedFormats.webp) {
            const webpSource = document.createElement('source');
            webpSource.srcset = this.generateOptimizedUrl(src, { ...options, format: 'webp' });
            webpSource.type = 'image/webp';
            picture.appendChild(webpSource);
        }
        
        // Configura imagem principal
        img.src = src;
        img.alt = alt;
        img.loading = loading;
        img.decoding = 'async';
        
        if (width) img.width = width;
        if (height) img.height = height;
        
        // Adiciona classes para estilização
        img.classList.add('optimized-image');
        if (critical) img.classList.add('critical-image');
        
        // Adiciona atributos de acessibilidade
        img.setAttribute('role', 'img');
        img.setAttribute('aria-label', alt);
        
        picture.appendChild(img);
        
        return picture;
    }
    
    /**
     * Otimiza imagem existente
     * @param {HTMLImageElement} img - Elemento imagem
     * @param {Object} options - Opções de otimização
     */
    optimizeExistingImage(img, options = {}) {
        const src = img.src || img.getAttribute('data-src');
        if (!src) return;
        
        // Marca como otimizada
        img.setAttribute('data-optimized', 'true');
        
        // Adiciona lazy loading se não for crítica
        if (!img.classList.contains('critical-image')) {
            img.loading = 'lazy';
        }
        
        // Adiciona atributos de performance
        img.decoding = 'async';
        img.setAttribute('fetchpriority', options.critical ? 'high' : 'low');
        
        // Adiciona evento de carregamento
        img.addEventListener('load', () => {
            this.onImageLoad(img);
        });
        
        img.addEventListener('error', () => {
            this.onImageError(img);
        });
    }
    
    /**
     * Callback quando imagem carrega com sucesso
     * @param {HTMLImageElement} img - Elemento imagem
     */
    onImageLoad(img) {
        img.classList.add('loaded');
        this.loadedImages.add(img.src);
        
        // Remove placeholder se existir
        const placeholder = img.parentElement.querySelector('.image-placeholder');
        if (placeholder) {
            placeholder.remove();
        }
        
        // Dispara evento customizado
        img.dispatchEvent(new CustomEvent('imageOptimized', {
            detail: { img, loaded: true }
        }));
    }
    
    /**
     * Callback quando imagem falha ao carregar
     * @param {HTMLImageElement} img - Elemento imagem
     */
    onImageError(img) {
        img.classList.add('error');
        
        // Tenta fallback para JPEG
        const src = img.src;
        if (!src.includes('.jpg') && !src.includes('.jpeg')) {
            const fallbackSrc = src.replace(/\.(webp|avif)$/, '.jpg');
            img.src = fallbackSrc;
        }
        
        // Dispara evento customizado
        img.dispatchEvent(new CustomEvent('imageOptimized', {
            detail: { img, loaded: false, error: true }
        }));
    }
    
    /**
     * Preload de imagens críticas
     * @param {Array} criticalImages - Array de URLs críticas
     */
    preloadCriticalImages(criticalImages) {
        criticalImages.forEach(src => {
            if (this.loadedImages.has(src)) return;
            
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = this.generateOptimizedUrl(src, { critical: true });
            link.setAttribute('fetchpriority', 'high');
            
            document.head.appendChild(link);
            this.criticalImages.add(src);
        });
    }
    
    /**
     * Configura Intersection Observer para lazy loading
     */
    setupLazyLoading() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    this.observer.unobserve(img);
                }
            });
        }, options);
        
        // Observa todas as imagens com lazy loading
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            this.observer.observe(img);
        });
    }
    
    /**
     * Carrega imagem quando entra no viewport
     * @param {HTMLImageElement} img - Elemento imagem
     */
    loadImage(img) {
        const dataSrc = img.getAttribute('data-src');
        if (dataSrc) {
            img.src = this.generateOptimizedUrl(dataSrc);
            img.removeAttribute('data-src');
        }
    }
    
    /**
     * Adiciona placeholder para imagens
     * @param {HTMLImageElement} img - Elemento imagem
     */
    addImagePlaceholder(img) {
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.innerHTML = `
            <div class="placeholder-content">
                <div class="placeholder-spinner"></div>
                <span class="placeholder-text">Carregando...</span>
            </div>
        `;
        
        img.parentElement.insertBefore(placeholder, img);
    }
    
    /**
     * Inicializa o sistema de otimização
     */
    init() {
        console.log('🖼️ Inicializando otimizador de imagens...');
        console.log('📊 Formatos suportados:', this.supportedFormats);
        console.log('🌐 Conexão:', this.connectionType);
        
        // Preload de imagens críticas
        const criticalImages = [
            'assets/images/fitlog-logo.jpg',
            'assets/images/hero-background.jpg'
        ];
        this.preloadCriticalImages(criticalImages);
        
        // Otimiza imagens existentes
        document.querySelectorAll('img:not([data-optimized])').forEach(img => {
            this.optimizeExistingImage(img);
        });
        
        // Configura lazy loading
        this.setupLazyLoading();
        
        // Adiciona estilos CSS para placeholders
        this.addPlaceholderStyles();
        
        console.log('✅ Otimizador de imagens inicializado');
    }
    
    /**
     * Adiciona estilos CSS para placeholders
     */
    addPlaceholderStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .image-placeholder {
                position: relative;
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 200px;
                border-radius: 8px;
            }
            
            .placeholder-content {
                text-align: center;
                color: #666;
            }
            
            .placeholder-spinner {
                width: 40px;
                height: 40px;
                border: 4px solid #f3f3f3;
                border-top: 4px solid #3498db;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 10px;
            }
            
            .placeholder-text {
                font-size: 14px;
                font-weight: 500;
            }
            
            .optimized-image {
                transition: opacity 0.3s ease;
            }
            
            .optimized-image:not(.loaded) {
                opacity: 0;
            }
            
            .optimized-image.loaded {
                opacity: 1;
            }
            
            @keyframes loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Inicializa o otimizador quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.imageOptimizer = new ImageOptimizer();
});

// Exporta para uso global
window.ImageOptimizer = ImageOptimizer;
