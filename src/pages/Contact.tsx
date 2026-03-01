import { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { storage } from '../utils/storage';

export function Contact() {
  const [phones, setPhones] = useState(storage.getPhones());

  useEffect(() => {
    const handleUpdate = () => setPhones(storage.getPhones());
    window.addEventListener('storage-update', handleUpdate);
    return () => window.removeEventListener('storage-update', handleUpdate);
  }, []);
  return (
    <>
      <SEO
        title="Contato | Gool Mix Concreto em Simões Filho"
        description="Fale com a Gool Mix Concreto. Solicite um orçamento para concreto usinado e concretagem com equipamento em Simões Filho, Salvador e região."
        canonical="/contato"
      />

      <div className="bg-navy-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Fale Conosco</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Estamos prontos para atender sua obra com agilidade e qualidade. Solicite um orçamento sem compromisso.
          </p>
        </div>
      </div>

      <div className="py-20 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-8">Informações de Contato</h2>
              <p className="text-lg text-navy-600 mb-10 leading-relaxed">
                Nossa equipe de atendimento está disponível para tirar suas dúvidas, auxiliar no cálculo de volume e fornecer o melhor orçamento para a sua necessidade.
              </p>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-navy-900 shadow-sm border border-gray-200 mr-6 flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy-900 mb-2">Telefone / WhatsApp</h3>
                    <a href={`tel:+55${phones.whatsapp}`} className="text-lg text-navy-600 hover:text-navy-900 transition-colors">
                      {phones.contact}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-navy-900 shadow-sm border border-gray-200 mr-6 flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy-900 mb-2">Localização e Atendimento</h3>
                    <p className="text-lg text-navy-600 leading-relaxed">
                      Sede: Simões Filho, BA<br />
                      Atendemos: Salvador, Simões Filho, Camaçari e Litoral Norte
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-navy-900 shadow-sm border border-gray-200 mr-6 flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy-900 mb-2">Horário de Funcionamento</h3>
                    <p className="text-lg text-navy-600 leading-relaxed">
                      Segunda a Sexta: 07:00 às 18:00<br />
                      Sábado: 07:00 às 12:00
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-8 bg-navy-50 rounded-xl border border-navy-100">
                <h3 className="text-xl font-bold text-navy-900 mb-4">Atendimento Rápido</h3>
                <p className="text-navy-700 mb-6">
                  Para orçamentos mais rápidos, tenha em mãos as medidas da área a ser concretada (comprimento x largura x espessura) e o tipo de serviço desejado.
                </p>
                <a
                  href={`https://wa.me/${phones.whatsapp}`}
                  className="inline-flex justify-center items-center px-6 py-3 text-base font-semibold rounded-md text-white bg-green-600 hover:bg-green-700 shadow-md transition-colors w-full sm:w-auto"
                >
                  Chamar no WhatsApp
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-navy-900 mb-8">Envie uma Mensagem</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-navy-900 mb-2">Nome Completo</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-navy-500 focus:border-navy-500 transition-colors"
                    placeholder="Seu nome"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-navy-900 mb-2">Telefone / WhatsApp</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-navy-500 focus:border-navy-500 transition-colors"
                      placeholder="(71) 90000-0000"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-navy-900 mb-2">Cidade da Obra</label>
                    <select
                      id="city"
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-navy-500 focus:border-navy-500 transition-colors bg-white"
                    >
                      <option value="">Selecione...</option>
                      <option value="simoes-filho">Simões Filho</option>
                      <option value="salvador">Salvador</option>
                      <option value="camacari">Camaçari</option>
                      <option value="litoral-norte">Litoral Norte</option>
                      <option value="outra">Outra</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-navy-900 mb-2">Serviço de Interesse</label>
                  <select
                    id="service"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-navy-500 focus:border-navy-500 transition-colors bg-white"
                  >
                    <option value="">Selecione...</option>
                    <option value="bomba">Concretagem com Equipamento (Bomba)</option>
                    <option value="convencional">Envio de Concreto (Convencional)</option>
                    <option value="duvida">Apenas Dúvida</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-navy-900 mb-2">Mensagem / Detalhes da Obra</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-navy-500 focus:border-navy-500 transition-colors"
                    placeholder="Descreva sua necessidade (ex: laje de 100m², piso industrial, etc)"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-navy-900 hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-900 transition-colors"
                >
                  Enviar Mensagem
                </button>
                <p className="text-xs text-gray-500 text-center mt-4">
                  Ao enviar, você concorda em ser contatado pela nossa equipe. Seus dados estão seguros.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
