
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    console.log("useAdminAuth hook running, path:", location.pathname);
    // Flag pour éviter les redirections pendant le démontage du composant
    let isMounted = true;

    // Fonction pour vérifier le statut d'administrateur d'un utilisateur
    const checkAdminStatus = async (userId: string) => {
      try {
        if (!isMounted) return false;

        console.log("Checking admin status for user:", userId);
        
        // @ts-ignore
        const { data: adminData, error } = await supabase
          .from("admins")
          .select("*")
          .eq("id", userId)
          .single();
          
        if (!isMounted) return false;
        
        if (error && error.code !== 'PGRST116') {
          console.error("Erreur lors de la vérification du statut d'admin:", error);
          return false;
        }
        
        const isUserAdmin = !!adminData;
        console.log("Is user admin?", isUserAdmin);
        return isUserAdmin;
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
        
        console.log("useAdminAuth: Checking session");
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
          // Si pas de session, ne pas rediriger directement - on laisse le composant parent gérer la redirection
          console.log("No session found, will let component handle redirect");
          setLoading(false);
          setIsInitialized(true);
          return;
        }
        
        // Mettre à jour l'état de l'utilisateur
        if (isMounted) {
          console.log("Setting user:", session.user);
          setUser(session.user);
        }
        
        // Vérifier si l'utilisateur est un administrateur
        const adminStatus = await checkAdminStatus(session.user.id);
        
        if (!isMounted) return;

        if (!adminStatus) {
          console.log("User is not admin");
          // Ne pas rediriger directement, on laisse le composant gérer les redirections
          if (isMounted) {
            setIsAdmin(false);
            setLoading(false);
            setIsInitialized(true);
          }
          return;
        }
        
        // Mettre à jour les états seulement si le composant est toujours monté
        if (isMounted) {
          console.log("User is admin, setting isAdmin to true");
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
        
        setLoading(false);
        setIsInitialized(true);
      }
    };
    
    checkAuth();
    
    // Surveiller les changements d'état d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;
        
        console.log("Auth state changed:", event);
        
        if (event === "SIGNED_OUT") {
          setUser(null);
          setIsAdmin(false);
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
            }
          }, 0);
        }
      }
    );
    
    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [navigate, toast, location.pathname]);
  
  return { user, isAdmin, loading, isInitialized };
};
