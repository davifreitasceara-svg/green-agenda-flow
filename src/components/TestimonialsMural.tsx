import { useState, useEffect } from "react";
import { MessageCircleHeart, Plus, X } from "lucide-react";

type Comment = {
  id: string;
  name: string;
  text: string;
  date: number;
};

const defaultComments: Comment[] = [
  {
    id: "1",
    name: "Thamires Cambui",
    text: "Géssica do céu! Eu tô encantada, apaixonada, maravilhada de como ficou lindo esses planners! Você é uma benção de Deus na vida das pessoas que trabalham com encadernação! Tá tudo incrível!!! Parabéns!!",
    date: Date.now() - 100000,
  },
  {
    id: "2",
    name: "Vanessa Souza",
    text: "Eu bati o recorde de vendas nas agendas, pra mim que trabalha sozinha, não tenho as máquinas mais tops... eu considero que vendi muito bem, vendi mais de 40 agendas... fiz tão corrida que não dá neh pra postar tudo... mas foram mais de 40 agendas",
    date: Date.now() - 50000,
  }
];

export function TestimonialsMural() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newText, setNewText] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("multicopy_testimonials");
    if (saved) {
      setComments(JSON.parse(saved));
    } else {
      setComments(defaultComments);
      localStorage.setItem("multicopy_testimonials", JSON.stringify(defaultComments));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) return;

    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      name: newName,
      text: newText,
      date: Date.now(),
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem("multicopy_testimonials", JSON.stringify(updatedComments));
    
    setNewName("");
    setNewText("");
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
                <h3 className="font-bold text-black text-sm md:text-base mb-4">
                  {comment.name}
                </h3>
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
