import { ShoppingBag, Star } from "lucide-react";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  tag?: "Novo" | "Esgotando" | "Mais vendido";
  rating: number;
};

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: () => void;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative overflow-hidden bg-surface">
        {product.tag && (
          <span
            className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide ${
              product.tag === "Esgotando"
                ? "bg-destructive text-destructive-foreground"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {product.tag}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-1 text-primary">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-current" : "opacity-25"}`}
            />
          ))}
          <span className="ml-1 text-[11px] text-muted-foreground">{product.rating.toFixed(1)}</span>
        </div>

        <h3 className="font-display text-base font-semibold leading-snug text-primary-deep">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>

        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-foreground">{brl(product.price)}</span>
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {brl(product.oldPrice)}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            ou 3x de {brl(product.price / 3)} sem juros
          </p>

          <button
            onClick={onAdd}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary-hover"
          >
            <ShoppingBag className="h-4 w-4" />
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </article>
  );
}
