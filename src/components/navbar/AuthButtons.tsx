
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isMobile?: boolean;
  onLogout?: () => void;
}

export const AuthButtons = ({
  isAuthenticated,
  loading,
  setLoading,
  setIsAuthenticated,
  isMobile = false,
  onLogout
}: AuthButtonsProps) => {
  const navigate = useNavigate();
  const { toast: shadowToast } = useToast();
  const [logoutInProgress, setLogoutInProgress] = useState(false);

  const handleLogout = async () => {
    if (logoutInProgress) return; // Empêcher plusieurs clics simultanés
    
    try {
      setLogoutInProgress(true);
      console.log("Déconnexion en cours...");
      
      // Effectuer la déconnexion
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Erreur lors de la déconnexion:", error);
        toast.error("Erreur de déconnexion", {
          description: "Une erreur s'est produite lors de la déconnexion."
        });
      } else {
        console.log("Déconnexion réussie");
        
        // Mettre à jour l'état d'authentification manuellement pour être sûr
        setIsAuthenticated(false);
        
        // Afficher une notification de succès en utilisant Sonner
        toast.success("Déconnexion réussie", {
          description: "Vous avez été déconnecté avec succès."
        });
        
        // Appeler la fonction de callback si fournie (pour le menu mobile)
        if (onLogout) {
          onLogout();
        }
        
        // Naviguer vers la page d'accueil avec un délai pour permettre à tous les états de se mettre à jour
        setTimeout(() => {
          console.log("Redirection vers la page d'accueil...");
          navigate("/");
        }, 800);
      }
    } catch (error) {
      console.error("Exception lors de la déconnexion:", error);
      toast.error("Erreur de déconnexion", {
        description: "Une erreur s'est produite lors de la déconnexion."
      });
    } finally {
      // On réinitialise l'état dans tous les cas, même en cas d'erreur
      setTimeout(() => {
        setLogoutInProgress(false);
        setLoading(false);
      }, 200);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isMobile) {
    return (
      <>
        <Separator className="my-2 bg-gray-800" />
        <Link 
          to="/admin" 
          className="block text-center py-3 text-white hover:bg-gray-900 hover:text-orange-500 transition-colors"
          onClick={onLogout}
        >
          Admin
        </Link>
        <button 
          onClick={handleLogout}
          className="w-full text-center py-3 text-white hover:bg-gray-900 hover:text-orange-500 transition-colors"
          disabled={loading || logoutInProgress}
        >
          {(loading || logoutInProgress) ? (
            <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-1"></span>
          ) : "Déconnexion"}
        </button>
      </>
    );
  }

  return (
    <div className="flex space-x-2">
      <Link to="/admin" className="text-sm text-gray-300 hover:text-orange-500">
        Admin
      </Link>
      <Separator orientation="vertical" className="h-6 mx-2 bg-gray-600" />
      <button 
        onClick={handleLogout}
        className="text-sm text-gray-300 hover:text-orange-500"
        disabled={loading || logoutInProgress}
      >
        {(loading || logoutInProgress) ? (
          <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-1"></span>
        ) : "Déconnexion"}
      </button>
    </div>
  );
};
