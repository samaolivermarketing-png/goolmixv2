import { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';

import { storage } from '../utils/storage';

export function Blog() {
  const [posts, setPosts] = useState(storage.getArticles());

  useEffect(() => {
    const handleUpdate = () => setPosts(storage.getArticles());
    window.addEventListener('storage-update', handleUpdate);
    return () => window.removeEventListener('storage-update', handleUpdate);
  }, []);

  return (
    <>
      <SEO
        title="Blog da Construção | Gool Mix Concreto"
        description="Dicas, guias e informações técnicas sobre concretagem, cálculo de volume, tipos de concreto e melhores práticas para sua obra."
        canonical="/blog"
      />

      <div className="bg-navy-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Blog da Construção</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conteúdo técnico e prático para ajudar você a tomar as melhores decisões na hora de concretar.
          </p>
        </div>
      </div>

      <div className="py-20 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <Link to={`/blog/${post.id}`} className="block aspect-w-16 aspect-h-9 bg-gray-200 relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-48"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-navy-900 mb-3 line-clamp-2 hover:text-navy-600 transition-colors">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>
                  <p className="text-navy-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center font-semibold text-navy-900 hover:text-navy-600 transition-colors mt-auto"
                  >
                    Ler artigo completo <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
