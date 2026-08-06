import { Eye, CreditCard } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Product } from "./ProductCard";

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function SalesCard({ product, onAdd }: { product: Product, onAdd: () => void }) {
  // Mock discount calculation if oldPrice exists
  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  return (
    <div className="flex flex-col w-[260px] lg:w-[280px] shrink-0 font-sans">
      <Link to="/produto/$id" params={{ id: product.id }} className="group relative block overflow-hidden rounded-xl bg-white border border-border/40 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
        <div className="aspect-[4/5] w-full overflow-hidden bg-surface/30">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="mt-4 flex flex-col px-1">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-black line-clamp-1">
          {product.name}
        </h3>

        <div className="mt-1 flex items-center gap-2">
          <span className="text-xl font-bold text-black">{brl(product.price)}</span>
          {discount > 0 && (
            <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white">
              -{discount}% OFF
            </span>
          )}
        </div>

        {product.oldPrice && (
          <span className="mt-0.5 text-[11px] font-medium text-muted-foreground/70">
            De <span className="line-through">{brl(product.oldPrice)}</span>
          </span>
        )}

        <div className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-primary">
          <CreditCard className="h-3 w-3" />
          <span>2 x de {brl(product.price / 2)} sem juros</span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={onAdd}
            className="flex h-10 flex-1 items-center justify-center rounded-md bg-black text-xs font-bold text-white transition-colors hover:bg-gray-900"
          >
            COMPRAR
          </button>
          <Link
            to="/produto/$id"
            params={{ id: product.id }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-white transition-colors hover:bg-primary-hover"
          >
            <Eye className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
