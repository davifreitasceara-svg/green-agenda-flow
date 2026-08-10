import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  Smartphone, 
  Cpu, 
  BatteryCharging, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Settings2, 
  Wrench,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export const Route = createFileRoute("/maquinas")({
  head: () => ({
    meta: [
      { title: "Conserto de Celulares & Máquinas — Multicopy Gráfica" },
      { name: "description", content: "Assistência técnica especializada em smartphones, tablets e equipamentos com peças originais e laboratório avançado." },
    ],
  }),
  component: Maquinas,
});

function Maquinas() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans relative overflow-hidden flex flex-col">
      <Header />
      <main className="flex-1">
        {/* HERO - DARK & MODERN */}
        <section className="relative overflow-hidden bg-zinc-950 pt-24 pb-32 sm:pt-40 sm:pb-48 text-center px-4">
          {/* Glowing orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          {/* Tech Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

          <div className="relative z-10 max-w-5xl mx-auto">
             <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 shadow-[0_0_50px_rgba(16,185,129,0.3)] group">
               <Smartphone className="h-12 w-12 text-primary group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
             </div>
             
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8 uppercase tracking-widest backdrop-blur-md">
               <Zap className="h-4 w-4 fill-primary" />
               Laboratório Avançado
             </div>

             <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-[1.1]">
                Assistência Técnica <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-teal-400">
                  Especializada
                </span>
             </h1>
             <p className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-medium">
               Especialistas em reparo de placas, troca de telas e baterias de smartphones e equipamentos. Tecnologia de ponta para trazer seu aparelho de volta à vida.
             </p>
             
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <a href="https://wa.me/5585989059679" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <button className="w-full flex items-center justify-center gap-2 bg-primary text-black font-bold text-lg px-8 h-14 rounded-xl hover:bg-emerald-400 hover:scale-105 transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                    Falar com Técnico
                    <ArrowRight className="h-5 w-5" />
                  </button>
               </a>
               <a href="#servicos" className="w-full sm:w-auto">
                  <button className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white font-bold text-lg px-8 h-14 rounded-xl border border-zinc-800 hover:bg-zinc-800 transition-all">
                    Ver Serviços
                  </button>
               </a>
             </div>
          </div>
        </section>

        {/* STATS & TRUST - Floating over the hero boundary */}
        <section className="relative z-20 -mt-16 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-4 rounded-3xl shadow-2xl">
            <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-800/50 transition-colors">
              <div className="bg-primary/20 p-3 rounded-xl flex-shrink-0">
                <Clock className="h-8 w-8 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Reparo Rápido</h3>
                <p className="text-zinc-400 text-sm">Serviços em até 24h</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-800/50 transition-colors">
              <div className="bg-primary/20 p-3 rounded-xl flex-shrink-0">
                <ShieldCheck className="h-8 w-8 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Garantia de 90 dias</h3>
                <p className="text-zinc-400 text-sm">Em todas as peças</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-800/50 transition-colors">
              <div className="bg-primary/20 p-3 rounded-xl flex-shrink-0">
                <Cpu className="h-8 w-8 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Peças Originais</h3>
                <p className="text-zinc-400 text-sm">Qualidade comprovada</p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section id="servicos" className="py-24 bg-zinc-50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tight uppercase">
                O que nós <span className="text-primary">consertamos</span>
              </h2>
              <p className="text-zinc-500 mt-4 max-w-2xl mx-auto text-lg">
                Estrutura de laboratório completa com microscópios estéreo e estações de solda BGA para reparos a nível de componente.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Smartphone, title: "Troca de Tela", desc: "Displays originais e Premium para iPhone e linha Samsung Galaxy. Serviço com vedação à prova d'água." },
                { icon: BatteryCharging, title: "Baterias", desc: "Substituição de baterias viciadas por células novas, 100% de saúde e capacidade original." },
                { icon: Cpu, title: "Reparo em Placa", desc: "Microsolda, reballing, reparo de Face ID, codec de áudio e curtos na placa principal." },
                { icon: Wrench, title: "Máquinas Gráficas", desc: "Manutenção em plotters, impressoras de grande formato e equipamentos de corte automáticos." },
                { icon: Zap, title: "Conectores", desc: "Troca de conectores de carga (Lightning e USB-C), botões power e volume." },
                { icon: Settings2, title: "Software & Dados", desc: "Recuperação de sistema, backup avançado, remoção de loop infinito e bugs de software." },
              ].map((s, i) => (
                <div key={i} className="bg-white border border-zinc-200 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="h-16 w-16 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6 border border-zinc-100 group-hover:bg-primary transition-colors">
                    <s.icon className="h-8 w-8 text-zinc-950" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-zinc-950">{s.title}</h3>
                  <p className="text-zinc-600 leading-relaxed font-medium">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BANNER CTA */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="bg-zinc-950 rounded-[3rem] p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
               {/* Abstract Shapes */}
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
               <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
               
               <div className="relative z-10 max-w-xl">
                 <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                   Faça um orçamento gratuito pelo WhatsApp
                 </h2>
                 <p className="text-zinc-400 text-lg mb-8">
                   Nosso time técnico está pronto para diagnosticar o seu aparelho. Envie uma mensagem e receba seu orçamento em minutos.
                 </p>
                 <div className="space-y-4">
                   <div className="flex items-center gap-3 text-white">
                     <CheckCircle className="text-primary h-6 w-6" />
                     <span className="font-semibold text-lg">Sem compromisso</span>
                   </div>
                   <div className="flex items-center gap-3 text-white">
                     <CheckCircle className="text-primary h-6 w-6" />
                     <span className="font-semibold text-lg">Atendimento humanizado</span>
                   </div>
                 </div>
               </div>
               
               <div className="relative z-10 w-full md:w-auto shrink-0 mt-6 md:mt-0">
                 <a href="https://wa.me/5585989059679" target="_blank" rel="noopener noreferrer">
                   <button className="w-full md:w-auto bg-primary hover:bg-emerald-400 text-black font-black text-xl px-10 py-6 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:scale-105 hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-3">
                     Mandar Mensagem
                     <ArrowRight className="h-6 w-6" />
                   </button>
                 </a>
               </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
