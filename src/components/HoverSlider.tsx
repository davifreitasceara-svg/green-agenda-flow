import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface HoverSlide {
  id: string;
  label: string;
  image: string;
  description?: string;
}

interface HoverSliderProps {
  slides: HoverSlide[];
}

export function HoverSlider({ slides }: HoverSliderProps) {
  const [active, setActive] = useState(0);

  const next = () => setActive((a) => (a + 1) % slides.length);
  const prev = () => setActive((a) => (a - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-full min-h-[320px] w-full overflow-hidden rounded-2xl bg-card shadow-soft sm:min-h-[400px]">
      {/* Images */}
      {slides.map((slide, i) => (
        <img
          key={slide.id}
          src={slide.image}
          alt={slide.label}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out ${
            i === active ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
      ))}

      {/* Bottom gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-10">
        <p className="text-lg font-semibold text-white transition-all duration-500">
          {slides[active]?.label}
        </p>
        {slides[active]?.description && (
          <p className="mt-1 text-sm text-white/75 transition-all duration-500">
            {slides[active].description}
          </p>
        )}

        {/* Navigation arrows + dots */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/40 hover:scale-110"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/40 hover:scale-110"
              aria-label="Próximo slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-6 bg-white"
                    : "w-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Ir para slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
