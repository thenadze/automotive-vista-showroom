
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User } from "lucide-react";

/**
 * Barre de navigation du site avec gestion de l'authentification
 */
const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          setIsAuthenticated(true);
          
          // Vérifier si l'utilisateur est admin
          // @ts-ignore
          const { data: adminData } = await supabase
            .from("admins")
            .select("*")
            .eq("id", data.session.user.id)
            .single();
            
          setIsAdmin(!!adminData);
        }
      } catch (error) {
        console.error("Erreur d'authentification:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsAuthenticated(!!session);
        
        if (session) {
          // @ts-ignore
          const { data: adminData } = await supabase
            .from("admins")
            .select("*")
            .eq("id", session.user.id)
            .single();
            
          setIsAdmin(!!adminData);
        } else {
          setIsAdmin(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
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
            <div className="h-8 w-8"></div>
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
