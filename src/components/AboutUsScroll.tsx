import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Printer } from "lucide-react";

export function AboutUsScroll() {
  return (
    <section className="bg-white" id="quem-somos">
      <div className="flex flex-col overflow-hidden pb-[500px]">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white flex flex-col items-center">
                <span className="text-4xl md:text-[5rem] font-bold mt-1 leading-none tracking-tighter text-primary">
                  Quem Somos
                </span>
                <br />
                <span className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto mb-10">
                  Comprometidos em transformar ideias em realidade.
                </span>
              </h1>
            </>
          }
        >
          <div className="h-full w-full flex flex-col justify-center items-center p-8 md:p-16 text-center bg-white">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-8">
              <Printer className="w-10 h-10" />
            </div>
            
            <p className="text-lg md:text-2xl text-gray-800 leading-relaxed font-medium mb-6">
              A <strong className="text-primary">Multicopy</strong> é uma empresa especializada em papelaria e serviços gráficos, comprometida em transformar ideias em realidade. Trabalhamos com uma ampla variedade de impressões, como agendas personalizadas, cartões de visita, panfletos, folders, entre outros materiais.
            </p>
            
            <p className="text-md md:text-xl text-gray-600 leading-relaxed mb-6">
              Nosso objetivo é dar vida às suas ideias, oferecendo produtos de alta qualidade que valorizam sua marca, seu negócio ou seu projeto. Cada detalhe é pensado com cuidado para que o resultado final esteja à altura das suas expectativas.
            </p>
            
            <p className="text-md md:text-xl text-gray-600 leading-relaxed italic">
              Na Multicopy, acreditamos que uma boa impressão faz toda a diferença. Conte conosco para colocar sua ideia no papel e destacar a sua identidade com criatividade, qualidade e excelência.
            </p>
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
}
