import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const ADMIN_EMAILS = ["cjwbete@gmail.com", "davifreitasceara@gmail.com"];

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session?.user?.email && ADMIN_EMAILS.includes(session.user.email));
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session?.user?.email && ADMIN_EMAILS.includes(session.user.email));
    });

    return () => subscription.unsubscribe();
  }, []);

  return { isAdmin, loading };
}
