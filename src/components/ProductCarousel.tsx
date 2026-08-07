import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard, type Product } from "./ProductCard";

export function ProductCarousel({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex w-full items-center">
      {/* Scroll container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-6 scrollbar-hide lg:px-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div key={product.id} className="w-[260px] shrink-0 snap-center lg:w-[280px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        className={`absolute -left-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-primary shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:scale-110 disabled:opacity-0 lg:-left-5 ${
          !canScrollLeft ? "pointer-events-none" : ""
        }`}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        className={`absolute -right-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-primary shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:scale-110 disabled:opacity-0 lg:-right-5 ${
          !canScrollRight ? "pointer-events-none" : ""
        }`}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
