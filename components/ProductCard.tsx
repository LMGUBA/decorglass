import React from 'react';
import { Product } from '../types';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-[#EEF5F1] overflow-hidden cursor-pointer flex flex-col h-full"
      onClick={() => onClick(product)}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1F5E3B] bg-[#1F5E3B]/5 px-2 py-1 rounded-md border border-[#1F5E3B]/10">
            {product.category}
          </span>
        </div>
        <h3 className="text-lg font-bold text-[#1C1C1E] mb-1 group-hover:text-[#1F5E3B] transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-[#5A5A5E] line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-[#EEF5F1] mt-auto">
          <span className="text-xl font-bold text-[#1C1C1E]">
            S/. {product.price.toLocaleString()}
          </span>
          <span className="flex items-center text-sm font-bold text-[#4CAF7D] group-hover:translate-x-1 transition-transform">
            Ver Detalles <ArrowRight className="ml-1 h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  );
};