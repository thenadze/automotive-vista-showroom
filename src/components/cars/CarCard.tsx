
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CarWithDetails } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import CarGallery from "@/components/home/CarGallery";
import { predefinedFuelTypes } from "@/components/admin/car-form/fuelTypes";
import { Badge } from "@/components/ui/badge";
import CarModal from "./CarModal";

interface CarCardProps {
  car: CarWithDetails;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
      // Ne pas retourner l'ID numérique si c'est juste un nombre
      if (!isNaN(Number(car.brand_id))) {
        return "";  // Retourner une chaîne vide au lieu de l'ID
      }
      return car.brand_id;
    }
    
    // Si aucune information n'est disponible
    return "";
  };

  // Obtenir le nom du type de carburant de façon plus robuste
  const getFuelTypeName = () => {
    // Si l'objet fuel_type est disponible avec le nom
    if (car.fuel_type && car.fuel_type.name) {
      console.log("Fuel type from object:", car.fuel_type.name);
      return car.fuel_type.name;
    }
    
    // Si fuel_type_id est défini, essayer de le mapper aux types prédéfinis
    if (car.fuel_type_id) {
      console.log("Looking up fuel type ID:", car.fuel_type_id);
      
      // Vérifier si c'est un nombre sous forme de string
      const fuelTypeIdNum = parseInt(car.fuel_type_id);
      if (!isNaN(fuelTypeIdNum)) {
        // Rechercher dans les types prédéfinis par ID numérique
        const foundType = predefinedFuelTypes.find(ft => ft.id === String(fuelTypeIdNum));
        if (foundType) {
          console.log("Found predefined fuel type by numeric ID:", foundType.name);
          return foundType.name;
        }
      }
      
      // Essayer de trouver par correspondance exacte de string
      const foundTypeByString = predefinedFuelTypes.find(ft => ft.id === car.fuel_type_id);
      if (foundTypeByString) {
        console.log("Found predefined fuel type by string ID:", foundTypeByString.name);
        return foundTypeByString.name;
      }
      
      // Si ce n'est pas un ID numérique reconnu mais que c'est une chaîne, l'utiliser telle quelle
      // car ce pourrait être directement le nom du type de carburant
      if (isNaN(Number(car.fuel_type_id))) {
        console.log("Using fuel_type_id as name:", car.fuel_type_id);
        return car.fuel_type_id;
      }
    }
    
    return "Essence";  // Valeur par défaut
  };
  
  // Nouveau - Obtenir le nom du type de transmission de façon robuste
  const getTransmissionName = () => {
    // Si l'objet transmission est disponible avec le nom
    if (car.transmission && car.transmission.name) {
      return car.transmission.name;
    }
    
    // Si transmission_id est défini
    if (car.transmission_id) {
      // Si c'est une chaîne de caractères, l'utiliser directement
      if (isNaN(Number(car.transmission_id))) {
        return car.transmission_id;
      }
    }
    
    return "Automatique";  // Valeur par défaut
  };

  const brandName = getBrandName();
  const modelName = car.model || "";
  // S'assurer que le titre n'inclut pas l'ID numérique
  const carTitle = brandName ? `${brandName} ${modelName}`.trim() : modelName;
  const fuelTypeName = getFuelTypeName();
  const transmissionName = getTransmissionName();

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <Card 
        className="bg-white rounded-lg overflow-hidden shadow cursor-pointer transition-all duration-300 hover:shadow-lg"
        onClick={handleCardClick}
      >
        <div className="relative w-full">
          <CarGallery 
            photos={car.photos || []} 
            className="w-full" 
            style={{ height: isMobile ? "140px" : "180px" }}
            autoSlide={false}
            autoSlideInterval={4000}
          />
          
          {car.year && (
            <div className="absolute top-2 right-2 z-10">
              <Badge className="bg-stone-700 text-white text-xs">{car.year}</Badge>
            </div>
          )}
        </div>
        <CardContent className="p-3 md:p-4">
          <h3 className="text-base md:text-lg font-semibold mb-2 truncate">
            {carTitle || "-"}
          </h3>
          <div className="flex justify-between text-xs md:text-sm text-gray-600 mb-2">
            <div className="flex flex-col space-y-1">
              <span>{fuelTypeName}</span>
              <span>{transmissionName}</span>
            </div>
            <span className="text-right">{formattedMileage}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="mr-2">
              <span className="block text-stone-500 text-xs">Prix</span>
              <span className="text-base md:text-lg font-bold text-stone-700 whitespace-nowrap">
                {formattedPrice}
              </span>
            </div>
            
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-stone-700 text-stone-700 hover:bg-stone-700 hover:text-white whitespace-nowrap text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <Link to={`/cars/${car.id}`}>
                Détails
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <CarModal 
        car={car}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default CarCard;
