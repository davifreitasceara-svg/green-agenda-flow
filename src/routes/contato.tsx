import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Clock, MessageCircle, ArrowLeft, Send } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Multicopy Gráfica | Orçamento de Agendas" },
      {
        name: "description",
        content:
          "Fale com a Multicopy Gráfica: orçamentos de agendas personalizadas, prazos de produção, pedidos corporativos e atendimento por telefone ou WhatsApp.",
      },
      { property: "og:title", content: "Contato — Multicopy Gráfica" },
      {
        property: "og:description",
        content: "Peça seu orçamento de agendas personalizadas e fale com nossa equipe.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contato,
});

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Informe seu nome completo" })
    .max(100, { message: "Máximo de 100 caracteres" }),
  email: z
    .string()
    .trim()
    .email({ message: "E-mail inválido" })
    .max(255, { message: "Máximo de 255 caracteres" }),
  phone: z
    .string()
    .trim()
    .min(10, { message: "Informe um telefone com DDD" })
    .max(20, { message: "Máximo de 20 caracteres" }),
  subject: z.enum(["orcamento", "personalizacao", "pedido", "outro"]),
  message: z
    .string()
    .trim()
    .min(10, { message: "Conte um pouco mais sobre o seu pedido" })
    .max(1000, { message: "Máximo de 1000 caracteres" }),
});

type FormValues = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof FormValues, string>>;

const initial: FormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "orcamento",
  message: "",
};

const channels = [
  {
    icon: Phone,
    title: "Telefone",
    value: "(85) 3222-4500",
    detail: "Seg a sex, das 8h às 18h",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "(85) 99888-4500",
    detail: "Resposta em até 1 hora útil",
  },
  {
    icon: Mail,
    title: "E-mail",
    value: "contato@multicopygrafica.com.br",
    detail: "Orçamentos em até 24h",
  },
  {
    icon: MapPin,
    title: "Loja e gráfica",
    value: "Av. Santos Dumont, 1200 — Aldeota",
    detail: "Fortaleza/CE, CEP 60150-161",
  },
];

function Contato() {
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);

  const update = (key: keyof FormValues, value: string) => {
    setValues((v) => ({ ...v, [key]: value }) as FormValues);
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormValues;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Verifique os campos destacados");
      return;
    }
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setValues(initial);
      toast.success("Mensagem enviada! Respondemos em até 24 horas úteis.");
    }, 800);
  };

  const inputClass = (field: keyof FormValues) =>
    `h-11 w-full rounded-lg border bg-surface px-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground focus:bg-background focus:ring-2 focus:ring-ring/25 ${
      errors[field] ? "border-destructive" : "border-border focus:border-primary"
    }`;

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header cartCount={0} />

      <main>
        <section
          className="px-4 py-14 sm:px-6"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="mx-auto max-w-7xl">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-primary-foreground/75 transition-all duration-300 hover:gap-3 hover:text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar para a loja
            </Link>
            <h1 className="mt-5 font-display text-4xl font-semibold text-primary-foreground sm:text-5xl">
              Fale com a Multicopy
            </h1>
            <p className="mt-4 max-w-2xl text-base text-primary-foreground/80 sm:text-lg">
              Tire dúvidas sobre modelos, peça personalização com o seu nome ou solicite um orçamento
              corporativo. Nossa equipe de produção responde rápido.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((c) => (
              <div
                key={c.title}
                className="rounded-lg border border-border bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-primary">
                  <c.icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {c.title}
                </p>
                <p className="mt-1 text-sm font-semibold text-primary-deep">{c.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{c.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-surface py-14">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8"
            >
              <h2 className="font-display text-2xl font-semibold text-primary-deep">
                Envie sua mensagem
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Preencha os dados e retornamos com prazos, valores e mockup do seu pedido.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Nome completo
                  </label>
                  <input
                    id="name"
                    value={values.name}
                    maxLength={100}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Como podemos te chamar?"
                    className={`mt-2 ${inputClass("name")}`}
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={values.email}
                    maxLength={255}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="voce@email.com"
                    className={`mt-2 ${inputClass("email")}`}
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">
                    Telefone / WhatsApp
                  </label>
                  <input
                    id="phone"
                    inputMode="tel"
                    value={values.phone}
                    maxLength={20}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="(85) 99999-0000"
                    className={`mt-2 ${inputClass("phone")}`}
                  />
                  {errors.phone && <p className="mt-1.5 text-xs text-destructive">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">
                    Assunto
                  </label>
                  <select
                    id="subject"
                    value={values.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    className={`mt-2 ${inputClass("subject")}`}
                  >
                    <option value="orcamento">Orçamento corporativo</option>
                    <option value="personalizacao">Personalização de agenda</option>
                    <option value="pedido">Dúvida sobre um pedido</option>
                    <option value="outro">Outro assunto</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={values.message}
                    maxLength={1000}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Conte a quantidade, modelo desejado e prazo de entrega."
                    className={`mt-2 w-full resize-none rounded-lg border bg-surface p-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground focus:bg-background focus:ring-2 focus:ring-ring/25 ${
                      errors.message ? "border-destructive" : "border-border focus:border-primary"
                    }`}
                  />
                  <div className="mt-1.5 flex items-start justify-between gap-3">
                    <p className="text-xs text-destructive">{errors.message ?? ""}</p>
                    <p className="shrink-0 text-xs text-muted-foreground">
                      {values.message.length}/1000
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary-hover disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {sending ? "Enviando..." : "Enviar mensagem"}
              </button>
            </form>

            <aside className="flex flex-col gap-5">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-primary-deep">
                  <Clock className="h-5 w-5 text-primary" /> Horário de atendimento
                </h2>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex justify-between gap-4">
                    <span>Segunda a sexta</span> <span className="font-medium text-foreground">8h — 18h</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span>Sábado</span> <span className="font-medium text-foreground">8h — 12h</span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span>Domingo e feriados</span> <span className="font-medium text-foreground">Fechado</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h2 className="font-display text-xl font-semibold text-primary-deep">
                  Perguntas frequentes
                </h2>
                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="font-medium text-foreground">Qual o pedido mínimo personalizado?</dt>
                    <dd className="text-muted-foreground">
                      1 unidade para nome e 50 unidades para logo corporativo.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-foreground">Em quanto tempo fica pronto?</dt>
                    <dd className="text-muted-foreground">
                      Agendas de linha saem em 48h; personalizadas em 5 dias úteis.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-foreground">Vocês enviam para todo o Brasil?</dt>
                    <dd className="text-muted-foreground">
                      Sim, via Correios e transportadora, com frete grátis acima de R$ 199.
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
                <iframe
                  title="Mapa da Multicopy Gráfica"
                  src="https://www.google.com/maps?q=Av.%20Santos%20Dumont%201200%20Fortaleza%20CE&output=embed"
                  loading="lazy"
                  className="h-56 w-full border-0"
                />
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
