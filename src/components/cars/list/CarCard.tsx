
import React from "react";
import { Link } from "react-router-dom";
import { CarWithDetails } from "@/types";

interface CarCardProps {
  car: CarWithDetails;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const primaryPhoto = car.photos?.find(p => p.is_primary);
  const firstPhoto = car.photos?.[0];
  const photoUrl = primaryPhoto?.photo_url || firstPhoto?.photo_url || "/placeholder.svg";
  
  // Récupérer le type de carburant et la transmission
  const fuelType = car.fuel_type?.name || car.fuel_type_id || "";
  const transmission = car.transmission?.name || car.transmission_id || "";
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-56 w-full relative">
        <img 
          src={photoUrl} 
          alt={`${car.brand_id} ${car.model}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.log("Image error:", e);
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">
          {car.brand_id} {car.model} ({car.year})
        </h3>
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          {fuelType && <span>{fuelType}</span>}
          {transmission && <span>{transmission}</span>}
        </div>
        <Link
          to={`/cars/${car.id}`}
          className="block text-center bg-gray-800 hover:bg-gray-900 text-white py-2 rounded transition duration-300"
        >
          Voir les détails
        </Link>
      </div>
    </div>
  );
};
