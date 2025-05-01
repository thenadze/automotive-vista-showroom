
import React from "react";

interface CarFormHeaderProps {
  isEditMode: boolean;
}

const CarFormHeader: React.FC<CarFormHeaderProps> = ({ isEditMode }) => {
  return (
    <h2 className="text-xl font-semibold mb-6">
      {isEditMode ? "Modifier une voiture" : "Ajouter une nouvelle voiture"}
    </h2>
  );
};

export default CarFormHeader;
