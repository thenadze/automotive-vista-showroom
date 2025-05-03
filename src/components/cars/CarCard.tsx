
import React from "react";
import { Link } from "react-router-dom";
import { CarWithDetails } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

interface CarCardProps {
  car: CarWithDetails;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const isMobile = useIsMobile();
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
      <div className="relative w-full">
        <div className="w-full" style={{ 
          height: isMobile ? "200px" : "300px",
          maxWidth: "100%"
        }}>
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
      </div>
      <CardContent className="p-3 md:p-4">
        <h3 className="text-lg md:text-xl font-semibold mb-2 truncate">
          {car.brand_id} {car.model} ({car.year})
        </h3>
        <div className="flex justify-between text-xs md:text-sm text-gray-600 mb-3">
          <span>{car.fuel_type_id || 'Essence'}</span>
          <span>{formattedMileage}</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="mr-2">
            <span className="block text-stone-500 text-xs">Prix</span>
            <span className="text-lg md:text-xl font-bold text-stone-700 whitespace-nowrap">
              {car.daily_price ? formattedPrice : "Prix sur demande"}
            </span>
          </div>
          
          <Button
            asChild
            variant="outline"
            size={isMobile ? "sm" : "default"}
            className="border-stone-700 text-stone-700 hover:bg-stone-700 hover:text-white whitespace-nowrap"
          >
            <Link to={`/cars/${car.id}`}>
              Détails
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;
