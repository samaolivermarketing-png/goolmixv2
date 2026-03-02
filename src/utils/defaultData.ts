import { BlogArticle, MediaFile } from './storage';

export const DEFAULT_ARTICLES: BlogArticle[] = [
    {
        id: "como-calcular-volume-concreto",
        title: "Como calcular o volume de concreto para sua laje (Guia Prático)",
        excerpt: "Aprenda a fórmula simples para não errar na quantidade de concreto usinado e evitar desperdícios ou falta de material na hora da concretagem.",
        content: `
      <h2>O que é o cálculo de volume de concreto?</h2>
      <p>O cálculo de volume de concreto é a determinação da quantidade exata de material (em metros cúbicos - m³) necessária para preencher uma fôrma ou estrutura. Um cálculo preciso evita desperdícios financeiros e garante que a concretagem não seja interrompida por falta de material.</p>

      <h2>Fórmula Básica para Lajes Maciças</h2>
      <p>Para calcular o volume de uma laje retangular ou quadrada, a fórmula é simples:</p>
      <ul>
        <li><strong>Volume (m³) = Comprimento (m) × Largura (m) × Espessura (m)</strong></li>
      </ul>
      <p><strong>Exemplo Prático:</strong> Se você tem uma laje de 10 metros de comprimento, 5 metros de largura e 10 centímetros (0,10m) de espessura:</p>
      <ul>
        <li>Volume = 10 × 5 × 0,10 = <strong>5 m³ de concreto</strong>.</li>
      </ul>

      <h2>Margem de Segurança (Perda)</h2>
      <p>Na construção civil, é padrão adicionar uma margem de segurança (também chamada de taxa de perda) ao volume calculado. Essa margem cobre pequenas variações nas fôrmas, recalque, e o volume que fica retido na bomba ou no caminhão.</p>
      <ul>
        <li><strong>Recomendação:</strong> Adicione de <strong>5% a 10%</strong> ao volume total calculado.</li>
        <li>No exemplo acima: 5 m³ + 5% = 5,25 m³. Você deve pedir 5,5 m³ (já que as usinas geralmente vendem em frações de 0,5 m³).</li>
      </ul>

      <h2>Por que comprar concreto usinado?</h2>
      <p>Comprar o concreto pronto da usina garante homogeneidade, resistência controlada (Fck exato) e velocidade na aplicação, especialmente quando combinado com o serviço de bombeamento.</p>
    `,
        date: "15 Out 2023",
        author: "Eng. Responsável",
        image: "https://picsum.photos/seed/blog1/600/400",
        category: "Técnico",
        status: "published",
        slug: "como-calcular-volume-concreto",
        metaTitle: "Como calcular o volume de concreto para sua laje | Guia Gool Mix",
        metaDescription: "Aprenda a calcular o volume de concreto (m³) para sua laje de forma simples e rápida. Evite desperdícios na sua obra com nosso guia prático.",
        focusKeyword: "calcular volume de concreto",
        secondaryKeywords: ["concreto usinado", "laje", "obra"],
        schemaType: 'Article',
        robotsIndex: true,
        robotsFollow: true,
        readingTime: "4 min"
    },
    {
        id: "vantagens-concreto-usinado",
        title: "Concreto Usinado vs. Virado na Obra: Qual a melhor opção?",
        excerpt: "Descubra por que o concreto usinado oferece mais resistência, economia de tempo e garantia de qualidade em comparação ao método tradicional.",
        content: `
      <h2>Qual a diferença?</h2>
      <p>O concreto virado na obra é feito manualmente ou com betoneiras pequenas no canteiro. O concreto usinado é produzido em usinas com dosagem eletrônica.</p>
      <h2>Vantagens do Usinado</h2>
      <ul>
        <li>Resistência garantida (FCK)</li>
        <li>Agilidade na execução</li>
        <li>Redução de mão de obra</li>
      </ul>
    `,
        date: "02 Nov 2023",
        author: "Equipe Técnica",
        image: "https://picsum.photos/seed/blog2/600/400",
        category: "Dicas",
        status: "published",
        slug: "vantagens-concreto-usinado",
        metaTitle: "Concreto Usinado vs. Virado na Obra: Qual a melhor opção?",
        metaDescription: "Veja as vantagens do concreto usinado em relação ao virado na obra. Mais resistência, agilidade e economia para sua construção.",
        focusKeyword: "concreto usinado",
        secondaryKeywords: ["virado na obra", "resistência", "obra"],
        schemaType: 'Article',
        robotsIndex: true,
        robotsFollow: true,
        readingTime: "3 min"
    },
    {
        id: "o-que-e-slump-test",
        title: "O que é Slump Test e por que ele é crucial para sua obra?",
        excerpt: "Entenda o teste de abatimento do concreto, como ele mede a trabalhabilidade e por que você nunca deve aceitar um caminhão fora da especificação.",
        content: `
      <h2>Controle de Qualidade</h2>
      <p>O Slump Test mede a consistência do concreto antes da aplicação. Um Slump errado pode comprometer a bombeabilidade ou a resistência final.</p>
    `,
        date: "20 Nov 2023",
        author: "Controle de Qualidade",
        image: "https://picsum.photos/seed/blog3/600/400",
        category: "Qualidade",
        status: "published",
        slug: "o-que-e-slump-test",
        metaTitle: "O que é Slump Test e por que é importante? | Gool Mix",
        metaDescription: "Entenda o que é Slump Test e como ele garante a qualidade do concreto na sua obra. Saiba por que o abatimento é fundamental.",
        focusKeyword: "slump test",
        secondaryKeywords: ["qualidade concreto", "abatimento", "obra"],
        schemaType: 'Article',
        robotsIndex: true,
        robotsFollow: true,
        readingTime: "3 min"
    }
];

export const DEFAULT_MEDIA: MediaFile[] = [
    {
        id: 'default-1',
        url: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=800',
        name: 'Canteiro de Obras.jpg',
        type: 'image/jpeg',
        size: 154200,
        date: new Date().toISOString()
    },
    {
        id: 'default-2',
        url: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800',
        name: 'Concreto Usinado.jpg',
        type: 'image/jpeg',
        size: 245000,
        date: new Date().toISOString()
    },
    {
        id: 'default-3',
        url: 'https://images.unsplash.com/photo-1590060132849-3f044007548f?auto=format&fit=crop&q=80&w=800',
        name: 'Caminhão Betoneira.jpg',
        type: 'image/jpeg',
        size: 312000,
        date: new Date().toISOString()
    }
];
