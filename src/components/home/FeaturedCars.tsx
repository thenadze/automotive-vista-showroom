
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CarWithDetails } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import CarGallery from "./CarGallery";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

interface FeaturedCarsProps {
  featuredCars: CarWithDetails[];
}

const FeaturedCars: React.FC<FeaturedCarsProps> = ({ featuredCars }) => {
  console.log("FeaturedCars received:", featuredCars);
  const isMobile = useIsMobile();
  
  // Limiter à 6 véhicules maximum
  const limitedCars = featuredCars.slice(0, 6);
  
  // Séparer les deux groupes pour mobile
  const firstThreeCars = limitedCars.slice(0, 3);
  const lastThreeCars = limitedCars.slice(3, 6);
  
  return (
    <section className="py-10 md:py-16 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 
            className="text-2xl md:text-3xl font-bold text-stone-800"
            data-aos="fade-right" 
            data-aos-once="true"
          >
            Véhicules à la une
          </h2>
          <Link 
            to="/cars" 
            className="text-sm md:text-base text-stone-700 hover:text-stone-900 flex items-center gap-1 font-medium whitespace-nowrap"
            data-aos="fade-left"
            data-aos-once="true"
          >
            Voir tout
          </Link>
        </div>

        {limitedCars.length > 0 ? (
          <>
            {/* Version Desktop: tous les véhicules en grille */}
            {!isMobile && (
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {limitedCars.map((car, index) => (
                  <CarCard key={car.id} car={car} index={index} />
                ))}
              </div>
            )}
            
            {/* Version Mobile: 3 premiers véhicules en grille */}
            {isMobile && (
              <>
                <div className="grid grid-cols-1 gap-6 md:hidden mb-8">
                  {firstThreeCars.map((car, index) => (
                    <CarCard key={car.id} car={car} index={index} />
                  ))}
                </div>
                
                {/* Version Mobile: 3 derniers véhicules en carrousel */}
                {lastThreeCars.length > 0 && (
                  <div className="md:hidden">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-stone-700">
                        Plus de véhicules
                      </h3>
                    </div>
                    <Carousel 
                      opts={{
                        align: "start",
                        loop: lastThreeCars.length > 1
                      }}
                      className="w-full"
                    >
                      <CarouselContent className="-ml-2 md:ml-0">
                        {lastThreeCars.map((car, index) => (
                          <CarouselItem key={car.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2">
                            <CarCard car={car} index={index + 3} />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <div className="flex justify-center mt-4 gap-2">
                        <CarouselPrevious className="relative left-auto right-auto static" />
                        <CarouselNext className="relative left-auto right-auto static" />
                      </div>
                    </Carousel>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow">
            <p className="text-stone-500">Aucun véhicule disponible pour le moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

// Composant CarCard extrait pour la réutilisation
const CarCard: React.FC<{ car: CarWithDetails; index: number }> = ({ car, index }) => {
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
  
  // Obtenir le nom de la marque
  const getBrandName = () => {
    // Si on a l'objet brand complet avec le nom
    if (car.brand && car.brand.name) {
      return car.brand.name;
    }
    
    // Essayer de récupérer d'autres sources (dans le cas où on n'a que l'ID)
    return "Marque inconnue";
  };
  
  // Préparation du titre avec marque et modèle
  const brandName = getBrandName();
  const modelName = car.model || "";
  const carTitle = `${brandName} ${modelName}`.trim();
  
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
        
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-stone-700">{car.year}</Badge>
        </div>
      </div>
      
      <CardContent className="p-3 md:p-4">
        <h3 className="text-lg md:text-xl font-bold mb-2 text-stone-800 truncate">
          {carTitle || 'Véhicule'}
        </h3>
        
        <div className="flex justify-between text-xs md:text-sm text-stone-600 mb-3 md:mb-4">
          <span>{car.fuel_type?.name || car.fuel_type_id || 'Essence'}</span>
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

export default FeaturedCars;
