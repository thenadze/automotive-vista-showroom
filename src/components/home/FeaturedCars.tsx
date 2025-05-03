
import React from "react";
import { Link } from "react-router-dom";
import { CarWithDetails } from "@/types";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

interface FeaturedCarsProps {
  featuredCars: CarWithDetails[];
}

const FeaturedCars: React.FC<FeaturedCarsProps> = ({ featuredCars }) => {
  console.log("FeaturedCars received:", featuredCars);
  
  return (
    <section className="py-16 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-stone-800">Véhicules à la une</h2>
          <Link 
            to="/cars" 
            className="text-stone-700 hover:text-stone-900 flex items-center gap-1 font-medium"
          >
            Voir tout
          </Link>
        </div>
        
        {featuredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map(car => {
              // Trouver la photo principale ou prendre la première ou utiliser placeholder
              let photoUrl = "/placeholder.svg";
              
              if (car.photos && car.photos.length > 0) {
                const primaryPhoto = car.photos.find(p => p.is_primary);
                photoUrl = (primaryPhoto || car.photos[0])?.photo_url || "/placeholder.svg";
              }
              
              // Préparer le prix avec format français
              const formattedPrice = new Intl.NumberFormat('fr-FR', { 
                style: 'currency', 
                currency: 'EUR',
                maximumFractionDigits: 0 
              }).format(car.daily_price || 0);
              
              return (
                <div key={car.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <AspectRatio ratio={16/9}>
                      <img
                        src={photoUrl}
                        alt={`${car.brand?.name || 'Marque'} ${car.model}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </AspectRatio>
                    
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-stone-700">{car.year}</Badge>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2 text-stone-800">
                      {car.brand?.name || 'Marque'} {car.model}
                    </h3>
                    
                    <div className="flex justify-between text-sm text-stone-600 mb-4">
                      <span>{car.fuel_type?.name || 'N/A'}</span>
                      <span>{car.transmission?.name || 'N/A'}</span>
                    </div>
                    
                    <div className="flex items-end justify-between mb-3">
                      <div>
                        <span className="block text-stone-500 text-xs">Prix</span>
                        <span className="text-xl font-bold text-stone-700">{formattedPrice}</span>
                      </div>
                      
                      <Button
                        asChild
                        variant="outline"
                        className="border-stone-700 text-stone-700 hover:bg-stone-700 hover:text-white"
                      >
                        <Link to={`/cars/${car.id}`}>
                          Détails
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 text-xs text-stone-500">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Disponible maintenant
                      </span>
                      <span className="flex items-center ml-auto">
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Réponse rapide
                      </span>
                    </div>
                  </div>
                </div>
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
