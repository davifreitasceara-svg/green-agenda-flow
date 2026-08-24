import React, { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X, ChevronDown, Briefcase, Building2, Wrench } from "lucide-react";
import fredericoImg from "@/assets/frederico-francisco.jpg";
import maquina1 from "@/assets/maquina-1.png";
import maquina2 from "@/assets/maquina-2.png";
import maquina3 from "@/assets/maquina-3.png";
import maquina4 from "@/assets/maquina-4.png";
import maquina5 from "@/assets/maquina-5.png";

// Inline Button component
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// BlurText animation component
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

export default function PortfolioHero() {
  const [isDark, setIsDark] = useState(false); // Default to light mode (white/green)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Using a nice green from Tailwind (emerald-500 #10b981)
  const primaryColor = "#10b981";

  useEffect(() => {
    // We start in light mode
    document.documentElement.classList.remove("dark");
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const menuItems = [
    { label: "VOLTAR", href: "/maquinas", highlight: true },
    { label: "SOBRE MIM", href: "#" },
    { label: "SERVIÇOS", href: "#" },
    { label: "EXPERIÊNCIA", href: "#" },
    { label: "CONTATO", href: "https://wa.me/558596668021" },
  ];

  return (
    <div 
      className="min-h-screen text-foreground transition-colors"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 10%)" : "hsl(0 0% 100%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      <header 
        className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-500 ${
          isScrolled ? "py-4 bg-background/80 backdrop-blur-md shadow-sm" : "py-6"
        }`}
        style={{
          backgroundColor: isScrolled ? (isDark ? "rgba(20, 20, 20, 0.8)" : "rgba(255, 255, 255, 0.8)") : "transparent"
        }}
      >
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto relative min-h-[56px] md:min-h-[80px]">
          {/* Menu Button */}
          <div className="relative z-10">
            <button
              ref={buttonRef}
              type="button"
              className="p-2 transition-colors duration-300 hover:opacity-70"
              style={{ color: primaryColor }}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-8 h-8 transition-colors duration-300" strokeWidth={2} />
              ) : (
                <Menu className="w-8 h-8 transition-colors duration-300" strokeWidth={2} />
              )}
            </button>

            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute top-full left-0 w-[200px] md:w-[240px] border-none shadow-2xl mt-2 ml-4 p-4 rounded-lg z-[100]"
                style={{
                  backgroundColor: isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 98%)",
                }}
              >
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block text-lg md:text-xl font-bold tracking-tight py-1.5 px-2 cursor-pointer transition-colors duration-300"
                    style={{
                      color: item.highlight ? primaryColor : isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = primaryColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = item.highlight ? primaryColor : (isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)");
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Multicopy Logo Video */}
          <div 
            className={`absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out flex items-center justify-center overflow-hidden z-0
              ${isScrolled 
                ? "right-[80px] md:right-[100px] scale-75 md:scale-90 origin-right" 
                : "left-1/2 -translate-x-1/2 scale-100 origin-center"
              }
            `}
          >
            <video 
              src="/logo-animada.mp4" 
              autoPlay 
              muted 
              playsInline 
              className="h-14 md:h-20 object-cover pointer-events-none"
              style={{ 
                mixBlendMode: isDark ? "normal" : "multiply",
                filter: isDark ? "none" : "brightness(1.3) contrast(1.3)" 
              }}
            />
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="relative w-16 h-8 rounded-full hover:opacity-80 transition-opacity z-10"
            style={{ backgroundColor: isDark ? "hsl(0 0% 20%)" : "hsl(0 0% 90%)" }}
            aria-label="Toggle theme"
          >
            <div
              className="absolute top-1 left-1 w-6 h-6 rounded-full transition-transform duration-300 shadow-sm"
              style={{
                backgroundColor: isDark ? primaryColor : "white",
                transform: isDark ? "translateX(2rem)" : "translateX(0)",
              }}
            />
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative min-h-screen flex flex-col">
        {/* Centered Main Name - Always Perfectly Centered */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
          <div className="relative text-center flex flex-col items-center">
            <div>
              <BlurText
                text="FREDERICO"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[50px] sm:text-[80px] md:text-[110px] lg:text-[140px] leading-[0.85] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: primaryColor, fontFamily: "'Fira Code', monospace" }}
              />
            </div>
            <div>
              <BlurText
                text="FRANCISCO"
                delay={100}
                animateBy="letters"
                direction="top"
                className="font-bold text-[50px] sm:text-[80px] md:text-[110px] lg:text-[140px] leading-[0.85] tracking-tighter uppercase justify-center whitespace-nowrap"
                style={{ color: primaryColor, fontFamily: "'Fira Code', monospace" }}
              />
            </div>

            {/* Profile Picture Placeholder */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-[80px] h-[120px] sm:w-[110px] sm:h-[160px] md:w-[140px] md:h-[200px] lg:w-[160px] lg:h-[230px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer border-4 border-white dark:border-zinc-800">
                <img
                  src={fredericoImg}
                  alt="Perfil do Frederico Francisco"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-32 xl:bottom-36 left-1/2 -translate-x-1/2 w-full px-6">
          <div className="flex justify-center">
            <BlurText
              text="Especialista em manutenção de impressoras e máquinas gráficas."
              delay={150}
              animateBy="words"
              direction="top"
              className="text-[15px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center transition-colors duration-300 font-medium"
              style={{ fontFamily: "'Antic', sans-serif", color: isDark ? "#a1a1aa" : "#52525b" }}
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          onClick={() => {
            document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 transition-colors duration-300 animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-5 h-5 md:w-8 md:h-8 transition-colors duration-300" style={{ color: primaryColor }} />
        </button>
      </main>

      {/* Bio / Portfolio Section */}
      <section id="sobre" className="min-h-screen py-24 px-6 max-w-5xl mx-auto flex flex-col justify-center">
        <h2 className="text-4xl md:text-5xl font-black mb-10" style={{ color: primaryColor }}>
          Trajetória & Portfólio
        </h2>
        <div className="space-y-6 text-lg md:text-xl font-medium leading-relaxed" style={{ color: isDark ? "#d4d4d8" : "#3f3f46" }}>
          <p>
            Com mais de <strong>30 anos de carreira</strong> dedicados à manutenção e suporte técnico de excelência, 
            construí minha base resolvendo problemas reais de empresas do setor gráfico e de tecnologia.
          </p>
          <p>
            Ao longo da minha trajetória, atuei em grandes referências do setor técnico corporativo, passando por empresas como <strong>DIGILOC</strong>, <strong>CDMAX</strong> e <strong>TECNOVETTI</strong>. 
            Essas experiências me permitiram lidar com os mais variados tipos de máquinas, impressoras de grande formato e plotters, dominando desde a mecânica de precisão até a calibração de softwares e placas lógicas.
          </p>
          <p>
            Hoje, aplico todo esse <i>know-how</i> de três décadas para garantir que sua produção nunca pare. 
            Como <strong>sócio da Multicopy</strong>, meu compromisso é com a qualidade do serviço, a durabilidade das peças e a transparência em cada diagnóstico.
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col justify-center" style={{ borderColor: isDark ? "#3f3f46" : "#e4e4e7", backgroundColor: isDark ? "hsl(0 0% 12%)" : "hsl(0 0% 98%)" }}>
            <h3 className="text-3xl md:text-4xl font-black mb-2" style={{ color: primaryColor }}>30+</h3>
            <p className="font-semibold text-base md:text-lg leading-tight" style={{ color: isDark ? "#a1a1aa" : "#52525b" }}>Anos de Carreira</p>
          </div>
          <div className="p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col justify-center" style={{ borderColor: isDark ? "#3f3f46" : "#e4e4e7", backgroundColor: isDark ? "hsl(0 0% 12%)" : "hsl(0 0% 98%)" }}>
            <h3 className="text-3xl md:text-4xl font-black mb-2" style={{ color: primaryColor }}>Multimarcas</h3>
            <p className="font-semibold text-base md:text-lg leading-tight" style={{ color: isDark ? "#a1a1aa" : "#52525b" }}>Especialista Técnico</p>
          </div>
          <div className="p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col justify-center" style={{ borderColor: isDark ? "#3f3f46" : "#e4e4e7", backgroundColor: isDark ? "hsl(0 0% 12%)" : "hsl(0 0% 98%)" }}>
            <h3 className="text-3xl md:text-4xl font-black mb-2" style={{ color: primaryColor }}>Sócio</h3>
            <p className="font-semibold text-base md:text-lg leading-tight" style={{ color: isDark ? "#a1a1aa" : "#52525b" }}>da Multicopy Gráfica</p>
          </div>
          <div className="p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col justify-center" style={{ borderColor: isDark ? "#3f3f46" : "#e4e4e7", backgroundColor: isDark ? "hsl(0 0% 12%)" : "hsl(0 0% 98%)" }}>
            <h3 className="text-3xl md:text-4xl font-black mb-2" style={{ color: primaryColor }}>500+</h3>
            <p className="font-semibold text-base md:text-lg leading-tight" style={{ color: isDark ? "#a1a1aa" : "#52525b" }}>Máquinas Reparadas</p>
          </div>
        </div>

        <div className="mt-20 pt-16 border-t" style={{ borderColor: isDark ? "#27272a" : "#e4e4e7" }}>
          <h3 className="text-3xl font-black mb-12 text-center" style={{ color: primaryColor }}>
            Experiência Profissional
          </h3>
          <div className="relative max-w-3xl mx-auto">
            {/* Linha vertical (timeline) */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-emerald-500 to-transparent opacity-30" />
            
            <div className="space-y-12 relative">
              {/* DIGILOC */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                <div className="hidden md:block w-5/12 text-right pr-8">
                  <h4 className="text-2xl font-black transition-colors duration-300 group-hover:text-emerald-500" style={{ color: isDark ? "#fff" : "#18181b" }}>DIGILOC</h4>
                  <p className="text-lg font-medium" style={{ color: isDark ? "#a1a1aa" : "#52525b" }}>Técnico Especialista</p>
                </div>
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 flex items-center justify-center bg-white dark:bg-zinc-900 transition-transform duration-300 group-hover:scale-125 shadow-lg z-10" style={{ borderColor: primaryColor }}>
                  <Briefcase className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
                <div className="md:hidden pl-20 pb-2">
                  <h4 className="text-2xl font-black" style={{ color: isDark ? "#fff" : "#18181b" }}>DIGILOC</h4>
                  <p className="text-lg font-medium" style={{ color: isDark ? "#a1a1aa" : "#52525b" }}>Técnico Especialista</p>
                </div>
                <div className="w-full md:w-5/12 pl-20 md:pl-8 text-left">
                  <div className="p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md" style={{ borderColor: isDark ? "#3f3f46" : "#e4e4e7", backgroundColor: isDark ? "hsl(0 0% 12%)" : "hsl(0 0% 98%)" }}>
                    <p style={{ color: isDark ? "#d4d4d8" : "#3f3f46" }}>
                      Profundo conhecimento prático e teórico, lidando com máquinas corporativas, impressoras de grande formato e plotters.
                    </p>
                  </div>
                </div>
              </div>

              {/* CDMAX */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                <div className="w-full md:w-5/12 pl-20 md:pr-8 md:pl-0 text-left md:text-right order-2 md:order-1">
                  <div className="p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md" style={{ borderColor: isDark ? "#3f3f46" : "#e4e4e7", backgroundColor: isDark ? "hsl(0 0% 12%)" : "hsl(0 0% 98%)" }}>
                    <p style={{ color: isDark ? "#d4d4d8" : "#3f3f46" }}>
                      Atuação direta na manutenção corretiva e preventiva de equipamentos de alto desempenho em diversos clientes.
                    </p>
                  </div>
                </div>
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 flex items-center justify-center bg-white dark:bg-zinc-900 transition-transform duration-300 group-hover:scale-125 shadow-lg z-10 order-1 md:order-2" style={{ borderColor: primaryColor }}>
                  <Building2 className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
                <div className="md:hidden pl-20 pb-2 order-1">
                  <h4 className="text-2xl font-black" style={{ color: isDark ? "#fff" : "#18181b" }}>CDMAX</h4>
                  <p className="text-lg font-medium" style={{ color: isDark ? "#a1a1aa" : "#52525b" }}>Suporte & Manutenção</p>
                </div>
                <div className="hidden md:block w-5/12 text-left pl-8 order-3">
                  <h4 className="text-2xl font-black transition-colors duration-300 group-hover:text-emerald-500" style={{ color: isDark ? "#fff" : "#18181b" }}>CDMAX</h4>
                  <p className="text-lg font-medium" style={{ color: isDark ? "#a1a1aa" : "#52525b" }}>Suporte & Manutenção</p>
                </div>
              </div>

              {/* TECNOVETTI */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                <div className="hidden md:block w-5/12 text-right pr-8">
                  <h4 className="text-2xl font-black transition-colors duration-300 group-hover:text-emerald-500" style={{ color: isDark ? "#fff" : "#18181b" }}>TECNOVETTI</h4>
                  <p className="text-lg font-medium" style={{ color: isDark ? "#a1a1aa" : "#52525b" }}>Técnico de Campo</p>
                </div>
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 flex items-center justify-center bg-white dark:bg-zinc-900 transition-transform duration-300 group-hover:scale-125 shadow-lg z-10" style={{ borderColor: primaryColor }}>
                  <Wrench className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
                <div className="md:hidden pl-20 pb-2">
                  <h4 className="text-2xl font-black" style={{ color: isDark ? "#fff" : "#18181b" }}>TECNOVETTI</h4>
                  <p className="text-lg font-medium" style={{ color: isDark ? "#a1a1aa" : "#52525b" }}>Técnico de Campo</p>
                </div>
                <div className="w-full md:w-5/12 pl-20 md:pl-8 text-left">
                  <div className="p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md" style={{ borderColor: isDark ? "#3f3f46" : "#e4e4e7", backgroundColor: isDark ? "hsl(0 0% 12%)" : "hsl(0 0% 98%)" }}>
                    <p style={{ color: isDark ? "#d4d4d8" : "#3f3f46" }}>
                      Solução de problemas complexos em campo, calibração e integração de sistemas de impressão corporativos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-16 border-t" style={{ borderColor: isDark ? "#27272a" : "#e4e4e7" }}>
          <h3 className="text-3xl font-black mb-8" style={{ color: primaryColor }}>
            Cursos & Especializações
          </h3>
          <ul className="space-y-5">
            <li className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:shadow-md" style={{ borderColor: isDark ? "#3f3f46" : "#e4e4e7", backgroundColor: isDark ? "hsl(0 0% 12%)" : "hsl(0 0% 98%)" }}>
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: primaryColor }} />
              <span className="text-lg md:text-xl font-semibold" style={{ color: isDark ? "#d4d4d8" : "#3f3f46" }}>
                Especialização Técnica em Impressoras Ricoh
              </span>
            </li>
            <li className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:shadow-md" style={{ borderColor: isDark ? "#3f3f46" : "#e4e4e7", backgroundColor: isDark ? "hsl(0 0% 12%)" : "hsl(0 0% 98%)" }}>
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: primaryColor }} />
              <span className="text-lg md:text-xl font-semibold" style={{ color: isDark ? "#d4d4d8" : "#3f3f46" }}>
                Especialização Técnica em Equipamentos Brother
              </span>
            </li>
            <li className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:shadow-md" style={{ borderColor: isDark ? "#3f3f46" : "#e4e4e7", backgroundColor: isDark ? "hsl(0 0% 12%)" : "hsl(0 0% 98%)" }}>
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: primaryColor }} />
              <span className="text-lg md:text-xl font-semibold" style={{ color: isDark ? "#d4d4d8" : "#3f3f46" }}>
                Curso Avançado de Redes de Computadores
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-20 pt-16 border-t" style={{ borderColor: isDark ? "#27272a" : "#e4e4e7" }}>
          <h3 className="text-3xl font-black mb-6 text-center" style={{ color: primaryColor }}>
            Marcas & Máquinas Atendidas
          </h3>
          <p className="text-center text-lg md:text-xl font-medium mb-12 max-w-3xl mx-auto" style={{ color: isDark ? "#a1a1aa" : "#52525b" }}>
            Especialista em manutenção avançada de equipamentos corporativos, abrangendo as principais marcas do mercado gráfico e corporativo.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-stretch justify-items-center">
            <div className="flex items-center justify-center p-6 rounded-2xl transition-transform duration-300 hover:scale-105 shadow-sm border border-zinc-200 w-full bg-white">
              <img src={maquina1} alt="Samsung" className="max-h-[120px] max-w-full object-contain mix-blend-multiply" />
            </div>
            <div className="flex items-center justify-center p-6 rounded-2xl transition-transform duration-300 hover:scale-105 shadow-sm border border-zinc-200 w-full bg-white">
              <img src={maquina2} alt="Ricoh" className="max-h-[120px] max-w-full object-contain mix-blend-multiply" />
            </div>
            <div className="flex items-center justify-center p-6 rounded-2xl transition-transform duration-300 hover:scale-105 shadow-sm border border-zinc-200 w-full bg-white">
              <img src={maquina3} alt="Minolta" className="max-h-[120px] max-w-full object-contain mix-blend-multiply" />
            </div>
            <div className="flex items-center justify-center p-6 rounded-2xl transition-transform duration-300 hover:scale-105 shadow-sm border border-zinc-200 w-full bg-white">
              <img src={maquina4} alt="Lexmark" className="max-h-[120px] max-w-full object-contain mix-blend-multiply" />
            </div>
            <div className="flex items-center justify-center p-6 rounded-2xl transition-transform duration-300 hover:scale-105 shadow-sm border border-zinc-200 w-full bg-white col-span-2 md:col-span-1">
              <img src={maquina5} alt="Epson" className="max-h-[120px] max-w-full object-contain mix-blend-multiply" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
