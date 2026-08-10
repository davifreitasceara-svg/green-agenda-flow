import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Wrench, Clock, ShieldCheck, PenTool, CheckCircle, ArrowRight } from "lucide-react";
import { SmokyButton } from "@/components/ui/smoky-button";

export const Route = createFileRoute("/maquinas")({
  head: () => ({
    meta: [
      { title: "Conserto de Máquinas — Multicopy Gráfica" },
      { name: "description", content: "Assistência técnica especializada em impressoras e equipamentos gráficos." },
    ],
  }),
  component: Maquinas,
});

function Maquinas() {
  return (
    <div className="min-h-screen bg-background font-sans relative overflow-hidden flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-primary/10 pt-20 pb-24 sm:pt-32 sm:pb-40 text-center px-4 border-b border-primary/20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
             <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-2xl border-4 border-primary/10">
               <Wrench className="h-10 w-10 text-primary drop-shadow-sm" />
             </div>
             <h1 className="font-display text-5xl md:text-7xl font-black tracking-tighter text-gray-900 mb-6 uppercase">
                Assistência Técnica <br className="hidden sm:block" />
                <span className="text-primary tracking-normal" style={{ fontFamily: "'Dancing Script', 'Pacifico', cursive", fontSize: "1.2em", fontWeight: 400, textTransform: "none" }}>Especializada</span>
             </h1>
             <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-2xl mx-auto font-medium">
               Seu equipamento gráfico parou? Não perca tempo e dinheiro. Nós temos a solução rápida e garantida para manter sua produção a todo vapor.
             </p>
             <a href="https://wa.me/5585989059679" target="_blank" rel="noopener noreferrer">
                <SmokyButton className="group/btn shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.4)] h-14 px-8 text-lg min-w-[280px]">
                  Solicitar Orçamento
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                </SmokyButton>
             </a>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-white relative z-20 -mt-8 rounded-t-[3rem]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight uppercase">Por que escolher nossa assistência?</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-surface border border-border p-8 rounded-3xl shadow-soft hover:shadow-lift transition-all duration-300 group">
                <div className="h-14 w-14 bg-primary text-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform shadow-md">
                  <Clock className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-black mb-3 text-gray-900">Rapidez no Diagnóstico</h3>
                <p className="text-gray-600 leading-relaxed font-medium">Identificamos o problema do seu equipamento de forma ágil para que você não precise parar sua operação.</p>
              </div>
              <div className="bg-surface border border-border p-8 rounded-3xl shadow-soft hover:shadow-lift transition-all duration-300 group">
                <div className="h-14 w-14 bg-primary text-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform shadow-md">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-black mb-3 text-gray-900">Peças Originais</h3>
                <p className="text-gray-600 leading-relaxed font-medium">Trabalhamos com reposição de peças originais para garantir a máxima durabilidade e qualidade no reparo.</p>
              </div>
              <div className="bg-surface border border-border p-8 rounded-3xl shadow-soft hover:shadow-lift transition-all duration-300 group">
                <div className="h-14 w-14 bg-primary text-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform shadow-md">
                  <PenTool className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-black mb-3 text-gray-900">Equipe Especializada</h3>
                <p className="text-gray-600 leading-relaxed font-medium">Técnicos treinados e experientes em diversos modelos de máquinas do mercado gráfico e de papelaria.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-xl border border-gray-100 relative overflow-hidden">
               <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
               <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
               
               <h2 className="text-4xl font-black mb-10 text-center tracking-tight text-gray-900 uppercase">Nossos Serviços</h2>
               
               <div className="grid md:grid-cols-2 gap-6">
                 {[
                   "Manutenção Preventiva",
                   "Manutenção Corretiva",
                   "Limpeza e Lubrificação",
                   "Troca de Componentes",
                   "Ajustes de Calibração",
                   "Diagnóstico Completo"
                 ].map((service) => (
                   <div key={service} className="flex items-center gap-4 bg-surface p-5 rounded-2xl border border-border hover:border-primary/50 transition-colors group">
                     <div className="bg-primary/20 p-2 rounded-full group-hover:bg-primary group-hover:text-black transition-colors">
                        <CheckCircle className="text-primary group-hover:text-black h-6 w-6 shrink-0 transition-colors" />
                     </div>
                     <span className="font-bold text-gray-800 text-lg">{service}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
