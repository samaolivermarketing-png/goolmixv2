import { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ChevronRight, ShieldCheck, Clock, ThumbsUp } from 'lucide-react';
import { storage } from '../utils/storage';

export function ServiceDetail() {
  const { id } = useParams();
  const [phones, setPhones] = useState(storage.getPhones());

  useEffect(() => {
    const handleUpdate = () => setPhones(storage.getPhones());
    window.addEventListener('storage-update', handleUpdate);
    return () => window.removeEventListener('storage-update', handleUpdate);
  }, []);

  // Mock data based on ID (In a real app, fetch from CMS/API)
  const service = {
    id: "concretagem-com-equipamento",
    title: "Concretagem com Equipamento (Bomba)",
    description: "Serviço completo de fornecimento de concreto usinado e bombeamento direto para a laje, piso ou fundação da sua obra.",
    image: "https://picsum.photos/seed/concrete-pump-detail/1200/600",
    benefits: [
      "Redução drástica no tempo de concretagem",
      "Menor necessidade de mão de obra no canteiro",
      "Aplicação uniforme e contínua, evitando juntas frias",
      "Ideal para locais de difícil acesso ou em altura",
      "Menos sujeira e desperdício de material"
    ],
    faq: [
      {
        q: "Qual a distância máxima que a bomba alcança?",
        a: "Depende do equipamento utilizado (bomba lança ou estacionária). Nossa equipe técnica avalia o local para enviar o equipamento adequado, podendo alcançar dezenas de metros horizontal e verticalmente."
      },
      {
        q: "Preciso preparar o local para receber a bomba?",
        a: "Sim, é necessário um espaço nivelado e firme para o patolamento (estabilização) do caminhão bomba, além de espaço para manobra do caminhão betoneira."
      },
      {
        q: "Qual o volume mínimo para contratar o serviço com bomba?",
        a: "Geralmente, o serviço de bombeamento é viável para volumes a partir de 4m³, mas avaliamos cada caso individualmente. Consulte nossa equipe."
      }
    ]
  };

  return (
    <>
      <SEO
        title={`${service.title} | Gool Mix Concreto`}
        description={service.description}
        canonical={`/servicos/${id}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": service.title,
          "provider": {
            "@type": "LocalBusiness",
            "name": "Gool Mix Concreto"
          },
          "areaServed": [
            "Simões Filho",
            "Salvador",
            "Camaçari",
            "Litoral Norte"
          ]
        }}
      />

      {/* Hero Section */}
      <div className="bg-navy-900 text-white pt-16 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            loading="eager"
            width="1200"
            height="600"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Breadcrumbs */}
          <nav className="flex text-sm text-gray-400 mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="hover:text-white transition-colors">Início</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <Link to="/servicos" className="hover:text-white transition-colors">Serviços</Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <span className="text-white font-medium truncate max-w-[200px] sm:max-w-none">
                    {service.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.title}</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Left Column (Content) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-12">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-auto object-cover max-h-[400px]"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  width="1200"
                  height="600"
                />
                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold text-navy-900 mb-6">Por que escolher este serviço?</h2>
                  <p className="text-lg text-navy-600 mb-8 leading-relaxed">
                    A concretagem com equipamento (bomba) revolucionou a construção civil. O que antes levava dias com dezenas de operários carregando carrinhos de mão, hoje é feito em poucas horas, com muito mais segurança e qualidade.
                  </p>

                  <h3 className="text-2xl font-bold text-navy-900 mb-6">Principais Benefícios</h3>
                  <ul className="space-y-4 mb-10">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start bg-navy-50 p-4 rounded-lg border border-navy-100">
                        <CheckCircle2 className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 mt-0.5" />
                        <span className="text-navy-800 font-medium text-lg">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* LLM Optimized Section */}
                  <div className="bg-gray-50 border-l-4 border-navy-900 p-6 rounded-r-lg mb-8">
                    <h3 className="text-xl font-bold text-navy-900 mb-2">Resumo Técnico:</h3>
                    <p className="text-navy-700">
                      O bombeamento garante que o concreto usinado chegue ao local de aplicação sem segregação dos materiais, mantendo a homogeneidade da mistura e garantindo a resistência (Fck) especificada no projeto estrutural.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Schema Section */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-navy-900 mb-8">Perguntas Frequentes</h2>
                <div className="space-y-6">
                  {service.faq.map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                      <h3 className="text-xl font-bold text-navy-900 mb-3 flex items-start">
                        <span className="text-navy-400 mr-3">Q.</span>
                        {item.q}
                      </h3>
                      <p className="text-navy-600 leading-relaxed flex items-start">
                        <span className="text-green-500 font-bold mr-3">R.</span>
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (Sidebar CTA) */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 sticky top-28">
                <h3 className="text-2xl font-bold text-navy-900 mb-4">Solicite um Orçamento</h3>
                <p className="text-navy-600 mb-8">
                  Nossa equipe técnica está pronta para avaliar sua obra e enviar a melhor proposta.
                </p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-navy-50 rounded-full flex items-center justify-center text-navy-900 mr-4 flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Resposta Rápida</p>
                      <p className="text-navy-900 font-bold">Em até 30 minutos</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-navy-50 rounded-full flex items-center justify-center text-navy-900 mr-4 flex-shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Garantia</p>
                      <p className="text-navy-900 font-bold">Qualidade Comprovada</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-navy-50 rounded-full flex items-center justify-center text-navy-900 mr-4 flex-shrink-0">
                      <ThumbsUp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Avaliação</p>
                      <p className="text-navy-900 font-bold">Equipe Especializada</p>
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${phones.whatsapp}?text=Olá, gostaria de um orçamento para o serviço: ${service.title}`}
                  className="w-full flex justify-center items-center px-6 py-4 text-lg font-bold rounded-md text-white bg-green-600 hover:bg-green-700 shadow-md transition-all duration-200 transform hover:-translate-y-1"
                >
                  Falar no WhatsApp
                </a>
                <p className="text-xs text-center text-gray-500 mt-4">
                  Atendimento para Simões Filho, Salvador e Região.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
