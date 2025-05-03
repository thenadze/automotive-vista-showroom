
import React from "react";

interface FilterResetButtonProps {
  onClick: () => void;
}

export const FilterResetButton: React.FC<FilterResetButtonProps> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded transition duration-300"
    >
      Réinitialiser
    </button>
  );
};
