import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import clsx from 'clsx';
import logo from '../assets/GoolMixConcreto.png';

import { storage } from '../utils/storage';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [phones, setPhones] = useState(storage.getPhones());

  useEffect(() => {
    const handleUpdate = () => setPhones(storage.getPhones());
    window.addEventListener('storage-update', handleUpdate);
    return () => window.removeEventListener('storage-update', handleUpdate);
  }, []);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contato', path: '/contato' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-navy-900 text-white py-2 px-4 sm:px-6 lg:px-8 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Simões Filho, Salvador, Camaçari e Litoral Norte
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href={`tel:+55${phones.whatsapp}`} className="flex items-center hover:text-gray-300 transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              {phones.contact}
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src={logo} alt="Gool Mix Concreto" className="h-20 sm:h-24 w-auto transform scale-110 origin-left -translate-x-[26px]" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  'text-base font-medium transition-colors hover:text-navy-600',
                  isActive(link.path) ? 'text-navy-900 border-b-2 border-navy-900' : 'text-gray-600'
                )}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={`https://wa.me/${phones.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-navy-900 text-white px-6 py-2.5 rounded-md font-medium hover:bg-navy-800 transition-colors shadow-sm"
            >
              Solicitar Orçamento
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-navy-900 hover:text-navy-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  'block px-3 py-2 rounded-md text-base font-medium',
                  isActive(link.path)
                    ? 'bg-navy-50 text-navy-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-navy-900'
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={`https://wa.me/${phones.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center mt-4 bg-navy-900 text-white px-4 py-3 rounded-md font-medium hover:bg-navy-800"
              onClick={() => setIsOpen(false)}
            >
              Solicitar Orçamento
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
