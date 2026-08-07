import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";
import { LogOut, Package, Image as ImageIcon, Plus, Trash2, Edit } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"products" | "stories">("products");
  
  const navigate = useNavigate();
  const ADMIN_EMAIL = "cjwbete@gmail.com";

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      if (!session?.user || session.user.email !== ADMIN_EMAIL) {
        navigate({ to: "/login" });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user || session.user.email !== ADMIN_EMAIL) {
        navigate({ to: "/login" });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center font-sans">Carregando painel...</div>;
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return null; // Will redirect via useEffect
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
          {activeTab === "products" ? (
            <AdminProducts />
          ) : (
            <AdminStories />
          )}
        </div>
      </div>
    </div>
  );
}

function AdminProducts() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Catálogo de Produtos</h2>
        <button className="bg-black text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors">
          <Plus className="w-4 h-4" /> Novo Produto
        </button>
      </div>
      <p className="text-gray-500">Listagem de produtos do Supabase será implementada aqui.</p>
    </div>
  );
}

function AdminStories() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Stories Ativos</h2>
        <button className="bg-black text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors">
          <Plus className="w-4 h-4" /> Novo Story
        </button>
      </div>
      <p className="text-gray-500">Listagem de stories do Supabase será implementada aqui.</p>
    </div>
  );
}
