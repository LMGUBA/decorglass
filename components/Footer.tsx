import React from 'react';
import { Phone, Mail, MapPin, Facebook, Clock, ExternalLink } from 'lucide-react';
import { Logo } from './Logo';
import { AppView } from '../types';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Inicio', view: AppView.HOME },
    { label: 'Servicios', view: AppView.SERVICES },
    { label: 'Portafolio', view: AppView.CATALOG },
    { label: 'Nosotros', view: AppView.ABOUT },
  ];

  const services = [
    'Melamine',
    'Granito y Mármol',
    'Cuarzo',
    'Vidrios y Aluminios',
    'Barandas en Acero',
    'Remodelaciones',
  ];

  return (
    <footer className="bg-[#0E3A27] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo height={60} className="brightness-0 invert" />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Especialistas en diseño, fabricación e instalación de soluciones en vidrio, madera, 
              piedra y remodelaciones integrales. Transformamos tus espacios con acabados de primera calidad.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com/DecorGlassDisenosProyectos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1877F2] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/51926023088?text=Hola,%20me%20gustaría%20solicitar%20una%20cotización" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#7BC5A3]">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => onNavigate(link.view)}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#7BC5A3]">Servicios</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => onNavigate(AppView.SERVICES)}
                    className="text-gray-300 hover:text-white transition-colors text-sm text-left"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact with Map */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#7BC5A3]">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#7BC5A3] flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:926023088" className="text-gray-300 hover:text-white transition-colors text-sm block">
                    926 023 088
                  </a>
                  <a href="tel:980500326" className="text-gray-300 hover:text-white transition-colors text-sm block">
                    980 500 326
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#7BC5A3] flex-shrink-0 mt-0.5" />
                <a href="mailto:decorglass2023@gmail.com" className="text-gray-300 hover:text-white transition-colors text-sm">
                  decorglass2023@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#7BC5A3] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  Lun - Sáb: 8:00 - 18:00
                </span>
              </li>
            </ul>
            
            {/* Mapa embebido */}
            <div className="mt-5 rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <div className="relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.7341688853846!2d-75.2073089!3d-12.0634064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910e9aa7b7c7c7c7%3A0x7c7c7c7c7c7c7c7c!2sJr.%20Antonio%20Lobato%2C%20Huancayo!5e0!3m2!1ses!2spe!4v1699999999999!5m2!1ses!2spe"
                  width="100%"
                  height="130"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale contrast-125 opacity-80"
                  title="Ubicación DecorGlass"
                />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Jr.+Antonio+Lobato+N+1037+Huancayo+Peru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 group"
                >
                  <div className="bg-white/95 px-4 py-2 rounded-full flex items-center gap-2 text-[#1F5E3B] font-semibold text-sm shadow-lg">
                    <ExternalLink className="w-4 h-4" />
                    Abrir en Maps
                  </div>
                </a>
              </div>
              <div className="p-3 bg-white/5">
                <p className="text-xs text-gray-400 flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#7BC5A3] flex-shrink-0 mt-0.5" />
                  Jr. Antonio Lobato N° 1037 - El Tambo, Huancayo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} <strong className="text-white">DecorGlass</strong> Diseños & Proyectos. Todos los derechos reservados.
            </p>
            <p className="text-gray-500 text-xs">
              Especialistas en Melamine, Granito, Mármol, Cuarzo, Vidrios y Aluminios
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
