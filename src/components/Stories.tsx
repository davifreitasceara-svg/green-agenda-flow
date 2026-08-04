import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";

export type Story = {
  id: string;
  label: string;
  image: string;
  caption: string;
};

export function Stories({ stories }: { stories: Story[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (openIndex === null) return;
    setProgress(0);
    const started = Date.now();
    const timer = window.setInterval(() => {
      const pct = Math.min(100, ((Date.now() - started) / 5000) * 100);
      setProgress(pct);
      if (pct >= 100) setOpenIndex((i) => (i !== null && i < stories.length - 1 ? i + 1 : null));
    }, 50);
    return () => window.clearInterval(timer);
  }, [openIndex, stories.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenIndex(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const active = openIndex !== null ? stories[openIndex] : null;

  return (
    <section aria-label="Atualizações da loja" className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button className="flex w-[76px] shrink-0 snap-start flex-col items-center gap-2">
            <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-dashed border-primary/60 text-primary transition-all duration-300 hover:bg-accent">
              <Plus className="h-6 w-6" />
            </span>
            <span className="truncate text-[11px] font-medium text-muted-foreground">Novo</span>
          </button>

          {stories.map((story, i) => (
            <button
              key={story.id}
              onClick={() => setOpenIndex(i)}
              className="flex w-[76px] shrink-0 snap-start flex-col items-center gap-2"
            >
              <span
                className="grid h-16 w-16 place-items-center rounded-full p-[2.5px] transition-transform duration-300 hover:scale-105"
                style={{ background: "var(--gradient-story)" }}
              >
                <span className="grid h-full w-full place-items-center overflow-hidden rounded-full border-2 border-background">
                  <img
                    src={story.image}
                    alt={story.label}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </span>
              </span>
              <span className="w-full truncate text-center text-[11px] font-medium text-foreground">
                {story.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid animate-fade-in place-items-center bg-foreground/90 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <div
            className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-primary-deep"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-x-3 top-3 z-10 flex gap-1">
              {stories.map((s, i) => (
                <span key={s.id} className="h-[3px] flex-1 overflow-hidden rounded-full bg-background/35">
                  <span
                    className="block h-full bg-background"
                    style={{
                      width:
                        openIndex !== null && i < openIndex
                          ? "100%"
                          : i === openIndex
                            ? `${progress}%`
                            : "0%",
                    }}
                  />
                </span>
              ))}
            </div>
            <button
              onClick={() => setOpenIndex(null)}
              aria-label="Fechar story"
              className="absolute right-3 top-7 z-10 grid h-8 w-8 place-items-center rounded-full bg-foreground/40 text-background transition-all duration-300 hover:bg-foreground/70"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={active.image}
              alt={active.caption}
              className="aspect-[9/16] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/85 to-transparent p-5 pt-14">
              <p className="text-sm font-semibold text-background">{active.label}</p>
              <p className="mt-1 text-sm text-background/80">{active.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
