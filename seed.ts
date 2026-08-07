import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const VITE_SUPABASE_URL = 'https://ezxzsidnsjxbnvxhoqop.supabase.co';
const VITE_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6eHpzaWRuc2p4Ym52eGhvcW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwOTUwMzMsImV4cCI6MjEwMTY3MTAzM30.BBjJqCP_0c2CE2AjWSnIq0rk9w2seLm-g2wa-a_Td44';

const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

const products = [
  { id: "jesus-colecao", name: "Agenda Coleção Jesus", description: "Disponível em Bordeaux e Azul", price: 70.0, file: "jesus-bordeaux.png.jpg", tag: "Novo", rating: 5.0 },
  { id: "delicada-1", name: "Agenda Coleção Delicada", description: "4 variantes encantadoras", price: 70.0, file: "delicada-0.jpg", tag: null, rating: 4.8 },
  { id: "cherry-1", name: "Agenda Coleção Cherry", description: "2 variantes irresistíveis", price: 70.0, file: "cherry-0.jpg", tag: "Novo", rating: 4.9 },
  { id: "masculina-1", name: "Agenda Coleção Masculina", description: "", price: 70.0, file: "masculina.jpg", tag: null, rating: 4.7 },
  { id: "mel-1", name: "Agenda Coleção Mel", description: "", price: 70.0, file: "mel.jpg", tag: "Novo", rating: 4.9 },
  { id: "fofa-1", name: "Agenda Coleção Fofa", description: "4 variantes fofíssimas", price: 70.0, file: "fofa-0.jpg", tag: "Novo", rating: 5.0 },
  { id: "planner-1", name: "Planner 2027", description: "3 variantes para o seu planejamento", price: 50.0, file: "planner-0.jpg", tag: "Novo", rating: 4.9 },
  { id: "sonho-1", name: "Agenda Coleção Sonho", description: "3 variantes dos sonhos", price: 70.0, file: "sonho-0.jpg", tag: "Novo", rating: 5.0 },
  { id: "livreto-oracoes-1", name: "Livreto de Orações", description: "", price: 10.0, file: "livreto-oracoes.jpg", tag: "Novo", rating: 5.0 },
  { id: "comercial-1", name: "Agenda Coleção Comercial", description: "4 variantes profissionais", price: 70.0, file: "comercial.jpg", tag: null, rating: 4.8 },
  { id: "candy-1", name: "Agenda Coleção Candy", description: "2 variantes doces e coloridas", price: 70.0, file: "candy-0.jpg", tag: "Novo", rating: 4.9 }
];

async function seed() {
  console.log("Seeding started...");
  for (const p of products) {
    try {
      // Find file
      const filePath = path.join(process.cwd(), 'src', 'assets', p.file);
      if (!fs.existsSync(filePath)) {
        console.warn("File not found, skipping upload for", p.id);
        continue;
      }
      const fileBuffer = fs.readFileSync(filePath);
      const storagePath = `products/${p.file}`;
      
      console.log(`Uploading ${p.file}...`);
      const { error: uploadError } = await supabase.storage.from('multicopy-assets').upload(storagePath, fileBuffer, {
        contentType: p.file.endsWith('.png') ? 'image/png' : 'image/jpeg',
        upsert: true
      });
      
      if (uploadError) {
        console.error("Upload error for", p.id, uploadError);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage.from('multicopy-assets').getPublicUrl(storagePath);
      
      console.log(`Inserting ${p.id}...`);
      const { error: dbError } = await supabase.from('products').upsert({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        tag: p.tag,
        rating: p.rating,
        main_image_url: publicUrl
      });
      
      if (dbError) {
        console.error("DB error for", p.id, dbError);
      } else {
        console.log(`Success ${p.id}`);
      }
    } catch (err) {
      console.error(err);
    }
  }
  console.log("Seeding finished!");
}

seed();
