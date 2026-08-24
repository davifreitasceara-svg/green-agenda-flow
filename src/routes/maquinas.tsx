import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  Printer, 
  Settings, 
  ShieldCheck, 
  Clock, 
  Wrench,
  CheckCircle,
  ArrowRight,
  PenTool,
  Droplet
} from "lucide-react";
import fredericoImg from "@/assets/frederico-francisco.jpg";

export const Route = createFileRoute("/maquinas")({
  head: () => ({
    meta: [
      { title: "Conserto de Impressoras & Máquinas Gráficas — Multicopy" },
      { name: "description", content: "Assistência técnica especializada em impressoras, multifuncionais e plotters com Frederico Francisco." },
    ],
  }),
  component: Maquinas,
});

function Maquinas() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans relative overflow-hidden flex flex-col">
      <Header />
      <main className="flex-1">
        {/* HERO - PROFESSIONAL & CLEAN */}
        <section className="relative overflow-hidden bg-white pt-20 pb-32 sm:pt-32 sm:pb-40 border-b border-border">
          {/* Subtle background element */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-12">
             <div className="flex-1 text-center lg:text-left">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6 uppercase tracking-widest">
                 <Wrench className="h-4 w-4" />
                 Especialista Frederico Francisco
               </div>

               <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-zinc-950 mb-6 leading-tight">
                  Assistência Técnica <br />
                  <span className="text-primary">Especializada</span>
               </h1>
               
               <p className="text-lg md:text-xl text-zinc-600 mb-8 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                 O seu equipamento gráfico parou? Com anos de experiência, 
                 <strong className="text-zinc-900 font-bold"> Frederico Francisco </strong> 
                 garante o reparo rápido e seguro de impressoras, plotters e multifuncionais para sua produção não parar.
               </p>
               
               <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                 <a href="https://wa.me/558596668021" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <button className="w-full flex items-center justify-center gap-2 bg-primary text-black font-bold text-lg px-8 h-14 rounded-xl hover:bg-emerald-400 hover:-translate-y-1 transition-all shadow-[0_10px_20px_rgba(16,185,129,0.2)]">
                      Falar com Frederico
                      <ArrowRight className="h-5 w-5" />
                    </button>
                 </a>
                 <a href="/frederico" className="w-full sm:w-auto">
                    <button className="w-full flex items-center justify-center gap-2 bg-white text-zinc-900 font-bold text-lg px-8 h-14 rounded-xl border-2 border-zinc-200 hover:border-zinc-300 transition-all">
                      Conhecer Perfil do Técnico
                    </button>
                 </a>
               </div>
             </div>
             
             {/* Hero Image / Graphic */}
             <div className="flex-1 w-full max-w-lg lg:max-w-none relative hidden md:block lg:pl-10 mt-10 lg:mt-0">
               <div className="relative rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-white group">
                 
                 {/* Premium Background instead of photo */}
                 <div className="absolute inset-0 bg-primary z-10 overflow-hidden transition-transform duration-700 group-hover:scale-[1.05]">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                   <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
                 </div>
                 
                 {/* Content */}
                 <div className="relative p-10 z-30 transition-transform duration-500 group-hover:scale-[1.02]">
                   <div className="flex items-center gap-3 mb-4">
                     <div className="flex -space-x-3">
                       {[...Array(4)].map((_, i) => (
                         <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center overflow-hidden shadow-sm">
                           <Printer className="w-4 h-4 text-primary" />
                         </div>
                       ))}
                     </div>
                     <p className="text-white font-semibold text-sm drop-shadow-md">Mais de 500+ reparos</p>
                   </div>
                   <h3 className="text-white text-3xl font-black drop-shadow-lg">Excelência Técnica</h3>
                   <p className="text-zinc-200 mt-2 font-medium drop-shadow-md">Diagnóstico preciso e manutenção eficiente.</p>
                 </div>
               </div>
               
               {/* Floating badge 1 */}
               <div className="absolute -top-8 right-0 bg-white p-4 rounded-2xl shadow-2xl border border-zinc-100 flex items-center gap-4 animate-bounce hover:pause z-40" style={{ animationDuration: '4s' }}>
                 <div className="bg-primary/20 p-3 rounded-full text-primary">
                   <Wrench className="h-6 w-6" />
                 </div>
                 <div>
                   <p className="text-xs text-zinc-500 font-semibold uppercase">Multimarcas</p>
                   <p className="font-bold text-zinc-900">Especialista</p>
                 </div>
               </div>

               {/* Floating badge 2 */}
               <div className="absolute -bottom-8 lg:-left-4 lg:right-auto bg-white p-4 rounded-2xl shadow-2xl border border-zinc-100 flex items-center gap-4 animate-bounce hover:pause z-40" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
                 <div className="bg-emerald-50 p-3 rounded-full text-emerald-600">
                   <ShieldCheck className="h-6 w-6" />
                 </div>
                 <div>
                   <p className="text-xs text-zinc-500 font-semibold uppercase">Garantia de Serviço</p>
                   <p className="font-bold text-zinc-900">100% Confiável</p>
                 </div>
               </div>
             </div>
          </div>
        </section>

        {/* TRUST / BENEFITS */}
        <section className="py-20 bg-zinc-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                 <Clock className="h-10 w-10 text-primary mb-6" strokeWidth={1.5} />
                 <h3 className="text-xl font-bold text-zinc-900 mb-3">Atendimento Ágil</h3>
                 <p className="text-zinc-600 leading-relaxed">
                   Sabemos que equipamento parado é prejuízo. Oferecemos diagnósticos precisos e manutenções no menor tempo possível.
                 </p>
               </div>
               <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                 <ShieldCheck className="h-10 w-10 text-primary mb-6" strokeWidth={1.5} />
                 <h3 className="text-xl font-bold text-zinc-900 mb-3">Peças de Qualidade</h3>
                 <p className="text-zinc-600 leading-relaxed">
                   Trabalhamos com fornecedores confiáveis para reposição de componentes mecânicos e eletrônicos da sua máquina.
                 </p>
               </div>
               <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow">
                 <PenTool className="h-10 w-10 text-primary mb-6" strokeWidth={1.5} />
                 <h3 className="text-xl font-bold text-zinc-900 mb-3">Expertise Técnica</h3>
                 <p className="text-zinc-600 leading-relaxed">
                   Anos de dedicação de Frederico Francisco ao mercado gráfico, solucionando desde defeitos simples até falhas complexas.
                 </p>
               </div>
             </div>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section id="servicos" className="py-24 bg-white border-t border-zinc-100 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight">
                Principais Serviços
              </h2>
              <p className="text-zinc-500 mt-6 text-lg">
                Assistência completa para impressoras corporativas, plotters de impressão e recorte, e equipamentos de acabamento gráfico.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Droplet, title: "Limpeza de Cabeça de Impressão", desc: "Desentupimento e recuperação de cabeças de impressão, garantindo a máxima qualidade nas cores." },
                { icon: Settings, title: "Manutenção Preventiva", desc: "Limpeza interna, lubrificação de engrenagens, ajustes de correias e revisão geral para evitar quebras." },
                { icon: Wrench, title: "Reparo Mecânico", desc: "Troca de roletes, tracionadores, correias, e engrenagens desgastadas pelo tempo de uso." },
                { icon: Printer, title: "Manutenção em Plotters", desc: "Ajuste e calibração de máquinas de grande formato, resolução de erros de painel e falhas." },
                { icon: CheckCircle, title: "Instalação e Configuração", desc: "Setup inicial de equipamentos novos no seu laboratório gráfico e configuração em rede." },
                { icon: PenTool, title: "Acabamentos Gráficos", desc: "Conserto de encadernadoras, guilhotinas elétricas, laminadoras e vincadeiras." },
              ].map((s, i) => (
                <div key={i} className="bg-zinc-50 border border-zinc-200 p-8 rounded-3xl hover:bg-white hover:border-primary/30 transition-all duration-300 group">
                  <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center mb-6 border border-zinc-200 group-hover:shadow-md transition-all">
                    <s.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-zinc-950">{s.title}</h3>
                  <p className="text-zinc-600 leading-relaxed font-medium">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="py-20 bg-zinc-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="bg-zinc-950 rounded-[3rem] p-10 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
               
               <div className="relative z-10 max-w-xl">
                 <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                   Agende uma avaliação do seu equipamento
                 </h2>
                 <p className="text-zinc-400 text-lg mb-8">
                   Entre em contato pelo WhatsApp. Fale diretamente com o <strong className="text-white">Frederico Francisco</strong> e tire suas dúvidas sobre o conserto da sua máquina.
                 </p>
                 <div className="space-y-3">
                   <div className="flex items-center gap-3 text-white">
                     <CheckCircle className="text-primary h-6 w-6 shrink-0" />
                     <span className="font-semibold text-lg">Orçamento transparente</span>
                   </div>
                   <div className="flex items-center gap-3 text-white">
                     <CheckCircle className="text-primary h-6 w-6 shrink-0" />
                     <span className="font-semibold text-lg">Solução direto ao ponto</span>
                   </div>
                 </div>
               </div>
               
               <div className="relative z-10 w-full md:w-auto shrink-0 text-center">
                 <div className="bg-white/10 p-4 rounded-3xl border border-white/10 backdrop-blur-sm">
                   <a href="https://wa.me/558596668021" target="_blank" rel="noopener noreferrer">
                     <button className="w-full md:w-auto bg-primary hover:bg-emerald-400 text-black font-black text-lg px-8 py-5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3">
                       Falar no WhatsApp
                       <ArrowRight className="h-6 w-6" />
                     </button>
                   </a>
                   <p className="text-zinc-400 mt-4 text-sm font-medium">Atendimento em horário comercial</p>
                 </div>
               </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
