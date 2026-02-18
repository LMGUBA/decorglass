import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Service {
    title: string;
    description: string;
    image: string;
    badge: string;
}

interface ServiceCarouselProps {
    services: Service[];
}

export const ServiceCarousel: React.FC<ServiceCarouselProps> = ({ services }) => {
    const [itemsPerView, setItemsPerView] = useState(3);
    // We start at `services.length` because the track looks like: [clones-end] [originals] [clones-start]
    const [currentIndex, setCurrentIndex] = useState(services.length);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const totalOriginal = services.length;
    // Build the extended list: clone all at end + originals + clone all at start
    const extendedServices = [
        ...services.slice(-totalOriginal), // clone of last N items (prepended)
        ...services,                        // original items
        ...services.slice(0, totalOriginal), // clone of first N items (appended)
    ];

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

    // When transition ends, check if we need to "jump" to the real position
    const handleTransitionEnd = useCallback(() => {
        // If we've scrolled past the originals into the appended clones
        if (currentIndex >= totalOriginal * 2) {
            setIsTransitioning(false);
            setCurrentIndex(currentIndex - totalOriginal);
        }
        // If we've scrolled before the originals into the prepended clones
        if (currentIndex < totalOriginal) {
            setIsTransitioning(false);
            setCurrentIndex(currentIndex + totalOriginal);
        }
    }, [currentIndex, totalOriginal]);

    // Re-enable transition after a frame when we "jump"
    useEffect(() => {
        if (!isTransitioning) {
            // Force a reflow so the instant jump happens, then re-enable transition
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsTransitioning(true);
                });
            });
        }
    }, [isTransitioning]);

    // Auto-play
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => prev + 1);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const pauseAutoPlay = () => {
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => prev + 1);
        pauseAutoPlay();
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => prev - 1);
        pauseAutoPlay();
    };

    // Touch handlers
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

    // Calculate the correct dot index (map back to 0..totalOriginal-1)
    const realIndex = ((currentIndex - totalOriginal) % totalOriginal + totalOriginal) % totalOriginal;

    // Gap in pixels
    const gapPx = 32;

    const goToDot = (dotIndex: number) => {
        // Jump to the original section position
        setCurrentIndex(totalOriginal + dotIndex);
        pauseAutoPlay();
    };

    return (
        <div className="service-carousel-container">
            {/* Navigation Arrows */}
            <button
                className="service-carousel-arrow service-carousel-arrow-left"
                onClick={goToPrevious}
                aria-label="Anterior servicio"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                className="service-carousel-arrow service-carousel-arrow-right"
                onClick={goToNext}
                aria-label="Siguiente servicio"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Carousel Track */}
            <div
                className="service-carousel-track"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    ref={trackRef}
                    className="service-carousel-inner"
                    style={{
                        transform: `translateX(calc(-${currentIndex * (100 / itemsPerView)}% - ${currentIndex * (gapPx / itemsPerView)}px))`,
                        transition: isTransitioning
                            ? 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                            : 'none',
                    }}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {extendedServices.map((service, index) => {
                        const isVisible =
                            index >= currentIndex && index < currentIndex + itemsPerView;

                        return (
                            <div
                                key={`service-${index}`}
                                className={`service-carousel-slide ${isVisible ? 'active' : ''}`}
                                style={{
                                    flex: `0 0 calc(${100 / itemsPerView}% - ${((itemsPerView - 1) * gapPx) / itemsPerView}px)`,
                                    minWidth: `calc(${100 / itemsPerView}% - ${((itemsPerView - 1) * gapPx) / itemsPerView}px)`,
                                }}
                            >
                                {/* Service Card */}
                                <div className="service-card group bg-white border border-[#EEF5F1] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                        <span className="absolute top-3 right-3 px-3 py-1 bg-[#4CAF7D]/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                                            {service.badge}
                                        </span>
                                        <h3 className="absolute bottom-4 left-4 right-4 text-white text-xl font-bold leading-tight drop-shadow-lg">
                                            {service.title}
                                        </h3>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                            {service.description}
                                        </p>
                                        <div className="flex items-center text-[#1F5E3B] font-semibold text-sm group-hover:text-[#4CAF7D] transition-colors">
                                            <span>Consultar servicio</span>
                                            <svg
                                                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Dot Indicators */}
            <div className="service-carousel-dots">
                {services.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToDot(index)}
                        className={`service-carousel-dot ${index === realIndex ? 'active' : ''}`}
                        aria-label={`Ir al servicio ${index + 1}`}
                    />
                ))}
            </div>

            {/* Progress Bar */}
            <div className="service-carousel-progress">
                <div
                    className="service-carousel-progress-bar"
                    style={{
                        width: `${((realIndex + 1) / totalOriginal) * 100}%`,
                    }}
                />
            </div>
        </div>
    );
};
