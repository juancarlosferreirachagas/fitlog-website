/**
 * Gerenciador de Acessibilidade - FitLog Website
 * Sistema completo de acessibilidade para conformidade WCAG 2.1 AA
 * 
 * @description
 * Este módulo implementa:
 * - Navegação por teclado
 * - Screen reader support
 * - ARIA labels dinâmicos
 * - Foco visível
 * - Skip links
 * - Live regions
 * - Modo de alto contraste
 * - Redução de movimento
 * 
 * @author FitLog Accessibility Team
 * @version 2.0.0
 * @since 2024-12-19
 */

class AccessibilityManager {
    constructor() {
        this.isHighContrast = false;
        this.isReducedMotion = false;
        this.isDarkMode = false;
        this.announcer = null;
        
        this.init();
    }
    
    /**
     * Inicializa o gerenciador de acessibilidade
     */
    init() {
        console.log('♿ Inicializando gerenciador de acessibilidade...');
        
        // Aguarda DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAccessibility());
        } else {
            this.setupAccessibility();
        }
    }
    
    /**
     * Configura todas as funcionalidades de acessibilidade
     */
    setupAccessibility() {
        this.addSkipLinks();
        this.setupARIA();
        this.addLiveRegion();
        this.setupKeyboardNavigation();
        this.setupScreenReader();
        this.setupEventListeners();
        this.addAccessibilityStyles();
        
        console.log('✅ Gerenciador de acessibilidade configurado');
    }
    
    /**
     * Adiciona skip links para navegação rápida
     */
    addSkipLinks() {
        const skipLinks = document.createElement('div');
        skipLinks.className = 'skip-links';
        skipLinks.innerHTML = `
            <a href="#main-content" class="skip-link">Pular para conteúdo principal</a>
            <a href="#services" class="skip-link">Pular para serviços</a>
            <a href="#contact" class="skip-link">Pular para contato</a>
        `;
        
        document.body.insertBefore(skipLinks, document.body.firstChild);
    }
    
    /**
     * Configura ARIA labels e roles
     */
    setupARIA() {
        // Adiciona role="main" ao conteúdo principal
        const mainContent = document.querySelector('#home, .hero-section');
        if (mainContent) {
            mainContent.id = 'main-content';
            mainContent.setAttribute('role', 'main');
        }
        
        // Configura modais
        document.querySelectorAll('.modal, .service-modal').forEach(modal => {
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-hidden', 'true');
            
            // Adiciona aria-labelledby se houver título
            const title = modal.querySelector('.modal-title, h3, h4, h5');
            if (title) {
                const titleId = title.id || `modal-title-${Date.now()}`;
                title.id = titleId;
                modal.setAttribute('aria-labelledby', titleId);
            }
            
            // Adiciona aria-describedby se houver descrição
            const description = modal.querySelector('.modal-description, .modal-body p');
            if (description) {
                const descId = description.id || `modal-desc-${Date.now()}`;
                description.id = descId;
                modal.setAttribute('aria-describedby', descId);
            }
        });
    }
    
    /**
     * Adiciona live region para anúncios do screen reader
     */
    addLiveRegion() {
        this.announcer = document.createElement('div');
        this.announcer.setAttribute('aria-live', 'polite');
        this.announcer.setAttribute('aria-atomic', 'true');
        this.announcer.className = 'sr-only';
        this.announcer.id = 'live-announcer';
        
        document.body.appendChild(this.announcer);
    }
    
    /**
     * Anuncia mensagem para screen readers
     * @param {string} message - Mensagem para anunciar
     * @param {string} priority - Prioridade (polite ou assertive)
     */
    announce(message, priority = 'polite') {
        if (this.announcer) {
            this.announcer.setAttribute('aria-live', priority);
            this.announcer.textContent = message;
            
            // Limpa após 1 segundo
            setTimeout(() => {
                this.announcer.textContent = '';
            }, 1000);
        }
    }
    
    /**
     * Configura navegação por teclado
     */
    setupKeyboardNavigation() {
        // Navegação por teclado global
        document.addEventListener('keydown', (e) => {
            this.handleGlobalKeyboard(e);
        });
        
        // Foco visível aprimorado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
        
        // Trap de foco em modais
        this.setupFocusTrap();
    }
    
    /**
     * Manipula navegação por teclado global
     * @param {KeyboardEvent} e - Evento de teclado
     */
    handleGlobalKeyboard(e) {
        // ESC para fechar modais
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[aria-hidden="false"], .service-modal[style*="flex"]');
            if (openModal) {
                this.closeModal(openModal);
                e.preventDefault();
            }
        }
        
        // Alt + M para menu principal
        if (e.altKey && e.key === 'm') {
            const menuButton = document.querySelector('.navbar-toggler');
            if (menuButton) {
                menuButton.focus();
                menuButton.click();
                e.preventDefault();
            }
        }
        
        // Alt + S para pular para serviços
        if (e.altKey && e.key === 's') {
            const servicesSection = document.querySelector('#services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
                servicesSection.focus();
                e.preventDefault();
            }
        }
        
        // Alt + C para pular para contato
        if (e.altKey && e.key === 'c') {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                contactSection.focus();
                e.preventDefault();
            }
        }
    }
    
    /**
     * Configura trap de foco para modais
     */
    setupFocusTrap() {
        document.querySelectorAll('.modal, .service-modal').forEach(modal => {
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length === 0) return;
            
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            lastElement.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            firstElement.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
        });
    }
    
    /**
     * Fecha modal com acessibilidade
     * @param {HTMLElement} modal - Elemento modal
     */
    closeModal(modal) {
        modal.setAttribute('aria-hidden', 'true');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Retorna foco para elemento que abriu o modal
        const trigger = document.querySelector(`[aria-controls="${modal.id}"]`);
        if (trigger) {
            trigger.focus();
        }
        
        this.announce('Modal fechado');
    }
    
    /**
     * Configura screen reader
     */
    setupScreenReader() {
        // Adiciona labels dinâmicos
        this.addDynamicLabels();
        
        // Configura estados de loading
        this.setupLoadingStates();
        
        // Adiciona descrições para elementos interativos
        this.addInteractiveDescriptions();
    }
    
    /**
     * Adiciona labels dinâmicos para elementos
     */
    addDynamicLabels() {
        // Botões sem texto
        document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])').forEach(button => {
            const icon = button.querySelector('i[class*="fa-"]');
            if (icon && !button.textContent.trim()) {
                const iconClass = icon.className;
                let label = 'Botão';
                
                if (iconClass.includes('fa-times')) label = 'Fechar';
                else if (iconClass.includes('fa-arrow-up')) label = 'Voltar ao topo';
                else if (iconClass.includes('fa-phone')) label = 'Ligar';
                else if (iconClass.includes('fa-envelope')) label = 'Enviar email';
                else if (iconClass.includes('fa-arrow-right')) label = 'Continuar';
                
                button.setAttribute('aria-label', label);
            }
        });
        
        // Links sem texto
        document.querySelectorAll('a:not([aria-label]):not([aria-labelledby])').forEach(link => {
            const icon = link.querySelector('i[class*="fa-"]');
            if (icon && !link.textContent.trim()) {
                const iconClass = icon.className;
                let label = 'Link';
                
                if (iconClass.includes('fa-phone')) label = 'Ligar para';
                else if (iconClass.includes('fa-envelope')) label = 'Enviar email para';
                else if (iconClass.includes('fa-map-marker')) label = 'Ver localização';
                
                link.setAttribute('aria-label', label);
            }
        });
    }
    
    /**
     * Configura estados de loading
     */
    setupLoadingStates() {
        // Botões de submit
        document.querySelectorAll('button[type="submit"]').forEach(button => {
            button.addEventListener('click', () => {
                button.setAttribute('aria-busy', 'true');
                button.setAttribute('aria-label', 'Enviando...');
                
                setTimeout(() => {
                    button.setAttribute('aria-busy', 'false');
                    button.removeAttribute('aria-label');
                }, 2000);
            });
        });
    }
    
    /**
     * Adiciona descrições para elementos interativos
     */
    addInteractiveDescriptions() {
        // Cards de serviço
        document.querySelectorAll('.solution-card').forEach(card => {
            const button = card.querySelector('.solution-btn');
            const title = card.querySelector('h4');
            
            if (button && title) {
                button.setAttribute('aria-describedby', `desc-${title.textContent.toLowerCase().replace(/\s+/g, '-')}`);
                
                const description = document.createElement('div');
                description.id = `desc-${title.textContent.toLowerCase().replace(/\s+/g, '-')}`;
                description.className = 'sr-only';
                description.textContent = `Clique para saber mais sobre ${title.textContent}`;
                
                card.appendChild(description);
            }
        });
    }
    
    /**
     * Habilita modo de alto contraste
     */
    enableHighContrast() {
        this.isHighContrast = true;
        document.body.classList.add('high-contrast');
        this.announce('Modo de alto contraste ativado');
    }
    
    /**
     * Desabilita modo de alto contraste
     */
    disableHighContrast() {
        this.isHighContrast = false;
        document.body.classList.remove('high-contrast');
        this.announce('Modo de alto contraste desativado');
    }
    
    /**
     * Habilita redução de movimento
     */
    enableReducedMotion() {
        this.isReducedMotion = true;
        document.body.classList.add('reduced-motion');
        this.announce('Redução de movimento ativada');
    }
    
    /**
     * Desabilita redução de movimento
     */
    disableReducedMotion() {
        this.isReducedMotion = false;
        document.body.classList.remove('reduced-motion');
        this.announce('Redução de movimento desativada');
    }
    
    /**
     * Habilita modo escuro
     */
    enableDarkMode() {
        this.isDarkMode = true;
        document.body.classList.add('dark-mode');
        this.announce('Modo escuro ativado');
    }
    
    /**
     * Desabilita modo escuro
     */
    disableDarkMode() {
        this.isDarkMode = false;
        document.body.classList.remove('dark-mode');
        this.announce('Modo escuro desativado');
    }
    
    /**
     * Configura event listeners
     */
    setupEventListeners() {
        // Modais
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                const modal = e.target.closest('.modal, .service-modal');
                if (modal) {
                    this.closeModal(modal);
                }
            }
        });
        
        // Formulários
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                this.announce('Formulário enviado com sucesso');
            });
        });
        
        // Navegação
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    setTimeout(() => {
                        target.focus();
                        this.announce(`Navegado para seção ${targetId}`);
                    }, 100);
                }
            });
        });
    }
    
    /**
     * Adiciona estilos de acessibilidade
     */
    addAccessibilityStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Skip Links */
            .skip-links {
                position: absolute;
                top: -100px;
                left: 0;
                z-index: 10000;
            }
            
            .skip-link {
                position: absolute;
                top: 0;
                left: 0;
                background: #000;
                color: #fff;
                padding: 8px 16px;
                text-decoration: none;
                border-radius: 0 0 4px 0;
                transform: translateY(-100%);
                transition: transform 0.2s;
            }
            
            .skip-link:focus {
                transform: translateY(0);
            }
            
            /* Screen Reader Only */
            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
            }
            
            /* Keyboard Navigation */
            .keyboard-navigation *:focus {
                outline: 3px solid #0066cc;
                outline-offset: 2px;
            }
            
            /* High Contrast */
            .high-contrast {
                filter: contrast(150%) brightness(120%);
            }
            
            .high-contrast * {
                border-color: currentColor !important;
            }
            
            /* Reduced Motion */
            .reduced-motion *,
            .reduced-motion *::before,
            .reduced-motion *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
            
            /* Dark Mode */
            .dark-mode {
                background-color: #1a1a1a;
                color: #ffffff;
            }
            
            .dark-mode .navbar {
                background-color: #2a2a2a !important;
            }
            
            .dark-mode .solution-card,
            .dark-mode .benefit-card,
            .dark-mode .cta-card {
                background-color: #2a2a2a;
                color: #ffffff;
            }
            
            /* Focus Indicators */
            .solution-card:focus,
            .benefit-card:focus,
            .cta-card:focus {
                outline: 3px solid #0066cc;
                outline-offset: 2px;
            }
            
            /* Loading States */
            [aria-busy="true"] {
                opacity: 0.7;
                cursor: not-allowed;
            }
            
            /* Modal Accessibility */
            .modal[aria-hidden="true"] {
                display: none !important;
            }
            
            .modal[aria-hidden="false"] {
                display: flex !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Inicializa o gerenciador de acessibilidade
document.addEventListener('DOMContentLoaded', () => {
    window.accessibilityManager = new AccessibilityManager();
});

// Exporta para uso global
window.AccessibilityManager = AccessibilityManager;