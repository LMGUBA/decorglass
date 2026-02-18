import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ArrowRight } from 'lucide-react';

interface FloatingPortfolioProps {
    products: Product[];
    onProductClick: (product: Product) => void;
}

export const FloatingPortfolio: React.FC<FloatingPortfolioProps> = ({ products, onProductClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % products.length);
                setIsVisible(true);
            }, 500); // Wait for exit animation
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [products.length, isHovered]);

    const currentProduct = products[currentIndex];

    if (!currentProduct) return null;

    return (
        <div
            className={`fixed left-4 bottom-4 sm:bottom-6 z-40 flex items-center gap-4 transition-all duration-500 ease-in-out transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Floating Card */}
            <div
                className="group relative bg-[#F7FAF8]/80 backdrop-blur-md border border-[#1F5E3B]/10 p-2 pr-6 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] cursor-pointer hover:bg-white hover:border-[#1F5E3B]/30 hover:shadow-[0_8px_30px_rgb(31,94,59,0.2)] transition-all duration-300 flex items-center gap-3 overflow-hidden"
                onClick={() => onProductClick(currentProduct)}
            >
                {/* Image Bubble */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white shadow-sm shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <img
                        src={currentProduct.image}
                        alt={currentProduct.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col min-w-0 pr-4 max-w-[120px] sm:max-w-[140px]">
                    <span className="text-[10px] font-bold text-[#4CAF7D] uppercase tracking-wider mb-0.5 flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4CAF7D] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1F5E3B]"></span>
                        </span>
                        Destacado
                    </span>
                    <h4 className="text-sm font-bold text-[#1C1C1E] truncate max-w-[140px] group-hover:text-[#1F5E3B] transition-colors">
                        {currentProduct.name}
                    </h4>
                </div>

                {/* Hover Indicator */}
                <div className="absolute right-3 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-[#1F5E3B]" />
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
            </div>
        </div>
    );
};
