import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Instagram, Facebook, Youtube, Lightbulb, MessageCircle, Gift, Grid, Book, Calendar, Phone, Download, Menu, Sparkles, LogOut, Settings } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { useCart } from "@/contexts/CartContext";

export function Header() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="w-full font-sans shadow-sm sticky top-0 z-50">
      {/* Top Thin Bar */}
      <div className="w-full h-2 bg-primary"></div>
      
      {/* Main Header (White) */}
      <div className="w-full bg-white border-b border-border relative overflow-hidden">
        {/* Subtle Background pattern/swirls */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c13.866 0 25.368 11.454 26 25.31L37 44c0-14.359-11.641-26-26-26v-10c19.882 0 36 16.118 36 36v1h-10v-1C37 25.163 26.837 15 14 15c-1 0-2 .064-3 .186V11z\' fill=\'%23000\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")', backgroundSize: '150px' }}></div>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 flex-wrap relative z-10">
          
          {/* LEFT: Logo & Welcome */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <Lightbulb className="w-12 h-12 text-black fill-primary transition-transform group-hover:rotate-12 group-hover:scale-110" strokeWidth={1.5} />
                <Sparkles className="absolute -top-1 -left-1 w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col items-start leading-none ml-1">
                <span className="text-[11px] font-bold text-gray-500 ml-1 mb-[-2px]">estúdio</span>
                <span className="text-5xl font-black text-black tracking-tighter" style={{ fontFamily: "'Dancing Script', 'Pacifico', cursive", transform: "scaleY(1.1)" }}>Multicopy</span>
                <span className="text-[8px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1 ml-0.5">Arquivos Digitais</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-3">
              {/* Welcome Bubble */}
              <div className="flex items-center text-[10px] font-bold text-black leading-tight">
                 <div className="bg-primary text-black rounded-[16px] rounded-bl-none px-2.5 py-1.5 mr-2 font-display text-base shadow-sm transform -rotate-6">oie</div>
                 <span>Seja muito<br/>bem-vindo!</span>
              </div>
              
              {/* Social Icons */}
              <div className="flex gap-1.5 ml-2">
                {[Instagram, Facebook, Youtube, Menu].map((Icon, i) => (
                  <a key={i} href="#" className="w-7 h-7 flex items-center justify-center rounded-full bg-black text-white hover:bg-primary hover:text-black transition-all hover:scale-110 hover:-translate-y-1 shadow-sm">
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* MIDDLE: Search */}
          <div className="flex-1 max-w-lg px-2 w-full order-last md:order-none mt-4 md:mt-0">
            <div className="relative flex items-center w-full h-10 rounded-full bg-surface shadow-inner border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <input 
                type="text" 
                placeholder="Buscar" 
                className="flex-1 h-full px-5 text-sm outline-none text-black bg-transparent placeholder-gray-400"
              />
              <button className="h-full px-4 text-black hover:text-primary transition-colors">
                <Search className="w-5 h-5 stroke-[2.5px]" />
              </button>
            </div>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <div className="hidden sm:flex items-center gap-2 bg-primary/10 pr-4 pl-1 py-1 rounded-full border border-primary/20 hover:bg-primary/20 transition-all shadow-sm hover:shadow-md cursor-pointer group">
                    <img 
                      src={user.user_metadata?.avatar_url || "https://ui-avatars.com/api/?name=" + (user.user_metadata?.full_name || "User")} 
                      alt="Avatar" 
                      className="w-8 h-8 rounded-full border border-primary/30 object-cover group-hover:scale-105 transition-transform" 
                    />
                    <div className="text-[10px] font-bold text-black leading-tight text-left">
                      olá, {user.user_metadata?.full_name?.split(" ")[0] || "Usuário"}<br/><span className="font-medium text-gray-500">minha conta</span>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white border border-border shadow-lg rounded-xl overflow-hidden mt-1 p-1 z-[100]">
                  <DropdownMenuItem className="cursor-pointer text-sm font-semibold rounded-lg hover:bg-primary/10 py-2">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurações
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border my-1" />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-sm font-semibold text-red-600 rounded-lg hover:bg-red-50 py-2">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="hidden sm:flex items-center gap-2 bg-primary/10 pr-4 pl-1 py-1 rounded-full border border-primary/20 hover:bg-primary/20 transition-all shadow-sm hover:shadow-md group">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-105 transition-transform group-hover:bg-primary group-hover:text-black">
                  <User className="w-4 h-4" />
                </div>
                <div className="text-[10px] font-bold text-black leading-tight text-left">
                  iniciar sessão<br/><span className="font-medium text-gray-500">ou</span> criar uma conta
                </div>
              </Link>
            )}

            <a href="https://wa.me/5585989059679" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center shadow-sm hover:bg-black hover:text-primary transition-all hover:scale-110 hover:-rotate-12 border-2 border-transparent">
              <MessageCircle className="w-5 h-5" />
            </a>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative w-10 h-10 flex items-center justify-center transition-transform hover:scale-110 hover:rotate-6 group"
            >
              <ShoppingBag className="w-8 h-8 text-black fill-primary/20 group-hover:fill-primary" strokeWidth={1.5} />
              <span className="absolute -bottom-1 -right-1 bg-black text-primary text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-sm">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav Bar (Black Shades) */}
      <nav className="w-full bg-black shadow-sm relative z-20 border-t border-gray-900">
        <div className="mx-auto max-w-7xl overflow-x-auto scrollbar-hide">
          <ul className="flex items-center min-w-max">
            <li className="flex-1 bg-primary">
              <Link to="/" hash="novidades" className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-3 text-[12px] font-bold text-black hover:bg-primary/80 transition-colors h-full">
                <Gift className="w-4 h-4 text-black" strokeWidth={1.5} /> Novidades
              </Link>
            </li>
            <li className="flex-1 bg-gray-900">
              <Link to="/" hash="produtos" className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-3 text-[12px] font-medium text-white hover:bg-gray-800 transition-colors h-full">
                <Grid className="w-4 h-4 text-primary" strokeWidth={1.5} /> Ver Todos
              </Link>
            </li>
            <li className="flex-1 bg-black">
              <Link to="/" hash="produtos" className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-3 text-[12px] font-medium text-white hover:text-primary transition-colors h-full">
                <Book className="w-4 h-4" strokeWidth={1.5} /> Coleção de Jesus
              </Link>
            </li>
            <li className="flex-1 bg-black border-l border-gray-900">
              <Link to="/" hash="produtos" className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-3 text-[12px] font-medium text-white hover:text-primary transition-colors h-full">
                <Sparkles className="w-4 h-4" strokeWidth={1.5} /> Coleção Delicada
              </Link>
            </li>
            <li className="flex-1 bg-black border-l border-gray-900">
              <Link to="/" hash="produtos" className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-3 text-[12px] font-medium text-white hover:text-primary transition-colors h-full">
                <Gift className="w-4 h-4" strokeWidth={1.5} /> Coleção Cherry
              </Link>
            </li>
            <li className="flex-1 bg-black border-l border-gray-900">
              <Link to="/" hash="produtos" className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-3 text-[12px] font-medium text-white hover:text-primary transition-colors h-full">
                <User className="w-4 h-4" strokeWidth={1.5} /> Coleção Masculina
              </Link>
            </li>
            <li className="flex-1 bg-black border-l border-gray-900">
              <Link to="/" hash="produtos" className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-3 text-[12px] font-medium text-white hover:text-primary transition-colors h-full">
                <Lightbulb className="w-4 h-4" strokeWidth={1.5} /> Coleção Mel
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sub Nav */}
      <div className="w-full bg-surface border-b border-border relative z-10">
        <div className="mx-auto max-w-7xl flex items-center px-6 py-2.5 gap-8 overflow-x-auto scrollbar-hide text-[11px] font-bold text-gray-500 uppercase tracking-widest">
           <a href="#" className="hover:text-primary transition-colors whitespace-nowrap pl-4">DATADO 2026</a>
           <a href="#" className="hover:text-primary transition-colors whitespace-nowrap">PERMANENTES</a>
        </div>
      </div>
    </header>
  );
}
