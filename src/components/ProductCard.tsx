import { useState } from "react";
import { ShoppingBag, Star, Edit } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAdmin } from "@/hooks/useAdmin";
import { useCart } from "@/contexts/CartContext";
import { AdminProductModal } from "./AdminProductModal";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  tag?: "Novo" | "Esgotando" | "Mais vendido";
  rating: number;
  video?: string;
};

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function ProductCard({
  product,
}: {
  product: Product;
}) {
  const { isAdmin } = useAdmin();
  const { addItem } = useCart();
  const allImages = product.images && product.images.length > 1 ? product.images : [product.image];
  const [currentImg, setCurrentImg] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div
      className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-border/50 bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-black/10"
    >
      <Link
        to="/produto/$id"
        params={{ id: product.id }}
        className="flex flex-1 flex-col"
      >
        <div className="relative overflow-hidden bg-surface/50 p-4 pb-0">
          {isAdmin && (
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsEditModalOpen(true); }}
              className="absolute top-4 left-4 z-20 flex items-center gap-1 bg-black text-white px-2 py-1 rounded shadow text-[10px] font-bold hover:bg-gray-800 transition-colors"
            >
              <Edit className="w-3 h-3" /> Editar
            </button>
          )}
          {product.tag && (
            <span
              className={`absolute right-4 top-4 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${
                product.tag === "Esgotando"
                  ? "bg-destructive/90 text-destructive-foreground ring-1 ring-destructive/20"
                  : "bg-primary/90 text-primary-foreground ring-1 ring-primary/20"
              }`}
            >
              {product.tag}
            </span>
          )}
          <div className="relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-t-xl bg-white shadow-sm ring-1 ring-black/5">
            <img
              src={allImages[currentImg]}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
            />
          </div>

          {allImages.length > 1 && (
            <div className="flex justify-center gap-1.5 pt-2 pb-1">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setCurrentImg(i)}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentImg(i); }}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    i === currentImg
                      ? "bg-primary scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Ver imagem ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center gap-1.5">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < Math.round(product.rating) ? "fill-current" : "text-gray-200 fill-gray-200"}`}
                />
              ))}
            </div>
            <span className="text-[10px] font-bold text-muted-foreground">{product.rating.toFixed(1)}</span>
          </div>

          <div>
            <h3 className="font-sans text-sm font-bold leading-snug text-foreground group-hover:text-primary">
              {product.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </div>

          <div className="mt-auto pt-2">
            <div className="flex items-end gap-2">
              <span className="text-lg font-black tracking-tight text-primary-deep">{brl(product.price)}</span>
              {product.oldPrice && (
                <span className="mb-0.5 text-xs font-medium text-muted-foreground line-through">
                  {brl(product.oldPrice)}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-[10px] font-semibold text-primary/80">
              ou 3x de {brl(product.price / 3)} sem juros
            </p>
          </div>
        </div>
      </Link>

      <div className="px-5 pb-5">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addItem(product);
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-md active:scale-[0.98]"
        >
          <ShoppingBag className="h-4 w-4" />
          Adicionar <span className="ml-1 opacity-60">ao carrinho</span>
        </button>
      </div>

      <AdminProductModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        initialData={{
          id: product.id,
          name: product.name,
          description: product.description || "",
          price: product.price,
          tag: product.tag || ""
        }}
      />
    </div>
  );
}
