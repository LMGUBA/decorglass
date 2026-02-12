import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { AppView } from '../types';
import { Logo } from './Logo';

interface NavbarProps {
  onHomeClick: () => void;
  onCatalogClick: () => void;
  onServicesClick: () => void;
  activeView: AppView;
}

export const Navbar: React.FC<NavbarProps> = ({
  onHomeClick,
  onCatalogClick,
  onServicesClick,
  activeView,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const catalogActive = activeView === AppView.CATALOG || activeView === AppView.PRODUCT_DETAIL;
  const servicesActive = activeView === AppView.SERVICES;

  const handleCatalog = () => {
    onCatalogClick();
    setMobileMenuOpen(false);
  };

  const handleServices = () => {
    onServicesClick();
    setMobileMenuOpen(false);
  };

  const handleHome = () => {
    onHomeClick();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-green-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={handleHome}
          >
            <Logo height={50} className="group-hover:opacity-90 transition-opacity" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-6">
            <button
              onClick={handleCatalog}
              className={`transition-colors font-medium ${catalogActive ? 'text-green-700' : 'text-slate-600 hover:text-green-700'}`}
            >
              Catálogo
            </button>
            <button
              onClick={handleServices}
              className={`transition-colors font-medium ${servicesActive ? 'text-green-700' : 'text-slate-600 hover:text-green-700'}`}
            >
              Servicios
            </button>
            <div className="relative p-2 text-slate-400 hover:text-green-700 cursor-pointer transition-colors">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute top-1 right-0 h-4 w-4 bg-green-600 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                0
              </span>
            </div>
          </div>

          {/* Mobile: Cart + Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <div className="relative p-2 text-slate-400 hover:text-green-700 cursor-pointer transition-colors">
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute top-1 right-0 h-4 w-4 bg-green-600 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                0
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-green-700 hover:bg-green-50 transition-all"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-green-100 bg-white shadow-lg animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            <button
              onClick={handleCatalog}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium text-base transition-all ${catalogActive
                ? 'bg-green-50 text-green-700 font-semibold'
                : 'text-slate-600 hover:bg-green-50 hover:text-green-700'
                }`}
            >
              Catálogo
            </button>
            <button
              onClick={handleServices}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium text-base transition-all ${servicesActive
                ? 'bg-green-50 text-green-700 font-semibold'
                : 'text-slate-600 hover:bg-green-50 hover:text-green-700'
                }`}
            >
              Servicios
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
