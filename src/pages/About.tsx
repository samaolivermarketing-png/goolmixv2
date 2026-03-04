import { SEO } from '../components/SEO';
import { Award, Users, Target, ShieldCheck } from 'lucide-react';
import historyImg from '../assets/responsabilidade-opt.webp';

export function About() {
  return (
    <>
      <SEO
        title="Sobre a Gool Mix Concreto | Usina de Concreto em Simões Filho"
        description="Conheça a história da Gool Mix Concreto. Mais de 5 anos de mercado, equipe especializada e o concreto mais bem avaliado de Simões Filho e região."
        canonical="/sobre"
      />

      {/* Hero Section */}
      <section className="bg-navy-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Nossa História</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Há mais de 5 anos, a Gool Mix Concreto nasceu com um propósito claro: entregar segurança, agilidade e qualidade para as obras de Simões Filho e região.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-6">Compromisso com a sua obra</h2>
              <p className="text-lg text-navy-600 mb-6 leading-relaxed">
                Sabemos que a concretagem é um dos momentos mais críticos de qualquer construção. Um erro no traço, um atraso na entrega ou uma aplicação mal feita podem comprometer toda a estrutura e gerar prejuízos incalculáveis.
              </p>
              <p className="text-lg text-navy-600 mb-8 leading-relaxed">
                Foi para resolver essas dores que estruturamos a Gool Mix. Investimos em tecnologia de ponta na nossa usina, frota moderna e, principalmente, na capacitação da nossa equipe. Hoje, orgulhamo-nos de ter o <strong>concreto com a menor taxa de reclamação</strong> e a <strong>equipe mais bem avaliada do ramo</strong> na nossa região.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-light p-6 rounded-xl border border-gray-200">
                  <div className="text-4xl font-bold text-navy-900 mb-2">+5</div>
                  <div className="text-sm text-navy-600 font-medium uppercase tracking-wider">Anos de Mercado</div>
                </div>
                <div className="bg-gray-light p-6 rounded-xl border border-gray-200">
                  <div className="text-4xl font-bold text-navy-900 mb-2">100%</div>
                  <div className="text-sm text-navy-600 font-medium uppercase tracking-wider">Compromisso</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={historyImg}
                alt="Instalações da usina Gool Mix Concreto"
                className="rounded-2xl shadow-lg object-cover w-full h-[600px]"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-xl shadow-xl border border-gray-100 hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center text-navy-900">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm text-navy-600 font-medium uppercase tracking-wider">Qualidade</p>
                    <p className="text-xl font-bold text-navy-900">Comprovada</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-light border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Nossos Pilares</h2>
            <p className="text-lg text-navy-600">
              Os princípios que guiam nosso trabalho diário e garantem a satisfação dos nossos clientes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-6 text-navy-900">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-4">Qualidade Inegociável</h3>
              <p className="text-navy-600 leading-relaxed">
                Controle rigoroso dos traços e materiais. Nosso concreto atende a todas as normas técnicas, garantindo a resistência (Fck) especificada para o seu projeto.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-6 text-navy-900">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-4">Pontualidade</h3>
              <p className="text-navy-600 leading-relaxed">
                Respeitamos o cronograma da sua obra. Logística eficiente para garantir que o caminhão chegue no horário marcado, evitando equipes ociosas.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-6 text-navy-900">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-4">Atendimento Humanizado</h3>
              <p className="text-navy-600 leading-relaxed">
                Do orçamento à aplicação, nossa equipe está pronta para tirar dúvidas, orientar e garantir que o processo seja tranquilo e sem estresse.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
