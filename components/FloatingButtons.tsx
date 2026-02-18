import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, X, MessageCircle } from 'lucide-react';

export const FloatingButtons: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const contactOptions = [
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: 'WhatsApp',
      sublabel: 'Respuesta rápida',
      href: 'https://wa.me/51926023088?text=Hola,%20me%20gustaría%20solicitar%20una%20cotización',
      color: '#25D366',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Llamar',
      sublabel: '926 023 088',
      href: 'tel:+51926023088',
      color: '#1F5E3B',
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Correo',
      sublabel: 'decorglass2023@gmail.com',
      href: 'mailto:decorglass2023@gmail.com',
      color: '#4CAF7D',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Ubicación',
      sublabel: 'Ver en Google Maps',
      href: 'https://www.google.com/maps/search/?api=1&query=Jr.+Antonio+Lobato+N+1037+Huancayo+Peru',
      color: '#EA4335',
      external: true,
    },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999]"
    >
      {/* Menu desplegable */}
      <div
        className={`absolute bottom-full right-0 mb-3 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1F5E3B] to-[#2D8A5E] px-5 py-4">
          <h3 className="text-white font-bold text-lg">Contáctanos</h3>
          <p className="text-white/70 text-sm">Elige cómo prefieres escribirnos</p>
        </div>

        {/* Opciones */}
        <div className="p-2">
          {contactOptions.map((option, index) => (
            <a
              key={index}
              href={option.href}
              target={option.external ? '_blank' : undefined}
              rel={option.external ? 'noopener noreferrer' : undefined}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-transform group-hover:scale-110"
                style={{ backgroundColor: option.color }}
              >
                {option.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#1C1C1E] text-sm">{option.label}</p>
                <p className="text-gray-500 text-xs truncate">{option.sublabel}</p>
              </div>
              <svg
                className="w-4 h-4 text-gray-400 group-hover:text-[#1F5E3B] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Botón principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
          isOpen
            ? 'bg-[#1C1C1E] rotate-0'
            : 'bg-gradient-to-br from-[#25D366] to-[#128C7E] hover:shadow-xl hover:scale-105'
        }`}
        style={{
          boxShadow: isOpen
            ? '0 8px 24px rgba(0, 0, 0, 0.2)'
            : '0 8px 24px rgba(37, 211, 102, 0.4)',
        }}
        aria-label="Abrir menú de contacto"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        )}
      </button>

      {/* Indicador de pulse cuando está cerrado */}
      {!isOpen && (
        <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/30 pointer-events-none" />
      )}
    </div>
  );
};