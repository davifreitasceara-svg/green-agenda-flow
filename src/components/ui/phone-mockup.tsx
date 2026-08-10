import React, { useEffect, useState } from "react";

export function PhoneMockup() {
  const [isIframe, setIsIframe] = useState(true); // Default to true to prevent hydration mismatch / early loops

  useEffect(() => {
    setIsIframe(window.self !== window.top);
  }, []);

  if (isIframe) {
    return null; // Prevent infinite iframe loops!
  }

  return (
    <div className="relative mx-auto w-[240px] h-[480px] border-[8px] border-zinc-900 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black overflow-hidden flex-shrink-0 group">
      {/* Notch */}
      <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 rounded-b-2xl w-32 mx-auto z-20 flex justify-center items-end pb-1.5 gap-2">
        <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-blue-900 rounded-full shadow-[0_0_2px_blue]"></div>
      </div>
      
      {/* Screen - with overlay to prevent interaction */}
      <div className="relative w-full h-full bg-background overflow-hidden rounded-[2rem]">
        <div className="absolute inset-0 bg-transparent z-10 pointer-events-auto"></div>
        <iframe 
          src="/" 
          className="w-[125%] h-[125%] border-none pointer-events-none origin-top-left scale-80" 
          style={{ transform: "scale(0.8)" }}
          title="Website Preview" 
          tabIndex={-1}
        />
      </div>
      
      {/* Glare effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none rounded-[2rem] z-20 opacity-50 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
}
