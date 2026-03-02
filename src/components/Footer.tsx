import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Clock, ChevronRight } from 'lucide-react';
import { storage } from '../utils/storage';

export function Footer() {
  const [phones, setPhones] = useState(storage.getPhones());

  useEffect(() => {
    const handleUpdate = () => setPhones(storage.getPhones());
    window.addEventListener('storage-update', handleUpdate);
    return () => window.removeEventListener('storage-update', handleUpdate);
  }, []);

  return (
    <footer className="bg-navy-900 text-white pt-16 pb-8 border-t-4 border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-white mb-6">
              GOOL MIX <span className="text-white">CONCRETO</span>
            </h3>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Mais de 5 anos de mercado entregando concreto usinado de alta qualidade.
              Especialistas em concretagem com equipamento para obras em Simões Filho,
              Salvador, Camaçari e Litoral Norte.
            </p>
            <div className="flex space-x-4">
              <a
                href={`https://wa.me/${phones.whatsapp}`}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Falar conosco pelo WhatsApp"
              >
                <span className="sr-only">WhatsApp</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-100">Links Rápidos</h4>
            <ul className="space-y-3">
              {[
                { name: 'Início', path: '/' },
                { name: 'Serviços', path: '/servicos' },
                { name: 'Sobre Nós', path: '/sobre' },
                { name: 'Blog', path: '/blog' },
                { name: 'Contato', path: '/contato' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-300 hover:text-white transition-colors flex items-center text-sm">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-500" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-100">Nossos Serviços</h4>
            <ul className="space-y-3">
              {[
                { name: 'Concretagem com Equipamento', path: '/servicos/concretagem-com-equipamento' },
                { name: 'Envio de Concreto Convencional', path: '/servicos/concreto-convencional' },
                { name: 'Bombeamento de Concreto', path: '/servicos/bombeamento' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-300 hover:text-white transition-colors flex items-center text-sm">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-500" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-100">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm leading-relaxed">
                  Simões Filho, BA<br />
                  Atendemos Salvador, Camaçari e Litoral Norte
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                <a href={`tel:+55${phones.whatsapp}`} className="text-gray-300 hover:text-white transition-colors text-sm">
                  {phones.contact}
                </a>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Seg - Sex: 07:00 - 18:00<br />
                  Sáb: 07:00 - 12:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-700 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Gool Mix Concreto. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="/politica-de-privacidade" className="text-gray-400 hover:text-white transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/termos-de-uso" className="text-gray-400 hover:text-white transition-colors">
              Termos de Uso
            </Link>
            <Link to="/admin/login" className="text-navy-800 hover:text-gray-400 transition-colors text-[10px] ml-4 self-center" aria-hidden="true">
              Acesso restrito
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
