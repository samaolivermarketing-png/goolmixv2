import { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { CheckCircle2, Clock, ShieldCheck, ThumbsUp, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { storage } from '../utils/storage';
import heroBg from '../assets/hero.png';
import bombaImg from '../assets/bomba.jpg';
import concretoconvencionalImg from '../assets/concretoconvencional.jpeg';

export function Home() {
  const [phones, setPhones] = useState(storage.getPhones());

  useEffect(() => {
    const handleUpdate = () => setPhones(storage.getPhones());
    window.addEventListener('storage-update', handleUpdate);
    return () => window.removeEventListener('storage-update', handleUpdate);
  }, []);
  return (
    <>
      <SEO
        title="Gool Mix Concreto | Usina de Concreto em Simões Filho e Região"
        description="Concreto usinado de alta qualidade e serviço de concretagem com equipamento. Atendemos Simões Filho, Salvador, Camaçari e Litoral Norte. Sem atrasos, sem fissuras."
        canonical="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Gool Mix Concreto",
          "image": "https://picsum.photos/seed/goolmix/1200/800",
          "@id": "https://goolmixconcreto.com.br",
          "url": "https://goolmixconcreto.com.br",
          "telephone": `+55${phones.whatsapp}`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Simões Filho",
            "addressRegion": "BA",
            "addressCountry": "BR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -12.7865,
            "longitude": -38.4017
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "07:00",
            "closes": "18:00"
          },
          "sameAs": [
            `https://wa.me/${phones.whatsapp}`
          ]
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-white pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent z-10"></div>
          <img
            src={heroBg}
            alt="Caminhão betoneira da Gool Mix Concreto em operação"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            fetchPriority="high"
            loading="eager"
            width="1920"
            height="1080"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-2xl -translate-y-9">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              <span className="text-navy-900 block">CONSTRUINDO</span>
              <span className="text-gray-400 block">O FUTURO!</span>
            </h1>
            <p className="text-xl text-navy-700 mb-8 leading-relaxed max-w-xl">
              Concreto usinado de alta performance com a <strong className="text-navy-900">equipe mais bem avaliada do ramo</strong>.
              Garantimos o slump correto, entrega no prazo e zero dor de cabeça no seu canteiro de obras.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/${phones.whatsapp}`}
                className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold rounded-md text-white bg-navy-900 hover:bg-navy-800 shadow-md transition-all duration-200"
              >
                Solicitar Orçamento Rápido
              </a>
              <Link
                to="/servicos"
                className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold rounded-md text-navy-900 bg-white border-2 border-navy-100 hover:border-navy-300 hover:bg-navy-50 transition-all duration-200"
              >
                Ver Nossos Serviços
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-4 text-sm font-medium text-navy-600">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src={`https://picsum.photos/seed/user${i}/100/100`}
                    alt="Cliente"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    width="40"
                    height="40"
                  />
                ))}
              </div>
              <div>
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-navy-800">Mais de 5 anos de clientes satisfeitos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points / Solutions (LLM Optimized) */}
      <section className="py-20 bg-gray-light border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Por que escolher a Gool Mix Concreto?</h2>
            <p className="text-lg text-navy-600">
              Entendemos as dores de quem constrói. Nossa usina foi estruturada para resolver os principais problemas do mercado de concretagem.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-navy-50 rounded-lg flex items-center justify-center mb-6 text-navy-700">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Pontualidade Rigorosa</h3>
              <p className="text-navy-600 leading-relaxed">
                <strong>Chega de atrasos.</strong> Sabemos que equipe parada é dinheiro perdido. Nossa logística garante que o caminhão betoneira chegue no horário combinado, otimizando o tempo da sua obra.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-navy-50 rounded-lg flex items-center justify-center mb-6 text-navy-700">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Qualidade e Slump Exato</h3>
              <p className="text-navy-600 leading-relaxed">
                <strong>Sem fissuras, sem dor de cabeça.</strong> Entregamos o concreto exatamente na especificação (Fck) e slump solicitados, garantindo a resistência estrutural do seu projeto.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-navy-50 rounded-lg flex items-center justify-center mb-6 text-navy-700">
                <ThumbsUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Equipe Especializada</h3>
              <p className="text-navy-600 leading-relaxed">
                <strong>Serviço sem agonia.</strong> Nossa equipe de concretagem é a mais bem avaliada da região. Profissionais treinados para uma aplicação limpa, rápida e eficiente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-navy-900 mb-4">Nossos Serviços de Concretagem</h2>
              <p className="text-lg text-navy-600">
                Soluções completas para auto construtores, engenheiros e construtoras.
              </p>
            </div>
            <Link to="/servicos" className="hidden md:flex items-center text-navy-700 font-semibold hover:text-navy-900 transition-colors">
              Ver todos os serviços <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Service 1 */}
            <div className="group rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
                <img
                  src={bombaImg}
                  alt="Concretagem com equipamento e bomba"
                  className="object-cover w-full h-64"
                  loading="lazy"
                  width="800"
                  height="450"
                />
                <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div className="p-8">
                <div className="inline-block px-3 py-1 bg-navy-50 text-navy-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                  Serviço Principal
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-3">Concretagem com Equipamento</h3>
                <p className="text-navy-600 mb-6 line-clamp-3">
                  A solução mais prática para sua obra. Fornecemos o concreto usinado e realizamos o bombeamento diretamente para a laje, piso ou fundação. Maior velocidade, menos sujeira e economia de mão de obra.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-start text-sm text-navy-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Ideal para locais de difícil acesso</span>
                  </li>
                  <li className="flex items-start text-sm text-navy-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Reduz o tempo de concretagem em até 70%</span>
                  </li>
                </ul>
                <Link to="/servicos/concretagem-com-equipamento" className="inline-flex items-center font-semibold text-navy-900 hover:text-navy-600">
                  Saiba mais <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Service 2 */}
            <div className="group rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
                <img
                  src={concretoconvencionalImg}
                  alt="Envio de concreto convencional"
                  className="object-cover w-full h-64"
                  loading="lazy"
                  width="800"
                  height="450"
                />
                <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div className="p-8">
                <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                  Serviço Secundário
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-3">Envio de Concreto (Convencional)</h3>
                <p className="text-navy-600 mb-6 line-clamp-3">
                  Fornecimento de concreto usinado de alta qualidade entregue diretamente na sua obra. Perfeito para fundações rasas, calçadas e obras onde o descarregamento direto da bica é possível.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-start text-sm text-navy-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Traços rigorosamente controlados</span>
                  </li>
                  <li className="flex items-start text-sm text-navy-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>Volume exato garantido</span>
                  </li>
                </ul>
                <Link to="/servicos/concreto-convencional" className="inline-flex items-center font-semibold text-navy-900 hover:text-navy-600">
                  Saiba mais <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/servicos" className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-navy-700 bg-white hover:bg-gray-50 w-full">
              Ver todos os serviços
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-20 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">A Usina Mais Bem Avaliada da Região</h2>
            <p className="text-lg text-gray-300">
              Não acredite apenas na nossa palavra. Veja o que construtores e engenheiros dizem sobre a Gool Mix.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Carlos Eduardo",
                role: "Engenheiro Civil",
                text: "Trabalho com a Gool Mix há 3 anos. O diferencial deles é o cumprimento do horário. Em obras grandes, atraso no concreto é prejuízo certo. Com eles, o caminhão chega na hora e o slump vem sempre cravado."
              },
              {
                name: "Roberto Almeida",
                role: "Mestre de Obras",
                text: "A equipe da bomba é excelente. Rapaziada educada, não faz sujeira desnecessária e trabalha rápido. O concreto é de primeira, não dá fissura de retração se curar direito. Recomendo de olhos fechados."
              },
              {
                name: "Mariana Costa",
                role: "Auto Construtora",
                text: "Estava com muito medo de bater a laje da minha casa por causa das histórias de atraso. A Gool Mix me atendeu super bem desde o orçamento pelo WhatsApp até o final da concretagem. Foi super tranquilo!"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-navy-800 p-8 rounded-xl border border-navy-700">
                <div className="flex text-yellow-400 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">Pronto para concretar sua obra com segurança?</h2>
          <p className="text-xl text-navy-600 mb-10">
            Fale agora com nossos especialistas e receba um orçamento sem compromisso em poucos minutos.
          </p>
          <a
            href={`https://wa.me/${phones.whatsapp}`}
            className="inline-flex justify-center items-center px-8 py-4 text-lg font-bold rounded-md text-white bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
          >
            Falar com Especialista no WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
