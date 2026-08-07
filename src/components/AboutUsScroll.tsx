import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Printer } from "lucide-react";

export function AboutUsScroll() {
  return (
    <section className="bg-surface relative overflow-hidden" id="quem-somos">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="flex flex-col overflow-hidden pb-[300px] md:pb-[500px]">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white flex flex-col items-center">
                <span className="text-5xl md:text-[6rem] font-black mt-1 leading-none tracking-tighter bg-gradient-to-br from-primary-deep via-primary to-green-400 bg-clip-text text-transparent drop-shadow-sm pb-2" style={{ fontFamily: "'Dancing Script', 'Pacifico', cursive" }}>
                  Quem Somos
                </span>
                <br />
                <span className="text-lg md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto mb-10">
                  Transformando ideias em realidade.
                </span>
              </h1>
            </>
          }
        >
          <div className="relative h-full w-full flex flex-col justify-center items-center p-8 md:p-16 text-center overflow-hidden bg-black rounded-2xl">
            {/* Imagem de Fundo Unsplash com Overlay */}
            <div className="absolute inset-0 z-0">
               <img 
                 src="https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=2000&auto=format&fit=crop" 
                 className="w-full h-full object-cover opacity-40 scale-105" 
                 alt="Papelaria e Impressão" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-white">
              <div className="w-24 h-24 bg-primary/20 backdrop-blur-md text-primary rounded-full flex items-center justify-center mb-8 border border-primary/30 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                <Printer className="w-12 h-12" />
              </div>
              
              <h3 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight text-white drop-shadow-md">
                A <span className="text-primary font-black">Multicopy</span> é mais do que uma gráfica.
              </h3>
              
              <p className="text-lg md:text-2xl text-gray-200 leading-relaxed font-light mb-6 max-w-3xl">
                Somos uma equipe comprometida em dar vida aos seus projetos, sejam agendas personalizadas, cartões de visita, panfletos ou materiais corporativos. 
              </p>
              
              <p className="text-base md:text-xl text-gray-300 leading-relaxed mb-10 max-w-3xl">
                Cada detalhe é pensado com cuidado para que o resultado final esteja à altura das suas expectativas. Afinal, uma boa impressão faz toda a diferença.
              </p>
              
              <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-full backdrop-blur-sm">
                <p className="text-sm md:text-lg text-primary font-bold tracking-widest uppercase">
                  Criatividade • Qualidade • Excelência
                </p>
              </div>
            </div>
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
}
