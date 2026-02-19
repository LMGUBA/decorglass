import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Services } from './components/Services';
import { About } from './components/About';
import { ProductCarousel } from './components/ProductCarousel';
import { ProductDetail } from './components/ProductDetail';
import { Logo } from './components/Logo';
import { FloatingButtons } from './components/FloatingButtons';
import { MOCK_PRODUCTS } from './constants';
import { FloatingPortfolio } from './components/FloatingPortfolio';
import { FeriasCalendar } from './components/FeriasCalendar';
import { Product, AppView } from './types';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['Melamine', 'Granito', 'Puertas', 'Remodelaciones'];


  const handleNavigate = (view: AppView) => {
    setSelectedProduct(null);
    setCurrentView(view);
    // Reset filters when navigating away or to catalog
    if (view !== AppView.CATALOG) {
      setSelectedCategory(null);
    }
    window.scrollTo(0, 0);
  };

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const filteredProducts = selectedCategory
    ? MOCK_PRODUCTS.filter(product => product.category === selectedCategory)
    : MOCK_PRODUCTS;


  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView(AppView.PRODUCT_DETAIL);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] text-[#1C1C1E]">
      <Navbar
        onNavigate={handleNavigate}
        activeView={currentView}
      />

      <main className="flex-grow">
        {currentView === AppView.HOME && (
          <Home onNavigate={handleNavigate} />
        )}

        {currentView === AppView.SERVICES && (
          <Services onNavigate={handleNavigate} />
        )}

        {currentView === AppView.ABOUT && (
          <About />
        )}

        {currentView === AppView.CATALOG && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in">
              <span className="hero-badge inline-block px-5 py-2 rounded-full badge-primary font-semibold text-sm mb-6 uppercase tracking-wider">
                Disenos & Proyectos
              </span>
              <div className="flex justify-center mb-6">
                <Logo height={100} />
              </div>
              <p className="text-xl text-[#5A5A5E] max-w-2xl mx-auto leading-relaxed mb-8">
                Especialistas en Melamina, Granito, Marmol, Cuarzo, Vidrios y Aluminio.
                Transformamos tus espacios con acabados de primera calidad.
              </p>

              <div className="flex flex-wrap justify-center gap-3 text-sm font-medium uppercase tracking-wider">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-4 py-2 rounded-lg shadow-sm hover-lift transition-all duration-300 ${selectedCategory === category
                      ? 'bg-[#1F5E3B] text-white border border-[#1F5E3B]'
                      : 'bg-white text-[#5A5A5E] border border-[#EEF5F1] hover:border-[#1F5E3B]/30'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center mb-8 animate-slide-in">
              <h2 className="section-title text-3xl mb-2">Nuestro Catalogo</h2>
              <p className="text-[#5A5A5E]">Desliza para ver todos nuestros productos</p>
            </div>

            <ProductCarousel
              products={filteredProducts}
              onProductClick={handleProductClick}
            />
          </div>
        )}

        {currentView === AppView.PRODUCT_DETAIL && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={() => handleNavigate(AppView.CATALOG)}
          />
        )}

        {currentView === AppView.FERIAS && (
          <FeriasCalendar />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Floating Action Buttons - Show on all pages */}
      <FloatingButtons />

      {/* Floating Portfolio Highlights - Left side */}
      <FloatingPortfolio
        products={MOCK_PRODUCTS}
        onProductClick={handleProductClick}
      />
    </div>
  );
}

export default App;
