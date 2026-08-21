import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "@tanstack/react-router";
import { Truck, Sparkles, PenTool, ShieldCheck, ArrowRight, Star, ShoppingBag, Instagram, Lightbulb, Briefcase } from "lucide-react";

import arteColecao from "@/assets/arte-colecao.png";
import logo from "@/assets/logo.png";
import { products } from "@/data/products";

import { Header } from "@/components/Header";
import { SmokyButton } from "@/components/ui/smoky-button";
import { Stories, type Story } from "@/components/Stories";
import { ProductCard, type Product } from "@/components/ProductCard";
import { SalesCard } from "@/components/SalesCard";
import { ProductCarousel } from "@/components/ProductCarousel";
import { TestimonialsMural } from "@/components/TestimonialsMural";
import { Footer } from "@/components/Footer";
import { HeroCarousel } from "@/components/HeroCarousel";
import { VideoPlayer } from "@/components/VideoPlayer";
import { HoverSlider, type HoverSlide } from "@/components/HoverSlider";
import { MarqueeDemo } from "@/components/MarqueeDemo";
import { useAdmin } from "@/hooks/useAdmin";
import { AdminProductModal } from "@/components/AdminProductModal";
import { Plus } from "lucide-react";
import { AboutUsScroll } from "@/components/AboutUsScroll";

import planner2027 from "@/assets/planner-2027.jpg";
import executiva from "@/assets/agenda-executiva.jpg";
import personalizada from "@/assets/agenda-personalizada.jpg";
import pocket from "@/assets/agenda-pocket.jpg";
import academica from "@/assets/agenda-academica.jpg";
import luxo from "@/assets/agenda-luxo.jpg";
import bannerColecoes from "@/assets/banner-colecoes.png";
import bannerMiolo from "@/assets/banner-miolo.png";
import colecaoJesus from "@/assets/colecao-jesus.png";
import delicada1 from "@/assets/colecao-delicada-1.png";
import delicada2 from "@/assets/colecao-delicada-2.png";
import delicada3 from "@/assets/colecao-delicada-3.png";
import delicada4 from "@/assets/colecao-delicada-4.png";
import masculina2027 from "@/assets/masculina-2027.png";
import doceComoMel from "@/assets/doce-como-mel.png";
import bannerFofa from "@/assets/banner-fofa.png";
import promocaoCelular from "@/assets/promoção-celuar.png.jpg";
import bannerCandy from "@/assets/banner-candy.png";
import homemDeFe from "@/assets/homem-de-fe.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Multicopy Gráfica — Agendas e Planners Personalizados" },
      {
        name: "description",
        content:
          "Agendas diárias, planners 2027, modelos executivos e personalizados impressos com acabamento artesanal. Compre online na Multicopy Gráfica.",
      },
      { property: "og:title", content: "Multicopy Gráfica — Agendas e Planners Personalizados" },
      {
        property: "og:description",
        content:
          "Agendas diárias, planners 2027, modelos executivos e personalizados impressos com acabamento artesanal. Compre online na Multicopy Gráfica.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});



// Produtos agora vêm de src/data/products.ts

const benefits = [
  { icon: PenTool, title: "Personalização real", text: "Nome, logo e miolo sob medida." },
  { icon: Truck, title: "Envio em 48h", text: "Produção própria, sem intermediários." },
  { icon: ShieldCheck, title: "Encadernação garantida", text: "1 ano de garantia contra defeitos." },
  { icon: Sparkles, title: "Papel premium", text: "Offset 90g certificado FSC." },
];

function Index() {
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [dbStories, setDbStories] = useState<Story[]>([]);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const { isAdmin } = useAdmin();
  
  useEffect(() => {
    async function loadData() {
      // Load Products
      const { data: pData } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (pData && pData.length > 0) {
        // Map DB products to expected shape
        const mappedProducts = pData.map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description || "",
          price: Number(p.price),
          image: p.main_image_url,
          images: [p.main_image_url, ...(p.extra_image_urls || [])],
          tag: p.tag,
          rating: p.rating || 5
        }));
        setDbProducts(mappedProducts);
      }

      // Load Stories (Only last 24 hours)
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const { data: sData } = await supabase
        .from('stories')
        .select('*')
        .gte('created_at', yesterday)
        .order('created_at', { ascending: false });
      if (sData && sData.length > 0) {
        const mappedStories = sData.map((s: any) => ({
          id: s.id,
          label: s.label,
          image: s.image_url,
          caption: s.caption || ""
        }));
        setDbStories(mappedStories);
      }
    }
    loadData();
  }, []);

  const displayProducts = dbProducts.length > 0 ? dbProducts : products;
  const displayStories = dbStories;

  const carouselImages = [
    { src: homemDeFe, srcMobile: promocaoCelular, alt: "Agenda Homem de Fé" },
    { src: masculina2027, srcMobile: promocaoCelular, alt: "Agenda 2027 Masculina" },
    { src: doceComoMel, srcMobile: promocaoCelular, alt: "Agenda Doce como mel" },
    { src: bannerCandy, srcMobile: promocaoCelular, alt: "Agenda Candy Color 2027" },
  ];

  const hoverSlides: HoverSlide[] = [
    { id: "hs1", label: "Acabamento Premium", image: executiva, description: "Couro sintético com costura reforçada" },
    { id: "hs2", label: "Hot Stamping", image: personalizada, description: "Personalização dourada artesanal" },
    { id: "hs3", label: "Wire-o Metálico", image: planner2027, description: "Encadernação resistente e elegante" },
    { id: "hs4", label: "Papel Offset 90g", image: academica, description: "Certificado FSC, toque suave" },
    { id: "hs5", label: "Embalagem Especial", image: luxo, description: "Caixa presenteável inclusa" },
  ];


  return (
    <div className="min-h-screen bg-background font-sans relative overflow-hidden">
      {/* GLOBAL WATERMARK PATTERN */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='%2310b981' stroke-width='0.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5'/%3E%3Cpath d='M9 18h6'/%3E%3Cpath d='M10 22h4'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px'
        }}
      ></div>

      <div className="relative z-10">
        <Header />
        <Stories stories={displayStories} />

      <main>
        {/* === HERO === */}
        <section className="w-full pt-6">
          <div className="relative w-full overflow-hidden bg-surface/50">
             <HeroCarousel
               images={carouselImages}
               autoPlayMs={4500}
             />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-soft transition-all duration-300 hover:shadow-lift"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-primary">
                  <b.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-primary-deep">{b.title}</p>
                  <p className="text-sm text-muted-foreground">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === NOVOS LANÇAMENTOS (CONHEÇA NOSSA PRODUÇÃO) === */}
        <section id="novidades" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="flex flex-col items-center justify-center mb-10 text-center">
            <div className="flex items-center justify-center w-24 h-24 bg-white rounded-full border-4 border-primary shadow-sm mb-4 p-3 overflow-hidden">
              <img src={logo} alt="Multicopy" className="w-full h-full object-contain mix-blend-multiply" />
            </div>
            <h2 className="text-5xl md:text-7xl text-primary tracking-wide" style={{ fontFamily: "'Dancing Script', 'Pacifico', cursive" }}>
              novos lançamentos
            </h2>
          </div>
          
          <div className="overflow-hidden rounded-2xl border border-border bg-surface/50">
            <div className="grid items-stretch gap-0 lg:grid-cols-2">
              {/* LEFT — Video */}
              <div className="relative flex h-full w-full items-center justify-center border-r border-border/50">
                <VideoPlayer src="/novos-lancamentos.mp4" />
              </div>

              {/* RIGHT — Product Carousel */}
              <div className="relative flex min-w-0 flex-1 items-center justify-center p-6 lg:p-10 bg-white overflow-hidden">
                {/* Watermark / Filtro de Desenho no fundo branco */}
                <div className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none text-primary -rotate-12">
                  <Lightbulb strokeWidth={1.5} className="w-[400px] h-[400px] md:w-[700px] md:h-[700px]" />
                </div>
                
                <div className="relative z-10 w-full">
                  <ProductCarousel products={displayProducts} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === SUCESSO DE VENDAS === */}
        <div className="w-full bg-primary/5 py-16 my-8 border-y border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 w-[800px] h-[400px] -translate-x-1/2 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <section className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center text-center mb-12">
              <h2 className="flex flex-col items-center relative">
                <span 
                  className="font-display text-6xl md:text-7xl text-primary opacity-90 -mb-4 z-10 drop-shadow-sm transition-transform hover:scale-105" 
                  style={{ fontFamily: "'Dancing Script', 'Pacifico', cursive" }}
                >
                  sucesso
                </span>
                <span className="flex items-center gap-3 font-display text-3xl md:text-5xl font-black tracking-tighter uppercase bg-gradient-to-r from-gray-900 via-gray-700 to-black bg-clip-text text-transparent drop-shadow-sm">
                  <Sparkles className="h-6 w-6 text-primary opacity-90" />
                  de vendas!
                  <Sparkles className="h-6 w-6 text-primary opacity-90" />
                </span>
              </h2>
            </div>
            
            <div className="relative flex w-full overflow-hidden items-center group">
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[oklch(0.98_0.01_160)] to-transparent z-10 pointer-events-none mix-blend-multiply"></div>
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[oklch(0.98_0.01_160)] to-transparent z-10 pointer-events-none mix-blend-multiply"></div>

              <div className="flex w-max gap-6 pb-8 pt-4 animate-marquee group-hover:[animation-play-state:paused]">
                {[...displayProducts, ...displayProducts, ...displayProducts, ...displayProducts].map((p, i) => (
                  <div key={`${p.id}-${i}`} className="shrink-0">
                    <SalesCard product={p} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section id="produtos" className="bg-surface py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
              <div className="min-w-0 flex items-center gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    Destaques
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-semibold text-primary-deep">
                    Agendas mais desejadas
                  </h2>
                </div>
                {isAdmin && (
                  <button 
                    onClick={() => setIsAddProductModalOpen(true)}
                    className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-800 transition-colors mt-6"
                  >
                    <Plus className="w-4 h-4" /> Novo Produto
                  </button>
                )}
              </div>
              <a
                href="/"
                className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 hover:gap-3 sm:inline-flex"
              >
                Ver catálogo <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {displayProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        <TestimonialsMural />

        {/* === INSTAGRAM PROMO === */}
        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 flex justify-center">
          <a 
            href="https://www.instagram.com/multicopy_/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-md mb-4 transition-transform group-hover:-translate-y-1 group-hover:shadow-lg">
              <Instagram className="h-6 w-6" />
            </div>
            
            <h3 className="font-sans text-2xl font-bold text-black mb-1">
              @multicopy_
            </h3>
            
            <p className="font-display text-4xl text-primary mb-1 leading-tight tracking-tight" style={{ fontFamily: "'Dancing Script', 'Pacifico', cursive" }}>
              Acompanhe nossa
            </p>
            
            <p className="font-sans text-3xl font-black text-black uppercase tracking-tighter mb-4">
              produção criativa
            </p>
            
            <span className="bg-primary/10 text-primary font-bold px-4 py-1.5 rounded-full text-sm flex items-center gap-2 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Somos mais de 300 seguidores!
            </span>
          </a>
        </section>

        <MarqueeDemo />

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 relative">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-deep via-primary to-primary-hover p-10 text-center shadow-[0_20px_50px_rgba(8,_112,_60,_0.3)] sm:p-16 border border-white/10 group">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/20 blur-3xl transition-transform duration-1000 group-hover:scale-150"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-6 flex items-center justify-center w-20 h-20 bg-white rounded-full border-4 border-primary shadow-sm p-2 overflow-hidden hover:scale-105 transition-transform duration-300">
                <img src={logo} alt="Multicopy" className="w-full h-full object-contain mix-blend-multiply" />
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-wide drop-shadow-sm" style={{ fontFamily: "'Dancing Script', 'Pacifico', cursive" }}>
                Agendas corporativas com a sua marca
              </h2>
              
              <p className="mx-auto mt-2 max-w-2xl text-lg md:text-xl text-white/90 leading-relaxed font-light">
                Pedidos a partir de <strong className="font-semibold text-white">50 unidades</strong> com logo em hot stamping, 
                miolo customizado e embalagem individual. Receba um orçamento em até 24 horas.
              </p>
              
              <a href="https://wa.me/5585989059679" target="_blank" rel="noopener noreferrer">
                <SmokyButton className="mt-10 group/btn shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.4)] border border-white/20 min-w-[320px] md:min-w-[400px]">
                  Solicitar Orçamento Exclusivo 
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </SmokyButton>
              </a>
            </div>
          </div>
        </section>
        <AboutUsScroll />
      </main>

      <Footer />
      </div>

      <AdminProductModal 
        isOpen={isAddProductModalOpen} 
        onClose={() => setIsAddProductModalOpen(false)} 
      />
    </div>
  );
}
