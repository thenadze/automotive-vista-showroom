
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";

/**
 * Barre de navigation du site avec gestion de l'authentification
 */
const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const checkAuth = async () => {
      try {
        if (!isMounted) return;
        
        setLoading(true);
        const { data, error } = await supabase.auth.getSession();
        
        if (!isMounted) return;
        
        if (error) {
          console.error("Erreur lors de la vérification de l'authentification:", error);
          setLoading(false);
          return;
        }
        
        if (data.session) {
          setIsAuthenticated(true);
          
          // Vérifier si l'utilisateur est admin
          try {
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
            
            setIsAdmin(!!adminData);
          } catch (err) {
            console.error("Erreur lors de la vérification du statut d'admin:", err);
            if (isMounted) {
              setIsAdmin(false);
            }
          }
        }
      } catch (error) {
        console.error("Erreur d'authentification:", error);
        if (isMounted) {
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;
        
        setIsAuthenticated(!!session);
        
        if (session) {
          // Différer la vérification admin pour éviter des problèmes de récursivité
          setTimeout(async () => {
            if (!isMounted) return;
            
            try {
              // @ts-ignore
              const { data: adminData, error } = await supabase
                .from("admins")
                .select("*")
                .eq("id", session.user.id)
                .single();
                
              if (!isMounted) return;
              
              if (error && error.code !== 'PGRST116') {
                console.error("Erreur lors de la vérification du statut d'admin:", error);
              }
              
              setIsAdmin(!!adminData);
            } catch (err) {
              console.error("Erreur lors de la vérification du statut d'admin:", err);
              if (isMounted) {
                setIsAdmin(false);
              }
            }
          }, 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Erreur lors de la déconnexion:", error);
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center">
          <span className="text-blue-400">Auto</span>
          <span>motive</span>
        </Link>
        
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-gray-300 transition-colors">Accueil</Link>
          <Link to="/cars" className="hover:text-gray-300 transition-colors">Voitures</Link>
          {isAdmin && (
            <Link to="/admin" className="hover:text-gray-300 transition-colors">
              Administration
            </Link>
          )}
        </div>
        
        <div>
          {loading ? (
            <div className="h-8 w-8 flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : isAuthenticated ? (
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Déconnexion</span>
            </Button>
          ) : (
            <Button variant="ghost" asChild>
              <Link to="/login">
                <LogIn className="h-5 w-5 mr-2" />
                <span className="hidden md:inline">Connexion</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
      
      {/* Menu mobile */}
      <div className="md:hidden mt-4 flex flex-col space-y-2">
        <Link to="/" className="py-2 hover:text-gray-300">Accueil</Link>
        <Link to="/cars" className="py-2 hover:text-gray-300">Voitures</Link>
        {isAdmin && (
          <Link to="/admin" className="py-2 hover:text-gray-300">
            Administration
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
