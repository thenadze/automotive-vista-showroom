
import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Logo component with animation effect
 */
export const Logo = () => {
  const [logoAnimating, setLogoAnimating] = useState(false);

  const handleLogoClick = () => {
    setLogoAnimating(true);
    setTimeout(() => setLogoAnimating(false), 1000);
  };

  return (
    <div className="flex justify-center pt-4">
      <Link to="/" onClick={handleLogoClick}>
        <img 
          src="/lovable-uploads/ccd3da64-df7a-456d-a0b9-d7591c1e211c.png" 
          alt="Automotive Logo" 
          className={`h-24 w-auto transition-all duration-700 ${logoAnimating ? 'scale-110 rotate-6' : ''}`}
        />
      </Link>
    </div>
  );
};
