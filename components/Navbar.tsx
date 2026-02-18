import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { AppView } from '../types';
import { Logo } from './Logo';

interface NavbarProps {
  onNavigate: (view: AppView) => void;
  activeView: AppView;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  activeView,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { view: AppView.HOME, label: 'Inicio' },
    { view: AppView.SERVICES, label: 'Servicios' },
    { view: AppView.CATALOG, label: 'Portafolio' },
    { view: AppView.ABOUT, label: 'Nosotros' },
    { view: AppView.CONTACT, label: 'Contacto' },
  ];

  const handleNavigate = (view: AppView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-[#EEF5F1] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavigate(AppView.HOME)}
          >
            <Logo height={50} className="group-hover:opacity-90 transition-opacity" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavigate(item.view)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeView === item.view
                    ? 'text-[#1F5E3B] bg-[#1F5E3B]/5 font-semibold'
                    : 'text-[#5A5A5E] hover:text-[#1F5E3B] hover:bg-[#EEF5F1]/50'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:926023088"
              className="flex items-center gap-2 text-[#5A5A5E] hover:text-[#1F5E3B] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium text-sm">926 023 088</span>
            </a>

            <a
              href="https://wa.me/51926023088?text=Hola,%20me%20gustaría%20solicitar%20una%20cotización"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-5 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Cotizar
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#5A5A5E] hover:text-[#1F5E3B] hover:bg-[#EEF5F1]/50 transition-all"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EEF5F1] bg-white/95 backdrop-blur-md shadow-lg absolute w-full left-0 top-20 z-40">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavigate(item.view)}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${activeView === item.view
                    ? 'bg-[#1F5E3B]/5 text-[#1F5E3B] font-semibold'
                    : 'text-[#5A5A5E] hover:bg-[#EEF5F1]/50'
                  }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 mt-4 border-t border-[#EEF5F1] space-y-3">
              <a
                href="tel:926023088"
                className="flex items-center gap-3 px-4 py-2 text-[#5A5A5E]"
              >
                <Phone className="w-5 h-5 text-[#1F5E3B]" />
                <span className="font-medium">926 023 088</span>
              </a>

              <a
                href="https://wa.me/51926023088?text=Hola,%20me%20gustaría%20solicitar%20una%20cotización"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full btn-primary py-3 rounded-xl font-semibold text-center text-white"
              >
                Solicitar Cotizacion
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
