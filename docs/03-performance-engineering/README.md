# ⚡ **MÓDULO 3: ENGENHARIA DE PERFORMANCE**

## **📋 VISÃO GERAL**

Este módulo aborda as técnicas mais avançadas de otimização de performance web, focando em Core Web Vitals, Critical Rendering Path e otimizações específicas para o projeto FitLog.

---

## 📚 **CONTEÚDO DO MÓDULO**

### **3.1 Core Web Vitals**
- [Fundamentos e Métricas](./01-core-web-vitals.md)
- [LCP - Largest Contentful Paint](./02-lcp-optimization.md)
- [FID - First Input Delay](./03-fid-optimization.md)
- [CLS - Cumulative Layout Shift](./04-cls-optimization.md)

### **3.2 Critical Rendering Path**
- [Conceitos Fundamentais](./05-critical-rendering-path.md)
- [Otimização de CSS](./06-css-optimization.md)
- [Otimização de JavaScript](./07-js-optimization.md)
- [Resource Hints](./08-resource-hints.md)

### **3.3 Caching e Service Workers**
- [Estratégias de Cache](./09-caching-strategies.md)
- [Service Worker Implementation](./10-service-worker.md)
- [Cache API](./11-cache-api.md)
- [Offline Experience](./12-offline-experience.md)

### **3.4 Bundle Optimization**
- [Code Splitting](./13-code-splitting.md)
- [Tree Shaking](./14-tree-shaking.md)
- [Lazy Loading](./15-lazy-loading.md)
- [Preloading](./16-preloading.md)

---

## 🎯 **OBJETIVOS DE APRENDIZADO**

### **CONHECIMENTOS:**
- ✅ Dominar Core Web Vitals e suas métricas
- ✅ Compreender Critical Rendering Path
- ✅ Implementar estratégias de cache eficientes
- ✅ Otimizar bundles e recursos

### **HABILIDADES:**
- ✅ Medir e analisar performance
- ✅ Implementar Service Workers
- ✅ Otimizar carregamento de recursos
- ✅ Criar experiências offline

---

## 🛠️ **FERRAMENTAS NECESSÁRIAS**

### **ANÁLISE:**
- **Lighthouse** - Auditoria completa
- **Chrome DevTools** - Performance profiling
- **WebPageTest** - Análise detalhada
- **GTmetrix** - Monitoramento contínuo

### **OTIMIZAÇÃO:**
- **Webpack** - Bundle optimization
- **Rollup** - Tree shaking
- **Service Worker** - Caching
- **Resource Hints** - Preloading

---

## 📊 **MÉTRICAS DE SUCESSO**

### **ANTES DA OTIMIZAÇÃO:**
- ⚠️ **LCP**: > 4.0s (Ruim)
- ⚠️ **FID**: > 300ms (Ruim)
- ⚠️ **CLS**: > 0.25 (Ruim)
- ⚠️ **Lighthouse Score**: < 70

### **DEPOIS DA OTIMIZAÇÃO:**
- ✅ **LCP**: < 2.5s (Bom)
- ✅ **FID**: < 100ms (Bom)
- ✅ **CLS**: < 0.1 (Bom)
- ✅ **Lighthouse Score**: > 90

---

## 🚀 **IMPLEMENTAÇÃO NO FITLOG**

### **FASE 1: ANÁLISE DE PERFORMANCE**
1. **Auditoria Lighthouse** - Identificar gargalos
2. **Análise de Bundle** - Tamanho dos recursos
3. **Critical Path** - Recursos bloqueantes
4. **Core Web Vitals** - Métricas atuais

### **FASE 2: OTIMIZAÇÃO DE RECURSOS**
1. **Minificação** - CSS, JS, HTML
2. **Compressão** - Gzip, Brotli
3. **Otimização de Imagens** - WebP, AVIF
4. **Fonts** - Preload, display: swap

### **FASE 3: CACHING E SERVICE WORKER**
1. **Cache Headers** - Configuração de cache
2. **Service Worker** - Cache offline
3. **Resource Hints** - Preload, prefetch
4. **CDN** - Distribuição global

### **FASE 4: BUNDLE OPTIMIZATION**
1. **Code Splitting** - Divisão de código
2. **Tree Shaking** - Remoção de código não usado
3. **Lazy Loading** - Carregamento sob demanda
4. **Preloading** - Recursos críticos

---

## 📝 **EXERCÍCIOS PRÁTICOS**

### **EXERCÍCIO 1: Lighthouse Audit**
```bash
# Executar auditoria completa
lighthouse http://localhost:3000 --output html --output-path ./audit.html
```

### **EXERCÍCIO 2: Service Worker**
```javascript
// Implementar cache básico
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

### **EXERCÍCIO 3: Resource Hints**
```html
<!-- Preload recursos críticos -->
<link rel="preload" href="/assets/css/critical.css" as="style">
<link rel="preload" href="/assets/js/main.js" as="script">
```

---

## 📚 **RECURSOS ADICIONAIS**

### **DOCUMENTAÇÃO:**
- [Web.dev - Performance](https://web.dev/performance/)
- [MDN - Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
- [Google - Core Web Vitals](https://web.dev/vitals/)

### **FERRAMENTAS:**
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)

### **BIBLIOTECAS:**
- [Workbox](https://developers.google.com/web/tools/workbox) - Service Worker
- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [Critical](https://github.com/addyosmani/critical) - CSS crítico

---

## 🎯 **PRÓXIMOS PASSOS**

1. **📖 Leia**: [3.1 Core Web Vitals](./01-core-web-vitals.md)
2. **🛠️ Implemente**: Auditoria de performance
3. **📊 Meça**: Métricas atuais
4. **📝 Documente**: Resultados e melhorias

---

**🚀 [Começar Módulo 3.1 →](./01-core-web-vitals.md)**
