
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
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Flag pour éviter les redirections pendant le démontage du composant
    let isMounted = true;

    // Fonction pour vérifier le statut d'administrateur d'un utilisateur
    const checkAdminStatus = async (userId: string) => {
      try {
        if (!isMounted) return;

        // @ts-ignore
        const { data: adminData, error } = await supabase
          .from("admins")
          .select("*")
          .eq("id", userId)
          .single();
          
        if (!isMounted) return;
        
        if (error && error.code !== 'PGRST116') {
          console.error("Erreur lors de la vérification du statut d'admin:", error);
          return false;
        }
        
        return !!adminData;
      } catch (err) {
        if (isMounted) {
          console.error("Erreur lors de la vérification du statut d'admin:", err);
        }
        return false;
      }
    };
    
    // Fonction pour vérifier le statut d'authentification
    const checkAuth = async () => {
      try {
        if (!isMounted) return;
        
        // Récupération de la session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (!isMounted) return;
        
        if (sessionError) {
          console.error("Erreur lors de la récupération de la session:", sessionError);
          setLoading(false);
          setIsInitialized(true);
          return;
        }
        
        if (!session) {
          // Si pas de session, rediriger vers la page de connexion, mais seulement si le composant est toujours monté
          if (isMounted) {
            setLoading(false);
            setIsInitialized(true);
            navigate("/login");
          }
          return;
        }
        
        // Mettre à jour l'état de l'utilisateur
        if (isMounted) {
          setUser(session.user);
        }
        
        // Vérifier si l'utilisateur est un administrateur
        const adminStatus = await checkAdminStatus(session.user.id);
        
        if (!isMounted) return;
        
        if (!adminStatus) {
          toast({
            title: "Accès refusé",
            description: "Vous n'avez pas les droits d'administration nécessaires.",
            variant: "destructive",
          });
          navigate("/");
          return;
        }
        
        // Mettre à jour les états seulement si le composant est toujours monté
        if (isMounted) {
          setIsAdmin(true);
          setLoading(false);
          setIsInitialized(true);
        }
      } catch (error: any) {
        if (!isMounted) return;
        
        console.error("Erreur d'authentification:", error);
        toast({
          title: "Erreur d'authentification",
          description: error.message || "Une erreur s'est produite lors de la vérification de vos droits.",
          variant: "destructive",
        });
        navigate("/login");
        
        setLoading(false);
        setIsInitialized(true);
      }
    };
    
    checkAuth();
    
    // Surveiller les changements d'état d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;
        
        if (event === "SIGNED_OUT") {
          setUser(null);
          setIsAdmin(false);
          if (isMounted) {
            navigate("/login");
          }
        } else if (event === "SIGNED_IN" && session) {
          setUser(session.user);
          
          // Différer la vérification admin pour éviter des problèmes de récursivité
          setTimeout(async () => {
            if (!isMounted) return;
            
            // Vérifier si le nouvel utilisateur est un administrateur
            const adminStatus = await checkAdminStatus(session.user.id);
            
            if (!isMounted) return;
            
            setIsAdmin(!!adminStatus);
            
            if (!adminStatus) {
              toast({
                title: "Accès refusé",
                description: "Vous n'avez pas les droits d'administration nécessaires.",
                variant: "destructive",
              });
              navigate("/");
            }
          }, 0);
        }
      }
    );
    
    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [navigate, toast]);
  
  return { user, isAdmin, loading, isInitialized };
};
