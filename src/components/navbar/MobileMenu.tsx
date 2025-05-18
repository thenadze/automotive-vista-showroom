
import { NavigationLinks } from "./NavigationLinks";
import { AuthButtons } from "./AuthButtons";
import { Separator } from "@/components/ui/separator";

interface MobileMenuProps {
  isOpen: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  onClose: () => void;
}

export const MobileMenu = ({ 
  isOpen, 
  isAuthenticated, 
  loading, 
  setLoading, 
  setIsAuthenticated,
  onClose 
}: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-2 space-y-1">
        <NavigationLinks isMobile={true} onItemClick={onClose} />

        {isAuthenticated && (
          <AuthButtons 
            isAuthenticated={isAuthenticated} 
            loading={loading} 
            setLoading={setLoading} 
            setIsAuthenticated={setIsAuthenticated} 
            isMobile={true}
            onLogout={onClose}
          />
        )}
      </div>
    </div>
  );
};
