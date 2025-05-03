
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

/**
 * Barre de navigation du site sans gestion de l'authentification
 */
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Détecter le défilement pour changer l'apparence de la navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setIsVisible(window.scrollY > 0);
    };
    
    // Exécuter une première fois pour définir l'état initial
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Classe CSS conditionnelle pour la visibilité de la navbar
  const navbarVisibilityClass = isVisible 
    ? "opacity-100 translate-y-0" 
    : "opacity-0 -translate-y-full";

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-gray-900 shadow-lg py-2" : "bg-transparent py-4"
    } ${navbarVisibilityClass}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center text-white">
          <span className="text-orange-500">Auto</span>
          <span>motive</span>
        </Link>
        
        <div className="hidden lg:flex gap-8 items-center">
          <Link to="/" className="text-white hover:text-orange-400 transition-colors">Accueil</Link>
          <Link to="/cars" className="text-white hover:text-orange-400 transition-colors">Nos Véhicules</Link>
          <a href="#" className="text-white hover:text-orange-400 transition-colors">À Propos</a>
          <a href="#" className="text-white hover:text-orange-400 transition-colors">Contact</a>
          <a href="#" className="text-white hover:text-orange-400 transition-colors">Services</a>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="lg:hidden text-white p-2 focus:outline-none" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-900 shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-white py-2 hover:text-orange-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/cars" 
              className="text-white py-2 hover:text-orange-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Nos Véhicules
            </Link>
            <a 
              href="#" 
              className="text-white py-2 hover:text-orange-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              À Propos
            </a>
            <a 
              href="#" 
              className="text-white py-2 hover:text-orange-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <a 
              href="#" 
              className="text-white py-2 hover:text-orange-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
