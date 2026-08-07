import { useState } from "react";
import { Check, Settings, ArrowRight, LayoutTemplate, Smartphone, FileText, CheckCircle2 } from "lucide-react";

type AgendaSize = "A5" | "A6";
type AgendaBinding = "Wire-o" | "Costurada";
type AgendaCover = "Couro" | "Papelão" | "Plástico";
type AgendaTheme = "Boneco" | "Floral" | "Minimalista";

export function AgendaBuilder() {
  const [size, setSize] = useState<AgendaSize>("A5");
  const [binding, setBinding] = useState<AgendaBinding>("Wire-o");
  const [cover, setCover] = useState<AgendaCover>("Couro");
  const [theme, setTheme] = useState<AgendaTheme>("Boneco");

  const basePrice = 49.90;
  
  const sizeMultiplier = size === "A6" ? 0.8 : 1;
  const bindingCost = binding === "Wire-o" ? 15 : 25;
  const coverCost = cover === "Couro" ? 40 : cover === "Papelão" ? 20 : 10;

  const total = (basePrice * sizeMultiplier) + bindingCost + coverCost;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter uppercase">
          Monte sua <span className="text-primary">Agenda</span>
        </h2>
        <p className="mt-4 text-gray-500 font-medium">
          Personalize cada detalhe da sua agenda para que ela seja exatamente do seu jeito.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 items-start">
        {/* Left Side: Options */}
        <div className="flex flex-col gap-10 bg-white p-8 rounded-3xl border border-border shadow-sm">
          
          {/* Step 1: Size */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-black font-bold text-sm">1</span>
              <h3 className="text-xl font-bold text-black">Escolha o Tamanho</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => setSize("A5")}
                className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all ${size === "A5" ? "border-primary bg-primary/5 shadow-md scale-105" : "border-gray-200 hover:border-gray-300"}`}
              >
                <div className="relative">
                  <LayoutTemplate className={`w-10 h-10 ${size === "A5" ? "text-primary" : "text-gray-400"}`} strokeWidth={1.5} />
                  {size === "A5" && <div className="absolute -top-3 -right-6 bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-full">POPULAR</div>}
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-800">A5 (Médio)</p>
                  <p className="text-xs text-gray-500 mt-1">14.8 x 21 cm</p>
                </div>
              </button>

              <button 
                onClick={() => setSize("A6")}
                className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all ${size === "A6" ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"}`}
              >
                <Smartphone className={`w-8 h-8 ${size === "A6" ? "text-primary" : "text-gray-400"}`} strokeWidth={1.5} />
                <div className="text-center">
                  <p className="font-bold text-gray-800">A6 (Pocket)</p>
                  <p className="text-xs text-gray-500 mt-1">10.5 x 14.8 cm</p>
                </div>
              </button>
            </div>
          </div>

          {/* Step 2: Binding */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-black font-bold text-sm">2</span>
              <h3 className="text-xl font-bold text-black">Encadernação</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {["Wire-o", "Costurada"].map((b) => (
                <button 
                  key={b}
                  onClick={() => setBinding(b as AgendaBinding)}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${binding === b ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <span className="font-bold text-gray-800">{b}</span>
                  {binding === b ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Cover */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-black font-bold text-sm">3</span>
              <h3 className="text-xl font-bold text-black">Acabamento da Capa</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["Couro", "Papelão", "Plástico"].map((c) => (
                <button 
                  key={c}
                  onClick={() => setCover(c as AgendaCover)}
                  className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all ${cover === c ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <span className="font-bold text-gray-800">{c}</span>
                </button>
              ))}
            </div>
            {/* Step 4: Theme */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-black font-bold text-sm">4</span>
              <h3 className="text-xl font-bold text-black">Tema da Capa</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["Boneco", "Floral", "Minimalista"].map((t) => (
                <button 
                  key={t}
                  onClick={() => setTheme(t as AgendaTheme)}
                  className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all ${theme === t ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <span className="font-bold text-gray-800">{t}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        </div>

        {/* Right Side: Summary Panel */}
        <div className="sticky top-28 bg-black text-white p-8 rounded-3xl shadow-xl flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
            <Settings className="w-6 h-6 text-primary animate-spin-slow" />
            <h3 className="text-xl font-bold">Seu Pedido</h3>
          </div>

          <div className="flex flex-col gap-4 text-sm font-medium">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Tamanho selecionado:</span>
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full">{size}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Encadernação:</span>
              <span className="text-white">{binding}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Capa:</span>
              <span className="text-white">{cover}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Tema:</span>
              <span className="text-white">{theme}</span>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-4 mt-2">
            <p className="text-gray-400 text-sm mb-1">Total estimado</p>
            <p className="text-4xl font-black text-primary flex items-baseline gap-1">
              <span className="text-xl">R$</span> {total.toFixed(2).replace(".", ",")}
            </p>
          </div>

          <button className="w-full mt-4 bg-primary text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors">
            Adicionar ao Carrinho <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
