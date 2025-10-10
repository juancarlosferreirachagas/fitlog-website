module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        // Regras de estilo
        'indent': ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        
        // Regras de qualidade
        'no-unused-vars': 'warn',
        'no-console': 'off',
        'no-debugger': 'error',
        'no-alert': 'error',
        'no-eval': 'error',
        'no-implied-eval': 'error',
        'no-new-func': 'error',
        
        // Regras de acessibilidade
        'no-global-assign': 'error',
        'no-implicit-globals': 'error',
        
        // Regras de performance
        'no-loop-func': 'error',
        'no-new-object': 'error',
        'no-new-wrappers': 'error',
        
        // Regras de segurança
        'no-script-url': 'error',
        'no-unsafe-finally': 'error',
        'no-unsafe-negation': 'error',
        
        // Regras de compatibilidade
        'no-var': 'error',
        'prefer-const': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-template': 'error',
        
        // Regras de documentação
        'valid-jsdoc': 'warn',
        'require-jsdoc': 'off'
    },
    globals: {
        // Variáveis globais do navegador
        'window': 'readonly',
        'document': 'readonly',
        'navigator': 'readonly',
        'location': 'readonly',
        'history': 'readonly',
        'localStorage': 'readonly',
        'sessionStorage': 'readonly',
        'fetch': 'readonly',
        'Promise': 'readonly',
        'Set': 'readonly',
        'Map': 'readonly',
        'WeakMap': 'readonly',
        'WeakSet': 'readonly',
        'Symbol': 'readonly',
        'Proxy': 'readonly',
        'Reflect': 'readonly',
        
        // Variáveis globais do FitLog
        'accessibilityManager': 'writable',
        'performanceMonitor': 'writable',
        'imageOptimizer': 'writable',
        'i18n': 'writable',
        
        // Variáveis globais de bibliotecas
        'AOS': 'readonly',
        'bootstrap': 'readonly',
        'gtag': 'readonly',
        'axe': 'readonly'
    },
    overrides: [
        {
            files: ['tests/**/*.js'],
            env: {
                jest: true
            },
            globals: {
                'test': 'readonly',
                'expect': 'readonly',
                'describe': 'readonly',
                'it': 'readonly',
                'beforeEach': 'readonly',
                'afterEach': 'readonly',
                'beforeAll': 'readonly',
                'afterAll': 'readonly'
            }
        }
    ]
};
