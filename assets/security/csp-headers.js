/**
 * Content Security Policy (CSP) Headers
 * Implementa políticas de segurança robustas para o FitLog Website
 * 
 * @description
 * CSP é uma camada adicional de segurança que ajuda a detectar e mitigar
 * certos tipos de ataques, incluindo Cross Site Scripting (XSS) e ataques
 * de injeção de dados. Funciona restringindo os recursos que a página
 * pode carregar.
 * 
 * @author FitLog Security Team
 * @version 1.0.0
 * @since 2024-12-19
 */

// Configuração de CSP para produção
const CSP_POLICY = {
    // Permite scripts apenas de fontes confiáveis
    'script-src': [
        "'self'",                    // Scripts do próprio domínio
        "'unsafe-inline'",           // Scripts inline (necessário para AOS)
        "'unsafe-eval'",             // eval() necessário para algumas libs
        'https://cdn.jsdelivr.net',  // CDN para Bootstrap e outras libs
        'https://cdnjs.cloudflare.com', // CDN para Font Awesome
        'https://unpkg.com',         // CDN para AOS
        'https://www.google.com',    // Google Maps
        'https://www.gstatic.com'    // Google Static
    ],
    
    // Permite estilos apenas de fontes confiáveis
    'style-src': [
        "'self'",
        "'unsafe-inline'",           // Estilos inline necessários
        'https://fonts.googleapis.com', // Google Fonts
        'https://cdn.jsdelivr.net',
        'https://cdnjs.cloudflare.com',
        'https://unpkg.com'
    ],
    
    // Permite imagens de várias fontes
    'img-src': [
        "'self'",
        'data:',                     // Imagens em base64
        'https:',                    // Imagens HTTPS
        'https://www.google.com',    // Google Maps tiles
        'https://maps.googleapis.com'
    ],
    
    // Permite fontes apenas de fontes confiáveis
    'font-src': [
        "'self'",
        'https://fonts.gstatic.com', // Google Fonts
        'https://cdnjs.cloudflare.com'
    ],
    
    // Permite conexões apenas para fontes confiáveis
    'connect-src': [
        "'self'",
        'https://www.google.com',
        'https://maps.googleapis.com'
    ],
    
    // Permite frames apenas de fontes confiáveis
    'frame-src': [
        'https://www.google.com'     // Google Maps iframe
    ],
    
    // Permite objetos apenas do próprio domínio
    'object-src': [
        "'none'"                     // Bloqueia todos os objetos
    ],
    
    // Permite base URI apenas do próprio domínio
    'base-uri': [
        "'self'"
    ],
    
    // Permite form actions apenas para endpoints seguros
    'form-action': [
        "'self'",
        'mailto:',                   // Permite envio de email
        'tel:'                       // Permite ligações
    ]
};

/**
 * Gera o header CSP formatado
 * @returns {string} Header CSP formatado
 */
function generateCSPHeader() {
    const policies = [];
    
    for (const [directive, sources] of Object.entries(CSP_POLICY)) {
        policies.push(`${directive} ${sources.join(' ')}`);
    }
    
    return policies.join('; ');
}

/**
 * Aplica CSP via meta tag (fallback para quando não há controle do servidor)
 * @description
 * Meta tag CSP é aplicada quando não temos controle total do servidor
 * ou para desenvolvimento local
 */
function applyCSPMetaTag() {
    const cspContent = generateCSPHeader();
    
    // Remove CSP meta tag existente se houver
    const existingCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (existingCSP) {
        existingCSP.remove();
    }
    
    // Cria nova meta tag CSP
    const cspMeta = document.createElement('meta');
    cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
    cspMeta.setAttribute('content', cspContent);
    
    // Adiciona ao head
    document.head.appendChild(cspMeta);
    
    console.log('🔒 CSP aplicado via meta tag:', cspContent);
}

/**
 * Configuração de CSP para desenvolvimento
 * @description
 * CSP mais permissivo para desenvolvimento local
 */
const CSP_DEV_POLICY = {
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https:', 'http:'],
    'style-src': ["'self'", "'unsafe-inline'", 'https:', 'http:'],
    'img-src': ["'self'", 'data:', 'https:', 'http:'],
    'font-src': ["'self'", 'https:', 'http:'],
    'connect-src': ["'self'", 'https:', 'http:'],
    'frame-src': ["'self'", 'https:', 'http:'],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'", 'mailto:', 'tel:']
};

/**
 * Aplica CSP para desenvolvimento
 */
function applyDevCSP() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const policies = [];
        for (const [directive, sources] of Object.entries(CSP_DEV_POLICY)) {
            policies.push(`${directive} ${sources.join(' ')}`);
        }
        
        const cspMeta = document.createElement('meta');
        cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
        cspMeta.setAttribute('content', policies.join('; '));
        document.head.appendChild(cspMeta);
        
        console.log('🔧 CSP de desenvolvimento aplicado');
    }
}

/**
 * Valida se o CSP está funcionando
 * @description
 * Testa se o CSP está bloqueando recursos não autorizados
 */
function validateCSP() {
    // Testa se scripts inline são bloqueados (em produção)
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        try {
            // Tenta executar um script inline (deve ser bloqueado)
            eval('console.log("CSP test - this should be blocked")');
            console.warn('⚠️ CSP pode não estar funcionando corretamente');
        } catch (e) {
            console.log('✅ CSP está funcionando - scripts inline bloqueados');
        }
    }
}

/**
 * Inicializa o sistema de segurança
 * @description
 * Função principal que configura toda a segurança da aplicação
 */
function initSecurity() {
    console.log('🔒 Inicializando sistema de segurança...');
    
    // Aplica CSP baseado no ambiente
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        applyDevCSP();
    } else {
        applyCSPMetaTag();
    }
    
    // Valida CSP após um delay
    setTimeout(validateCSP, 1000);
    
    // Adiciona headers de segurança adicionais
    addSecurityHeaders();
    
    console.log('✅ Sistema de segurança inicializado');
}

/**
 * Adiciona headers de segurança adicionais via meta tags
 * @description
 * Headers de segurança que podem ser aplicados via meta tags
 */
function addSecurityHeaders() {
    const securityHeaders = [
        {
            name: 'X-Content-Type-Options',
            content: 'nosniff'
        },
        {
            name: 'X-Frame-Options',
            content: 'DENY'
        },
        {
            name: 'X-XSS-Protection',
            content: '1; mode=block'
        },
        {
            name: 'Referrer-Policy',
            content: 'strict-origin-when-cross-origin'
        },
        {
            name: 'Permissions-Policy',
            content: 'camera=(), microphone=(), geolocation=()'
        }
    ];
    
    securityHeaders.forEach(header => {
        const meta = document.createElement('meta');
        meta.setAttribute('http-equiv', header.name);
        meta.setAttribute('content', header.content);
        document.head.appendChild(meta);
    });
    
    console.log('🛡️ Headers de segurança adicionados');
}

// Exporta funções para uso global
window.FitLogSecurity = {
    init: initSecurity,
    generateCSPHeader,
    validateCSP,
    CSP_POLICY,
    CSP_DEV_POLICY
};

// Auto-inicializa se não estiver em modo de teste
if (typeof window !== 'undefined' && !window.jest) {
    document.addEventListener('DOMContentLoaded', initSecurity);
}
