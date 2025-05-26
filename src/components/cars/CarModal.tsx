import React from "react";
import { CarWithDetails } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CarGallery from "@/components/home/CarGallery";
import { predefinedFuelTypes } from "@/components/admin/car-form/fuelTypes";
import { useIsMobile } from "@/hooks/use-mobile";

interface CarModalProps {
  car: CarWithDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

const CarModal: React.FC<CarModalProps> = ({ car, isOpen, onClose }) => {
  const isMobile = useIsMobile();
  
  if (!car) return null;

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

  const getBrandName = () => {
    if (car.brand && typeof car.brand === 'object' && car.brand.name) {
      return car.brand.name;
    }
    if (car.brand_id && car.brand_id !== "undefined" && car.brand_id !== "null") {
      if (!isNaN(Number(car.brand_id))) {
        return "";
      }
      return car.brand_id;
    }
    return "";
  };

  const getFuelTypeName = () => {
    if (car.fuel_type && car.fuel_type.name) {
      return car.fuel_type.name;
    }
    if (car.fuel_type_id) {
      const fuelTypeIdNum = parseInt(car.fuel_type_id);
      if (!isNaN(fuelTypeIdNum)) {
        const foundType = predefinedFuelTypes.find(ft => ft.id === String(fuelTypeIdNum));
        if (foundType) {
          return foundType.name;
        }
      }
      const foundTypeByString = predefinedFuelTypes.find(ft => ft.id === car.fuel_type_id);
      if (foundTypeByString) {
        return foundTypeByString.name;
      }
      if (isNaN(Number(car.fuel_type_id))) {
        return car.fuel_type_id;
      }
    }
    return "Essence";
  };
  
  const getTransmissionName = () => {
    if (car.transmission && car.transmission.name) {
      return car.transmission.name;
    }
    if (car.transmission_id) {
      if (isNaN(Number(car.transmission_id))) {
        return car.transmission_id;
      }
    }
    return "Automatique";
  };

  const brandName = getBrandName();
  const modelName = car.model || "";
  const carTitle = brandName ? `${brandName} ${modelName}`.trim() : modelName;
  const fuelTypeName = getFuelTypeName();
  const transmissionName = getTransmissionName();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          <CarGallery 
            photos={car.photos || []} 
            className="w-full"
            style={{ height: isMobile ? "200px" : "250px" }}
            enableSwipe={true}
            showArrows={!isMobile}
          />
          
          {car.year && (
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-stone-700 text-white">{car.year}</Badge>
            </div>
          )}
        </div>
        
        <div className="p-4 md:p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl md:text-2xl font-bold text-stone-800">
              {carTitle || "-"}
            </DialogTitle>
          </DialogHeader>
          
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-4 md:gap-6 mb-4 md:mb-6`}>
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-base md:text-lg font-semibold text-stone-700">Caractéristiques</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-600 text-sm">Carburant:</span>
                  <span className="font-medium text-sm">{fuelTypeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600 text-sm">Transmission:</span>
                  <span className="font-medium text-sm">{transmissionName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600 text-sm">Kilométrage:</span>
                  <span className="font-medium text-sm">{formattedMileage}</span>
                </div>
                {car.year && (
                  <div className="flex justify-between">
                    <span className="text-stone-600 text-sm">Année:</span>
                    <span className="font-medium text-sm">{car.year}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-base md:text-lg font-semibold text-stone-700">Tarif</h3>
              <div className="bg-stone-50 p-3 md:p-4 rounded-lg">
                <div className="text-center">
                  <span className="block text-stone-500 text-xs md:text-sm mb-1">Prix</span>
                  <span className="text-xl md:text-3xl font-bold text-stone-700">
                    {formattedPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {!isMobile && car.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-stone-700 mb-2">Description</h3>
              <p className="text-stone-600 leading-relaxed">{car.description}</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Button
              asChild
              className="flex-1 bg-stone-700 hover:bg-stone-800 text-white text-sm md:text-base"
            >
              <Link to={`/cars/${car.id}`} onClick={onClose}>
                Voir tous les détails
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-stone-300 text-stone-700 hover:bg-stone-50 text-sm md:text-base"
            >
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarModal;
