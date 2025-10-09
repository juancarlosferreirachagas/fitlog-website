// Internationalization System
const translations = {
    pt: {
        // Navigation
        'nav.home': 'Início',
        'nav.services': 'Serviços',
        'nav.about': 'Sobre',
        'nav.contact': 'Contato',
        'nav.language': '🇧🇷 PT',
        
        // Hero Section
        'hero.badge': 'Logística Inteligente',
        'hero.title1': 'mergulhada na',
        'hero.title2': 'logística',
        'hero.subtitle1': '100% digital.',
        'hero.subtitle2': '100% rastreável.',
        'hero.subtitle3': '100% eficiente.',
        'hero.description': 'Transformamos a logística com tecnologia de ponta, oferecendo soluções completas em transporte, armazenagem e gestão de projetos para empresas que buscam excelência.',
        'hero.cta': 'Conheça Nossas Soluções',
        
        // Services Section
        'services.title': 'Nossos Serviços',
        'services.subtitle': 'Oferecemos uma gama completa de serviços logísticos para atender às necessidades específicas do seu negócio, com tecnologia avançada e nossa abrangência no mercado de transporte e armazenagem.',
        
        // Clients Section
        'clients.title': 'Nossos Clientes e Eventos',
        'clients.subtitle': 'Parceiros de grandes marcas e eventos nacionais e internacionais',
        
        // CTA Section
        'cta.title': 'A evolução logística começa agora.',
        'cta.subtitle': 'Fale com um especialista FitLog para encontrar a melhor solução logística para o seu negócio.',
        
        // Service Cards
        'service.aereo.title': 'Transporte Aéreo',
        'service.aereo.description': 'Solução completa para transporte aéreo de cargas com rastreamento em tempo real.',
        'service.rodoviario.title': 'Transporte Rodoviário',
        'service.rodoviario.description': 'Gestão completa de frotas com otimização de rotas e controle de custos.',
        'service.armazenagem.title': 'Armazenagem',
        'service.armazenagem.description': 'Controle total de estoque com picking inteligente e gestão de espaço.',
        'service.projetos.title': 'Projetos Logísticos',
        'service.projetos.description': 'Projetos personalizados para otimizar operações e reduzir custos.',
        'service.feiras.title': 'Feiras e Exposições',
        'service.feiras.description': 'Logística especializada com montagem profissional e transporte seguro.',
        'service.montagem.title': 'Montagem e Manuseio',
        'service.montagem.description': 'Equipe técnica especializada com ferramentas profissionais.',
        'service.shows.title': 'Shows',
        'service.shows.description': 'Logística completa para eventos musicais com montagem de palcos.',
        'service.esportivos.title': 'Eventos Esportivos',
        'service.esportivos.description': 'Transporte de equipamentos e montagem de estruturas temporárias.',
        'service.aog.title': 'AOG',
        'service.aog.description': 'Serviço de emergência com entrega rápida de peças críticas.',
        'service.learnMore': 'Saiba Mais',
        
        // About Section
        'about.title': 'Sobre a FitLog',
        'about.subtitle': 'Conheça nossa história e compromisso com a excelência logística',
        
        // Contact Section
        'contact.title': 'Entre em Contato',
        'contact.subtitle': 'Estamos prontos para atender suas necessidades logísticas',
        
        // Footer
        'footer.slogan': 'Entregando Soluções',
        'footer.copyright': '© 2024 FitLog. Todos os direitos reservados.'
    },
    
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.services': 'Services',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.language': '🇺🇸 EN',
        
        // Hero Section
        'hero.badge': 'Smart Logistics',
        'hero.title1': 'immersed in',
        'hero.title2': 'logistics',
        'hero.subtitle1': '100% digital.',
        'hero.subtitle2': '100% traceable.',
        'hero.subtitle3': '100% efficient.',
        'hero.description': 'We transform logistics with cutting-edge technology, offering complete solutions in transportation, warehousing and project management for companies seeking excellence.',
        'hero.cta': 'Discover Our Solutions',
        
        // Services Section
        'services.title': 'Our Services',
        'services.subtitle': 'We offer a complete range of logistics services to meet your business specific needs, with advanced technology and our coverage in the transportation and warehousing market.',
        
        // Clients Section
        'clients.title': 'Our Clients and Events',
        'clients.subtitle': 'Partners of major brands and national and international events',
        
        // CTA Section
        'cta.title': 'Logistics evolution starts now.',
        'cta.subtitle': 'Talk to a FitLog specialist to find the best logistics solution for your business.',
        
        // Service Cards
        'service.aereo.title': 'Air Transport',
        'service.aereo.description': 'Complete solution for air cargo transport with real-time tracking.',
        'service.rodoviario.title': 'Road Transport',
        'service.rodoviario.description': 'Complete fleet management with route optimization and cost control.',
        'service.armazenagem.title': 'Warehousing',
        'service.armazenagem.description': 'Total inventory control with intelligent picking and space management.',
        'service.projetos.title': 'Logistics Projects',
        'service.projetos.description': 'Customized projects to optimize operations and reduce costs.',
        'service.feiras.title': 'Fairs and Exhibitions',
        'service.feiras.description': 'Specialized logistics with professional assembly and secure transport.',
        'service.montagem.title': 'Assembly and Handling',
        'service.montagem.description': 'Specialized technical team with professional tools.',
        'service.shows.title': 'Shows',
        'service.shows.description': 'Complete logistics for musical events with stage assembly.',
        'service.esportivos.title': 'Sports Events',
        'service.esportivos.description': 'Equipment transport and temporary structure assembly.',
        'service.aog.title': 'AOG',
        'service.aog.description': 'Emergency service with fast delivery of critical parts.',
        'service.learnMore': 'Learn More',
        
        // About Section
        'about.title': 'About FitLog',
        'about.subtitle': 'Learn about our history and commitment to logistics excellence',
        
        // Contact Section
        'contact.title': 'Get in Touch',
        'contact.subtitle': 'We are ready to meet your logistics needs',
        
        // Footer
        'footer.slogan': 'Delivering Solutions',
        'footer.copyright': '© 2024 FitLog. All rights reserved.'
    },
    
    es: {
        // Navigation
        'nav.home': 'Inicio',
        'nav.services': 'Servicios',
        'nav.about': 'Acerca',
        'nav.contact': 'Contacto',
        'nav.language': '🇪🇸 ES',
        
        // Hero Section
        'hero.badge': 'Logística Inteligente',
        'hero.title1': 'inmersa en',
        'hero.title2': 'logística',
        'hero.subtitle1': '100% digital.',
        'hero.subtitle2': '100% rastreable.',
        'hero.subtitle3': '100% eficiente.',
        'hero.description': 'Transformamos la logística con tecnología de vanguardia, ofreciendo soluciones completas en transporte, almacenamiento y gestión de proyectos para empresas que buscan la excelencia.',
        'hero.cta': 'Conoce Nuestras Soluciones',
        
        // Services Section
        'services.title': 'Nuestros Servicios',
        'services.subtitle': 'Ofrecemos una gama completa de servicios logísticos para satisfacer las necesidades específicas de su negocio, con tecnología avanzada y nuestra cobertura en el mercado de transporte y almacenamiento.',
        
        // Clients Section
        'clients.title': 'Nuestros Clientes y Eventos',
        'clients.subtitle': 'Socios de grandes marcas y eventos nacionales e internacionales',
        
        // CTA Section
        'cta.title': 'La evolución logística comienza ahora.',
        'cta.subtitle': 'Habla con un especialista FitLog para encontrar la mejor solución logística para tu negocio.',
        
        // Service Cards
        'service.aereo.title': 'Transporte Aéreo',
        'service.aereo.description': 'Solución completa para transporte aéreo de carga con seguimiento en tiempo real.',
        'service.rodoviario.title': 'Transporte Terrestre',
        'service.rodoviario.description': 'Gestión completa de flotas con optimización de rutas y control de costos.',
        'service.armazenagem.title': 'Almacenamiento',
        'service.armazenagem.description': 'Control total de inventario con picking inteligente y gestión de espacio.',
        'service.projetos.title': 'Proyectos Logísticos',
        'service.projetos.description': 'Proyectos personalizados para optimizar operaciones y reducir costos.',
        'service.feiras.title': 'Ferias y Exposiciones',
        'service.feiras.description': 'Logística especializada con montaje profesional y transporte seguro.',
        'service.montagem.title': 'Montaje y Manipulación',
        'service.montagem.description': 'Equipo técnico especializado con herramientas profesionales.',
        'service.shows.title': 'Shows',
        'service.shows.description': 'Logística completa para eventos musicales con montaje de escenarios.',
        'service.esportivos.title': 'Eventos Deportivos',
        'service.esportivos.description': 'Transporte de equipos y montaje de estructuras temporales.',
        'service.aog.title': 'AOG',
        'service.aog.description': 'Servicio de emergencia con entrega rápida de piezas críticas.',
        'service.learnMore': 'Saber Más',
        
        // About Section
        'about.title': 'Acerca de FitLog',
        'about.subtitle': 'Conoce nuestra historia y compromiso con la excelencia logística',
        
        // Contact Section
        'contact.title': 'Ponte en Contacto',
        'contact.subtitle': 'Estamos listos para atender tus necesidades logísticas',
        
        // Footer
        'footer.slogan': 'Entregando Soluciones',
        'footer.copyright': '© 2024 FitLog. Todos los derechos reservados.'
    }
};

let currentLanguage = localStorage.getItem('language') || 'pt';

// Language Functions
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateLanguageUI();
    translatePage();
}

function updateLanguageUI() {
    const languageDropdown = document.getElementById('languageDropdown');
    if (languageDropdown) {
        const flags = { pt: '🇧🇷 PT', en: '🇺🇸 EN', es: '🇪🇸 ES' };
        languageDropdown.textContent = flags[currentLanguage];
    }
}

function translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

// Initialize language system
document.addEventListener('DOMContentLoaded', function() {
    updateLanguageUI();
    translatePage();
});
