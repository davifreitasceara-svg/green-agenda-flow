import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export type AdminProductData = {
  id?: string;
  name: string;
  description: string;
  price: number;
  tag: string;
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
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isOpen && initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setPrice(initialData.price.toString());
      setTag(initialData.tag || "");
      setFile(null);
    } else if (isOpen) {
      setName("");
      setDescription("");
      setPrice("");
      setTag("");
      setFile(null);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || (!file && !initialData)) return alert("Preencha o nome, preço e envie uma foto.");
    
    setUploading(true);

    try {
      let publicUrl = "";

      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `products/${fileName}`;
        
        const { error: uploadError } = await supabase.storage.from('multicopy-assets').upload(filePath, file);
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('multicopy-assets').getPublicUrl(filePath);
        publicUrl = data.publicUrl;
      }

      if (initialData?.id) {
        // Edit existing
        const updates: any = {
          name,
          description,
          price: parseFloat(price),
          tag: tag || null,
        };
        if (publicUrl) updates.main_image_url = publicUrl;

        const { error } = await supabase.from("products").update(updates).eq("id", initialData.id);
        if (error) throw error;

      } else {
        // Create new
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

      onClose();
      window.location.reload();

    } catch (err: any) {
      alert("Erro ao salvar produto: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    if (!confirm("Deletar este produto?")) return;
    
    setUploading(true);
    await supabase.from("products").delete().eq("id", initialData.id);
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl animate-fade-in">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-black">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold mb-4">{initialData ? "Editar Produto" : "Novo Produto"}</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="text" placeholder="Nome do Produto" value={name} onChange={e => setName(e.target.value)} className="border p-2 rounded text-sm" required />
          <textarea placeholder="Descrição (opcional)" value={description} onChange={e => setDescription(e.target.value)} className="border p-2 rounded text-sm h-16" />
          <input type="number" step="0.01" placeholder="Preço (ex: 70.00)" value={price} onChange={e => setPrice(e.target.value)} className="border p-2 rounded text-sm" required />
          <input type="text" placeholder="Tag (ex: Novo, Esgotando)" value={tag} onChange={e => setTag(e.target.value)} className="border p-2 rounded text-sm" />
          
          <div className="border p-2 rounded bg-gray-50">
            <label className="block text-xs mb-1 font-bold">Foto Principal {initialData && "(deixe em branco para manter)"}</label>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} required={!initialData} className="text-xs" />
          </div>
          
          <div className="flex gap-2 mt-2">
            {initialData && (
               <button type="button" onClick={handleDelete} className="px-4 py-2 bg-red-100 text-red-600 rounded font-bold text-sm" disabled={uploading}>Deletar</button>
            )}
            <button type="button" onClick={onClose} className="flex-1 py-2 bg-gray-200 rounded font-bold text-sm" disabled={uploading}>Cancelar</button>
            <button type="submit" className="flex-1 py-2 bg-primary rounded font-bold text-sm flex items-center justify-center gap-2" disabled={uploading}>
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
