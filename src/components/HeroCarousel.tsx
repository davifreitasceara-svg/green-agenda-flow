import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroCarouselProps {
  images: { src: string; srcMobile?: string; alt: string }[];
  autoPlayMs?: number;
}

export function HeroCarousel({ images, autoPlayMs = 4000 }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(next, autoPlayMs);
    return () => clearInterval(interval);
  }, [next, autoPlayMs, isHovered]);

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-[85vh]"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="relative w-full h-full shrink-0 flex items-center justify-center overflow-hidden bg-[#faf8f5]">
            {/* Imagem Principal - Desktop */}
            <img
              src={img.src}
              alt={img.alt}
              className={`relative z-10 w-full h-full object-contain ${img.srcMobile ? "hidden md:block" : ""}`}
            />
            
            {/* Imagem Principal - Mobile */}
            {img.srcMobile && (
              <img
                src={img.srcMobile}
                alt={img.alt}
                className="relative z-10 w-full h-full object-contain md:hidden"
              />
            )}
          </div>
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/40 hover:scale-110"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/40 hover:scale-110"
        aria-label="Próximo slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 bg-white"
                : "w-2.5 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Ir para slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
