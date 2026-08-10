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
    <div className="relative mx-auto w-[280px] h-[580px] border-[12px] border-zinc-900 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black flex-shrink-0 group ring-1 ring-white/10">
      {/* Premium Side Buttons */}
      <div className="absolute -left-[14px] top-[100px] w-[3px] h-[26px] bg-zinc-800 rounded-l-md"></div>
      <div className="absolute -left-[14px] top-[140px] w-[3px] h-[50px] bg-zinc-800 rounded-l-md"></div>
      <div className="absolute -left-[14px] top-[200px] w-[3px] h-[50px] bg-zinc-800 rounded-l-md"></div>
      <div className="absolute -right-[14px] top-[160px] w-[3px] h-[70px] bg-zinc-800 rounded-r-md"></div>

      {/* Dynamic Island / Notch */}
      <div className="absolute top-2 inset-x-0 h-7 bg-black rounded-full w-28 mx-auto z-20 flex justify-between items-center px-2 py-1 shadow-inner ring-1 ring-white/5">
        <div className="w-2.5 h-2.5 bg-[#0a0a0a] rounded-full border border-white/10"></div>
        <div className="w-2.5 h-2.5 bg-[#050520] rounded-full shadow-[inset_0_0_4px_rgba(0,100,255,0.8)] relative">
           <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-[1px]"></div>
        </div>
      </div>
      
      {/* Screen Container */}
      <div className="relative w-full h-full bg-white overflow-hidden rounded-[2.2rem]">
        {/* We use a 375x812 (iPhone X/13/14) logical resolution for the iframe, 
            then scale it down to exactly fit the 256x556 inner screen space. 
            256 / 375 = 0.6826 scale factor */}
        <div className="absolute top-0 left-0 w-[375px] h-[814px] origin-top-left" style={{ transform: "scale(0.68266)" }}>
          <iframe 
            src="/" 
            className="w-full h-full border-none pointer-events-none" 
            title="Website Mobile View" 
            tabIndex={-1}
          />
        </div>
        
        {/* Invisible overlay to block clicks but allow scrolling if needed, currently pointer-events-none on iframe so this is just extra safety */}
        <div className="absolute inset-0 z-10 pointer-events-auto"></div>
      </div>
      
      {/* Premium Screen Glare */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/10 pointer-events-none rounded-[2.2rem] z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay"></div>
    </div>
  );
}
