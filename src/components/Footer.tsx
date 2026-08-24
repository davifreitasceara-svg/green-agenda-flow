import { Link } from "@tanstack/react-router";
import { Mail, Clock } from "lucide-react";
import logo from "@/assets/logo.png";
import { RuixenGradientFooter } from "@/components/ui/ruixen-gradient-footer";
import { PhoneMockup } from "@/components/ui/phone-mockup";

export function Footer() {
  return (
    <RuixenGradientFooter 
      className="relative bg-black text-white pt-20 font-sans mt-24 border-t-4 border-primary"
      gradientHeight="40vh"
    >
      {/* Top Logo Badge */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center justify-center w-24 h-24 bg-white rounded-full border-4 border-primary shadow-sm z-20 p-2 overflow-hidden">
        <img src={logo} alt="Multicopy" className="w-full h-full object-contain" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10 bg-black pb-16">
        {/* Newsletter Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16 border-b border-white/10 pb-12">
          
          {/* Phone Mockup Integration */}
          <div className="hidden lg:flex w-1/3 justify-center">
            <PhoneMockup />
          </div>

          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
            <div className="mb-8">
              <h2 className="text-5xl md:text-7xl text-primary mb-2 tracking-wide" style={{ fontFamily: "'Dancing Script', 'Pacifico', cursive" }}>
                fique por dentro
              </h2>
              <p className="text-lg font-bold">cadastre-se!</p>
              <p className="text-sm opacity-80">receba nossas novidades</p>
            </div>
            
            <div className="flex w-full max-w-2xl gap-2 bg-white/5 p-1.5 rounded-lg shadow-sm border border-white/10">
              <input 
                type="email" 
                placeholder="Cadastre seu e-mail..." 
                className="flex-1 bg-transparent px-4 py-3 outline-none text-sm text-white placeholder-gray-400"
              />
              <button className="bg-primary text-black px-8 py-3 rounded-md font-bold text-sm uppercase transition-colors hover:bg-primary/80">
                Enviar
              </button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Column 1: Contact Info */}
          <div className="flex flex-col gap-6">
            <a href="https://wa.me/558596668021" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white/5 p-4 rounded-xl shadow-sm hover:bg-white/10 transition-colors border border-white/10 w-max">
              <div className="bg-primary p-2.5 rounded-full text-black shadow-sm">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div className="text-sm">
                <span className="block font-medium opacity-80">Chama a gente</span>
                <span className="block font-black text-base text-primary">no WhatsApp!!</span>
              </div>
            </a>
            
            <div className="flex items-start gap-4 mt-2">
              <Mail className="w-6 h-6 mt-1 text-primary" />
              <div className="text-sm">
                <span className="block opacity-80 mb-1">Mande-me email</span>
                <a href="mailto:multicopy26@gmail.com" className="font-medium hover:underline text-base hover:text-primary">multicopy26@gmail.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4 mt-2">
              <Clock className="w-6 h-6 mt-1 text-primary" />
              <div className="text-sm">
                <span className="block opacity-80 mb-1">Nossos Horários</span>
                <span className="block font-medium text-base">seg a sexta</span>
                <span className="block font-medium text-base">09 às 18h</span>
              </div>
            </div>
          </div>


          {/* Column 3: Informações */}
          <div>
            <h2 className="font-bold text-xl mb-6 tracking-wide text-primary">informações</h2>
            <ul className="space-y-4 text-sm font-medium uppercase opacity-80">
              <li><Link to="/" className="hover:text-primary hover:underline transition-colors">POLÍTICA DE PRIVACIDADE</Link></li>
              <li><Link to="/" className="hover:text-primary hover:underline transition-colors">POLÍTICA DE USO</Link></li>
              <li><Link to="/" className="hover:text-primary hover:underline transition-colors">PERGUNTAS FREQUENTES</Link></li>
            </ul>
          </div>

          {/* Column 4: Minha Conta */}
          <div>
            <h2 className="font-bold text-xl mb-6 tracking-wide text-primary">minha conta</h2>
            <ul className="space-y-4 text-sm font-medium uppercase opacity-80">
              <li><Link to="/" className="hover:text-primary hover:underline transition-colors">FAÇA SEU LOGIN</Link></li>
              <li><Link to="/" className="hover:text-primary hover:underline transition-colors">MINHA CONTA</Link></li>
              <li><Link to="/" className="hover:text-primary hover:underline transition-colors">EDITAR CADASTRO</Link></li>
              <li><Link to="/" className="hover:text-primary hover:underline transition-colors">MEUS PEDIDOS</Link></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm opacity-80 gap-6">
          <p>© {new Date().getFullYear()} Multicopy. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-medium text-gray-400">Desenvolvido por</span>
            <div className="flex items-center text-[#1E50FF] mx-1">
              <span className="text-xl font-bold">{"{"}</span>
              <div className="relative mx-1">
                {/* Simplified Rocket icon matching the image */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 -rotate-45">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
              </div>
              <span className="text-xl font-bold">{"}"}</span>
            </div>
            <span className="font-bold text-white tracking-widest text-[13px]">DVSCODES</span>
          </div>
        </div>
      </div>
    </RuixenGradientFooter>
  );
}
