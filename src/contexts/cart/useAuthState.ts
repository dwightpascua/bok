
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export const useAuthState = () => {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setIsAuthenticated(!!session?.user);
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setIsAuthenticated(!!session?.user);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, isAuthenticated };
};
