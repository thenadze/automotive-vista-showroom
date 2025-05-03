
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogIn, Menu, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

/**
 * Barre de navigation du site avec style épuré et élégant
 */
const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        setIsAuthenticated(!!data.session);
      } catch (error) {
        console.error("Erreur d'authentification:", error);
        if (isMounted) {
          setIsAuthenticated(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    checkAuth();
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return;
      setIsAuthenticated(!!session);
    });
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
    <nav className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center h-16 relative">
          {/* Mobile menu button - positioned absolute left */}
          <button 
            className="lg:hidden absolute left-0 p-2 focus:outline-none" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          {/* Centered Navigation Links - only visible on desktop */}
          <div className="hidden lg:flex items-center space-x-16">
            <Link to="/" className="text-gray-800 hover:text-orange-500 transition-colors font-medium tracking-wide px-3 py-2">
              Accueil
            </Link>
            <Link to="/cars" className="text-gray-800 hover:text-orange-500 transition-colors font-medium tracking-wide px-3 py-2">
              Nos Véhicules
            </Link>
            <Link to="#contact" className="text-gray-800 hover:text-orange-500 transition-colors font-medium tracking-wide px-3 py-2">
              Contact
            </Link>
          </div>
          
          {/* Auth button - positioned absolute right */}
          <div className="absolute right-0">
            {loading ? (
              <div className="h-8 w-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-800"></div>
              </div>
            ) : isAuthenticated ? (
              <div className="flex space-x-2">
                <Link to="/admin" className="text-sm text-gray-700 hover:text-orange-500">
                  Admin
                </Link>
                <Separator orientation="vertical" className="h-6 mx-2" />
                <button onClick={handleLogout} className="text-sm text-gray-700 hover:text-orange-500">
                  Déconnexion
                </button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" className="text-gray-700" asChild>
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-1" />
                  <span>Connexion</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-2 space-y-1">
            <Link 
              to="/" 
              className="block text-center py-3 text-gray-800 hover:bg-gray-50 hover:text-orange-500 transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/cars" 
              className="block text-center py-3 text-gray-800 hover:bg-gray-50 hover:text-orange-500 transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Nos Véhicules
            </Link>
            <Link 
              to="#contact" 
              className="block text-center py-3 text-gray-800 hover:bg-gray-50 hover:text-orange-500 transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {isAuthenticated && (
              <>
                <Separator className="my-2" />
                <Link 
                  to="/admin" 
                  className="block text-center py-3 text-gray-800 hover:bg-gray-50 hover:text-orange-500 transition-colors" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }} 
                  className="w-full text-center py-3 text-gray-800 hover:bg-gray-50 hover:text-orange-500 transition-colors"
                >
                  Déconnexion
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
