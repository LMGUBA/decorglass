import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCarousel } from './components/ProductCarousel';
import { ServiceCarousel } from './components/ServiceCarousel';
import { ProductDetail } from './components/ProductDetail';
import { Logo } from './components/Logo';
import { MOCK_PRODUCTS } from './constants';
import { Product, AppView } from './types';
import { Phone, MapPin, Mail } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.CATALOG);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView(AppView.PRODUCT_DETAIL);
    window.scrollTo(0, 0);
  };

  const handleBackToCatalog = () => {
    setSelectedProduct(null);
    setCurrentView(AppView.CATALOG);
    window.scrollTo(0, 0);
  };

  const handleCatalogClick = () => {
    setSelectedProduct(null);
    setCurrentView(AppView.CATALOG);
    window.scrollTo(0, 0);
  };

  const handleServicesClick = () => {
    setSelectedProduct(null);
    setCurrentView(AppView.SERVICES);
    window.scrollTo(0, 0);
  };

  const services = [
    {
      title: 'Puertas Talladas y Contraplacadas',
      description: 'Diseño personalizado, acabados finos y fabricación a medida para interiores y exteriores. Trabajamos con maderas selectas y técnicas artesanales.',
      image: '/images/services/puertas-talladas.png',
      badge: 'Madera',
    },
    {
      title: 'Remodelaciones Integrales',
      description: 'Renovamos tus espacios de forma completa con planificación, ejecución y entrega profesional. Transformamos tu hogar o negocio.',
      image: '/images/services/remodelaciones.png',
      badge: 'Construcción',
    },
    {
      title: 'Puertas Levadizas',
      description: 'Soluciones funcionales y seguras para garajes y accesos vehiculares con sistemas automáticos modernos y de alta seguridad.',
      image: '/images/services/puertas-levadizas.png',
      badge: 'Automatización',
    },
    {
      title: 'Proyectos en Melamine',
      description: 'Mobiliario a medida para cocina, dormitorio, oficina y comercio con alta durabilidad. Closets, reposteros y escritorios personalizados.',
      image: '/images/services/melamine.png',
      badge: 'Mobiliario',
    },
    {
      title: 'Cubiertas en Granito y Mármol',
      description: 'Superficies elegantes y resistentes con instalación precisa para cocinas y baños. Piedra natural de primera calidad.',
      image: '/images/services/granito-marmol.png',
      badge: 'Piedra Natural',
    },
    {
      title: 'Barandas y Pasamanos en Acero',
      description: 'Estructuras seguras con diseño moderno para escaleras, balcones y terrazas. Acero inoxidable con acabados premium.',
      image: '/images/services/barandas-acero.png',
      badge: 'Acero',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        onHomeClick={handleBackToCatalog}
        onCatalogClick={handleCatalogClick}
        onServicesClick={handleServicesClick}
        activeView={currentView}
      />

      <main className="flex-grow">
        {currentView === AppView.CATALOG ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in">
              <span className="hero-badge inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-800 font-semibold text-sm mb-6 tracking-wide uppercase border border-green-200">
                Diseños & Proyectos
              </span>
              <div className="flex justify-center mb-6">
                <Logo height={120} />
              </div>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Especialistas en Melamina, Granito, Mármol, Cuarzo, Vidrios y Aluminio. Transformamos tus espacios con acabados de primera calidad.
              </p>

              <div className="flex flex-wrap justify-center gap-3 text-sm font-medium text-slate-500 uppercase tracking-wider">
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-md shadow-sm hover-lift">Melamine</span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-md shadow-sm hover-lift">Granito</span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-md shadow-sm hover-lift">Puertas</span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-md shadow-sm hover-lift">Remodelaciones</span>
              </div>
            </div>

            {/* Sección del título del catálogo */}
            <div className="text-center mb-8 animate-slide-in">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Nuestro Catálogo</h2>
              <p className="text-slate-500">Desliza para ver todos nuestros productos</p>
            </div>

            {/* Carrusel de Productos */}
            <ProductCarousel
              products={MOCK_PRODUCTS}
              onProductClick={handleProductClick}
            />
          </div>
        ) : currentView === AppView.SERVICES ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-4xl mx-auto mb-12 animate-fade-in">
              <span className="hero-badge inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-800 font-semibold text-sm mb-6 tracking-wide uppercase border border-green-200">
                Servicios
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                Soluciones a Medida
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Diseñamos, fabricamos e instalamos proyectos completos para hogar y empresa con acabados premium.
              </p>
            </div>

            <ServiceCarousel services={services} />
          </div>
        ) : (
          selectedProduct && (
            <ProductDetail
              product={selectedProduct}
              onBack={handleBackToCatalog}
            />
          )
        )}
      </main>

      <footer className="bg-green-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                DG <span className="text-green-300">DecorGlass.</span>
              </h3>
              <p className="text-green-100 text-sm leading-relaxed">
                Diseños & Proyectos. Se realizan trabajos en melamine, granito, mármol, cuarzo, vidrios, aluminios, barandas y pasamanos en acero.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-green-300">Servicios</h4>
              <ul className="space-y-2 text-green-100 text-sm">
                <li>Puertas Talladas y Contraplacadas</li>
                <li>Remodelaciones Integrales</li>
                <li>Puertas Levadizas</li>
                <li>Proyectos en Melamine</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-green-300">Contacto</h4>
              <ul className="space-y-3 text-green-100 text-sm">
                <li className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-green-400 shrink-0" />
                  <span>926023088 - 980500326</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-green-400 shrink-0" />
                  <span>Jr. Antonio Lobato N° 1037 - Esq. Con Av. Huancavelica - El Tambo</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-green-400 shrink-0" />
                  <span>decorglass2023@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-green-800 pt-8 text-center text-green-300 text-sm">
            <p>© 2026 DG DecorGlass Diseños & Proyectos. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
