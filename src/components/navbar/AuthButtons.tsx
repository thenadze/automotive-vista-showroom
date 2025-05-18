
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Erreur lors de la déconnexion:", error);
        toast({
          title: "Erreur de déconnexion",
          description: "Une erreur s'est produite lors de la déconnexion.",
          variant: "destructive",
        });
      } else {
        // Manually update authentication state to ensure UI updates
        setIsAuthenticated(false);
        
        toast({
          title: "Déconnexion réussie",
          description: "Vous avez été déconnecté avec succès.",
        });
        
        // Navigate after state updates
        setTimeout(() => {
          navigate("/");
        }, 100);
      }

      // Call onLogout callback if provided (for mobile menu)
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      toast({
        title: "Erreur de déconnexion",
        description: "Une erreur s'est produite lors de la déconnexion.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
          disabled={loading}
        >
          {loading ? (
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
        disabled={loading}
      >
        {loading ? (
          <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-1"></span>
        ) : "Déconnexion"}
      </button>
    </div>
  );
};
