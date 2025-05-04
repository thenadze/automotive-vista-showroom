
import React from "react";
import { Link } from "react-router-dom";
import { CarWithDetails } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import CarGallery from "@/components/home/CarGallery";
import { predefinedFuelTypes } from "@/components/admin/car-form/fuelTypes";

interface CarCardProps {
  car: CarWithDetails;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const isMobile = useIsMobile();
  
  // Formatter le prix avec format français
  const formattedPrice = car.daily_price 
    ? new Intl.NumberFormat('fr-FR', { 
        style: 'currency', 
        currency: 'EUR',
        maximumFractionDigits: 0 
      }).format(car.daily_price)
    : "Prix sur demande";
  
  // Formatter le kilométrage avec format français
  const formattedMileage = car.mileage !== undefined && car.mileage !== null
    ? new Intl.NumberFormat('fr-FR').format(car.mileage) + " km"
    : "0 km";
  
  // Obtenir le nom de la marque de manière plus robuste
  const getBrandName = () => {
    // Si on a l'objet brand complet avec le nom
    if (car.brand && typeof car.brand === 'object' && car.brand.name) {
      return car.brand.name;
    }
    
    // Si brand_id est défini mais qu'il n'y a pas d'objet brand
    if (car.brand_id && car.brand_id !== "undefined" && car.brand_id !== "null") {
      return car.brand_id;
    }
    
    // Si aucune information n'est disponible
    return "-";
  };

  // Obtenir le nom du type de carburant
  const getFuelTypeName = () => {
    // Si l'objet fuel_type est disponible avec le nom
    if (car.fuel_type && car.fuel_type.name) {
      return car.fuel_type.name;
    }
    
    // Si fuel_type_id est défini, essayer de le mapper
    if (car.fuel_type_id) {
      // Rechercher dans les types prédéfinis
      const foundType = predefinedFuelTypes.find(ft => String(ft.id) === car.fuel_type_id);
      if (foundType) {
        return foundType.name;
      }
      
      // Si c'est un nombre, il s'agit probablement d'un ID
      if (!isNaN(Number(car.fuel_type_id))) {
        return "Carburant";  // Valeur par défaut
      }
      
      // Sinon, utiliser la valeur telle quelle
      return car.fuel_type_id;
    }
    
    return "Essence";  // Valeur par défaut
  };

  const brandName = getBrandName();
  const modelName = car.model || "-";
  const carTitle = `${brandName} ${modelName}${car.year ? ` (${car.year})` : ''}`.trim();
  const fuelTypeName = getFuelTypeName();

  return (
    <Card className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full">
        <CarGallery 
          photos={car.photos || []} 
          className="w-full" 
          style={{ height: isMobile ? "200px" : "300px" }}
        />
      </div>
      <CardContent className="p-3 md:p-4">
        <h3 className="text-lg md:text-xl font-semibold mb-2 truncate">
          {carTitle !== " " ? carTitle : "-"}
        </h3>
        <div className="flex justify-between text-xs md:text-sm text-gray-600 mb-3">
          <span>{fuelTypeName}</span>
          <span>{formattedMileage}</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="mr-2">
            <span className="block text-stone-500 text-xs">Prix</span>
            <span className="text-lg md:text-xl font-bold text-stone-700 whitespace-nowrap">
              {formattedPrice}
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
