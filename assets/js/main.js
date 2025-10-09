// FitLog - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoadingScreen();
    initNavigation();
    initScrollEffects();
    initContactForm();
    initBackToTop();
    initAOS();
    initScrollProgress();
    // initDarkMode(); // Removed
    initParticleEffect();
    initMicroInteractions();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (loadingScreen) {
        // Hide loading screen after page load
        window.addEventListener('load', function() {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }
}

// Navigation
function initNavigation() {
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarCollapse.classList.remove('show');
            });
        });
    }
}

// Scroll Effects
function initScrollEffects() {
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroSection && heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.solution-card, .benefit-card, .cta-card, .client-logo');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!validateForm(data)) {
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Form Validation
function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('E-mail inválido');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Mensagem deve ter pelo menos 10 caracteres');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// AOS (Animate On Scroll) Initialization
function initAOS() {
    // Simple AOS implementation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }, observerOptions);
    
    // Initialize AOS elements
    const aosElements = document.querySelectorAll('[data-aos]');
    aosElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Accessibility Functions
function handleCardKeydown(event, serviceType) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openServiceModal(serviceType);
    }
}

// Handle button click events
function handleSolutionButtonClick(event, serviceType) {
    event.stopPropagation();
    openServiceModal(serviceType);
}

// Service Modal Functions
function openServiceModal(serviceType) {
    const modal = document.getElementById('serviceModal');
    const service = window.serviceData[serviceType];
    
    if (service && modal) {
        // Update modal content
        document.getElementById('modalIcon').innerHTML = `<i class="${service.icon}"></i>`;
        document.getElementById('modalTitle').textContent = service.title;
        document.getElementById('modalDescription').textContent = service.description;
        
        // Update benefits list
        const benefitsList = document.getElementById('benefitsList');
        benefitsList.innerHTML = '';
        
        service.benefits.forEach(benefit => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check"></i> ${benefit}`;
            benefitsList.appendChild(li);
        });
        
        // Show modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        const closeBtn = document.getElementById('modalClose');
        if (closeBtn) {
            closeBtn.focus();
        }
    }
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function openServiceSelectionModal() {
    const modal = document.getElementById('serviceSelectionModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeServiceSelectionModal() {
    const modal = document.getElementById('serviceSelectionModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function updateSelectionCounter() {
    const checkboxes = document.querySelectorAll('#serviceSelectionModal input[type="checkbox"]:checked');
    const counter = document.getElementById('selectedCount');
    const button = document.querySelector('.btn-orcamento');
    
    if (counter) {
        counter.textContent = checkboxes.length;
    }
    
    if (button) {
        if (checkboxes.length > 0) {
            button.disabled = false;
            button.classList.add('btn-enabled');
        } else {
            button.disabled = true;
            button.classList.remove('btn-enabled');
        }
    }
}

function proceedToContact() {
    const selectedServices = [];
    const checkboxes = document.querySelectorAll('#serviceSelectionModal input[type="checkbox"]:checked');
    
    checkboxes.forEach(checkbox => {
        selectedServices.push(checkbox.value);
    });
    
    if (selectedServices.length === 0) {
        showNotification('Por favor, selecione pelo menos um serviço.', 'error');
        return;
    }
    
    closeServiceSelectionModal();
    closeServiceModal();
    
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const offsetTop = contactSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    // Fill form with selected services
    setTimeout(() => {
        const messageField = document.querySelector('#contactForm textarea[name="message"]');
        if (messageField) {
            const serviceNames = {
                'aereo': 'Transporte Aéreo',
                'rodoviario': 'Transporte Rodoviário',
                'armazenagem': 'Armazenagem',
                'projetos': 'Projetos Logísticos',
                'feiras': 'Feiras e Exposições',
                'montagem': 'Montagem e Manuseio',
                'shows': 'Shows',
                'esportivos': 'Eventos Esportivos',
                'aog': 'AOG'
            };
            
            const selectedServiceNames = selectedServices.map(service => serviceNames[service]).join(', ');
            messageField.value = `Gostaria de solicitar um orçamento para os seguintes serviços: ${selectedServiceNames}.\n\nPor favor, entre em contato para mais informações.`;
        }
    }, 500);
}

// Service Data
const serviceData = {
    aereo: {
        icon: 'fas fa-plane',
        title: 'Transporte Aéreo',
        description: 'Solução completa para transporte aéreo de cargas, com rastreamento em tempo real e gestão integrada de voos.',
        benefits: [
            'Rastreamento em tempo real de voos',
            'Gestão integrada de cargas aéreas',
            'Relatórios detalhados de performance',
            'Suporte 24/7 para emergências',
            'Integração com companhias aéreas',
            'Controle de temperatura e umidade'
        ]
    },
    rodoviario: {
        icon: 'fas fa-truck',
        title: 'Transporte Rodoviário',
        description: 'Gestão completa de frotas rodoviárias com otimização de rotas, controle de combustível e monitoramento de motoristas.',
        benefits: [
            'Otimização inteligente de rotas',
            'Controle de combustível e custos',
            'Monitoramento de motoristas',
            'Rastreamento GPS em tempo real',
            'Gestão de manutenção preventiva',
            'Relatórios de performance da frota'
        ]
    },
    armazenagem: {
        icon: 'fas fa-warehouse',
        title: 'Armazenagem',
        description: 'Soluções completas de armazenagem com controle de estoque, picking inteligente e gestão de espaço.',
        benefits: [
            'Controle total de estoque',
            'Picking e packing otimizado',
            'Gestão inteligente de espaço',
            'Controle de temperatura e umidade',
            'Rastreabilidade completa',
            'Integração com sistemas ERP'
        ]
    },
    projetos: {
        icon: 'fas fa-industry',
        title: 'Projetos Logísticos',
        description: 'Desenvolvimento de projetos logísticos personalizados para otimizar operações e reduzir custos.',
        benefits: [
            'Análise detalhada de processos',
            'Projetos personalizados',
            'Implementação completa',
            'Treinamento de equipes',
            'Suporte pós-implementação',
            'ROI garantido'
        ]
    },
    feiras: {
        icon: 'fas fa-tent',
        title: 'Feiras e Exposições',
        description: 'Logística especializada para feiras e exposições com montagem, desmontagem e transporte de materiais.',
        benefits: [
            'Montagem e desmontagem profissional',
            'Transporte especializado',
            'Armazenagem temporária',
            'Gestão de cronogramas',
            'Equipe especializada',
            'Seguro completo'
        ]
    },
    montagem: {
        icon: 'fas fa-tools',
        title: 'Montagem e Manuseio',
        description: 'Serviços especializados de montagem e manuseio de equipamentos com equipe técnica qualificada.',
        benefits: [
            'Equipe técnica especializada',
            'Ferramentas profissionais',
            'Montagem segura e eficiente',
            'Testes de funcionamento',
            'Documentação completa',
            'Garantia de qualidade'
        ]
    },
    shows: {
        icon: 'fas fa-music',
        title: 'Shows e Eventos',
        description: 'Logística completa para shows e eventos musicais com transporte de equipamentos e montagem de palcos.',
        benefits: [
            'Transporte de equipamentos musicais',
            'Montagem de palcos e estruturas',
            'Gestão de cronogramas apertados',
            'Equipe especializada em eventos',
            'Seguro para equipamentos',
            'Suporte durante o evento'
        ]
    },
    esportivos: {
        icon: 'fas fa-futbol',
        title: 'Eventos Esportivos',
        description: 'Logística especializada para eventos esportivos incluindo transporte de equipamentos e estruturas.',
        benefits: [
            'Transporte de equipamentos esportivos',
            'Montagem de estruturas temporárias',
            'Gestão de múltiplos locais',
            'Equipe especializada em esportes',
            'Controle de tempo crítico',
            'Suporte durante competições'
        ]
    },
    aog: {
        icon: 'fas fa-plus',
        title: 'AOG (Aircraft on Ground)',
        description: 'Serviço de emergência para aeronaves em solo com entrega rápida de peças e componentes críticos.',
        benefits: [
            'Entrega em até 4 horas',
            'Peças aeronáuticas originais',
            'Equipe especializada 24/7',
            'Transporte aéreo prioritário',
            'Documentação completa',
            'Suporte técnico especializado'
        ]
    }
};

// Modal Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Service Modal
    const modal = document.getElementById('serviceModal');
    const closeBtn = document.getElementById('modalClose');
    const overlay = document.getElementById('modalOverlay');
    
    if (closeBtn) closeBtn.addEventListener('click', closeServiceModal);
    if (overlay) overlay.addEventListener('click', closeServiceModal);
    
    // Service Selection Modal
    const selectionModal = document.getElementById('serviceSelectionModal');
    const selectionCloseBtn = document.getElementById('serviceSelectionClose');
    const selectionOverlay = document.getElementById('serviceSelectionOverlay');
    
    if (selectionCloseBtn) selectionCloseBtn.addEventListener('click', closeServiceSelectionModal);
    if (selectionOverlay) selectionOverlay.addEventListener('click', closeServiceSelectionModal);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeServiceModal();
            closeServiceSelectionModal();
        }
    });
    
    // Service selection checkboxes
    const checkboxes = document.querySelectorAll('#serviceSelectionModal input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectionCounter);
    });
});

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Dark Mode Removed

// Particle Effect
function initParticleEffect() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    heroSection.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
    `;
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.animation = `float ${duration}s ${delay}s infinite linear`;
    
    container.appendChild(particle);
}

// Micro Interactions
function initMicroInteractions() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .solution-card, .benefit-card, .cta-card');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(this, e);
        });
    });
    
    // Add magnetic effect to cards
    const cards = document.querySelectorAll('.solution-card, .benefit-card, .cta-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// Ripple Effect
function createRipple(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.5;
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: auto;
        padding: 0.25rem;
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Modern Typography */
    .hero-title {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    /* Smooth scrolling */
    html {
        scroll-behavior: smooth;
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: var(--light-gray);
    }
    
    ::-webkit-scrollbar-thumb {
        background: var(--gradient-accent);
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: var(--gradient-secondary);
    }
`;
document.head.appendChild(style);

// Service Modal Data (moved to avoid redeclaration)
window.serviceData = {
    aereo: {
        icon: 'fas fa-plane',
        title: 'Transporte Aéreo',
        description: 'Solução completa para transporte aéreo de cargas, com rastreamento em tempo real e gestão integrada de voos.',
        benefits: [
            'Rastreamento em tempo real de voos',
            'Gestão integrada de cargas aéreas',
            'Relatórios detalhados de performance',
            'Suporte 24/7 para emergências',
            'Integração com companhias aéreas',
            'Controle de temperatura e umidade'
        ]
    },
    rodoviario: {
        icon: 'fas fa-truck',
        title: 'Transporte Rodoviário',
        description: 'Gestão completa de frotas rodoviárias com otimização de rotas, controle de combustível e monitoramento de motoristas.',
        benefits: [
            'Otimização inteligente de rotas',
            'Controle de combustível e custos',
            'Monitoramento de motoristas',
            'Rastreamento GPS em tempo real',
            'Gestão de manutenção preventiva',
            'Relatórios de performance da frota'
        ]
    },
    armazenagem: {
        icon: 'fas fa-warehouse',
        title: 'Armazenagem',
        description: 'Soluções completas de armazenagem com controle de estoque, picking inteligente e gestão de espaço.',
        benefits: [
            'Controle total de estoque',
            'Picking e packing otimizado',
            'Gestão inteligente de espaço',
            'Controle de temperatura e umidade',
            'Rastreabilidade completa',
            'Integração com sistemas ERP'
        ]
    },
    projetos: {
        icon: 'fas fa-industry',
        title: 'Projetos Logísticos',
        description: 'Desenvolvimento de projetos logísticos personalizados para otimizar operações e reduzir custos.',
        benefits: [
            'Análise detalhada de processos',
            'Projetos personalizados',
            'Implementação completa',
            'Treinamento de equipes',
            'Suporte pós-implementação',
            'ROI garantido'
        ]
    },
    feiras: {
        icon: 'fas fa-tent',
        title: 'Feiras e Exposições',
        description: 'Logística especializada para feiras e exposições com montagem, desmontagem e transporte de materiais.',
        benefits: [
            'Montagem e desmontagem profissional',
            'Transporte especializado',
            'Armazenagem temporária',
            'Gestão de cronogramas',
            'Equipe especializada',
            'Seguro completo'
        ]
    },
    montagem: {
        icon: 'fas fa-tools',
        title: 'Montagem e Manuseio',
        description: 'Serviços especializados de montagem e manuseio de equipamentos com equipe técnica qualificada.',
        benefits: [
            'Equipe técnica especializada',
            'Ferramentas profissionais',
            'Montagem segura e eficiente',
            'Testes de funcionamento',
            'Documentação completa',
            'Garantia de qualidade'
        ]
    },
    shows: {
        icon: 'fas fa-music',
        title: 'Shows e Eventos',
        description: 'Logística completa para shows e eventos musicais com transporte de equipamentos e montagem de palcos.',
        benefits: [
            'Transporte de equipamentos musicais',
            'Montagem de palcos e estruturas',
            'Gestão de cronogramas apertados',
            'Equipe especializada em eventos',
            'Seguro para equipamentos',
            'Suporte durante o evento'
        ]
    },
    esportivos: {
        icon: 'fas fa-futbol',
        title: 'Eventos Esportivos',
        description: 'Logística especializada para eventos esportivos incluindo transporte de equipamentos e estruturas.',
        benefits: [
            'Transporte de equipamentos esportivos',
            'Montagem de estruturas temporárias',
            'Gestão de múltiplos locais',
            'Equipe especializada em esportes',
            'Controle de tempo crítico',
            'Suporte durante competições'
        ]
    },
    aog: {
        icon: 'fas fa-plus',
        title: 'AOG (Aircraft on Ground)',
        description: 'Serviço de emergência para aeronaves em solo com entrega rápida de peças e componentes críticos.',
        benefits: [
            'Entrega em até 4 horas',
            'Peças aeronáuticas originais',
            'Equipe especializada 24/7',
            'Transporte aéreo prioritário',
            'Documentação completa',
            'Suporte técnico especializado'
        ]
    }
};

// Service Modal Functions
function openServiceModal(serviceType) {
    const modal = document.getElementById('serviceModal');
    const service = window.serviceData[serviceType];
    
    if (service) {
        document.getElementById('modalIcon').innerHTML = `<i class="${service.icon}"></i>`;
        document.getElementById('modalTitle').textContent = service.title;
        document.getElementById('modalDescription').textContent = service.description;
        
        const benefitsList = document.getElementById('benefitsList');
        benefitsList.innerHTML = '';
        
        service.benefits.forEach(benefit => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check"></i> ${benefit}`;
            benefitsList.appendChild(li);
        });
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openServiceSelectionModal() {
    const modal = document.getElementById('serviceSelectionModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeServiceSelectionModal() {
    const modal = document.getElementById('serviceSelectionModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function updateSelectionCounter() {
    const checkboxes = document.querySelectorAll('#serviceSelectionModal input[type="checkbox"]:checked');
    const counter = document.getElementById('selectedCount');
    const button = document.querySelector('.btn-orcamento');
    
    if (counter) {
        counter.textContent = checkboxes.length;
    }
    
    if (button) {
        if (checkboxes.length > 0) {
            button.disabled = false;
            button.classList.add('btn-enabled');
        } else {
            button.disabled = true;
            button.classList.remove('btn-enabled');
        }
    }
}

function proceedToContact() {
    const selectedServices = [];
    const checkboxes = document.querySelectorAll('#serviceSelectionModal input[type="checkbox"]:checked');
    
    checkboxes.forEach(checkbox => {
        selectedServices.push(checkbox.value);
    });
    
    if (selectedServices.length === 0) {
        alert('Por favor, selecione pelo menos um serviço.');
        return;
    }
    
    closeServiceSelectionModal();
    closeServiceModal();
    
    // Scroll para a seção de contato
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Preencher o formulário com os serviços selecionados
    setTimeout(() => {
        const messageField = document.querySelector('#contactForm textarea[name="message"]');
        if (messageField) {
            const serviceNames = {
                'aereo': 'Transporte Aéreo',
                'rodoviario': 'Transporte Rodoviário',
                'armazenagem': 'Armazenagem',
                'projetos': 'Projetos Logísticos',
                'feiras': 'Feiras e Exposições',
                'montagem': 'Montagem e Manuseio',
                'shows': 'Shows',
                'esportivos': 'Eventos Esportivos',
                'aog': 'AOG'
            };
            
            const selectedServiceNames = selectedServices.map(service => serviceNames[service]).join(', ');
            messageField.value = `Gostaria de solicitar um orçamento para os seguintes serviços: ${selectedServiceNames}.\n\nPor favor, entre em contato para mais informações.`;
        }
    }, 500);
}

// Initialize service modals
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('serviceModal');
    const closeBtn = document.getElementById('modalClose');
    const overlay = document.getElementById('modalOverlay');
    
    const selectionModal = document.getElementById('serviceSelectionModal');
    const selectionCloseBtn = document.getElementById('serviceSelectionClose');
    const selectionOverlay = document.getElementById('serviceSelectionOverlay');
    
    if (closeBtn) closeBtn.addEventListener('click', closeServiceModal);
    if (overlay) overlay.addEventListener('click', closeServiceModal);
    
    if (selectionCloseBtn) selectionCloseBtn.addEventListener('click', closeServiceSelectionModal);
    if (selectionOverlay) selectionOverlay.addEventListener('click', closeServiceSelectionModal);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeServiceModal();
            closeServiceSelectionModal();
        }
    });
    
    // Adicionar event listeners para os checkboxes
    const checkboxes = document.querySelectorAll('#serviceSelectionModal input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectionCounter);
    });
});
