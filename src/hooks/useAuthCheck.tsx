
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const useAuthCheck = (redirectTo: string) => {
  const [authChecking, setAuthChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    
    const checkAuth = async () => {
      try {
        console.log("useAuthCheck: Checking authentication status");
        const { data, error } = await supabase.auth.getSession();
        
        // Vérifier si le composant est toujours monté avant de mettre à jour l'état
        if (!isMounted) return;
        
        if (error) {
          console.error("Erreur lors de la vérification de l'authentification:", error);
          setAuthChecking(false);
          return;
        }
        
        if (data.session) {
          console.log("useAuthCheck: User is authenticated", data.session.user);
          setIsAuthenticated(true);
          
          // Si la redirection est vers une page admin, vérifier si l'utilisateur est admin
          if (redirectTo.startsWith('/admin')) {
            try {
              // Vérifier si l'utilisateur est admin
              console.log("useAuthCheck: Checking if user is admin");
              // @ts-ignore
              const { data: adminData, error: adminError } = await supabase
                .from("admins")
                .select("*")
                .eq("id", data.session.user.id)
                .single();
                
              if (!isMounted) return;
              
              if (adminError && adminError.code !== 'PGRST116') {
                console.error("Erreur lors de la vérification du statut d'admin:", adminError);
              }
              
              // Rediriger vers le dashboard approprié
              if (adminData) {
                console.log("useAuthCheck: User is admin, redirecting to", redirectTo);
                navigate(redirectTo, { replace: true });
              } else {
                console.log("useAuthCheck: User is not admin, redirecting to /");
                navigate("/", { replace: true });
              }
            } catch (err) {
              console.error("Erreur lors de la vérification du statut d'admin:", err);
              if (isMounted) {
                navigate("/", { replace: true });
              }
            }
          } else {
            // Pour les pages non-admin, rediriger normalement
            console.log("useAuthCheck: Redirecting to non-admin page", redirectTo);
            navigate(redirectTo, { replace: true });
          }
        } else {
          console.log("useAuthCheck: User is not authenticated");
        }
        
        setAuthChecking(false);
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification:", error);
        if (isMounted) {
          setAuthChecking(false);
        }
      }
    };
    
    checkAuth();
    
    return () => {
      isMounted = false;
    };
  }, [navigate, redirectTo]);

  return { authChecking, isAuthenticated };
};
