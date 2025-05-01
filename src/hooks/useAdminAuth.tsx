
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

/**
 * Hook personnalisé pour gérer l'authentification des administrateurs
 * Vérifie si l'utilisateur est connecté et s'il fait partie des administrateurs
 * Redirige vers la page de connexion si l'utilisateur n'est pas authentifié ou n'est pas admin
 */
export const useAdminAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Fonction pour vérifier le statut d'authentification
    const checkAuth = async () => {
      try {
        setLoading(true);
        
        // Récupération de la session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // Si pas de session, rediriger vers la page de connexion
          navigate("/login");
          return;
        }
        
        setUser(session.user);
        
        // Vérifier si l'utilisateur est un administrateur
        // @ts-ignore
        const { data: adminData } = await supabase
          .from("admins")
          .select("*")
          .eq("id", session.user.id)
          .single();
          
        if (!adminData) {
          toast({
            title: "Accès refusé",
            description: "Vous n'avez pas les droits d'administration nécessaires.",
            variant: "destructive",
          });
          navigate("/");
          return;
        }
        
        setIsAdmin(true);
      } catch (error: any) {
        console.error("Erreur d'authentification:", error);
        toast({
          title: "Erreur d'authentification",
          description: error.message || "Une erreur s'est produite lors de la vérification de vos droits.",
          variant: "destructive",
        });
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
    
    // Surveiller les changements d'état d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_OUT") {
          setUser(null);
          setIsAdmin(false);
          navigate("/login");
        } else if (event === "SIGNED_IN" && session) {
          setUser(session.user);
          
          // Vérifier si le nouvel utilisateur est un administrateur
          // @ts-ignore
          const { data: adminData } = await supabase
            .from("admins")
            .select("*")
            .eq("id", session.user.id)
            .single();
            
          setIsAdmin(!!adminData);
          
          if (!adminData) {
            toast({
              title: "Accès refusé",
              description: "Vous n'avez pas les droits d'administration nécessaires.",
              variant: "destructive",
            });
            navigate("/");
          }
        }
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, toast]);
  
  return { user, isAdmin, loading };
};
