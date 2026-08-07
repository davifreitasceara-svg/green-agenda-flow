import React, { useState } from "react";
import { X, Maximize2, Minimize2 } from "lucide-react";

export function FloatingVideo() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed z-50 transition-all duration-500 ease-in-out shadow-2xl overflow-hidden bg-black border-2 border-primary rounded-xl ${
        isExpanded
          ? "bottom-4 right-4 md:bottom-10 md:right-10 w-[80vw] h-[60vh] md:w-[600px] md:h-[400px]"
          : "bottom-4 right-4 w-40 h-64 md:w-48 md:h-80 hover:scale-105"
      }`}
    >
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-black/50 hover:bg-black/80 text-white p-1.5 rounded-full backdrop-blur-md transition-colors"
        >
          {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="bg-black/50 hover:bg-black/80 text-white p-1.5 rounded-full backdrop-blur-md transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        src="/novos-lancamentos.mp4"
      />
    </div>
  );
}
