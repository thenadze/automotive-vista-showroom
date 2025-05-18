
import { Link } from "react-router-dom";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

interface NavigationLinksProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

export const NavigationLinks = ({ isMobile = false, onItemClick }: NavigationLinksProps) => {
  const { scrollToElement } = useSmoothScroll();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToElement('contact', { offset: 100 });
    if (onItemClick) {
      onItemClick();
    }
  };

  const baseStyles = isMobile
    ? "block text-center py-3 text-white hover:bg-gray-900 hover:text-orange-500 transition-colors"
    : "text-white hover:text-orange-500 transition-colors font-medium tracking-wide px-3 py-2";

  return (
    <>
      <Link 
        to="/" 
        className={baseStyles} 
        onClick={onItemClick}
      >
        Accueil
      </Link>
      <Link 
        to="/cars" 
        className={baseStyles} 
        onClick={onItemClick}
      >
        Nos Véhicules
      </Link>
      <button 
        onClick={handleContactClick}
        className={`${baseStyles} ${isMobile ? "w-full" : ""}`}
      >
        Contact
      </button>
    </>
  );
};
