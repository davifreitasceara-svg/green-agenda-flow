import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MessageCircle, Mail, MapPin, Phone } from "lucide-react";


export function Footer() {
  return (
    <footer className="bg-primary-deep text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-semibold">Multicopy Gráfica</p>
          <p className="mt-3 text-sm text-primary-foreground/75">
            Agendas e planners impressos com acabamento artesanal desde 1998. Papel certificado,
            encadernação reforçada e personalização sob medida.
          </p>
          <div className="mt-5 flex gap-3">
            {[Instagram, Facebook, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="/"
                aria-label="Rede social"
                className="grid h-9 w-9 place-items-center rounded-lg bg-primary-foreground/10 transition-all duration-300 hover:bg-primary-foreground/25"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Links úteis</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/75">
            {["Sobre a gráfica", "Prazos de produção", "Frete e entrega", "Trocas e devoluções"].map((l) => (
              <li key={l}>
                <Link to="/" className="transition-colors duration-300 hover:text-primary-foreground">
                  {l}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/contato"
                className="transition-colors duration-300 hover:text-primary-foreground"
              >
                Fale conosco
              </Link>
            </li>
          </ul>

        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Agendas</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/75">
            {["Planners 2027", "Agendas diárias", "Executivas", "Personalizadas", "Acadêmicas", "Brindes corporativos"].map(
              (l) => (
                <li key={l}>
                  <a href="/" className="transition-colors duration-300 hover:text-primary-foreground">
                    {l}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Contato</h2>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              Av. Santos Dumont, 1200 — Aldeota, Fortaleza/CE
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" />
              (85) 3222-4500
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" />
              contato@multicopygrafica.com.br
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <p className="mx-auto max-w-7xl px-6 py-5 text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} Multicopy Gráfica · CNPJ 00.000.000/0001-00 · Todos os direitos
          reservados
        </p>
      </div>
    </footer>
  );
}
