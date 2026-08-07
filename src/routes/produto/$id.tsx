import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag, Truck, ShieldCheck, Check, Edit, Loader2 } from "lucide-react";
import { products } from "@/data/products";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAdmin } from "@/hooks/useAdmin";
import { AdminProductModal } from "@/components/AdminProductModal";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/components/ProductCard";

export const Route = createFileRoute("/produto/$id")({
  component: ProdutoDetalhes,
});

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function ProdutoDetalhes() {
  const { id } = Route.useParams();
  const { isAdmin } = useAdmin();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("A5");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (data && !error) {
        setProduct({
          id: data.id,
          name: data.name,
          description: data.description || "",
          price: Number(data.price),
          image: data.main_image_url,
          images: [data.main_image_url, ...(data.extra_image_urls || [])],
          tag: data.tag,
          rating: data.rating || 5
        });
      } else {
        const staticProd = products.find((p) => p.id === id);
        if (staticProd) setProduct(staticProd);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  const allImages = product?.images && product.images.length > 1 ? product.images : product ? [product.image] : [];

  // Autoplay para alternar imagens
  useEffect(() => {
    if (allImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImage((c) => (c + 1) % allImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [allImages.length]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background font-sans">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background font-sans">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-3xl font-display font-semibold text-primary-deep mb-4">Produto não encontrado</h1>
          <p className="text-muted-foreground mb-8">Não conseguimos encontrar a agenda que você procura.</p>
          <Link to="/" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar para o início
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAdd = () => {
    addItem(product, 1, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar para Coleção
          </Link>
        </div>

        <section className="mx-auto max-w-7xl px-4 pb-16 pt-2 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-surface/50 border border-border">
                {product.tag && (
                  <span className="absolute left-6 top-6 z-10 rounded-full bg-primary/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm backdrop-blur-md ring-1 ring-primary/20">
                    {product.tag}
                  </span>
                )}
                <img
                  src={allImages[currentImage]}
                  alt={product.name}
                  className="h-full w-full object-cover transition-all duration-500"
                />

                {/* Dots sobre a imagem */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                    {allImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImage(i)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          i === currentImage
                            ? "w-8 bg-primary shadow-md"
                            : "w-2.5 bg-white/60 hover:bg-white/90"
                        }`}
                        aria-label={`Ver imagem ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`aspect-square w-full overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                      i === currentImage
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-transparent bg-surface hover:border-primary/50"
                    }`}
                  >
                    <img src={img} alt={`Variante ${i + 1}`} className={`h-full w-full object-cover transition-opacity ${i === currentImage ? "opacity-100" : "opacity-60 hover:opacity-100"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < Math.round(product.rating) ? "text-amber-400" : "text-gray-200"}>★</span>
                  ))}
                </div>
                <span className="text-sm font-medium text-muted-foreground">({product.rating.toFixed(1)} avaliações)</span>
              </div>
              
              <div className="flex items-start justify-between gap-4">
                <h1 className="font-display text-4xl font-semibold text-primary-deep md:text-5xl lg:leading-tight">
                  {product.name}
                </h1>
                {isAdmin && (
                  <button 
                    onClick={() => setIsEditModalOpen(true)}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors shrink-0 shadow-md"
                  >
                    <Edit className="w-4 h-4" /> Editar Produto
                  </button>
                )}
              </div>
              
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {product.description} A escolha perfeita para organizar o seu ano de 2027 com elegância e praticidade. Feito com materiais premium para durar o ano inteiro.
              </p>

              <div className="mt-8">
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-black tracking-tight text-primary-deep">{brl(product.price)}</span>
                  {product.oldPrice && (
                    <span className="mb-1 text-lg font-medium text-muted-foreground line-through">
                      {brl(product.oldPrice)}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm font-semibold text-primary">
                  Em até 3x de {brl(product.price / 3)} sem juros no cartão
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Escolha o Tamanho
                </label>
                <div className="flex gap-3">
                  {["A4", "A5", "A6"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex h-12 flex-1 items-center justify-center rounded-xl border-2 font-bold transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-surface text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4">
                <button
                  onClick={handleAdd}
                  className={`flex w-full items-center justify-center gap-3 rounded-xl px-8 py-4 text-base font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] ${
                    added 
                    ? "bg-green-500 text-white" 
                    : "bg-primary text-primary-foreground hover:bg-primary-hover"
                  }`}
                >
                  {added ? (
                    <><Check className="h-5 w-5" /> Adicionado ao Carrinho</>
                  ) : (
                    <><ShoppingBag className="h-5 w-5" /> Adicionar ao Carrinho</>
                  )}
                </button>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 rounded-xl border border-border bg-surface/30 p-6">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Frete Grátis</p>
                    <p className="text-xs text-muted-foreground">Para compras acima de R$ 200</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Compra Segura</p>
                    <p className="text-xs text-muted-foreground">Garantia Multicopy Gráfica</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />

      {isAdmin && (
        <AdminProductModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          initialData={{
            id: product.id,
            name: product.name,
            description: product.description || "",
            price: product.price,
            tag: product.tag || "",
            image: product.image,
            images: product.images || []
          }}
        />
      )}
    </div>
  );
}
