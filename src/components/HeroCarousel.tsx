import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroCarouselProps {
  images: { src: string; alt: string }[];
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
          <div key={i} className="relative w-full h-full shrink-0 flex items-center justify-center overflow-hidden bg-black">
            
            {/* 1. Fundo Desfocado com animação "respirando" (Pulse/Scale) */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[60px] opacity-50 transition-transform duration-[10s] ease-in-out hover:scale-125 scale-110"
              style={{ backgroundImage: `url(${img.src})` }}
            />
            
            {/* 2. Textura de Grade (Grid Pattern) para um ar moderno/tech */}
            <div className="absolute inset-0 opacity-20"
                 style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            />
            
            {/* 3. Vignette escuro nas bordas para focar no centro */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

            {/* 4. Brilho (Glow) dinâmico bem atrás da agenda */}
            <div 
              className="absolute w-3/4 h-3/4 bg-cover bg-center bg-no-repeat blur-[100px] opacity-60 rounded-full"
              style={{ backgroundImage: `url(${img.src})` }}
            />
            
            {/* Imagem Principal flutuando com sombra premium */}
            <img
              src={img.src}
              alt={img.alt}
              className="relative z-10 w-full h-full max-w-5xl object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:scale-[1.02]"
            />
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
