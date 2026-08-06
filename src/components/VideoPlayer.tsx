import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

interface VideoPlayerProps {
  /** URL do vídeo. Quando vazio, mostra um placeholder "adicione seu vídeo". */
  src?: string;
  poster?: string;
}

export function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-full w-full overflow-hidden">
        {!src ? (
          /* Placeholder */
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-deep/90 to-primary/80">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08),transparent_60%)]" />
            <div className="relative z-10 flex flex-col items-center gap-3 text-primary-foreground">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-transform duration-300 hover:scale-110">
                <Play className="h-6 w-6 fill-current" />
              </div>
              <p className="text-xs font-medium opacity-80">Vídeo em breve</p>
            </div>
          </div>
        ) : (
          /* Video */
          <>
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              muted={muted}
              loop
              playsInline
              className="h-full w-full object-cover"
              onEnded={() => setPlaying(false)}
            />

            {/* Play/pause overlay */}
            <button
              onClick={toggle}
              className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity duration-300 hover:opacity-100"
              aria-label={playing ? "Pausar" : "Reproduzir"}
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md">
                {playing ? (
                  <Pause className="h-5 w-5 fill-current" />
                ) : (
                  <Play className="h-5 w-5 fill-current" />
                )}
              </div>
            </button>

            {/* Bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent px-3 pb-3 pt-6 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <span className="text-[10px] font-medium text-white/80">
                {playing ? "Reproduzindo" : "Pausado"}
              </span>
              <button
                onClick={toggleMute}
                className="grid h-6 w-6 place-items-center rounded-full text-white/80 transition-colors hover:text-white"
                aria-label={muted ? "Ativar som" : "Mutar"}
              >
                {muted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
