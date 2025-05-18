
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { NavigationLinks } from "./NavigationLinks";
import { AuthButtons } from "./AuthButtons";
import { MobileMenu } from "./MobileMenu";
import { useAuthStatus } from "@/hooks/useAuthStatus";

/**
 * Barre de navigation du site avec style épuré et élégant
 */
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, loading, setLoading, setIsAuthenticated } = useAuthStatus();

  return (
    <nav className="bg-black border-b border-gray-800">
      <div className="container mx-auto px-4">
        {/* Logo centered above navigation links */}
        <Logo />
        
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
            <NavigationLinks />
          </div>
          
          {/* Auth button - positioned absolute right */}
          <div className="absolute right-0">
            {loading ? (
              <div className="h-8 w-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              <AuthButtons
                isAuthenticated={isAuthenticated}
                loading={loading}
                setLoading={setLoading}
                setIsAuthenticated={setIsAuthenticated}
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen}
        isAuthenticated={isAuthenticated}
        loading={loading}
        setLoading={setLoading}
        setIsAuthenticated={setIsAuthenticated}
        onClose={() => setMobileMenuOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
