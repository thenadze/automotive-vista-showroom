
import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface EmptyStateProps {
  resetFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ resetFilters }) => {
  return (
    <div className="bg-gray-50 p-8 rounded-lg text-center">
      <h3 className="text-xl font-medium mb-2">Aucun véhicule trouvé</h3>
      <p className="text-gray-600 mb-4">Aucun véhicule ne correspond à vos critères de recherche.</p>
      <Button 
        onClick={resetFilters}
        className="flex items-center gap-2"
      >
        <RotateCcw className="h-4 w-4" />
        Réinitialiser les filtres
      </Button>
    </div>
  );
};
