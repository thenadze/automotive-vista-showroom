
import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";

const PageLoader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Cacher le loader une fois la page chargée
    const handleLoad = () => {
      // Ajoutons un petit délai pour que l'animation soit visible
      setTimeout(() => {
        setIsVisible(false);
      }, 800);
    };

    // Si la page est déjà chargée
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-80 h-80 mb-4 relative flex items-center justify-center">
        <img 
          src="/lovable-uploads/5dbaca68-920a-49c1-b45d-d3cce4600038.png" 
          alt="Automotive Logo" 
          className="max-w-full max-h-full animate-pulse"
        />
      </div>
      <div className="relative mt-4">
        <Loader className="w-10 h-10 text-orange-500 animate-spin" />
      </div>
    </div>
  );
};

export default PageLoader;
