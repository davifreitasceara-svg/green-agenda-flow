import { useState, useEffect, useRef } from "react";
import { X, Loader2, Upload, Image, Tag, DollarSign, Type, FileText, Trash2, Check } from "lucide-react";
import { supabase } from "../lib/supabase";

export type AdminProductData = {
  id?: string;
  name: string;
  description: string;
  price: number;
  tag: string;
  image?: string;
};

export function AdminProductModal({ 
  isOpen, 
  onClose,
  initialData
}: { 
  isOpen: boolean; 
  onClose: () => void;
  initialData?: AdminProductData;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tag, setTag] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setPrice(initialData.price.toString());
      setTag(initialData.tag || "");
      setFile(null);
      setPreview(initialData.image || null);
      setSuccess(false);
    } else if (isOpen) {
      setName("");
      setDescription("");
      setPrice("");
      setTag("");
      setFile(null);
      setPreview(null);
      setSuccess(false);
    }
  }, [isOpen, initialData]);

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
    if (!name || !price || (!file && !initialData)) return alert("Preencha o nome, preço e envie uma foto.");
    
    setUploading(true);

    try {
      let publicUrl = "";

      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
        const filePath = `products/${fileName}`;
        
        const { error: uploadError } = await supabase.storage.from('multicopy-assets').upload(filePath, file);
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('multicopy-assets').getPublicUrl(filePath);
        publicUrl = data.publicUrl;
      }

      if (initialData?.id) {
        const updates: Record<string, any> = {
          name,
          description,
          price: parseFloat(price),
          tag: tag || null,
        };
        if (publicUrl) updates.main_image_url = publicUrl;

        const { error } = await supabase.from("products").update(updates).eq("id", initialData.id);
        if (error) throw error;
      } else {
        const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Math.floor(Math.random()*1000);
        const { error } = await supabase.from("products").insert([{
          id,
          name,
          description,
          price: parseFloat(price),
          tag: tag || null,
          rating: 5,
          main_image_url: publicUrl
        }]);
        if (error) throw error;
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 800);

    } catch (err: any) {
      alert("Erro ao salvar produto: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    if (!confirm("Tem certeza que quer deletar este produto? Essa ação não pode ser desfeita.")) return;
    
    setUploading(true);
    const { error } = await supabase.from("products").delete().eq("id", initialData.id);
    if (error) {
      alert("Erro ao deletar: " + error.message);
      setUploading(false);
      return;
    }
    onClose();
    window.location.reload();
  };

  const tagOptions = ["Novo", "Esgotando", "Mais vendido", ""];

  return (
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
              {initialData ? "✏️ Editar Produto" : "✨ Novo Produto"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {initialData ? "Altere os campos que desejar" : "Preencha os dados do produto"}
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
              {/* Name */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  <Type className="w-3 h-3" /> Nome
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: Agenda Coleção Jesus" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  className="w-full border border-gray-200 bg-gray-50 px-3 py-2 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" 
                  required 
                />
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  <FileText className="w-3 h-3" /> Legenda / Descrição
                </label>
                <textarea 
                  placeholder="Ex: Disponível em Bordeaux e Azul" 
                  value={description} 
                  onChange={e => setDescription(e.target.value)} 
                  className="w-full border border-gray-200 bg-gray-50 px-3 py-2 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none h-16" 
                />
              </div>

              {/* Price */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  <DollarSign className="w-3 h-3" /> Preço (R$)
                </label>
                <input 
                  type="number" 
                  step="0.01" 
                  placeholder="70.00" 
                  value={price} 
                  onChange={e => setPrice(e.target.value)} 
                  className="w-full border border-gray-200 bg-gray-50 px-3 py-2 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" 
                  required 
                />
              </div>
            </div>

            {/* Right: Image Preview */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                <Image className="w-3 h-3" /> Foto
              </label>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="relative w-full aspect-square rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-all group"
              >
                {preview ? (
                  <>
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-gray-400">
                    <Upload className="w-6 h-6" />
                    <span className="text-[10px] font-bold">Enviar foto</span>
                  </div>
                )}
              </button>
              <input 
                ref={fileRef}
                type="file" 
                accept="image/*" 
                onChange={e => setFile(e.target.files?.[0] || null)} 
                className="hidden" 
              />
              {file && (
                <p className="text-[10px] text-primary font-semibold text-center truncate">{file.name}</p>
              )}
            </div>
          </div>

          {/* Tag Selector */}
          <div className="mt-4">
            <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
              <Tag className="w-3 h-3" /> Etiqueta
            </label>
            <div className="flex flex-wrap gap-2">
              {tagOptions.map((t) => (
                <button
                  type="button"
                  key={t || "none"}
                  onClick={() => setTag(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    tag === t
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:border-primary/50"
                  }`}
                >
                  {t || "Nenhuma"}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-100">
            {initialData && (
              <button 
                type="button" 
                onClick={handleDelete} 
                className="flex items-center gap-1.5 px-4 py-2.5 bg-red-50 text-red-600 rounded-xl font-bold text-xs hover:bg-red-100 transition-all border border-red-100" 
                disabled={uploading}
              >
                <Trash2 className="w-3.5 h-3.5" /> Deletar
              </button>
            )}
            <div className="flex-1" />
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
                  : "bg-black text-white hover:bg-gray-800"
              }`}
              disabled={uploading || success}
            >
              {uploading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Salvando...</>
              ) : success ? (
                <><Check className="w-4 h-4" /> Salvo!</>
              ) : (
                "💾 Salvar"
              )}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
