import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCarouselProps {
    products: Product[];
    onProductClick: (product: Product) => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, onProductClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [itemsPerView, setItemsPerView] = useState(3);

    // Responsive items per view
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setItemsPerView(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerView(2);
            } else {
                setItemsPerView(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, products.length - itemsPerView);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, maxIndex]);

    const pauseAutoPlay = () => {
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
        pauseAutoPlay();
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
        pauseAutoPlay();
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        pauseAutoPlay();
    };

    // Touch handlers for mobile swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX === null) return;
        const diff = touchStartX - e.changedTouches[0].clientX;

        if (Math.abs(diff) > 50) {
            diff > 0 ? goToNext() : goToPrevious();
        }
        setTouchStartX(null);
    };

    // Calculate the number of dots
    const numDots = maxIndex + 1;

    // Calculate gap in pixels (2rem = 32px)
    const gapPx = 32;

    return (
        <div className="carousel-container">
            {/* Carousel Track */}
            <div
                className="carousel-track"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="carousel-inner"
                    style={{
                        transform: `translateX(calc(-${currentIndex * (100 / itemsPerView)}% - ${currentIndex * (gapPx / itemsPerView)}px))`,
                    }}
                >
                    {products.map((product, index) => {
                        // Calculate if this slide is currently visible
                        const isVisible = index >= currentIndex && index < currentIndex + itemsPerView;

                        return (
                            <div
                                key={product.id}
                                className={`carousel-slide ${isVisible ? 'active' : ''}`}
                                style={{
                                    flex: `0 0 calc(${100 / itemsPerView}% - ${((itemsPerView - 1) * gapPx) / itemsPerView}px)`,
                                    minWidth: `calc(${100 / itemsPerView}% - ${((itemsPerView - 1) * gapPx) / itemsPerView}px)`,
                                }}
                            >
                                <ProductCard product={product} onClick={onProductClick} />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Dots Indicators */}
            <div className="carousel-dots">
                {Array.from({ length: numDots }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                        aria-label={`Ir a la página ${index + 1}`}
                    />
                ))}
            </div>

            {/* Progress Bar */}
            <div className="carousel-progress">
                <div
                    className="carousel-progress-bar"
                    style={{
                        width: `${((currentIndex + 1) / numDots) * 100}%`,
                    }}
                />
            </div>
        </div>
    );
};
