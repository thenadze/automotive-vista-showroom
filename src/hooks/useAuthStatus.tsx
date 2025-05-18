
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const checkAuth = async () => {
      try {
        if (!isMounted) return;
        
        // Vérifier la session actuelle
        const { data, error } = await supabase.auth.getSession();
        
        if (!isMounted) return;
        
        if (error) {
          console.error("Erreur lors de la vérification de l'authentification:", error);
          setLoading(false);
          setInitialized(true);
          setIsAuthenticated(false);
          setUserId(null);
          return;
        }
        
        // Mettre à jour l'état d'authentification
        const authenticated = !!data.session;
        setIsAuthenticated(authenticated);
        setUserId(data.session?.user?.id || null);
        setLoading(false);
        setInitialized(true);
      } catch (error) {
        console.error("Erreur d'authentification:", error);
        if (isMounted) {
          setIsAuthenticated(false);
          setUserId(null);
          setLoading(false);
          setInitialized(true);
        }
      }
    };
    
    checkAuth();
    
    // Surveiller les changements d'état d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;
      
      console.log("Auth state changed:", event, !!session, session?.user?.id);
      
      if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setUserId(null);
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setIsAuthenticated(true);
        setUserId(session?.user?.id || null);
      }
    });
    
    return () => {
      isMounted = false;
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  return { isAuthenticated, loading, userId, setLoading, setIsAuthenticated, initialized };
};
