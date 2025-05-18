
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useToast } from "@/hooks/use-toast";

/**
 * Barre de navigation du site avec style épuré et élégant
 */
const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoAnimating, setLogoAnimating] = useState(false);
  const { scrollToElement } = useSmoothScroll();
  const navigate = useNavigate();
  const { toast } = useToast();

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
      setLoading(true);
      // Store the local value to use with toast after logout
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

  const handleLogoClick = () => {
    setLogoAnimating(true);
    setTimeout(() => setLogoAnimating(false), 1000);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToElement('contact', { offset: 100 });
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-black border-b border-gray-800">
      <div className="container mx-auto px-4">
        {/* Logo centered above navigation links */}
        <div className="flex justify-center pt-4">
          <Link to="/" onClick={handleLogoClick}>
            <img 
              src="/lovable-uploads/ccd3da64-df7a-456d-a0b9-d7591c1e211c.png" 
              alt="Automotive Logo" 
              className={`h-24 w-auto transition-all duration-700 ${logoAnimating ? 'scale-110 rotate-6' : ''}`}
            />
          </Link>
        </div>
        
        <div className="flex justify-center items-center h-16 relative">
          {/* Mobile menu button - positioned absolute left */}
          <button 
            className="lg:hidden absolute left-0 p-2 focus:outline-none text-white" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          {/* Centered Navigation Links - only visible on desktop */}
          <div className="hidden lg:flex items-center space-x-16">
            <Link to="/" className="text-white hover:text-orange-500 transition-colors font-medium tracking-wide px-3 py-2">
              Accueil
            </Link>
            <Link to="/cars" className="text-white hover:text-orange-500 transition-colors font-medium tracking-wide px-3 py-2">
              Nos Véhicules
            </Link>
            <button 
              onClick={handleContactClick}
              className="text-white hover:text-orange-500 transition-colors font-medium tracking-wide px-3 py-2"
            >
              Contact
            </button>
          </div>
          
          {/* Auth button - positioned absolute right */}
          <div className="absolute right-0">
            {loading ? (
              <div className="h-8 w-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : isAuthenticated ? (
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
            ) : null}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black border-t border-gray-800">
          <div className="container mx-auto px-4 py-2 space-y-1">
            <Link 
              to="/" 
              className="block text-center py-3 text-white hover:bg-gray-900 hover:text-orange-500 transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/cars" 
              className="block text-center py-3 text-white hover:bg-gray-900 hover:text-orange-500 transition-colors" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Nos Véhicules
            </Link>
            <button 
              className="w-full text-center py-3 text-white hover:bg-gray-900 hover:text-orange-500 transition-colors" 
              onClick={handleContactClick}
            >
              Contact
            </button>
            
            {isAuthenticated && (
              <>
                <Separator className="my-2 bg-gray-800" />
                <Link 
                  to="/admin" 
                  className="block text-center py-3 text-white hover:bg-gray-900 hover:text-orange-500 transition-colors" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin
                </Link>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }} 
                  className="w-full text-center py-3 text-white hover:bg-gray-900 hover:text-orange-500 transition-colors"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-1"></span>
                  ) : "Déconnexion"}
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
