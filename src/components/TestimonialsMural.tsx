import { useState, useEffect } from "react";
import { MessageCircleHeart, Plus, X, Star, User } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

type Comment = {
  id: string;
  name: string;
  text: string;
  date: number;
  rating?: number;
  avatar_url?: string;
};

const defaultComments: Comment[] = [
  {
    id: "1",
    name: "Thamires Cambui",
    text: "Géssica do céu! Eu tô encantada, apaixonada, maravilhada de como ficou lindo esses planners! Você é uma benção de Deus na vida das pessoas que trabalham com encadernação! Tá tudo incrível!!! Parabéns!!",
    date: Date.now() - 100000,
    rating: 5,
  },
  {
    id: "2",
    name: "Vanessa Souza",
    text: "Eu bati o recorde de vendas nas agendas, pra mim que trabalha sozinha, não tenho as máquinas mais tops... eu considero que vendi muito bem, vendi mais de 40 agendas... fiz tão corrida que não dá neh pra postar tudo... mas foram mais de 40 agendas",
    date: Date.now() - 50000,
    rating: 5,
  }
];

export function TestimonialsMural() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newText, setNewText] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [user, setUser] = useState<SupabaseUser | null>(null);

  const emojis = ["😍", "❤️", "👏", "✨", "🤩", "🙌", "🔥"];

  useEffect(() => {
    const saved = localStorage.getItem("multicopy_testimonials");
    if (saved) {
      setComments(JSON.parse(saved));
    } else {
      setComments(defaultComments);
      localStorage.setItem("multicopy_testimonials", JSON.stringify(defaultComments));
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user?.user_metadata?.full_name) {
        setNewName(session.user.user_metadata.full_name);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user?.user_metadata?.full_name) {
        setNewName(session.user.user_metadata.full_name);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) return;

    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      name: user?.user_metadata?.full_name || newName,
      text: newText,
      date: Date.now(),
      rating: newRating,
      avatar_url: user?.user_metadata?.avatar_url,
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem("multicopy_testimonials", JSON.stringify(updatedComments));
    
    setNewName("");
    setNewText("");
    setNewRating(5);
    setIsModalOpen(false);
  };

  return (
    <section className="w-full bg-primary/5 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[300px_1fr] items-center">
          
          {/* Left Side: Title */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative mb-6">
              <MessageCircleHeart className="h-16 w-16 text-primary" />
              <div className="absolute -bottom-2 -right-2 bg-black p-2 rounded-full border-2 border-white shadow-sm">
                <span className="text-white text-xs font-bold">😁</span>
              </div>
            </div>
            
            <h2 className="font-sans text-2xl md:text-3xl font-light text-black leading-tight">
              O que nossos clientes<br/>
              estão <strong className="font-black text-primary">comentando</strong>
            </h2>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-8 flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-all hover:bg-gray-800 hover:scale-105 shadow-md"
            >
              <Plus className="h-4 w-4" /> Deixe seu comentário
            </button>
          </div>

          {/* Right Side: Comments Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {comments.slice(0, 2).map(comment => (
              <div 
                key={comment.id}
                className="rounded-2xl bg-white border border-primary/20 p-6 lg:p-8 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md flex flex-col items-center text-center"
              >
                {comment.avatar_url ? (
                  <img src={comment.avatar_url} alt={comment.name} className="w-12 h-12 rounded-full mb-3 border border-primary/20 object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full mb-3 border border-primary/20 bg-gray-100 flex items-center justify-center text-gray-400">
                    <User className="w-6 h-6" />
                  </div>
                )}
                <h3 className="font-bold text-black text-sm md:text-base mb-1">
                  {comment.name}
                </h3>
                {/* Estrelinhas */}
                <div className="flex gap-0.5 text-amber-400 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < (comment.rating || 5) ? "fill-current" : "text-gray-200 fill-gray-200"}`}
                    />
                  ))}
                </div>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-medium">
                  {comment.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in zoom-in-95">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            
            <h3 className="text-xl font-bold text-black mb-6">Deixe seu depoimento</h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {user ? (
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <img 
                    src={user.user_metadata?.avatar_url || "https://ui-avatars.com/api/?name=" + (user.user_metadata?.full_name || "User")} 
                    alt="Avatar" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Publicando como:</p>
                    <p className="font-bold text-black">{user.user_metadata?.full_name || "Usuário"}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome</label>
                  <input 
                    type="text" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Ex: Maria Silva"
                    required
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sua Avaliação</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className={`transition-colors ${star <= newRating ? "text-amber-400" : "text-gray-200 hover:text-amber-200"}`}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seu Comentário</label>
                <textarea 
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Escreva o que achou da sua agenda..."
                  required
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow resize-none"
                />
                
                {/* Emojis Rápidos */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {emojis.map((emoji, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setNewText(prev => prev + emoji)}
                      className="rounded-full bg-gray-100 hover:bg-gray-200 px-2 py-1 text-sm transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                type="submit"
                className="mt-4 w-full rounded-lg bg-black px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800"
              >
                Publicar no Mural
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
