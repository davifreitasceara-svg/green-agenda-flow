import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Menu } from "lucide-react";


export function Header({ cartCount }: { cartCount: number }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6">
        <a href="/" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary font-display text-lg font-semibold text-primary-foreground">
            M
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-lg font-semibold text-primary-deep">Multicopy</span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Gráfica
            </span>
          </span>
        </a>

        <div className="relative min-w-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            aria-label="Buscar agendas"
            placeholder="Buscar agendas, planners, personalizados..."
            className="h-10 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-2 focus:ring-ring/25"
          />
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            aria-label="Minha conta"
            className="grid h-10 w-10 place-items-center rounded-lg text-foreground transition-all duration-300 hover:bg-accent hover:text-primary"
          >
            <User className="h-5 w-5" />
          </button>
          <button
            aria-label="Carrinho"
            className="relative grid h-10 w-10 place-items-center rounded-lg text-foreground transition-all duration-300 hover:bg-accent hover:text-primary"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </button>
          <Link
            to="/contato"
            aria-label="Contato"
            className="grid h-10 w-10 place-items-center rounded-lg text-foreground transition-all duration-300 hover:bg-accent hover:text-primary md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Link>

        </div>
      </div>

      <nav className="hidden border-t border-border md:block">
        <ul className="mx-auto flex max-w-7xl items-center gap-8 px-6 py-2.5 text-sm font-medium text-muted-foreground">
          {["Planners 2027", "Agendas Diárias", "Executivas", "Personalizadas", "Acadêmicas", "Brindes"].map(
            (item) => (
              <li key={item}>
                <Link to="/" className="story-link transition-colors duration-300 hover:text-primary">
                  {item}
                </Link>
              </li>
            ),
          )}
          <li className="ml-auto">
            <Link
              to="/contato"
              activeProps={{ className: "text-primary" }}
              className="font-semibold transition-colors duration-300 hover:text-primary"
            >
              Contato
            </Link>
          </li>
        </ul>
      </nav>

    </header>
  );
}
