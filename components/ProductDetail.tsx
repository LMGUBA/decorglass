import React, { useState, useEffect } from 'react';
import { Product, GeneratedVariant, MelamineTexture } from '../types';
import { TEXTURE_POOL } from '../constants';
import { ArrowLeft, Sparkles, Loader2, Info, Check } from 'lucide-react';
import { urlToBase64 } from '../utils/imageUtils';
import { generateFurnitureVariant } from '../services/geminiService';
import { CotizarVentaModal } from './CotizarVentaModal';
import { CotizarPedidoModal } from './CotizarPedidoModal';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const [variants, setVariants] = useState<GeneratedVariant[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCotizarVenta, setShowCotizarVenta] = useState(false);
  const [showCotizarPedido, setShowCotizarPedido] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedTextureId, setSelectedTextureId] = useState<string | null>(null);
  const [activeTextures, setActiveTextures] = useState<MelamineTexture[]>([]);

  const VARIANTS_PER_BATCH = 4;

  const pickRandomTextures = (excludeIds: Set<string>): MelamineTexture[] => {
    if (TEXTURE_POOL.length <= VARIANTS_PER_BATCH) return [...TEXTURE_POOL];

    const filtered = TEXTURE_POOL.filter(texture => !excludeIds.has(texture.id));
    const candidates = filtered.length >= VARIANTS_PER_BATCH ? filtered : TEXTURE_POOL;
    const shuffled = [...candidates].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, VARIANTS_PER_BATCH);
  };

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error && error.message) return error.message;
    if (typeof error === 'string') return error;
    try {
      return JSON.stringify(error);
    } catch {
      return 'Falló la generación';
    }
  };

  const isQuotaErrorMessage = (message: string): boolean => {
    return /\(429\)|quota|cuota|RESOURCE_EXHAUSTED/i.test(message);
  };

  // Initialize variants placeholder structure
  useEffect(() => {
    // Reset when product changes
    setVariants([]);
    setSelectedImage(product.image);
    setSelectedTextureId(null);
    setIsGenerating(false);
    setActiveTextures([]);
  }, [product]);

  const handleGenerateVariants = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    const nextTextures = pickRandomTextures(new Set(activeTextures.map(t => t.id)));
    setActiveTextures(nextTextures);

    // Initialize empty loading variants
    const initialVariants: GeneratedVariant[] = nextTextures.map(texture => ({
      id: texture.id,
      textureName: texture.name,
      imageUrl: '',
      loading: true
    }));
    setVariants(initialVariants);

    try {
      const base64Original = await urlToBase64(product.image);

      for (const texture of nextTextures) {
        try {
          const generatedImage = await generateFurnitureVariant(base64Original, texture.promptDescription);
          const errorMessage = generatedImage ? undefined : 'No se generó imagen';

          setVariants(prev => prev.map(v =>
            v.id === texture.id
              ? { ...v, loading: false, imageUrl: generatedImage || '', error: errorMessage }
              : v
          ));
        } catch (error) {
          const message = getErrorMessage(error);
          setVariants(prev => prev.map(v =>
            v.id === texture.id
              ? { ...v, loading: false, error: message }
              : v
          ));

          if (isQuotaErrorMessage(message)) {
            setVariants(prev => prev.map(v => (v.loading ? { ...v, loading: false, error: message } : v)));
            break;
          }
        }
      }
    } catch (error) {
      const message = getErrorMessage(error) || 'Error de imagen base';
      setVariants(prev => prev.map(v => ({ ...v, loading: false, error: message })));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectVariant = (variant: GeneratedVariant) => {
    if (variant.imageUrl && !variant.loading && !variant.error) {
      setSelectedImage(variant.imageUrl);
      setSelectedTextureId(variant.id);
    }
  };

  const handleResetImage = () => {
    setSelectedImage(product.image);
    setSelectedTextureId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center text-slate-500 hover:text-green-800 mb-6 transition-colors font-medium group"
      >
        <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Volver al catálogo
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Image Preview */}
        <div className="space-y-6">
          <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 shadow-xl border border-green-100 relative group">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            {selectedTextureId && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-800 shadow-sm border border-slate-200">
                Visualizando: {activeTextures.find(t => t.id === selectedTextureId)?.name}
              </div>
            )}

            {/* Original Image Trigger */}
            {selectedTextureId && (
              <button
                onClick={handleResetImage}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 hover:bg-white text-slate-800 px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all border border-slate-200"
              >
                Ver Original
              </button>
            )}
          </div>

          {/* Thumbnails of Variants */}
          {variants.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {variants.map((variant) => {
                const texture = activeTextures.find(t => t.id === variant.id);
                const hasImage = variant.imageUrl && !variant.error;

                return (
                  <div
                    key={variant.id}
                    onClick={() => handleSelectVariant(variant)}
                    className={`
                      relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all shadow-sm
                      ${selectedTextureId === variant.id ? 'border-green-600 ring-2 ring-green-100' : 'border-transparent hover:border-slate-300'}
                      ${variant.loading ? 'bg-slate-50' : 'bg-white'}
                    `}
                  >
                    {variant.loading ? (
                      <div className="absolute inset-0 flex items-center justify-center flex-col p-2">
                        <Loader2 className="h-6 w-6 text-green-600 animate-spin mb-1" />
                        <span className="text-[10px] text-slate-400 text-center leading-tight">Generando...</span>
                      </div>
                    ) : hasImage ? (
                      <>
                        <img
                          src={variant.imageUrl}
                          alt={variant.textureName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                          <p className="text-[10px] text-white font-medium truncate text-center">{variant.textureName}</p>
                        </div>
                      </>
                    ) : (
                      /* Fallback: Show color swatch when image generation fails */
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center p-2"
                        style={{ backgroundColor: texture?.colorCode || '#e5e7eb' }}
                      >
                        <div className="w-8 h-8 rounded-full border-2 border-white/50 mb-1"
                          style={{ backgroundColor: texture?.colorCode || '#9ca3af' }} />
                        <span className="text-[9px] text-white font-bold text-center leading-tight drop-shadow-md">
                          {variant.textureName}
                        </span>
                        <span className="text-[8px] text-white/80 text-center mt-0.5">
                          (Muestra)
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Details & Actions */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-sm font-bold text-green-700 uppercase tracking-wide bg-green-50 px-2 py-1 rounded-md inline-block border border-green-100">
              {product.category}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
            {product.name}
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="text-3xl font-bold text-slate-900 mb-8">
            S/. {product.price.toLocaleString()}
          </div>

          {/* AI Feature Section */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 mb-8 shadow-sm">
            <div className="flex items-start mb-4">
              <div className="p-2 bg-green-200 rounded-lg mr-3">
                <Sparkles className="h-6 w-6 text-green-800" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Personalización DG DecorGlass</h3>
                <p className="text-sm text-slate-600">
                  Visualiza cómo quedaría este mueble en diferentes acabados de melamina utilizando nuestra IA.
                </p>
              </div>
            </div>

            <button
              onClick={handleGenerateVariants}
              disabled={isGenerating}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Diseñando Variantes...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2 text-green-400 group-hover:scale-110 transition-transform" />
                  {variants.length === 0
                    ? 'Generar 4 Alternativas de Color'
                    : 'Generar 4 Alternativas Nuevas'}
                </>
              )}
            </button>

            {variants.length > 0 && (
              (() => {
                const successCount = variants.filter(v => v.imageUrl && !v.error).length;
                const loadingCount = variants.filter(v => v.loading).length;
                const totalCount = variants.length;
                const isStillGenerating = loadingCount > 0;

                if (isStillGenerating) {
                  return (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center mb-3">
                        <Loader2 className="h-5 w-5 text-green-600 animate-spin mr-3" />
                        <p className="text-sm text-green-800 font-medium">
                          Generando variantes... ({totalCount - loadingCount}/{totalCount} completadas)
                        </p>
                      </div>
                      <div className="w-full bg-green-100 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${((totalCount - loadingCount) / totalCount) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                }

                return successCount > 0 ? (
                  <div className="bg-white/80 border border-green-200 rounded-xl p-4 flex items-center shadow-sm">
                    <div className="bg-green-100 p-1 rounded-full mr-3">
                      <Check className="h-4 w-4 text-green-700" />
                    </div>
                    <div>
                      <p className="text-sm text-green-900 font-medium">
                        {successCount === 4
                          ? '¡Variantes listas! Selecciona una para ver el acabado.'
                          : `${successCount} variantes generadas. Las demás muestran el color de referencia.`
                        }
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/80 border border-slate-200 rounded-xl p-4 flex items-center shadow-sm">
                    <div className="bg-slate-100 p-1 rounded-full mr-3">
                      <Sparkles className="h-4 w-4 text-slate-500" />
                    </div>
                    <p className="text-sm text-slate-600 font-medium">
                      Muestras de color disponibles. Contáctanos para ver acabados reales.
                    </p>
                  </div>
                );
              })()
            )}

            {activeTextures.length > 0 ? (
              <div className="mt-4 grid grid-cols-2 gap-3">
                {activeTextures.map(tex => (
                  <div key={tex.id} className="flex items-center text-xs text-slate-500">
                    <div
                      className="w-3 h-3 rounded-full mr-2 border border-slate-300 shadow-sm"
                      style={{ backgroundColor: tex.colorCode }}
                    ></div>
                    {tex.name}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-xs text-slate-500">
                Cada generación entrega 4 colores distintos.
              </p>
            )}
          </div>

          {/* Cotización Actions */}
          <div className="flex gap-4 mt-auto">
            <button
              onClick={() => setShowCotizarVenta(true)}
              className="flex-1 bg-green-700 hover:bg-green-800 text-white font-bold py-4 px-6 rounded-xl shadow-md transition-colors border-b-4 border-green-900 active:border-b-0 active:translate-y-1"
            >
              Cotizar Venta
            </button>
            <button
              onClick={() => setShowCotizarPedido(true)}
              className="flex-1 bg-green-700 hover:bg-green-800 text-white font-bold py-4 px-6 rounded-xl shadow-md transition-colors border-b-4 border-green-900 active:border-b-0 active:translate-y-1"
            >
              Cotizar Pedido
            </button>
          </div>

          {/* Modal Cotizar Venta */}
          <CotizarVentaModal
            product={product}
            isOpen={showCotizarVenta}
            onClose={() => setShowCotizarVenta(false)}
          />

          {/* Modal Cotizar Pedido */}
          <CotizarPedidoModal
            product={product}
            isOpen={showCotizarPedido}
            onClose={() => setShowCotizarPedido(false)}
          />
        </div>
      </div>
    </div>
  );
};
