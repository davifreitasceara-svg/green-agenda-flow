import React, { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import fredericoImg from "@/assets/frederico-francisco.jpg";

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
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Using a nice green from Tailwind (emerald-500 #10b981)
  const primaryColor = "#10b981";

  useEffect(() => {
    // We start in light mode
    document.documentElement.classList.remove("dark");
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
    { label: "CONTATO", href: "https://wa.me/5585989059679" },
  ];

  return (
    <div 
      className="min-h-screen text-foreground transition-colors"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 10%)" : "hsl(0 0% 100%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* Menu Button */}
          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              className="p-2 transition-colors duration-300 z-50 hover:opacity-70"
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
          <div className="flex items-center justify-center rounded-full overflow-hidden mix-blend-multiply dark:mix-blend-normal">
            <video 
              src="/logo-animada.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="h-12 md:h-16 object-cover pointer-events-none" 
            />
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="relative w-16 h-8 rounded-full hover:opacity-80 transition-opacity"
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
            Sou <strong>ex-técnico da Digiloc</strong>, onde adquiri profundo conhecimento prático e teórico, lidando com 
            os mais variados tipos de máquinas, impressoras de grande formato, plotters e equipamentos corporativos. 
            Essa experiência me permitiu dominar desde a mecânica de precisão até a calibração de softwares e placas lógicas.
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
            <h3 className="text-3xl md:text-4xl font-black mb-2" style={{ color: primaryColor }}>Digiloc</h3>
            <p className="font-semibold text-base md:text-lg leading-tight" style={{ color: isDark ? "#a1a1aa" : "#52525b" }}>Ex-Técnico Especialista</p>
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
      </section>
    </div>
  );
}
