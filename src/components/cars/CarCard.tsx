
import React from "react";
import { Link } from "react-router-dom";
import { CarWithDetails } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface CarCardProps {
  car: CarWithDetails;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const primaryPhoto = car.photos?.find(p => p.is_primary);
  const firstPhoto = car.photos?.[0];
  const photoUrl = primaryPhoto?.photo_url || firstPhoto?.photo_url || "/placeholder.svg";
  
  const formattedPrice = car.daily_price 
    ? new Intl.NumberFormat('fr-FR', { 
        style: 'currency', 
        currency: 'EUR',
        maximumFractionDigits: 0 
      }).format(car.daily_price)
    : "Prix sur demande";
  
  const formattedMileage = car.mileage !== undefined && car.mileage !== null
    ? new Intl.NumberFormat('fr-FR').format(car.mileage) + " km"
    : "0 km";

  return (
    <Card className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
      <div className="w-full" style={{ width: "515px", height: "506px", maxWidth: "100%" }}>
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
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">
          {car.brand_id} {car.model} ({car.year})
        </h3>
        <div className="flex justify-between text-sm text-gray-600 mb-3">
          <span>{car.fuel_type_id || 'Essence'}</span>
          <span>{formattedMileage}</span>
        </div>
        <div className="flex items-end justify-between mb-3">
          <div>
            <span className="block text-stone-500 text-xs">Prix</span>
            <span className="text-xl font-bold text-stone-700">
              {car.daily_price ? formattedPrice : "Prix sur demande"}
            </span>
          </div>
          
          <Link
            to={`/cars/${car.id}`}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded transition duration-300"
          >
            Détails
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;
