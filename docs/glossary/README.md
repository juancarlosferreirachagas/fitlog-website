# 📚 **GLOSSÁRIO TÉCNICO**

## **📋 VISÃO GERAL**

Este glossário contém definições rápidas e conceitos técnicos essenciais para o curso de Engenharia de Software Web, organizados por categoria para fácil consulta.

---

## 🔤 **ÍNDICE ALFABÉTICO**

### **A**
- [Accessibility](#accessibility)
- [API](#api)
- [AVIF](#avif)
- [Authentication](#authentication)

### **B**
- [Bundle](#bundle)
- [Browser](#browser)

### **C**
- [Cache](#cache)
- [CDN](#cdn)
- [CLS](#cls)
- [CORS](#cors)
- [CSP](#csp)
- [CSS](#css)

### **D**
- [Design System](#design-system)
- [DOM](#dom)

### **F**
- [FID](#fid)
- [Figma](#figma)

### **G**
- [Git](#git)
- [Grid](#grid)

### **H**
- [HTML](#html)
- [HTTPS](#https)
- [HSTS](#hsts)

### **I**
- [Intersection Observer](#intersection-observer)
- [IoT](#iot)

### **J**
- [JavaScript](#javascript)
- [JWT](#jwt)

### **L**
- [LCP](#lcp)
- [Lighthouse](#lighthouse)

### **M**
- [Mobile-First](#mobile-first)

### **P**
- [PWA](#pwa)
- [Performance](#performance)

### **R**
- [Responsive Design](#responsive-design)
- [REST](#rest)

### **S**
- [Service Worker](#service-worker)
- [SEO](#seo)

### **T**
- [TypeScript](#typescript)

### **U**
- [UI](#ui)
- [UX](#ux)

### **V**
- [Vue.js](#vuejs)

### **W**
- [WebP](#webp)
- [Webpack](#webpack)

---

## 📖 **DEFINIÇÕES DETALHADAS**

### **Accessibility**
**Definição**: Prática de tornar websites e aplicações acessíveis para pessoas com deficiências.

**Conceitos Relacionados**:
- WCAG (Web Content Accessibility Guidelines)
- ARIA (Accessible Rich Internet Applications)
- Screen readers
- Keyboard navigation

**Exemplo Prático**:
```html
<!-- Botão acessível -->
<button aria-label="Fechar modal" aria-describedby="modal-description">
  ×
</button>
```

---

### **API**
**Definição**: Application Programming Interface - conjunto de protocolos e ferramentas para construir aplicações.

**Conceitos Relacionados**:
- REST API
- GraphQL
- Endpoints
- HTTP methods

**Exemplo Prático**:
```javascript
// Chamada de API
fetch('/api/users')
  .then(response => response.json())
  .then(data => console.log(data));
```

---

### **AVIF**
**Definição**: Formato de imagem baseado no codec AV1, oferecendo compressão superior ao WebP.

**Características**:
- 50% menor que JPEG
- Suporte a transparência
- HDR support
- Browsers modernos

**Exemplo Prático**:
```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Descrição">
</picture>
```

---

### **Authentication**
**Definição**: Processo de verificação da identidade de um usuário.

**Conceitos Relacionados**:
- JWT (JSON Web Tokens)
- OAuth
- Session management
- Multi-factor authentication

**Exemplo Prático**:
```javascript
// Verificação de token JWT
const token = localStorage.getItem('authToken');
if (token && isValidToken(token)) {
  // Usuário autenticado
}
```

---

### **Bundle**
**Definição**: Arquivo que contém múltiplos módulos JavaScript combinados.

**Conceitos Relacionados**:
- Webpack
- Code splitting
- Tree shaking
- Minification

**Exemplo Prático**:
```javascript
// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

---

### **Cache**
**Definição**: Armazenamento temporário de dados para acesso rápido.

**Tipos**:
- Browser cache
- CDN cache
- Application cache
- Service Worker cache

**Exemplo Prático**:
```javascript
// Service Worker cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

---

### **CDN**
**Definição**: Content Delivery Network - rede de servidores distribuídos globalmente.

**Benefícios**:
- Redução de latência
- Melhor performance
- Redundância
- Escalabilidade

**Exemplo Prático**:
```html
<!-- CDN para bibliotecas -->
<script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js"></script>
```

---

### **CLS**
**Definição**: Cumulative Layout Shift - métrica que mede a estabilidade visual da página.

**Como Medir**:
- Score < 0.1: Bom
- Score 0.1-0.25: Precisa melhorar
- Score > 0.25: Ruim

**Exemplo Prático**:
```css
/* Evitar CLS */
img {
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
}
```

---

### **CORS**
**Definição**: Cross-Origin Resource Sharing - mecanismo que permite recursos de diferentes origens.

**Conceitos Relacionados**:
- Same-origin policy
- Preflight requests
- CORS headers

**Exemplo Prático**:
```javascript
// Configuração CORS
app.use(cors({
  origin: 'https://fitlog.com.br',
  methods: ['GET', 'POST'],
  credentials: true
}));
```

---

### **CSP**
**Definição**: Content Security Policy - política de segurança que previne ataques XSS.

**Conceitos Relacionados**:
- XSS prevention
- Inline scripts
- External resources

**Exemplo Prático**:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline';">
```

---

### **CSS**
**Definição**: Cascading Style Sheets - linguagem para estilizar documentos HTML.

**Conceitos Relacionados**:
- Selectors
- Properties
- Values
- Specificity

**Exemplo Prático**:
```css
.button {
  background-color: #1B365D;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
}
```

---

### **Design System**
**Definição**: Conjunto de padrões, componentes e diretrizes para criar interfaces consistentes.

**Componentes**:
- Design tokens
- Componentes reutilizáveis
- Padrões de uso
- Documentação

**Exemplo Prático**:
```css
:root {
  --color-primary: #1B365D;
  --spacing-base: 1rem;
  --font-family: 'Inter', sans-serif;
}
```

---

### **DOM**
**Definição**: Document Object Model - representação em árvore dos elementos HTML.

**Conceitos Relacionados**:
- DOM manipulation
- Event handling
- Virtual DOM
- Shadow DOM

**Exemplo Prático**:
```javascript
// Manipulação do DOM
const element = document.getElementById('myButton');
element.addEventListener('click', () => {
  element.textContent = 'Clicado!';
});
```

---

### **FID**
**Definição**: First Input Delay - métrica que mede o tempo entre a primeira interação e a resposta.

**Como Medir**:
- Score < 100ms: Bom
- Score 100-300ms: Precisa melhorar
- Score > 300ms: Ruim

**Exemplo Prático**:
```javascript
// Otimizar FID
// Reduzir JavaScript bloqueante
// Usar Web Workers
// Implementar code splitting
```

---

### **Figma**
**Definição**: Ferramenta de design colaborativo para criar interfaces e protótipos.

**Recursos**:
- Design colaborativo
- Prototipagem
- Design systems
- Plugins

**Exemplo Prático**:
```javascript
// Integração Figma com código
// Usar tokens do Figma
// Exportar assets
// Sincronizar designs
```

---

### **Git**
**Definição**: Sistema de controle de versão distribuído para rastrear mudanças no código.

**Conceitos Relacionados**:
- Repository
- Commit
- Branch
- Merge

**Exemplo Prático**:
```bash
# Comandos Git básicos
git add .
git commit -m "feat: adicionar nova funcionalidade"
git push origin main
```

---

### **Grid**
**Definição**: Sistema de layout CSS para criar designs bidimensionais.

**Conceitos Relacionados**:
- Grid container
- Grid items
- Grid lines
- Grid areas

**Exemplo Prático**:
```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
```

---

### **HTML**
**Definição**: HyperText Markup Language - linguagem de marcação para criar páginas web.

**Conceitos Relacionados**:
- Elements
- Attributes
- Semantic HTML
- Accessibility

**Exemplo Prático**:
```html
<article>
  <header>
    <h1>Título do Artigo</h1>
  </header>
  <main>
    <p>Conteúdo do artigo...</p>
  </main>
</article>
```

---

### **HTTPS**
**Definição**: HyperText Transfer Protocol Secure - protocolo seguro para comunicação web.

**Conceitos Relacionados**:
- SSL/TLS
- Certificados
- Encryption
- HSTS

**Exemplo Prático**:
```javascript
// Forçar HTTPS
if (location.protocol !== 'https:') {
  location.replace('https:' + window.location.href.substring(window.location.protocol.length));
}
```

---

### **HSTS**
**Definição**: HTTP Strict Transport Security - header que força conexões HTTPS.

**Benefícios**:
- Previne downgrade attacks
- Força HTTPS
- Melhora segurança

**Exemplo Prático**:
```javascript
// Configurar HSTS
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});
```

---

### **Intersection Observer**
**Definição**: API que permite observar mudanças na interseção de elementos com o viewport.

**Usos**:
- Lazy loading
- Infinite scroll
- Animations
- Analytics

**Exemplo Prático**:
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Elemento visível
    }
  });
});
```

---

### **JavaScript**
**Definição**: Linguagem de programação para criar interatividade em páginas web.

**Conceitos Relacionados**:
- ES6+
- Async/await
- Promises
- Modules

**Exemplo Prático**:
```javascript
// Async/await
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro:', error);
  }
}
```

---

### **JWT**
**Definição**: JSON Web Token - padrão para transmitir informações de forma segura.

**Estrutura**:
- Header
- Payload
- Signature

**Exemplo Prático**:
```javascript
// Criar JWT
const token = jwt.sign(
  { userId: 123, role: 'admin' },
  secretKey,
  { expiresIn: '1h' }
);
```

---

### **LCP**
**Definição**: Largest Contentful Paint - métrica que mede o tempo para carregar o maior elemento.

**Como Medir**:
- Score < 2.5s: Bom
- Score 2.5-4.0s: Precisa melhorar
- Score > 4.0s: Ruim

**Exemplo Prático**:
```javascript
// Otimizar LCP
// Otimizar imagens
// Usar preload
// Minimizar CSS crítico
```

---

### **Lighthouse**
**Definição**: Ferramenta do Google para auditoria de performance, acessibilidade e SEO.

**Métricas**:
- Performance
- Accessibility
- Best Practices
- SEO

**Exemplo Prático**:
```bash
# Executar Lighthouse
lighthouse http://localhost:3000 --output html
```

---

### **Mobile-First**
**Definição**: Abordagem de design que prioriza dispositivos móveis.

**Conceitos Relacionados**:
- Responsive design
- Breakpoints
- Touch targets
- Performance

**Exemplo Prático**:
```css
/* Mobile-first */
.container {
  width: 100%;
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

---

### **Performance**
**Definição**: Medida de quão rápido e eficiente uma aplicação web funciona.

**Métricas**:
- Core Web Vitals
- Lighthouse Score
- Bundle Size
- Load Time

**Exemplo Prático**:
```javascript
// Medir performance
const startTime = performance.now();
// ... código ...
const endTime = performance.now();
console.log(`Tempo: ${endTime - startTime}ms`);
```

---

### **PWA**
**Definição**: Progressive Web App - aplicação web que se comporta como app nativo.

**Características**:
- Service Worker
- Manifest
- Offline support
- Installable

**Exemplo Prático**:
```json
// manifest.json
{
  "name": "FitLog",
  "short_name": "FitLog",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1B365D"
}
```

---

### **Responsive Design**
**Definição**: Abordagem de design que adapta o layout para diferentes tamanhos de tela.

**Conceitos Relacionados**:
- Media queries
- Flexible grids
- Flexible images
- Mobile-first

**Exemplo Prático**:
```css
/* Responsive grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
```

---

### **REST**
**Definição**: Representational State Transfer - estilo arquitetural para APIs web.

**Conceitos Relacionados**:
- HTTP methods
- Resources
- Stateless
- Cacheable

**Exemplo Prático**:
```javascript
// API REST
GET    /api/users        // Listar usuários
POST   /api/users        // Criar usuário
PUT    /api/users/1      // Atualizar usuário
DELETE /api/users/1      // Deletar usuário
```

---

### **Service Worker**
**Definição**: Script que roda em background, permitindo funcionalidades offline.

**Usos**:
- Caching
- Push notifications
- Background sync
- Offline support

**Exemplo Prático**:
```javascript
// Service Worker básico
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

---

### **SEO**
**Definição**: Search Engine Optimization - técnicas para melhorar visibilidade em mecanismos de busca.

**Conceitos Relacionados**:
- Meta tags
- Structured data
- Core Web Vitals
- Content quality

**Exemplo Prático**:
```html
<!-- Meta tags SEO -->
<meta name="description" content="FitLog - Soluções em Logística">
<meta name="keywords" content="logística, transporte, armazenagem">
```

---

### **TypeScript**
**Definição**: Superset do JavaScript que adiciona tipagem estática.

**Benefícios**:
- Type safety
- Better IDE support
- Easier refactoring
- Fewer bugs

**Exemplo Prático**:
```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): User {
  // Implementação
}
```

---

### **UI**
**Definição**: User Interface - elementos visuais com os quais o usuário interage.

**Conceitos Relacionados**:
- Design system
- Components
- Layout
- Visual hierarchy

**Exemplo Prático**:
```css
/* UI component */
.button {
  background: #1B365D;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
}
```

---

### **UX**
**Definição**: User Experience - experiência geral do usuário ao usar um produto.

**Conceitos Relacionados**:
- Usability
- Accessibility
- Performance
- User journey

**Exemplo Prático**:
```javascript
// Melhorar UX
// Reduzir tempo de carregamento
// Simplificar navegação
// Adicionar feedback visual
```

---

### **Vue.js**
**Definição**: Framework JavaScript para criar interfaces de usuário.

**Características**:
- Reactive data binding
- Component-based
- Virtual DOM
- Easy learning curve

**Exemplo Prático**:
```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="increment">Count: {{ count }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello Vue!',
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>
```

---

### **WebP**
**Definição**: Formato de imagem desenvolvido pelo Google com compressão superior.

**Características**:
- 25-35% menor que JPEG
- Suporte a transparência
- Lossy e lossless
- Browsers modernos

**Exemplo Prático**:
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Descrição">
</picture>
```

---

### **Webpack**
**Definição**: Bundler de módulos JavaScript para aplicações web.

**Recursos**:
- Code splitting
- Tree shaking
- Hot reloading
- Loaders

**Exemplo Prático**:
```javascript
// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```

---

## 🔍 **COMO USAR ESTE GLOSSÁRIO**

### **PARA ESTUDO:**
1. **Leia as definições** - Compreenda os conceitos
2. **Analise os exemplos** - Veja aplicações práticas
3. **Conecte conceitos** - Relacione com outros termos
4. **Pratique** - Implemente os exemplos

### **PARA REFERÊNCIA:**
- **Busque por termo** - Use Ctrl+F
- **Navegue por categoria** - Agrupe conceitos relacionados
- **Consulte exemplos** - Veja implementações práticas

### **PARA APRENDIZADO:**
- **Estude progressivamente** - Comece pelos fundamentos
- **Pratique regularmente** - Implemente os conceitos
- **Documente dúvidas** - Anote para revisar depois

---

## 📚 **RECURSOS ADICIONAIS**

### **DOCUMENTAÇÃO:**
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web.dev](https://web.dev/)
- [W3C](https://www.w3.org/)

### **FERRAMENTAS:**
- [Can I Use](https://caniuse.com/) - Suporte de browsers
- [Web.dev Measure](https://web.dev/measure/) - Auditoria de performance
- [WAVE](https://wave.webaim.org/) - Auditoria de acessibilidade

---

**🎯 Este glossário é um recurso vivo - continue expandindo conforme aprende novos conceitos!**
