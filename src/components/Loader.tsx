
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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-32 h-32 mb-4 relative flex items-center justify-center">
        <div className="text-2xl font-bold flex items-center">
          <span className="text-orange-500">Auto</span>
          <span className="text-gray-800 dark:text-white">motive</span>
        </div>
      </div>
      <div className="relative">
        <Loader className="w-10 h-10 text-orange-500 animate-spin" />
      </div>
    </div>
  );
};

export default PageLoader;
