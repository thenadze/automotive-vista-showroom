
import React from "react";
import { CarWithDetails } from "@/types";

interface DescriptionSectionProps {
  car: CarWithDetails;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ car }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Description</h2>
      
      {car.description ? (
        <div className="prose prose-stone">
          <p className="whitespace-pre-wrap">{car.description}</p>
        </div>
      ) : (
        <p className="text-gray-500 italic">
          Aucune description disponible pour ce véhicule.
        </p>
      )}
    </div>
  );
};

export default DescriptionSection;
