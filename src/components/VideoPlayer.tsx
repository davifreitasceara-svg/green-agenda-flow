import { Play } from "lucide-react";
import { useRef, useState } from "react";

interface VideoPlayerProps {
  /** URL do vídeo. Quando vazio, mostra um placeholder "adicione seu vídeo". */
  src?: string;
  poster?: string;
}

export function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

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
              muted={true}
              loop
              autoPlay
              playsInline
              className="h-full w-full object-cover"
            />
          </>
        )}
      </div>
    </div>
  );
}
