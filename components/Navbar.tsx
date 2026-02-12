import React from 'react';
import { ShoppingBag } from 'lucide-react';
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
  const catalogActive = activeView === AppView.CATALOG || activeView === AppView.PRODUCT_DETAIL;
  const servicesActive = activeView === AppView.SERVICES;

  return (
    <nav className="bg-white border-b border-green-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div
            className="flex items-center cursor-pointer group"
            onClick={onHomeClick}
          >
            <Logo height={50} className="group-hover:opacity-90 transition-opacity" />
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={onCatalogClick}
              className={`hidden sm:block transition-colors font-medium ${catalogActive ? 'text-green-700' : 'text-slate-600 hover:text-green-700'
                }`}
            >
              Catálogo
            </button>
            <button
              onClick={onServicesClick}
              className={`hidden sm:block transition-colors font-medium ${servicesActive ? 'text-green-700' : 'text-slate-600 hover:text-green-700'
                }`}
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
        </div>
      </div>
    </nav>
  );
};
