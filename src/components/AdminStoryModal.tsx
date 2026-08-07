import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export function AdminStoryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [label, setLabel] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label || !file) return alert("Preencha o título e envie uma foto.");
    
    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `stories/${fileName}`;
      
      const { error: uploadError } = await supabase.storage.from('multicopy-assets').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('multicopy-assets').getPublicUrl(filePath);

      const { error: dbError } = await supabase.from("stories").insert([{
        label,
        caption,
        image_url: publicUrl
      }]);

      if (dbError) throw dbError;

      setLabel("");
      setCaption("");
      setFile(null);
      onClose();
      // Need to reload page or state to show new story
      window.location.reload();

    } catch (err: any) {
      alert("Erro ao salvar story: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl animate-fade-in">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-black">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold mb-4">Novo Story</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" placeholder="Título (ex: Produção, Novidade)" value={label} onChange={e => setLabel(e.target.value)} className="border p-2 rounded text-sm" required />
          <textarea placeholder="Texto explicativo (opcional)" value={caption} onChange={e => setCaption(e.target.value)} className="border p-2 rounded text-sm h-20" />
          <div className="border p-2 rounded bg-gray-50">
            <label className="block text-xs mb-1 font-bold">Foto do Story</label>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} required className="text-xs" />
          </div>
          
          <div className="flex gap-2 mt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2 bg-gray-200 rounded font-bold text-sm" disabled={uploading}>Cancelar</button>
            <button type="submit" className="flex-1 py-2 bg-primary rounded font-bold text-sm flex items-center justify-center gap-2" disabled={uploading}>
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publicar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
