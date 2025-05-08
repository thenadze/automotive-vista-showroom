
import React from "react";
import { Link } from "react-router-dom";
import { CarWithDetails } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import CarGallery from "@/components/home/CarGallery";
import { predefinedFuelTypes } from "@/components/admin/car-form/fuelTypes";

interface FeaturedCarCardProps {
  car: CarWithDetails;
  index: number;
}

const FeaturedCarCard: React.FC<FeaturedCarCardProps> = ({ car, index }) => {
  const isMobile = useIsMobile();
  
  // Préparer le prix avec format français
  const formattedPrice = car.daily_price 
    ? new Intl.NumberFormat('fr-FR', { 
        style: 'currency', 
        currency: 'EUR',
        maximumFractionDigits: 0 
      }).format(car.daily_price)
    : "Prix sur demande";

  // Préparer le kilométrage avec format français
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
      return car.fuel_type.name;
    }
    
    // Si fuel_type_id est défini, essayer de le mapper aux types prédéfinis
    if (car.fuel_type_id) {
      // Vérifier si c'est un nombre sous forme de string
      const fuelTypeIdNum = parseInt(car.fuel_type_id);
      if (!isNaN(fuelTypeIdNum)) {
        // Rechercher dans les types prédéfinis par ID numérique
        const foundType = predefinedFuelTypes.find(ft => ft.id === String(fuelTypeIdNum));
        if (foundType) {
          return foundType.name;
        }
      }
      
      // Essayer de trouver par correspondance exacte de string
      const foundTypeByString = predefinedFuelTypes.find(ft => ft.id === car.fuel_type_id);
      if (foundTypeByString) {
        return foundTypeByString.name;
      }
      
      // Si ce n'est pas un ID numérique reconnu mais que c'est une chaîne, l'utiliser telle quelle
      if (isNaN(Number(car.fuel_type_id))) {
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
  
  // Préparation du titre avec marque et modèle
  const brandName = getBrandName();
  const modelName = car.model || "";
  // S'assurer que le titre n'inclut pas l'ID numérique
  const carTitle = brandName ? `${brandName} ${modelName}`.trim() : modelName;
  const fuelTypeName = getFuelTypeName();
  const transmissionName = getTransmissionName();
  
  return (
    <Card 
      className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
      data-aos="fade-up" 
      data-aos-delay={(index % 3) * 100}
      data-aos-once="true"
    >
      <div className="relative w-full">
        <CarGallery 
          photos={car.photos || []} 
          className="w-full"
          style={{ height: isMobile ? "200px" : "300px" }}
        />
        
        {car.year && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-stone-700 text-white">{car.year}</Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-3 md:p-4">
        <h3 className="text-lg md:text-xl font-bold mb-2 text-stone-800 truncate">
          {carTitle || "-"}
        </h3>
        
        <div className="flex justify-between text-xs md:text-sm text-stone-600 mb-3 md:mb-4">
          <div className="flex flex-col">
            <span>{fuelTypeName}</span>
            <span className="mt-1">{transmissionName}</span>
          </div>
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
        
        <div className="flex flex-wrap gap-2 text-xs text-stone-500">
          <span className="flex items-center">
            <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Disponible maintenant
          </span>
          <span className="flex items-center ml-auto">
            <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Réponse rapide
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedCarCard;
