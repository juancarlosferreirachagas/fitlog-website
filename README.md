# 🚀 FitLog Website - Logística 100% Digital

[![CI/CD Pipeline](https://github.com/fitlog/website/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/fitlog/website/actions)
[![Security](https://github.com/fitlog/website/workflows/Security/badge.svg)](https://github.com/fitlog/website/actions)
[![Performance](https://github.com/fitlog/website/workflows/Performance/badge.svg)](https://github.com/fitlog/website/actions)
[![Accessibility](https://github.com/fitlog/website/workflows/Accessibility/badge.svg)](https://github.com/fitlog/website/actions)

## 📋 Sobre o Projeto

O **FitLog Website** é uma plataforma moderna e acessível para apresentar os serviços de logística digital da FitLog. Desenvolvido com foco em **performance**, **acessibilidade** e **segurança**, o site oferece uma experiência excepcional para todos os usuários.

### 🎯 Características Principais

- ✅ **100% Acessível** - Conformidade WCAG 2.1 AA
- ⚡ **Alta Performance** - Core Web Vitals otimizados
- 🔒 **Segurança Avançada** - Headers de segurança e CSP
- 📱 **Totalmente Responsivo** - Design adaptativo
- 🌐 **Multilíngue** - Suporte a PT, EN, ES
- 🎨 **Design System** - Componentes reutilizáveis
- 🧪 **Testes Automatizados** - CI/CD completo

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Design system e animações
- **JavaScript ES6+** - Funcionalidades interativas
- **Bootstrap 5.3.2** - Framework CSS
- **AOS** - Animações on scroll
- **Font Awesome 6.5.0** - Ícones

### Ferramentas de Desenvolvimento
- **Playwright** - Testes automatizados
- **ESLint** - Análise de código JavaScript
- **Stylelint** - Análise de CSS
- **HTMLHint** - Análise de HTML
- **Lighthouse CI** - Auditoria de performance
- **axe-core** - Testes de acessibilidade

### CI/CD
- **GitHub Actions** - Pipeline automatizado
- **Netlify** - Deploy e hospedagem
- **Snyk** - Análise de vulnerabilidades
- **Semgrep** - Análise de segurança

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- Python 3.9+
- Git

### 1. Clone o repositório
```bash
git clone https://github.com/fitlog/website.git
cd fitlog-website
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Execute o servidor de desenvolvimento
```bash
npm run dev
```

O site estará disponível em `http://localhost:8000`

## 📁 Estrutura do Projeto

```
fitlog-website/
├── 📁 .github/
│   └── 📁 workflows/
│       └── ci-cd.yml                 # Pipeline CI/CD
├── 📁 assets/
│   ├── 📁 css/
│   │   ├── main.css                  # Estilos principais
│   │   └── design-system.css         # Sistema de design
│   ├── 📁 js/
│   │   ├── main.js                   # Script principal
│   │   ├── i18n.js                   # Internacionalização
│   │   ├── image-optimizer.js        # Otimização de imagens
│   │   ├── accessibility-manager.js  # Gerenciador de acessibilidade
│   │   └── performance-monitor.js    # Monitor de performance
│   ├── 📁 security/
│   │   └── csp-headers.js            # Headers de segurança
│   └── 📁 images/                    # Imagens otimizadas
├── 📁 tests/
│   ├── accessibility.test.js         # Testes de acessibilidade
│   ├── performance.test.js           # Testes de performance
│   └── functionality.test.js         # Testes de funcionalidade
├── 📁 scripts/
│   └── generate-sitemap.js           # Gerador de sitemap
├── index.html                        # Página principal
├── package.json                      # Dependências e scripts
└── README.md                         # Documentação
```

## 🧪 Testes

### Executar todos os testes
```bash
npm run test:all
```

### Testes específicos
```bash
# Testes de acessibilidade
npm run test:accessibility

# Testes de performance
npm run test:performance

# Testes de funcionalidade
npm run test:functionality
```

### Auditorias
```bash
# Lighthouse CI
npm run lighthouse

# Pa11y (acessibilidade)
npm run pa11y

# Análise de vulnerabilidades
npm run audit
```

## 🔧 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run test` | Executa todos os testes |
| `npm run lint` | Análise de código |
| `npm run audit` | Verificação de vulnerabilidades |
| `npm run lighthouse` | Auditoria de performance |
| `npm run deploy:staging` | Deploy para staging |
| `npm run deploy:production` | Deploy para produção |

## 🎨 Design System

O projeto utiliza um sistema de design consistente com:

### Cores
- **Primárias**: Tons de azul para elementos principais
- **Secundárias**: Tons de vermelho para destaques
- **Neutras**: Escala de cinzas para textos e fundos
- **Semânticas**: Verde, amarelo, vermelho para estados

### Tipografia
- **Primária**: Inter (corpo do texto)
- **Secundária**: Outfit (títulos)
- **Monospace**: SF Mono (código)

### Componentes
- Botões com variantes (primary, secondary, outline, ghost)
- Cards com hover effects
- Formulários acessíveis
- Badges e alertas
- Loading spinners

## ♿ Acessibilidade

### Recursos Implementados
- **Navegação por teclado** completa
- **Screen reader** compatibility
- **ARIA labels** dinâmicos
- **Skip links** para navegação rápida
- **Live regions** para anúncios
- **Alto contraste** e **redução de movimento**
- **Foco visível** aprimorado

### Atalhos de Teclado
- `Tab` - Navegação sequencial
- `Shift + Tab` - Navegação reversa
- `Esc` - Fechar modais
- `Alt + M` - Menu principal
- `Alt + S` - Pular para serviços
- `Alt + C` - Pular para contato

## ⚡ Performance

### Métricas Monitoradas
- **LCP** (Largest Contentful Paint) < 2.5s
- **FID** (First Input Delay) < 100ms
- **CLS** (Cumulative Layout Shift) < 0.1
- **FCP** (First Contentful Paint) < 1.8s
- **TTFB** (Time to First Byte) < 600ms
- **TTI** (Time to Interactive) < 3.8s

### Otimizações
- **Preload** de recursos críticos
- **Lazy loading** de imagens
- **Minificação** de CSS/JS/HTML
- **Compressão** de imagens (WebP/AVIF)
- **CDN** para recursos externos

## 🔒 Segurança

### Headers Implementados
- **Content Security Policy** (CSP)
- **X-Content-Type-Options**
- **X-Frame-Options**
- **X-XSS-Protection**
- **Referrer-Policy**
- **Permissions-Policy**

### Análises Automáticas
- **Snyk** - Vulnerabilidades de dependências
- **Semgrep** - Análise de código
- **npm audit** - Auditoria de pacotes
- **Lighthouse CI** - Auditoria de segurança

## 🌐 Internacionalização

### Idiomas Suportados
- 🇧🇷 **Português** (padrão)
- 🇺🇸 **English**
- 🇪🇸 **Español**

### Recursos
- Tradução dinâmica de conteúdo
- Formatação de datas e números
- Direção de texto (LTR/RTL)
- Fallback para idioma padrão

## 🚀 Deploy

### Ambientes
- **Staging**: `develop` branch → Netlify Staging
- **Production**: `main` branch → Netlify Production

### Pipeline CI/CD
1. **Análise de código** (ESLint, Stylelint, HTMLHint)
2. **Testes automatizados** (Playwright)
3. **Testes de segurança** (Snyk, Semgrep)
4. **Auditoria de performance** (Lighthouse CI)
5. **Build e otimização**
6. **Deploy automático**
7. **Monitoramento pós-deploy**

## 📊 Monitoramento

### Métricas em Tempo Real
- Performance do usuário
- Erros JavaScript
- Recursos lentos
- Interações do usuário
- Core Web Vitals

### Integração com Analytics
- Google Analytics 4
- Endpoint customizado
- Relatórios automatizados

## 🤝 Contribuição

### Como Contribuir
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código
- ESLint para JavaScript
- Stylelint para CSS
- HTMLHint para HTML
- Testes obrigatórios para novas features
- Documentação atualizada

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Contato

**FitLog** - Logística 100% Digital
- 📧 Email: sac@fitlog.com.br
- 📱 Telefone: +55 11 4962-6348
- 🌐 Website: https://fitlog.com.br
- 📍 Endereço: Condomínio CL Aeroporto, Rua Jamil João Zarif, 684 - Galpão 6, Aeroporto, Guarulhos - SP, 07143-000

## 🙏 Agradecimentos

- Equipe de desenvolvimento FitLog
- Comunidade open source
- Contribuidores e testadores
- Parceiros e clientes

---

**Desenvolvido com ❤️ pela equipe FitLog**