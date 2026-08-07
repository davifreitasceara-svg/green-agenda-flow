import MarqueeAlongSvgPath from "@/components/ui/marquee-along-svg-path"

const path =
  "M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5"

export function MarqueeDemo() {
  return (
    <div className="w-full h-[400px] bg-white flex items-center justify-center overflow-hidden py-10 relative">
      {/* Subtle fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      
      <MarqueeAlongSvgPath
        path={path}
        viewBox="0 0 996 330"
        baseVelocity={8}
        slowdownOnHover={true}
        draggable={true}
        repeat={2}
        dragSensitivity={0.1}
        className="w-full h-full scale-105"
        responsive
        grabCursor
      >
        {imgs.map((img, i) => (
          <div
            key={i}
            className="w-16 h-16 md:w-24 md:h-24 hover:scale-125 duration-300 ease-in-out cursor-pointer flex-shrink-0 rounded-lg overflow-hidden shadow-md"
          >
            {img.type === 'video' ? (
              <video
                src={img.src}
                className="w-full h-full object-cover rounded-md shadow-sm border border-black/5"
                draggable={false}
                autoPlay
                loop
                muted
                playsInline
                onClick={() => { if (img.link) window.open(img.link, '_blank') }}
              />
            ) : (
              <img
                src={img.src}
                alt={`Galeria ${i}`}
                className="w-full h-full object-cover rounded-md shadow-sm border border-black/5"
                draggable={false}
                onClick={() => { if (img.link) window.open(img.link, '_blank') }}
              />
            )}
          </div>
        ))}
      </MarqueeAlongSvgPath>
    </div>
  )
}

const imgs = [
  { type: "image", src: "/01a38678-efe6-4e8c-9e90-aeb5fb998fd0.jpg", link: "https://www.instagram.com/multicopy_/" },
  { type: "video", src: "/faça_um_video_promovendo_essas.mp4", link: "https://www.instagram.com/multicopy_/" },
  { type: "image", src: "/0c77fee6-4e35-4c38-86c7-72630a92b7a9.jpg", link: "https://www.instagram.com/multicopy_/" },
  { type: "image", src: "/6604d558-aa2c-425d-9b10-147c8cab3b43.jpg", link: "https://www.instagram.com/multicopy_/" },
  { type: "video", src: "/faça_um_video_promovendo_essas (1).mp4", link: "https://www.instagram.com/multicopy_/" },
  { type: "image", src: "/74d5686e-7554-49f3-82ba-54f3999e0f9d.jpg", link: "https://www.instagram.com/multicopy_/" },
  { type: "image", src: "/bfbad27c-ed15-440a-a976-2158022c64fa.jpg", link: "https://www.instagram.com/multicopy_/" },
  { type: "video", src: "/agora_com_essas.mp4", link: "https://www.instagram.com/multicopy_/" },
  { type: "image", src: "/dfa2c2ef-ba79-4baa-86da-227d4ec8b0a9.jpg", link: "https://www.instagram.com/multicopy_/" },
  { type: "video", src: "/agora_com_esses.mp4", link: "https://www.instagram.com/multicopy_/" },
  { type: "image", src: "/ef51f040-046a-4e64-8718-9492b24d65c9.jpg", link: "https://www.instagram.com/multicopy_/" },
  { type: "image", src: "/f1498964-9a0c-4406-be70-7b2cebb3630b.jpg", link: "https://www.instagram.com/multicopy_/" },
  { type: "video", src: "/novos-lancamentos.mp4", link: "https://www.instagram.com/multicopy_/" },
]
