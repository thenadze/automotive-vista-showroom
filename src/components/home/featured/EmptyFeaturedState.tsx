
import React from "react";

const EmptyFeaturedState: React.FC = () => {
  return (
    <div className="text-center py-10 bg-white rounded-lg shadow">
      <p className="text-stone-500">Aucun véhicule disponible pour le moment.</p>
    </div>
  );
};

export default EmptyFeaturedState;
