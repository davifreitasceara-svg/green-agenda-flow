import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Truck, Sparkles, PenTool, ShieldCheck, ArrowRight } from "lucide-react";

import { Header } from "@/components/Header";
import { Stories, type Story } from "@/components/Stories";
import { ProductCard, type Product } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";

import planner2027 from "@/assets/planner-2027.jpg";
import executiva from "@/assets/agenda-executiva.jpg";
import personalizada from "@/assets/agenda-personalizada.jpg";
import pocket from "@/assets/agenda-pocket.jpg";
import academica from "@/assets/agenda-academica.jpg";
import luxo from "@/assets/agenda-luxo.jpg";
import storyProducao from "@/assets/story-producao.jpg";
import storyPromo from "@/assets/story-promo.jpg";

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

const stories: Story[] = [
  { id: "1", label: "Produção", image: storyProducao, caption: "Nossa impressora rodando os planners 2027 hoje." },
  { id: "2", label: "Promo do dia", image: storyPromo, caption: "20% OFF em planners até as 18h. Cupom PLANNER20." },
  { id: "3", label: "Novidades", image: planner2027, caption: "Chegou a capa esmeralda com wire-o metálico." },
  { id: "4", label: "Bastidores", image: personalizada, caption: "Hot stamping dourado feito a mão, nome por nome." },
  { id: "5", label: "Clientes", image: luxo, caption: "500 agendas entregues para a equipe da Vetor Contabilidade." },
];

const products: Product[] = [
  { id: "p1", name: "Agenda Planner 2027 Esmeralda", description: "Wire-o metálico, 320 páginas, papel offset 90g com marcador de página.", price: 129.9, oldPrice: 159.9, image: planner2027, tag: "Novo", rating: 4.9 },
  { id: "p2", name: "Agenda Executiva Couro Verde", description: "Capa em couro sintético, costura reforçada e elástico de fechamento.", price: 189.9, image: executiva, tag: "Mais vendido", rating: 4.8 },
  { id: "p3", name: "Agenda Personalizada com Nome", description: "Capa kraft com hot stamping do seu nome e miolo semanal exclusivo.", price: 149.9, image: personalizada, tag: "Novo", rating: 5 },
  { id: "p4", name: "Agenda Pocket Semanal Menta", description: "Formato 12x18cm, capa soft touch e caneta metálica inclusa.", price: 74.9, oldPrice: 89.9, image: pocket, tag: "Esgotando", rating: 4.7 },
  { id: "p5", name: "Agenda Acadêmica 2027", description: "Planejamento por disciplina, adesivos e grade de horários destacável.", price: 99.9, image: academica, rating: 4.6 },
  { id: "p6", name: "Agenda Permanente Luxo", description: "Tecido verde floresta, fita marcadora dourada e miolo sem datas.", price: 219.9, image: luxo, tag: "Esgotando", rating: 4.9 },
];

const benefits = [
  { icon: PenTool, title: "Personalização real", text: "Nome, logo e miolo sob medida." },
  { icon: Truck, title: "Envio em 48h", text: "Produção própria, sem intermediários." },
  { icon: ShieldCheck, title: "Encadernação garantida", text: "1 ano de garantia contra defeitos." },
  { icon: Sparkles, title: "Papel premium", text: "Offset 90g certificado FSC." },
];

function Index() {
  const [cart, setCart] = useState(0);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header cartCount={cart} />
      <Stories stories={stories} />

      <main>
        <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
          <div
            className="relative overflow-hidden rounded-2xl px-6 py-14 sm:px-14 sm:py-20"
            style={{ background: "var(--gradient-hero)" }}
          >
            <div className="relative z-10 max-w-xl">
              <span className="inline-flex rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground">
                Pré-venda aberta
              </span>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-primary-foreground sm:text-5xl">
                Nova Coleção de Agendas 2027
              </h1>
              <p className="mt-4 text-base text-primary-foreground/80 sm:text-lg">
                Planners, agendas diárias e executivas impressas na nossa gráfica, com papel premium e
                personalização com o seu nome.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#produtos"
                  className="inline-flex items-center gap-2 rounded-lg bg-background px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:bg-surface hover:gap-3"
                >
                  Comprar agora <ArrowRight className="h-4 w-4" />
                </a>
                <span className="text-sm text-primary-foreground/75">Frete grátis acima de R$ 199</span>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-primary-foreground/10" />
            <div className="pointer-events-none absolute -bottom-24 right-24 h-56 w-56 rounded-full bg-primary-foreground/10" />
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

        <section id="produtos" className="bg-surface py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Destaques
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-primary-deep">
                  Agendas mais desejadas
                </h2>
              </div>
              <a
                href="/"
                className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 hover:gap-3 sm:inline-flex"
              >
                Ver catálogo <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={() => setCart((c) => c + 1)} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-soft sm:p-12">
            <h2 className="font-display text-3xl font-semibold text-primary-deep">
              Agendas corporativas com a sua marca
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Pedidos a partir de 50 unidades com logo em hot stamping, miolo customizado e embalagem
              individual. Receba um orçamento em até 24 horas.
            </p>
            <a
              href="/"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary-hover"
            >
              Solicitar orçamento <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
