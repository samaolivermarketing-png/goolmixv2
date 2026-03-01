import { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Calendar, User, ArrowLeft } from 'lucide-react';

import { storage } from '../utils/storage';

export function BlogPost() {
  const { id } = useParams();
  const [phones, setPhones] = useState(storage.getPhones());

  useEffect(() => {
    const handleUpdate = () => setPhones(storage.getPhones());
    window.addEventListener('storage-update', handleUpdate);
    return () => window.removeEventListener('storage-update', handleUpdate);
  }, []);
  const post = storage.getArticles().find(a => a.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artigo não encontrado</h1>
          <Link to="/blog" className="text-navy-900 font-semibold underline">Voltar para o Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={post.metaTitle || `${post.title} | Gool Mix Concreto`}
        description={post.metaDescription || post.excerpt}
        canonical={`/blog/${post.slug || post.id}`}
        image={post.ogImage || post.image}
        robots={`${post.robotsIndex ? 'index' : 'noindex'}, ${post.robotsFollow ? 'follow' : 'nofollow'}`}
        schema={{
          "@context": "https://schema.org",
          "@type": post.schemaType || "Article",
          "headline": post.title,
          "image": [post.image],
          "datePublished": post.date,
          "dateModified": post.lastModified || post.date,
          "author": [{
            "@type": "Person",
            "name": post.author
          }]
        }}
      />

      <article className="bg-gray-light py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumbs */}
          <nav className="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="hover:text-navy-900 transition-colors">Início</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <Link to="/blog" className="hover:text-navy-900 transition-colors">Blog</Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <span className="text-navy-900 font-medium truncate max-w-[200px] sm:max-w-none">
                    {post.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-600 space-x-6">
              <span className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {post.date}
              </span>
              <span className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                {post.author}
              </span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-md">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover max-h-[500px]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Content (LLM Optimized Structure) */}
          <div
            className="prose prose-lg prose-navy max-w-none bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-200
              prose-headings:text-navy-900 prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-p:text-navy-700 prose-p:leading-relaxed prose-p:mb-6
              prose-ul:list-disc prose-ul:pl-6 prose-li:text-navy-700 prose-li:mb-2
              prose-strong:text-navy-900 prose-strong:font-bold"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA / Conclusion */}
          <div className="mt-16 bg-navy-900 rounded-2xl p-10 text-center text-white shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Precisa de ajuda com o cálculo?</h3>
            <p className="text-gray-300 mb-8 text-lg">
              Nossa equipe técnica faz o cálculo exato para a sua obra sem custo adicional. Fale conosco agora mesmo.
            </p>
            <a
              href={`https://wa.me/${phones.whatsapp}`}
              className="inline-flex justify-center items-center px-8 py-4 text-lg font-bold rounded-md text-navy-900 bg-white hover:bg-gray-100 shadow-md transition-colors"
            >
              Falar com Especialista
            </a>
          </div>

          <div className="mt-12">
            <Link to="/blog" className="inline-flex items-center text-navy-700 font-semibold hover:text-navy-900 transition-colors">
              <ArrowLeft className="mr-2 w-5 h-5" /> Voltar para o Blog
            </Link>
          </div>

        </div>
      </article>
    </>
  );
}
