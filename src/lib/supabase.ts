import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://ezxzsidnsjxbnvxhoqop.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6eHpzaWRuc2p4Ym52eGhvcW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwOTUwMzMsImV4cCI6MjEwMTY3MTAzM30.BBjJqCP_0c2CE2AjWSnIq0rk9w2seLm-g2wa-a_Td44";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Supabase não configurado. Preencha VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no arquivo .env"
  );
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
