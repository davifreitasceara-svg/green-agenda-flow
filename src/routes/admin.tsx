import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";
import { LogOut, Package, Image as ImageIcon, Plus, Trash2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"products" | "stories">("products");
  
  const navigate = useNavigate();
  const ADMIN_EMAILS = ["cjwbete@gmail.com", "davifreitasceara@gmail.com"];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
      if (!session?.user || !session.user.email || !ADMIN_EMAILS.includes(session.user.email)) {
        navigate({ to: "/login" });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user || !session.user.email || !ADMIN_EMAILS.includes(session.user.email)) {
        navigate({ to: "/login" });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center font-sans">Carregando painel...</div>;
  }

  if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-black text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-black px-3 py-1 font-bold rounded">ADMIN</div>
          <h1 className="text-xl font-bold">Painel de Controle</h1>
        </div>
        <button 
          onClick={() => supabase.auth.signOut()}
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sair
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-colors ${activeTab === "products" ? "bg-primary text-black" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"}`}
          >
            <Package className="w-5 h-5" /> Gerenciar Produtos
          </button>
          <button 
            onClick={() => setActiveTab("stories")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-colors ${activeTab === "stories" ? "bg-primary text-black" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"}`}
          >
            <ImageIcon className="w-5 h-5" /> Gerenciar Stories
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {activeTab === "products" ? <AdminProducts /> : <AdminStories />}
        </div>
      </div>
    </div>
  );
}

// ------------------- PRODUCTS TAB -------------------

function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tag, setTag] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !file) return alert("Preencha o nome, preço e envie uma foto.");
    
    setUploading(true);

    try {
      // 1. Upload image
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `products/${fileName}`;
      
      const { error: uploadError } = await supabase.storage.from('multicopy-assets').upload(filePath, file);
      
      if (uploadError) throw uploadError;

      // 2. Get public URL
      const { data: { publicUrl } } = supabase.storage.from('multicopy-assets').getPublicUrl(filePath);

      // 3. Create product record
      const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Math.floor(Math.random()*1000);
      
      const { error: dbError } = await supabase.from("products").insert([{
        id,
        name,
        description,
        price: parseFloat(price),
        tag: tag || null,
        rating: 5,
        main_image_url: publicUrl
      }]);

      if (dbError) throw dbError;

      // Reset form
      setIsAdding(false);
      setName("");
      setDescription("");
      setPrice("");
      setTag("");
      setFile(null);
      
      fetchProducts();

    } catch (err: any) {
      alert("Erro ao salvar produto: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este produto?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  if (isAdding) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Novo Produto</h2>
        <form onSubmit={handleAddProduct} className="max-w-md flex flex-col gap-4">
          <input type="text" placeholder="Nome do Produto" value={name} onChange={e => setName(e.target.value)} className="border p-2 rounded" required />
          <textarea placeholder="Descrição (opcional)" value={description} onChange={e => setDescription(e.target.value)} className="border p-2 rounded" />
          <input type="number" step="0.01" placeholder="Preço (ex: 70.00)" value={price} onChange={e => setPrice(e.target.value)} className="border p-2 rounded" required />
          <input type="text" placeholder="Tag (ex: Novo, Promo)" value={tag} onChange={e => setTag(e.target.value)} className="border p-2 rounded" />
          <div className="border p-2 rounded bg-gray-50">
            <label className="block text-sm mb-1 font-bold">Foto Principal</label>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} required />
          </div>
          
          <div className="flex gap-2 mt-4">
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 bg-gray-200 rounded font-bold" disabled={uploading}>Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-primary rounded font-bold flex items-center gap-2" disabled={uploading}>
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar Produto"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Catálogo de Produtos</h2>
        <button onClick={() => setIsAdding(true)} className="bg-black text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors">
          <Plus className="w-4 h-4" /> Novo Produto
        </button>
      </div>

      {loading ? <p>Carregando...</p> : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map(p => (
            <div key={p.id} className="border rounded-lg p-4 flex flex-col gap-2 relative group">
              <button onClick={() => handleDelete(p.id)} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 className="w-4 h-4" />
              </button>
              <img src={p.main_image_url} alt={p.name} className="w-full h-32 object-cover rounded-md bg-gray-100" />
              <h3 className="font-bold text-sm line-clamp-1">{p.name}</h3>
              <p className="text-primary font-bold">R$ {p.price.toFixed(2)}</p>
            </div>
          ))}
          {products.length === 0 && <p className="col-span-full text-gray-500">Nenhum produto cadastrado ainda.</p>}
        </div>
      )}
    </div>
  );
}

// ------------------- STORIES TAB -------------------

function AdminStories() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [label, setLabel] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const fetchStories = async () => {
    setLoading(true);
    const { data } = await supabase.from("stories").select("*").order("created_at", { ascending: false });
    if (data) setStories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleAddStory = async (e: React.FormEvent) => {
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

      setIsAdding(false);
      setLabel("");
      setCaption("");
      setFile(null);
      fetchStories();

    } catch (err: any) {
      alert("Erro ao salvar story: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este story?")) return;
    await supabase.from("stories").delete().eq("id", id);
    fetchStories();
  };

  if (isAdding) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Novo Story</h2>
        <form onSubmit={handleAddStory} className="max-w-md flex flex-col gap-4">
          <input type="text" placeholder="Título (ex: Produção, Novidade)" value={label} onChange={e => setLabel(e.target.value)} className="border p-2 rounded" required />
          <textarea placeholder="Texto explicativo (opcional)" value={caption} onChange={e => setCaption(e.target.value)} className="border p-2 rounded" />
          <div className="border p-2 rounded bg-gray-50">
            <label className="block text-sm mb-1 font-bold">Foto do Story</label>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} required />
          </div>
          
          <div className="flex gap-2 mt-4">
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 bg-gray-200 rounded font-bold" disabled={uploading}>Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-primary rounded font-bold flex items-center gap-2" disabled={uploading}>
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publicar Story"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Stories Ativos</h2>
        <button onClick={() => setIsAdding(true)} className="bg-black text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors">
          <Plus className="w-4 h-4" /> Novo Story
        </button>
      </div>

      {loading ? <p>Carregando...</p> : (
        <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {stories.map(s => (
            <div key={s.id} className="border rounded-lg p-2 flex flex-col gap-2 relative group items-center">
              <button onClick={() => handleDelete(s.id)} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Trash2 className="w-3 h-3" />
              </button>
              <div className="w-20 h-20 rounded-full border-2 border-primary p-0.5 relative overflow-hidden bg-gray-100">
                <img src={s.image_url} alt={s.label} className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="font-bold text-xs text-center">{s.label}</h3>
            </div>
          ))}
          {stories.length === 0 && <p className="col-span-full text-gray-500">Nenhum story publicado ainda.</p>}
        </div>
      )}
    </div>
  );
}
