#!/bin/bash

# Script para organizar commits das melhorias implementadas
# Este script organiza as melhorias em commits lógicos e separados

echo "🚀 Iniciando processo de commit das melhorias..."

# Verifica se estamos em um repositório git
if [ ! -d ".git" ]; then
    echo "❌ Erro: Este não é um repositório git"
    exit 1
fi

# Adiciona arquivos de documentação primeiro
echo "📝 Commit 1: Documentação e análise"
git add docs/code-review/
git commit -m "docs: Adiciona relatórios de análise e implementação

- Relatório completo de análise do código atual
- Identificação de problemas críticos
- Plano de melhorias estruturado
- Métricas de performance, acessibilidade e segurança"

# Adiciona sistema de segurança
echo "🔒 Commit 2: Sistema de segurança"
git add assets/security/
git commit -m "feat: Implementa sistema de segurança avançado

- CSP headers configurados
- Security headers implementados
- Proteção contra XSS e clickjacking
- Políticas de segurança robustas"

# Adiciona otimização de imagens
echo "🖼️ Commit 3: Otimização de imagens"
git add assets/js/image-optimizer.js
git commit -m "feat: Implementa sistema de otimização de imagens

- Lazy loading com Intersection Observer
- Detecção automática de formatos modernos (WebP/AVIF)
- Fallbacks para navegadores antigos
- Otimização baseada na qualidade da conexão
- Preload de imagens críticas"

# Adiciona sistema de acessibilidade
echo "♿ Commit 4: Sistema de acessibilidade"
git add assets/js/accessibility-manager.js
git commit -m "feat: Implementa sistema de acessibilidade WCAG 2.1 AA

- Navegação por teclado completa
- ARIA labels dinâmicos
- Screen reader compatibility
- Skip links funcionais
- Live regions para anúncios
- Suporte a preferências do usuário"

# Adiciona design system
echo "🎨 Commit 5: Design System moderno"
git add assets/css/design-system.css
git commit -m "feat: Implementa Design System moderno

- Design tokens consistentes
- Componentes reutilizáveis
- Sistema de cores acessível
- Tipografia escalável
- Espaçamentos padronizados
- Suporte a modo escuro e alto contraste"

# Adiciona monitor de performance
echo "⚡ Commit 6: Monitor de performance"
git add assets/js/performance-monitor.js
git commit -m "feat: Implementa monitor de performance em tempo real

- Core Web Vitals monitoring (LCP, FID, CLS)
- Performance API integration
- Real User Monitoring (RUM)
- Error tracking automático
- Analytics integration"

# Adiciona testes automatizados
echo "🧪 Commit 7: Testes automatizados"
git add tests/
git commit -m "feat: Implementa testes automatizados

- Testes de acessibilidade WCAG 2.1
- Testes de performance
- Testes de funcionalidade
- Integração com Playwright
- Cobertura completa de testes"

# Adiciona CI/CD pipeline
echo "🚀 Commit 8: CI/CD pipeline"
git add .github/workflows/
git commit -m "feat: Implementa pipeline CI/CD completo

- Análise de código (ESLint, Stylelint, HTMLHint)
- Testes automatizados (Playwright)
- Testes de segurança (Snyk, Semgrep)
- Deploy automático (Netlify)
- Monitoramento pós-deploy"

# Adiciona configuração do projeto
echo "⚙️ Commit 9: Configuração do projeto"
git add package.json
git commit -m "feat: Atualiza configuração do projeto

- Scripts de build e deploy
- Dependências de desenvolvimento
- Configuração de testes
- Scripts de análise
- Configuração de bundlesize"

# Adiciona melhorias no HTML
echo "🌐 Commit 10: Melhorias no HTML"
git add index.html
git commit -m "feat: Implementa melhorias no HTML principal

- Headers de segurança
- Preload de recursos críticos
- Structured Data expandido
- Meta tags otimizadas
- Integração com novos sistemas"

# Adiciona script de commit
echo "📜 Commit 11: Scripts de automação"
git add scripts/
git commit -m "feat: Adiciona scripts de automação

- Script de commit organizado
- Automação de deploy
- Scripts de análise
- Utilitários de desenvolvimento"

echo "✅ Todos os commits foram criados com sucesso!"
echo ""
echo "📊 Resumo dos commits:"
echo "1. 📝 Documentação e análise"
echo "2. 🔒 Sistema de segurança"
echo "3. 🖼️ Otimização de imagens"
echo "4. ♿ Sistema de acessibilidade"
echo "5. 🎨 Design System moderno"
echo "6. ⚡ Monitor de performance"
echo "7. 🧪 Testes automatizados"
echo "8. 🚀 CI/CD pipeline"
echo "9. ⚙️ Configuração do projeto"
echo "10. 🌐 Melhorias no HTML"
echo "11. 📜 Scripts de automação"
echo ""
echo "🚀 Pronto para push para o repositório remoto!"
echo "Execute: git push origin main"
