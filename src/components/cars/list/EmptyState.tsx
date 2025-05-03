
import React from "react";

interface EmptyStateProps {
  resetFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ resetFilters }) => {
  return (
    <div className="bg-gray-50 p-8 rounded-lg text-center">
      <h3 className="text-xl font-medium mb-2">Aucun véhicule trouvé</h3>
      <p className="text-gray-600 mb-4">Aucun véhicule ne correspond à vos critères de recherche.</p>
      <button 
        onClick={resetFilters}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition duration-300"
      >
        Réinitialiser les filtres
      </button>
    </div>
  );
};
