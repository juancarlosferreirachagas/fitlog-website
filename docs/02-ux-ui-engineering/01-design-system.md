# 🎨 **2.1 DESIGN SYSTEM - FUNDAMENTOS**

## **📋 VISÃO GERAL**

Um Design System é uma coleção de padrões, componentes e diretrizes que garantem consistência visual e funcional em todo o produto. Neste capítulo, você criará um sistema completo para o FitLog.

---

## 🔍 **O QUE É UM DESIGN SYSTEM?**

### **DEFINIÇÃO:**
Um Design System é um conjunto de regras, princípios e componentes que guiam a criação de interfaces consistentes e escaláveis.

### **COMPONENTES PRINCIPAIS:**
```javascript
const designSystem = {
  // Tokens de Design
  tokens: {
    colors: "Paleta de cores",
    typography: "Hierarquia tipográfica",
    spacing: "Sistema de espaçamentos",
    shadows: "Elevações e sombras"
  },
  
  // Componentes
  components: {
    buttons: "Botões e ações",
    forms: "Inputs e formulários",
    navigation: "Menus e navegação",
    cards: "Containers de conteúdo"
  },
  
  // Padrões
  patterns: {
    layouts: "Estruturas de página",
    interactions: "Comportamentos",
    feedback: "Estados e respostas"
  }
};
```

---

## 🧠 **CONCEITOS TÉCNICOS FUNDAMENTAIS**

### **1. DESIGN TOKENS**

#### **O QUE SÃO:**
Design tokens são valores nomeados que armazenam atributos visuais como cores, espaçamentos e tipografia.

#### **IMPLEMENTAÇÃO:**
```css
/* Design Tokens - FitLog */
:root {
  /* === CORES === */
  /* Primárias */
  --color-primary-50: #f0f4f8;
  --color-primary-100: #d9e2ec;
  --color-primary-200: #bcccdc;
  --color-primary-300: #9fb3c8;
  --color-primary-400: #829ab1;
  --color-primary-500: #1B365D; /* Cor principal */
  --color-primary-600: #102a43;
  --color-primary-700: #0f2027;
  --color-primary-800: #0d1b2a;
  --color-primary-900: #0c1a2e;
  
  /* Secundárias */
  --color-secondary-50: #fef2f2;
  --color-secondary-100: #fee2e2;
  --color-secondary-200: #fecaca;
  --color-secondary-300: #fca5a5;
  --color-secondary-400: #f87171;
  --color-secondary-500: #E31E24; /* Cor secundária */
  --color-secondary-600: #dc2626;
  --color-secondary-700: #b91c1c;
  --color-secondary-800: #991b1b;
  --color-secondary-900: #7f1d1d;
  
  /* Neutras */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
  
  /* Semânticas */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
  
  /* === TIPOGRAFIA === */
  /* Famílias */
  --font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-secondary: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* Tamanhos */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */
  --font-size-6xl: 3.75rem;   /* 60px */
  
  /* Pesos */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  
  /* Alturas de linha */
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;
  
  /* === ESPAÇAMENTOS === */
  --spacing-0: 0;
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-5: 1.25rem;   /* 20px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */
  --spacing-10: 2.5rem;   /* 40px */
  --spacing-12: 3rem;     /* 48px */
  --spacing-16: 4rem;     /* 64px */
  --spacing-20: 5rem;     /* 80px */
  --spacing-24: 6rem;     /* 96px */
  --spacing-32: 8rem;     /* 128px */
  
  /* === SOMBRAS === */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  
  /* === BORDAS === */
  --radius-none: 0;
  --radius-sm: 0.125rem;   /* 2px */
  --radius-base: 0.25rem;  /* 4px */
  --radius-md: 0.375rem;   /* 6px */
  --radius-lg: 0.5rem;     /* 8px */
  --radius-xl: 0.75rem;    /* 12px */
  --radius-2xl: 1rem;      /* 16px */
  --radius-3xl: 1.5rem;    /* 24px */
  --radius-full: 9999px;
  
  /* === TRANSIÇÕES === */
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 250ms ease-in-out;
  --transition-slow: 350ms ease-in-out;
  
  /* === Z-INDEX === */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
  --z-toast: 1080;
}
```

### **2. COMPONENTES REUTILIZÁVEIS**

#### **SISTEMA DE BOTÕES:**
```css
/* Botões Base */
.btn {
  /* Reset */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);
  transition: all var(--transition-fast);
  
  /* Tamanhos */
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  
  /* Estados */
  &:focus {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

/* Variações de Tamanho */
.btn--sm {
  padding: var(--spacing-1) var(--spacing-3);
  font-size: var(--font-size-xs);
}

.btn--lg {
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-lg);
}

.btn--xl {
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--font-size-xl);
}

/* Variações de Estilo */
.btn--primary {
  background-color: var(--color-primary-500);
  color: white;
  
  &:hover:not(:disabled) {
    background-color: var(--color-primary-600);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }
}

.btn--secondary {
  background-color: var(--color-secondary-500);
  color: white;
  
  &:hover:not(:disabled) {
    background-color: var(--color-secondary-600);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
}

.btn--outline {
  background-color: transparent;
  color: var(--color-primary-500);
  border: 2px solid var(--color-primary-500);
  
  &:hover:not(:disabled) {
    background-color: var(--color-primary-500);
    color: white;
  }
}

.btn--ghost {
  background-color: transparent;
  color: var(--color-primary-500);
  
  &:hover:not(:disabled) {
    background-color: var(--color-primary-50);
  }
}
```

#### **SISTEMA DE FORMULÁRIOS:**
```css
/* Input Base */
.input {
  display: block;
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  transition: all var(--transition-fast);
  
  &:focus {
    outline: none;
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 3px rgba(27, 54, 93, 0.1);
  }
  
  &:disabled {
    background-color: var(--color-gray-100);
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: var(--color-gray-400);
  }
}

/* Estados de Validação */
.input--error {
  border-color: var(--color-error);
  
  &:focus {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }
}

.input--success {
  border-color: var(--color-success);
  
  &:focus {
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
}

/* Label */
.label {
  display: block;
  font-family: var(--font-family-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-2);
}

/* Grupo de Formulário */
.form-group {
  margin-bottom: var(--spacing-6);
}

/* Mensagem de Erro */
.error-message {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-error);
  margin-top: var(--spacing-1);
}
```

### **3. SISTEMA DE LAYOUT**

#### **CONTAINER RESPONSIVO:**
```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--spacing-4);
  padding-right: var(--spacing-4);
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}
```

#### **SISTEMA DE GRID:**
```css
.grid {
  display: grid;
  gap: var(--spacing-6);
}

.grid--cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid--cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid--cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid--cols-4 { grid-template-columns: repeat(4, 1fr); }

/* Responsivo */
@media (max-width: 768px) {
  .grid--cols-2,
  .grid--cols-3,
  .grid--cols-4 {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .grid--cols-3,
  .grid--cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

## 💡 **BENEFÍCIOS DO DESIGN SYSTEM**

### **1. CONSISTÊNCIA**
```javascript
// Antes: Código inconsistente
const inconsistentStyles = {
  button1: "background: #1B365D; padding: 8px 16px;",
  button2: "background: #1B365D; padding: 10px 20px;",
  button3: "background: #1B365D; padding: 12px 24px;"
};

// Depois: Sistema consistente
const consistentStyles = {
  button: "background: var(--color-primary-500); padding: var(--spacing-2) var(--spacing-4);"
};
```

### **2. MANUTENIBILIDADE**
```css
/* Mudança centralizada */
:root {
  --color-primary-500: #2C5282; /* Mudança de cor */
}

/* Todos os componentes se atualizam automaticamente */
.btn--primary { background-color: var(--color-primary-500); }
.input:focus { border-color: var(--color-primary-500); }
```

### **3. ESCALABILIDADE**
```javascript
// Fácil adição de novos componentes
const newComponent = {
  base: "Usa tokens existentes",
  variants: "Segue padrões estabelecidos",
  documentation: "Integrado ao sistema"
};
```

### **4. COLABORAÇÃO**
```javascript
// Designers e desenvolvedores falam a mesma linguagem
const designTokens = {
  designer: "Usa Figma com tokens",
  developer: "Usa CSS com variáveis",
  result: "Consistência garantida"
};
```

---

## 🛠️ **IMPLEMENTAÇÃO NO FITLOG**

### **ESTRUTURA DE ARQUIVOS:**
```
assets/css/
├── design-system/
│   ├── tokens.css          # Design tokens
│   ├── components.css      # Componentes base
│   ├── utilities.css       # Classes utilitárias
│   └── themes.css          # Temas (claro/escuro)
├── main.css               # Estilos principais
└── responsive.css         # Media queries
```

### **IMPLEMENTAÇÃO GRADUAL:**
```css
/* 1. Implementar tokens básicos */
:root {
  --color-primary: #1B365D;
  --color-secondary: #E31E24;
  --spacing-base: 1rem;
}

/* 2. Criar componentes base */
.btn {
  background: var(--color-primary);
  padding: var(--spacing-base);
}

/* 3. Expandir sistema */
.btn--secondary {
  background: var(--color-secondary);
}

/* 4. Adicionar responsividade */
@media (max-width: 768px) {
  .btn {
    padding: calc(var(--spacing-base) * 0.75);
  }
}
```

### **MIGRAÇÃO DO CÓDIGO EXISTENTE:**
```css
/* ANTES: Estilos inline */
.hero-section {
  background-color: #1B365D;
  padding: 2rem;
  border-radius: 8px;
}

/* DEPOIS: Usando design system */
.hero-section {
  background-color: var(--color-primary-500);
  padding: var(--spacing-8);
  border-radius: var(--radius-lg);
}
```

---

## 📊 **MÉTRICAS E ANÁLISE**

### **MÉTRICAS DE CONSISTÊNCIA:**
```javascript
// Análise de consistência
const consistencyMetrics = {
  colorUsage: {
    before: "15 cores diferentes",
    after: "5 cores do sistema",
    improvement: "67% redução"
  },
  
  spacingUsage: {
    before: "23 valores diferentes",
    after: "8 valores do sistema",
    improvement: "65% redução"
  },
  
  componentReuse: {
    before: "30% reutilização",
    after: "85% reutilização",
    improvement: "183% aumento"
  }
};
```

### **FERRAMENTAS DE ANÁLISE:**
```bash
# Analisar uso de cores
grep -r "color:" assets/css/ | wc -l

# Verificar consistência
grep -r "var(--color-" assets/css/ | wc -l

# Medir reutilização
grep -r "\.btn" assets/css/ | wc -l
```

---

## 🎯 **EXERCÍCIOS PRÁTICOS**

### **EXERCÍCIO 1: Criar Tokens**
```css
/* 1. Definir paleta de cores para FitLog */
:root {
  --color-brand-primary: /* Sua escolha */;
  --color-brand-secondary: /* Sua escolha */;
  --color-neutral-100: /* Sua escolha */;
  --color-neutral-900: /* Sua escolha */;
}
```

### **EXERCÍCIO 2: Componente Botão**
```css
/* 2. Criar sistema de botões */
.btn {
  /* Implementar usando tokens */
}
```

### **EXERCÍCIO 3: Sistema de Grid**
```css
/* 3. Criar grid responsivo */
.grid {
  /* Implementar usando tokens */
}
```

---

## 📚 **RECURSOS ADICIONAIS**

### **DESIGN SYSTEMS FAMOSOS:**
- [Material Design](https://material.io/design) - Google
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) - Apple
- [Ant Design](https://ant.design/) - Alibaba
- [Chakra UI](https://chakra-ui.com/) - Segun Adebayo

### **FERRAMENTAS:**
- [Figma](https://figma.com/) - Design e prototipagem
- [Storybook](https://storybook.js.org/) - Documentação de componentes
- [Style Dictionary](https://amzn.github.io/style-dictionary/) - Gerenciamento de tokens

### **BIBLIOTECAS:**
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first
- [Styled Components](https://styled-components.com/) - CSS-in-JS
- [Emotion](https://emotion.sh/) - CSS-in-JS

---

## 🎯 **CHECKLIST DE IMPLEMENTAÇÃO**

### **✅ TOKENS DE DESIGN:**
- [ ] Definir paleta de cores
- [ ] Estabelecer tipografia
- [ ] Criar sistema de espaçamentos
- [ ] Definir sombras e bordas

### **✅ COMPONENTES:**
- [ ] Sistema de botões
- [ ] Formulários
- [ ] Navegação
- [ ] Cards e containers

### **✅ DOCUMENTAÇÃO:**
- [ ] Guia de uso
- [ ] Exemplos de código
- [ ] Princípios de design
- [ ] Processo de contribuição

---

## 🚀 **PRÓXIMOS PASSOS**

1. **📖 Leia**: [2.2 Componentes e Tokens](./02-components-tokens.md)
2. **🛠️ Implemente**: Sistema de tokens no FitLog
3. **📊 Teste**: Consistência visual
4. **📝 Documente**: Componentes criados

---

**🎯 [Próximo: Componentes e Tokens →](./02-components-tokens.md)**
