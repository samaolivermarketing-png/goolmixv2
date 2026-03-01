/**
 * SEO Utility functions for real-time analysis and scoring.
 */

export interface SEOAnalysis {
    score: number;
    label: 'Precisa de melhorias' | 'Bom' | 'Excelente';
    checklist: {
        id: string;
        label: string;
        status: 'success' | 'warning' | 'error';
        tip: string;
    }[];
    wordCount: number;
    readingTime: string;
}

export const seoUtils = {
    // Sanitizes a string into a URL-friendly slug
    generateSlug: (text: string): string => {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/[^\w\s-]/g, '') // Remove special chars
            .replace(/\s+/g, '-') // Spaces to hyphens
            .replace(/-+/g, '-') // Collapse hyphens
            .trim();
    },

    // Calculates reading time based on word count (avg 200 wpm)
    calculateReadingTime: (text: string): string => {
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} min`;
    },

    // Main analysis function
    analyzeContent: (
        content: string,
        title: string,
        metaTitle: string,
        metaDescription: string,
        keyword: string,
        slug: string
    ): SEOAnalysis => {
        const checklist: SEOAnalysis['checklist'] = [];
        const plainText = content.replace(/<[^>]*>/g, ''); // Strip HTML
        const wordCount = plainText.trim().split(/\s+/).length;

        let score = 0;
        const kw = keyword.toLowerCase().trim();

        // 1. Keyword in H1 (Title)
        const hasKwInTitle = title.toLowerCase().includes(kw);
        checklist.push({
            id: 'kw-h1',
            label: 'Palavra-chave no título (H1)',
            status: kw && hasKwInTitle ? 'success' : 'error',
            tip: 'O H1 deve conter a palavra-chave principal.'
        });
        if (kw && hasKwInTitle) score += 10;

        // 2. Keyword in Meta Description
        const hasKwInMetaDesc = metaDescription.toLowerCase().includes(kw);
        checklist.push({
            id: 'kw-meta',
            label: 'Palavra-chave na Meta Description',
            status: kw && hasKwInMetaDesc ? 'success' : 'error',
            tip: 'A meta descrição deve conter a palavra-chave para melhor CTR.'
        });
        if (kw && hasKwInMetaDesc) score += 10;

        // 3. Keyword in Slug
        const hasKwInSlug = slug.toLowerCase().includes(seoUtils.generateSlug(kw));
        checklist.push({
            id: 'kw-slug',
            label: 'Palavra-chave na URL (Slug)',
            status: kw && hasKwInSlug ? 'success' : 'error',
            tip: 'O slug da URL deve ser curto e conter a palavra-chave.'
        });
        if (kw && hasKwInSlug) score += 10;

        // 4. Content Length
        checklist.push({
            id: 'length',
            label: 'Comprimento do conteúdo',
            status: wordCount >= 300 ? 'success' : wordCount >= 150 ? 'warning' : 'error',
            tip: 'Mínimo recomendado: 300 palavras para SEO.'
        });
        if (wordCount >= 300) score += 15;
        else if (wordCount >= 150) score += 7;

        // 5. Headings (H2/H3)
        const hasSubheadings = /<h[23][^>]*>/i.test(content);
        checklist.push({
            id: 'headings',
            label: 'Uso de subtítulos (H2/H3)',
            status: hasSubheadings ? 'success' : 'error',
            tip: 'Use subtítulos para organizar o conteúdo e facilitar a leitura.'
        });
        if (hasSubheadings) score += 10;

        // 6. Meta Title Length (50-60)
        const mtLen = metaTitle.length;
        checklist.push({
            id: 'mt-len',
            label: 'Comprimento do Meta Title',
            status: mtLen >= 50 && mtLen <= 60 ? 'success' : 'warning',
            tip: 'Ideal: 50 a 60 caracteres.'
        });
        if (mtLen >= 50 && mtLen <= 60) score += 10;

        // 7. Meta Description Length (150-160)
        const mdLen = metaDescription.length;
        checklist.push({
            id: 'md-len',
            label: 'Comprimento da Meta Description',
            status: mdLen >= 140 && mdLen <= 160 ? 'success' : 'warning',
            tip: 'Ideal: 140 a 160 caracteres.'
        });
        if (mdLen >= 140 && mdLen <= 160) score += 10;

        // 8. Keyword Density (0.5% - 2.5%)
        const kwCount = (plainText.toLowerCase().match(new RegExp(kw, 'g')) || []).length;
        const density = (kwCount / wordCount) * 100;
        checklist.push({
            id: 'density',
            label: 'Densidade da palavra-chave',
            status: kw && density >= 0.5 && density <= 2.5 ? 'success' : 'warning',
            tip: 'A densidade ideal é entre 0.5% e 2.5%.'
        });
        if (kw && density >= 0.5 && density <= 2.5) score += 15;

        // Labels
        let label: SEOAnalysis['label'] = 'Precisa de melhorias';
        if (score >= 80) label = 'Excelente';
        else if (score >= 50) label = 'Bom';

        return {
            score,
            label,
            checklist,
            wordCount,
            readingTime: seoUtils.calculateReadingTime(plainText)
        };
    },

    // Generates JSON-LD Schema
    generateSchema: (article: any): string => {
        const schema = {
            "@context": "https://schema.org",
            "@type": article.schemaType || "BlogPosting",
            "headline": article.metaTitle || article.title,
            "description": article.metaDescription || article.excerpt,
            "author": {
                "@type": "Person",
                "name": article.author
            },
            "datePublished": article.date,
            "dateModified": article.lastModified || article.date,
            "image": article.image
        };
        return JSON.stringify(schema, null, 2);
    }
};
