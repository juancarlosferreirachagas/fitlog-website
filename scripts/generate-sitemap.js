/**
 * Gerador de Sitemap - FitLog Website
 * Gera sitemap.xml automaticamente
 * 
 * @description
 * Este script gera um sitemap.xml para o site FitLog
 * incluindo todas as páginas e seções importantes
 * 
 * @author FitLog SEO Team
 * @version 1.0.0
 * @since 2024-12-19
 */

const fs = require('fs');
const path = require('path');

class SitemapGenerator {
    constructor() {
        this.baseUrl = 'https://fitlog.com.br';
        this.pages = [
            {
                url: '/',
                priority: '1.0',
                changefreq: 'weekly',
                lastmod: new Date().toISOString()
            },
            {
                url: '/#services',
                priority: '0.9',
                changefreq: 'monthly',
                lastmod: new Date().toISOString()
            },
            {
                url: '/#about',
                priority: '0.8',
                changefreq: 'monthly',
                lastmod: new Date().toISOString()
            },
            {
                url: '/#contact',
                priority: '0.8',
                changefreq: 'monthly',
                lastmod: new Date().toISOString()
            }
        ];
    }
    
    /**
     * Gera o conteúdo do sitemap
     * @returns {string} Conteúdo XML do sitemap
     */
    generateSitemap() {
        let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
        sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
        
        this.pages.forEach(page => {
            sitemap += '  <url>\n';
            sitemap += `    <loc>${this.baseUrl}${page.url}</loc>\n`;
            sitemap += `    <lastmod>${page.lastmod}</lastmod>\n`;
            sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
            sitemap += `    <priority>${page.priority}</priority>\n`;
            sitemap += '  </url>\n';
        });
        
        sitemap += '</urlset>';
        return sitemap;
    }
    
    /**
     * Salva o sitemap no arquivo
     * @param {string} outputPath - Caminho de saída
     */
    saveSitemap(outputPath = 'sitemap.xml') {
        try {
            const sitemapContent = this.generateSitemap();
            fs.writeFileSync(outputPath, sitemapContent, 'utf8');
            console.log(`✅ Sitemap gerado com sucesso: ${outputPath}`);
            console.log(`📊 Total de páginas: ${this.pages.length}`);
        } catch (error) {
            console.error('❌ Erro ao gerar sitemap:', error.message);
            process.exit(1);
        }
    }
    
    /**
     * Adiciona uma nova página ao sitemap
     * @param {Object} page - Objeto da página
     */
    addPage(page) {
        this.pages.push({
            url: page.url,
            priority: page.priority || '0.5',
            changefreq: page.changefreq || 'monthly',
            lastmod: page.lastmod || new Date().toISOString()
        });
    }
    
    /**
     * Remove uma página do sitemap
     * @param {string} url - URL da página
     */
    removePage(url) {
        this.pages = this.pages.filter(page => page.url !== url);
    }
    
    /**
     * Atualiza a data de modificação de uma página
     * @param {string} url - URL da página
     * @param {Date} lastmod - Nova data de modificação
     */
    updateLastmod(url, lastmod = new Date()) {
        const page = this.pages.find(p => p.url === url);
        if (page) {
            page.lastmod = lastmod.toISOString();
        }
    }
    
    /**
     * Gera robots.txt
     * @param {string} outputPath - Caminho de saída
     */
    generateRobotsTxt(outputPath = 'robots.txt') {
        const robotsContent = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${this.baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin areas (if any)
Disallow: /admin/
Disallow: /private/
Disallow: /temp/

# Allow important pages
Allow: /assets/
Allow: /css/
Allow: /js/
Allow: /images/
`;
        
        try {
            fs.writeFileSync(outputPath, robotsContent, 'utf8');
            console.log(`✅ robots.txt gerado com sucesso: ${outputPath}`);
        } catch (error) {
            console.error('❌ Erro ao gerar robots.txt:', error.message);
        }
    }
}

// Execução do script
if (require.main === module) {
    const generator = new SitemapGenerator();
    
    // Gera sitemap
    generator.saveSitemap('sitemap.xml');
    
    // Gera robots.txt
    generator.generateRobotsTxt('robots.txt');
    
    console.log('🎉 Processo concluído com sucesso!');
}

module.exports = SitemapGenerator;
