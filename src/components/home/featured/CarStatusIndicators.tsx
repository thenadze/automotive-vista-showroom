
import React from "react";

interface CarStatusIndicatorsProps {
  className?: string;
}

const CarStatusIndicators: React.FC<CarStatusIndicatorsProps> = ({ className = "" }) => {
  return (
    <div className={`flex flex-wrap gap-2 text-xs text-stone-500 ${className}`}>
      <span className="flex items-center">
        <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
        </svg>
        Disponible
      </span>
      <span className="flex items-center ml-auto">
        <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        </svg>
        Réponse rapide
      </span>
    </div>
  );
};

export default CarStatusIndicators;
