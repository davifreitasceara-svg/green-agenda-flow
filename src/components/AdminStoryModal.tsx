import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Loader2, Upload, Image, Type, FileText, Check } from "lucide-react";
import { supabase } from "../lib/supabase";

export function AdminStoryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [label, setLabel] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      setLabel("");
      setCaption("");
      setFile(null);
      setPreview(null);
      setSuccess(false);
      setStartTime("");
      setEndTime("");
      setDuration(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label || !file) return alert("Preencha o título e envie uma foto.");
    
    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
      const filePath = `stories/${fileName}`;
      
      const { error: uploadError } = await supabase.storage.from('multicopy-assets').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('multicopy-assets').getPublicUrl(filePath);
      
      let finalUrl = publicUrl;
      if (file?.type.startsWith("video/")) {
        if (startTime || endTime) {
          finalUrl = `${publicUrl}#t=${startTime || 0}${endTime ? `,${endTime}` : ''}`;
        }
      }

      const { error: dbError } = await supabase.from("stories").insert([{
        label,
        caption,
        image_url: finalUrl
      }]);

      if (dbError) throw dbError;

      setSuccess(true);
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 800);

    } catch (err: any) {
      alert("Erro ao salvar story: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "fadeInScale 0.3s ease-out" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">
              ✨ Novo Story
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Adicione uma nova atualização para seus clientes
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-[1fr_140px] gap-5">
            {/* Left: Fields */}
            <div className="flex flex-col gap-3">
              {/* Label */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  <Type className="w-3 h-3" /> Título
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: Produção, Novidade..." 
                  value={label} 
                  onChange={e => setLabel(e.target.value)} 
                  className="w-full border border-gray-200 bg-gray-50 px-3 py-2 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" 
                  required 
                />
              </div>

              {/* Caption */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  <FileText className="w-3 h-3" /> Legenda
                </label>
                <textarea 
                  placeholder="Ex: Nossa impressora rodando os planners 2027 hoje." 
                  value={caption} 
                  onChange={e => setCaption(e.target.value)} 
                  className="w-full border border-gray-200 bg-gray-50 px-3 py-2 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none h-20" 
                />
                {/* Emojis Rápidos */}
                <div className="flex gap-1.5 mt-1.5">
                  {["✨", "🔥", "🚀", "📸", "🎉", "📦", "🤩", "❤️"].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setCaption(prev => prev + emoji)}
                      className="w-7 h-7 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 text-sm transition-colors border border-gray-200"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* If Video: Trim Options */}
              {file?.type.startsWith("video/") && (
                <div className="flex flex-col gap-3 mt-1 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                  <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    ⏱️ Corte de Vídeo
                  </label>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-600 w-10">Início</span>
                    <input 
                      type="range" 
                      min="0" 
                      max={duration || 100} 
                      step="0.1"
                      value={startTime || 0} 
                      onChange={e => {
                        let val = parseFloat(e.target.value);
                        let end = parseFloat(endTime) || duration;
                        if (val >= end) val = Math.max(0, end - 0.5);
                        setStartTime(val.toFixed(1));
                        if (videoRef.current) {
                          videoRef.current.currentTime = val;
                        }
                      }}
                      className="flex-1 accent-primary cursor-grab active:cursor-grabbing"
                    />
                    <span className="text-xs w-10 text-right font-mono bg-white px-1.5 py-0.5 rounded border">{startTime || "0.0"}s</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-600 w-10">Fim</span>
                    <input 
                      type="range" 
                      min="0" 
                      max={duration || 100} 
                      step="0.1"
                      value={endTime || duration || 100} 
                      onChange={e => {
                        let val = parseFloat(e.target.value);
                        let start = parseFloat(startTime) || 0;
                        if (val <= start) val = Math.min(duration, start + 0.5);
                        setEndTime(val.toFixed(1));
                        if (videoRef.current) {
                          videoRef.current.currentTime = val - 0.5;
                        }
                      }}
                      className="flex-1 accent-primary cursor-grab active:cursor-grabbing"
                    />
                    <span className="text-xs w-10 text-right font-mono bg-white px-1.5 py-0.5 rounded border">{endTime || duration.toFixed(1) || "0.0"}s</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Image Preview */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                <Image className="w-3 h-3" /> Mídia (Foto/Vídeo) 9:16
              </label>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="relative w-full aspect-[9/16] rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-all group"
              >
                {preview ? (
                  <>
                    {file?.type.startsWith("video/") ? (
                      <video 
                        ref={videoRef}
                        src={preview} 
                        className="w-full h-full object-cover" 
                        autoPlay 
                        muted 
                        playsInline
                        onLoadedMetadata={(e) => {
                          const d = e.currentTarget.duration;
                          setDuration(d);
                          if (!startTime) setStartTime("0.0");
                          if (!endTime) setEndTime(d.toFixed(1));
                        }}
                        onTimeUpdate={(e) => {
                          const v = e.currentTarget;
                          const s = parseFloat(startTime) || 0;
                          const end_ = parseFloat(endTime) || duration;
                          if (end_ > 0 && v.currentTime >= end_) {
                            v.currentTime = s;
                            v.play().catch(()=>{});
                          }
                        }}
                      />
                    ) : (
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-gray-400">
                    <Upload className="w-6 h-6" />
                    <span className="text-[10px] font-bold px-2 text-center">Enviar<br/>(Formato Tela)</span>
                  </div>
                )}
              </button>
              <input 
                ref={fileRef}
                type="file" 
                accept="image/*,video/*" 
                onChange={e => setFile(e.target.files?.[0] || null)} 
                className="hidden" 
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-gray-100">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold text-xs hover:bg-gray-200 transition-all" 
              disabled={uploading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-sm ${
                success 
                  ? "bg-green-500 text-white" 
                  : "bg-primary-deep text-white hover:bg-black"
              }`}
              disabled={uploading || success}
            >
              {uploading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Publicando...</>
              ) : success ? (
                <><Check className="w-4 h-4" /> Publicado!</>
              ) : (
                "🚀 Publicar Story"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
