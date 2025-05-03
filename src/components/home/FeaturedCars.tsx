
import React from "react";
import { Link } from "react-router-dom";
import { CarWithDetails } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface FeaturedCarsProps {
  featuredCars: CarWithDetails[];
}

const FeaturedCars: React.FC<FeaturedCarsProps> = ({ featuredCars }) => {
  console.log("FeaturedCars received:", featuredCars);
  const isMobile = useIsMobile();
  
  return (
    <section className="py-10 md:py-16 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800">Véhicules à la une</h2>
          <Link 
            to="/cars" 
            className="text-sm md:text-base text-stone-700 hover:text-stone-900 flex items-center gap-1 font-medium whitespace-nowrap"
          >
            Voir tout
          </Link>
        </div>
        
        {featuredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredCars.map(car => {
              // Trouver la photo principale ou prendre la première ou utiliser placeholder
              let photoUrl = "/placeholder.svg";
              
              if (car.photos && car.photos.length > 0) {
                const primaryPhoto = car.photos.find(p => p.is_primary);
                photoUrl = (primaryPhoto || car.photos[0])?.photo_url || "/placeholder.svg";
              }
              
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
              
              // Préparation du titre avec marque et modèle
              const brandName = car.brand_id || "";
              const modelName = car.model || "";
              const carTitle = `${brandName} ${modelName}`.trim();
              
              return (
                <Card key={car.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                  <div className="relative w-full">
                    {/* Optimized image container with better aspect ratio for mobile */}
                    <div className="w-full" style={{ 
                      height: isMobile ? "200px" : "300px",
                      maxWidth: "100%"
                    }}>
                      <img
                        src={photoUrl}
                        alt={carTitle || 'Véhicule'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-stone-700">{car.year}</Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-3 md:p-4">
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-stone-800 truncate">
                      {carTitle || 'Véhicule'}
                    </h3>
                    
                    <div className="flex justify-between text-xs md:text-sm text-stone-600 mb-3 md:mb-4">
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
            })}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow">
            <p className="text-stone-500">Aucun véhicule disponible pour le moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCars;
