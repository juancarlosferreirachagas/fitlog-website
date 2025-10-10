/**
 * Testes de Acessibilidade - FitLog Website
 * Suite de testes para garantir conformidade WCAG 2.1 AA
 * 
 * @description
 * Este arquivo implementa testes automatizados para:
 * - Contraste de cores
 * - Navegação por teclado
 * - ARIA labels
 * - Screen reader compatibility
 * - Foco visível
 * - Estrutura semântica
 * 
 * @author FitLog QA Team
 * @version 1.0.0
 * @since 2024-12-19
 */

const { test, expect } = require('@playwright/test');

class AccessibilityTester {
    constructor(page) {
        this.page = page;
    }
    
    /**
     * Testa contraste de cores em todos os elementos
     */
    async testColorContrast() {
        console.log('🎨 Testando contraste de cores...');
        
        // Testa contraste em textos
        const textElements = await this.page.locator('p, h1, h2, h3, h4, h5, h6, span, a, button').all();
        
        for (const element of textElements) {
            const color = await element.evaluate(el => {
                const styles = window.getComputedStyle(el);
                return {
                    color: styles.color,
                    backgroundColor: styles.backgroundColor
                };
            });
            
            // Verifica se o contraste é adequado (4.5:1 para texto normal)
            const contrast = this.calculateContrast(color.color, color.backgroundColor);
            expect(contrast).toBeGreaterThanOrEqual(4.5);
        }
    }
    
    /**
     * Testa navegação por teclado
     */
    async testKeyboardNavigation() {
        console.log('⌨️ Testando navegação por teclado...');
        
        // Testa Tab navigation
        await this.page.keyboard.press('Tab');
        const firstFocused = await this.page.locator(':focus');
        expect(firstFocused).toBeVisible();
        
        // Testa navegação sequencial
        for (let i = 0; i < 5; i++) {
            await this.page.keyboard.press('Tab');
            const focused = await this.page.locator(':focus');
            expect(focused).toBeVisible();
        }
        
        // Testa Shift+Tab (navegação reversa)
        await this.page.keyboard.press('Shift+Tab');
        const previousFocused = await this.page.locator(':focus');
        expect(previousFocused).toBeVisible();
    }
    
    /**
     * Testa ARIA labels e roles
     */
    async testAriaLabels() {
        console.log('🏷️ Testando ARIA labels...');
        
        // Testa botões sem texto
        const iconButtons = await this.page.locator('button:not([aria-label]):not([aria-labelledby])').all();
        for (const button of iconButtons) {
            const hasText = await button.textContent();
            if (!hasText.trim()) {
                // Botão sem texto deve ter aria-label
                const ariaLabel = await button.getAttribute('aria-label');
                expect(ariaLabel).toBeTruthy();
            }
        }
        
        // Testa modais
        const modals = await this.page.locator('.modal, .service-modal').all();
        for (const modal of modals) {
            const role = await modal.getAttribute('role');
            const ariaModal = await modal.getAttribute('aria-modal');
            const ariaHidden = await modal.getAttribute('aria-hidden');
            
            expect(role).toBe('dialog');
            expect(ariaModal).toBe('true');
            expect(ariaHidden).toBeTruthy();
        }
        
        // Testa landmarks
        const main = await this.page.locator('main, [role="main"]');
        expect(main).toBeVisible();
        
        const nav = await this.page.locator('nav, [role="navigation"]');
        expect(nav).toBeVisible();
        
        const footer = await this.page.locator('footer, [role="contentinfo"]');
        expect(footer).toBeVisible();
    }
    
    /**
     * Testa foco visível
     */
    async testFocusVisible() {
        console.log('👁️ Testando foco visível...');
        
        // Ativa navegação por teclado
        await this.page.keyboard.press('Tab');
        
        // Verifica se o elemento focado tem outline visível
        const focusedElement = await this.page.locator(':focus');
        const outline = await focusedElement.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
                outline: styles.outline,
                outlineWidth: styles.outlineWidth,
                outlineStyle: styles.outlineStyle
            };
        });
        
        expect(outline.outlineWidth).not.toBe('0px');
        expect(outline.outlineStyle).not.toBe('none');
    }
    
    /**
     * Testa estrutura semântica
     */
    async testSemanticStructure() {
        console.log('📋 Testando estrutura semântica...');
        
        // Verifica se há apenas um h1 por página
        const h1Elements = await this.page.locator('h1').count();
        expect(h1Elements).toBe(1);
        
        // Verifica hierarquia de cabeçalhos
        const headings = await this.page.locator('h1, h2, h3, h4, h5, h6').all();
        let previousLevel = 0;
        
        for (const heading of headings) {
            const tagName = await heading.evaluate(el => el.tagName);
            const level = parseInt(tagName.substring(1));
            
            // Nível não deve pular mais de 1
            if (previousLevel > 0) {
                expect(level - previousLevel).toBeLessThanOrEqual(1);
            }
            
            previousLevel = level;
        }
        
        // Verifica se listas têm itens
        const lists = await this.page.locator('ul, ol').all();
        for (const list of lists) {
            const items = await list.locator('li').count();
            expect(items).toBeGreaterThan(0);
        }
    }
    
    /**
     * Testa formulários acessíveis
     */
    async testFormAccessibility() {
        console.log('📝 Testando acessibilidade de formulários...');
        
        // Testa labels associados a inputs
        const inputs = await this.page.locator('input, textarea, select').all();
        for (const input of inputs) {
            const id = await input.getAttribute('id');
            const ariaLabel = await input.getAttribute('aria-label');
            const ariaLabelledby = await input.getAttribute('aria-labelledby');
            
            if (id) {
                const label = await this.page.locator(`label[for="${id}"]`);
                const hasLabel = await label.count() > 0;
                expect(hasLabel || ariaLabel || ariaLabelledby).toBeTruthy();
            }
        }
        
        // Testa validação de formulário
        const forms = await this.page.locator('form').all();
        for (const form of forms) {
            const requiredInputs = await form.locator('input[required], textarea[required], select[required]').all();
            for (const input of requiredInputs) {
                const ariaRequired = await input.getAttribute('aria-required');
                expect(ariaRequired).toBe('true');
            }
        }
    }
    
    /**
     * Testa skip links
     */
    async testSkipLinks() {
        console.log('⏭️ Testando skip links...');
        
        const skipLinks = await this.page.locator('.skip-link, a[href^="#"]').all();
        expect(skipLinks.length).toBeGreaterThan(0);
        
        for (const link of skipLinks) {
            const href = await link.getAttribute('href');
            if (href.startsWith('#')) {
                const targetId = href.substring(1);
                const target = await this.page.locator(`#${targetId}`);
                expect(target).toBeVisible();
            }
        }
    }
    
    /**
     * Testa live regions
     */
    async testLiveRegions() {
        console.log('🔊 Testando live regions...');
        
        const liveRegions = await this.page.locator('[aria-live]').all();
        expect(liveRegions.length).toBeGreaterThan(0);
        
        for (const region of liveRegions) {
            const ariaLive = await region.getAttribute('aria-live');
            expect(['polite', 'assertive', 'off']).toContain(ariaLive);
        }
    }
    
    /**
     * Calcula contraste entre duas cores
     * @param {string} color1 - Primeira cor
     * @param {string} color2 - Segunda cor
     * @returns {number} Ratio de contraste
     */
    calculateContrast(color1, color2) {
        const rgb1 = this.hexToRgb(color1);
        const rgb2 = this.hexToRgb(color2);
        
        const luminance1 = this.getLuminance(rgb1);
        const luminance2 = this.getLuminance(rgb2);
        
        const lighter = Math.max(luminance1, luminance2);
        const darker = Math.min(luminance1, luminance2);
        
        return (lighter + 0.05) / (darker + 0.05);
    }
    
    /**
     * Converte cor hex para RGB
     * @param {string} hex - Cor em formato hex
     * @returns {Object} Objeto RGB
     */
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    /**
     * Calcula luminância de uma cor RGB
     * @param {Object} rgb - Objeto RGB
     * @returns {number} Luminância
     */
    getLuminance(rgb) {
        const { r, g, b } = rgb;
        const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }
}

// Testes principais
test.describe('Acessibilidade - FitLog Website', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
        await page.waitForLoadState('networkidle');
    });
    
    test('Contraste de cores deve ser adequado', async ({ page }) => {
        const tester = new AccessibilityTester(page);
        await tester.testColorContrast();
    });
    
    test('Navegação por teclado deve funcionar', async ({ page }) => {
        const tester = new AccessibilityTester(page);
        await tester.testKeyboardNavigation();
    });
    
    test('ARIA labels devem estar presentes', async ({ page }) => {
        const tester = new AccessibilityTester(page);
        await tester.testAriaLabels();
    });
    
    test('Foco deve ser visível', async ({ page }) => {
        const tester = new AccessibilityTester(page);
        await tester.testFocusVisible();
    });
    
    test('Estrutura semântica deve estar correta', async ({ page }) => {
        const tester = new AccessibilityTester(page);
        await tester.testSemanticStructure();
    });
    
    test('Formulários devem ser acessíveis', async ({ page }) => {
        const tester = new AccessibilityTester(page);
        await tester.testFormAccessibility();
    });
    
    test('Skip links devem funcionar', async ({ page }) => {
        const tester = new AccessibilityTester(page);
        await tester.testSkipLinks();
    });
    
    test('Live regions devem estar configuradas', async ({ page }) => {
        const tester = new AccessibilityTester(page);
        await tester.testLiveRegions();
    });
});

// Teste de integração
test.describe('Integração - Acessibilidade', () => {
    test('Site deve passar em auditoria de acessibilidade', async ({ page }) => {
        await page.goto('http://localhost:3000');
        
        // Executa auditoria com axe-core
        const results = await page.evaluate(() => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/axe-core@4.7.0/axe.min.js';
                script.onload = () => {
                    axe.run().then(resolve);
                };
                document.head.appendChild(script);
            });
        });
        
        expect(results.violations).toHaveLength(0);
    });
});

module.exports = AccessibilityTester;