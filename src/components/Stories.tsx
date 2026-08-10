import { useEffect, useState } from "react";
import { Plus, X, Trash2 } from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";
import { AdminStoryModal } from "./AdminStoryModal";
import { supabase } from "../lib/supabase";

export type Story = {
  id: string;
  label: string;
  image: string;
  caption: string;
};

export function Stories({ stories }: { stories: Story[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAdmin } = useAdmin();

  useEffect(() => {
    if (openIndex === null) return;
    setProgress(0);
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null || isPaused) return;
    
    const isVideo = active?.image.match(/\.(mp4|webm|mov|ogg)(#.*)?$/i);
    if (isVideo) return; // Videos handle their own progress and advancing

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setOpenIndex((i) => (i !== null && i < stories.length - 1 ? i + 1 : null));
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [openIndex, isPaused, stories.length, active]);

  const handlePrev = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (openIndex !== null && openIndex > 0) {
      setOpenIndex(openIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (openIndex !== null) {
      setOpenIndex(openIndex < stories.length - 1 ? openIndex + 1 : null);
    }
  };

  const handlePointerDown = () => setIsPaused(true);
  const handlePointerUp = () => setIsPaused(false);

  useEffect(() => {
    const v = document.getElementById("active-story-video") as HTMLVideoElement;
    if (v) {
      if (isPaused) v.pause();
      else v.play().catch(()=>{});
    }
  }, [isPaused]);

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
          {isAdmin && (
            <button onClick={() => setIsModalOpen(true)} className="flex w-[76px] shrink-0 snap-start flex-col items-center gap-2">
              <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-dashed border-primary/60 text-primary transition-all duration-300 hover:bg-accent">
                <Plus className="h-6 w-6" />
              </span>
              <span className="truncate text-[11px] font-bold text-primary">Novo</span>
            </button>
          )}

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
                  {story.image.match(/\.(mp4|webm|mov|ogg)(#.*)?$/i) ? (
                    <video src={story.image} className="h-full w-full object-cover" muted playsInline />
                  ) : (
                    <img
                      src={story.image}
                      alt={story.label}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  )}
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
            key={active.id}
            className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-primary-deep touch-none select-none"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <div className="absolute inset-x-3 top-3 z-30 flex gap-1">
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
              className="absolute right-3 top-7 z-40 grid h-8 w-8 place-items-center rounded-full bg-foreground/40 text-background transition-all duration-300 hover:bg-foreground/70"
            >
              <X className="h-4 w-4" />
            </button>

            {isAdmin && (
              <button
                onClick={async () => {
                  if (confirm("Deletar este story permanentemente?")) {
                    await supabase.from("stories").delete().eq("id", active.id);
                    window.location.reload();
                  }
                }}
                aria-label="Deletar story"
                className="absolute right-14 top-7 z-40 grid h-8 w-8 place-items-center rounded-full bg-red-500/80 text-white transition-all duration-300 hover:bg-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}

            {/* Tap Zones */}
            <div className="absolute inset-y-12 left-0 w-1/2 z-20 cursor-pointer" onClick={handlePrev} />
            <div className="absolute inset-y-12 right-0 w-1/2 z-20 cursor-pointer" onClick={handleNext} />

            {active.image.match(/\.(mp4|webm|mov|ogg)(#.*)?$/i) ? (
              <video
                id="active-story-video"
                src={active.image}
                className="aspect-[9/16] w-full object-cover pointer-events-none"
                autoPlay
                muted
                playsInline
                onTimeUpdate={(e) => {
                  const video = e.currentTarget;
                  let start = 0;
                  let end = video.duration || 0;
                  
                  if (active.image.includes("#t=")) {
                    const match = active.image.match(/#t=([\d.]+)(?:,([\d.]+))?/);
                    if (match) {
                      start = parseFloat(match[1]) || 0;
                      end = match[2] ? parseFloat(match[2]) : (video.duration || 0);
                    }
                  }

                  if (end > 0 && !isPaused) {
                    const total = end - start;
                    const current = video.currentTime - start;
                    setProgress(Math.max(0, Math.min(100, (current / total) * 100)));
                  }

                  if (video.currentTime >= end && end > 0) {
                    if (!video.paused && !isPaused) {
                      video.pause();
                      setProgress(100);
                      setOpenIndex((i) => (i !== null && i < stories.length - 1 ? i + 1 : null));
                    } else if (isPaused) {
                      video.currentTime = end;
                      video.pause();
                    }
                  }
                }}
                onLoadedMetadata={(e) => {
                  if (active.image.includes("#t=")) {
                    const video = e.currentTarget;
                    const match = active.image.match(/#t=([\d.]+)/);
                    if (match) {
                      video.currentTime = parseFloat(match[1]);
                    }
                  }
                }}
              />
            ) : (
              <img
                src={active.image}
                alt={active.caption}
                className="aspect-[9/16] w-full object-cover pointer-events-none"
              />
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/85 to-transparent p-5 pt-14 pointer-events-none z-10">
              <p className="text-sm font-semibold text-background drop-shadow-md">{active.label}</p>
              <p className="mt-1 text-sm text-background/90 drop-shadow-md">{active.caption}</p>
            </div>
          </div>
        </div>
      )}
      
      <AdminStoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
