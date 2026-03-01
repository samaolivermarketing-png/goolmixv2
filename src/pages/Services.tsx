import { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { storage } from '../utils/storage';
import concretoconvencionalImg from '../assets/concretoconvencional.jpeg';
import bombaImg from '../assets/bomba.jpg';

export function Services() {
  const [phones, setPhones] = useState(storage.getPhones());

  useEffect(() => {
    const handleUpdate = () => setPhones(storage.getPhones());
    window.addEventListener('storage-update', handleUpdate);
    return () => window.removeEventListener('storage-update', handleUpdate);
  }, []);
  return (
    <>
      <SEO
        title="Serviços de Concretagem | Gool Mix Concreto"
        description="Conheça nossos serviços de envio de concreto usinado e concretagem com equipamento. Atendemos obras residenciais, comerciais e industriais em Simões Filho e região."
        canonical="/servicos"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Concretagem e Fornecimento de Concreto Usinado",
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

      <div className="bg-navy-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Nossos Serviços</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Soluções completas em concreto usinado para garantir a resistência, durabilidade e agilidade da sua obra.
          </p>
        </div>
      </div>

      <div className="py-20 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Main Service */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-12">
            <div className="grid md:grid-cols-2">
              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <div className="inline-block px-3 py-1 bg-navy-50 text-navy-700 text-xs font-bold uppercase tracking-wider rounded-full mb-6 self-start">
                  Serviço Principal
                </div>
                <h2 className="text-3xl font-bold text-navy-900 mb-6">Concretagem com Equipamento</h2>
                <p className="text-lg text-navy-600 mb-8 leading-relaxed">
                  A solução definitiva para obras que exigem agilidade e precisão. Fornecemos o concreto usinado e realizamos o bombeamento diretamente para o local de aplicação (lajes, pisos, fundações, pilares).
                </p>
                <h3 className="text-xl font-semibold text-navy-900 mb-4">Vantagens:</h3>
                <ul className="space-y-3 mb-10">
                  {[
                    "Redução drástica no tempo de concretagem",
                    "Menor necessidade de mão de obra no canteiro",
                    "Aplicação uniforme e contínua, evitando juntas frias",
                    "Ideal para locais de difícil acesso ou em altura",
                    "Menos sujeira e desperdício de material"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-navy-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/${phones.whatsapp}?text=Olá, gostaria de um orçamento para concretagem com equipamento.`}
                  className="inline-flex justify-center items-center px-6 py-3 text-base font-semibold rounded-md text-white bg-navy-900 hover:bg-navy-800 transition-colors self-start"
                >
                  Solicitar Orçamento
                </a>
              </div>
              <div className="bg-gray-200 h-64 md:h-auto relative">
                <img
                  src={bombaImg}
                  alt="Serviço de concretagem com bomba"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Secondary Service */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="bg-gray-200 h-64 md:h-auto relative order-2 md:order-1">
                <img
                  src={concretoconvencionalImg}
                  alt="Caminhão betoneira descarregando concreto"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-10 lg:p-16 flex flex-col justify-center order-1 md:order-2">
                <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-full mb-6 self-start">
                  Serviço Secundário
                </div>
                <h2 className="text-3xl font-bold text-navy-900 mb-6">Envio de Concreto (Convencional)</h2>
                <p className="text-lg text-navy-600 mb-8 leading-relaxed">
                  Fornecimento de concreto usinado entregue diretamente na sua obra através de caminhões betoneira. Ideal para obras onde o descarregamento pode ser feito diretamente da bica do caminhão.
                </p>
                <h3 className="text-xl font-semibold text-navy-900 mb-4">Aplicações Comuns:</h3>
                <ul className="space-y-3 mb-10">
                  {[
                    "Fundações rasas (sapatas, radiers)",
                    "Calçadas e passeios",
                    "Pisos industriais térreos",
                    "Obras com acesso facilitado para o caminhão",
                    "Enchimento de blocos estruturais"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-navy-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/${phones.whatsapp}?text=Olá, gostaria de um orçamento para envio de concreto convencional.`}
                  className="inline-flex justify-center items-center px-6 py-3 text-base font-semibold rounded-md text-navy-900 bg-white border-2 border-navy-900 hover:bg-navy-50 transition-colors self-start"
                >
                  Solicitar Orçamento
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
