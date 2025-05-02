
import React from "react";
import { Link } from "react-router-dom";
import { CarWithDetails } from "@/types";

interface FeaturedCarsProps {
  featuredCars: CarWithDetails[];
}

const FeaturedCars: React.FC<FeaturedCarsProps> = ({ featuredCars }) => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Véhicules à la une</h2>
      
      {featuredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCars.map(car => {
            console.log("Featured car photos:", car.photos);
            const primaryPhoto = car.photos?.find(p => p.is_primary);
            const firstPhoto = car.photos?.[0];
            const photoUrl = primaryPhoto?.photo_url || firstPhoto?.photo_url || "/placeholder.svg";
            
            return (
              <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-56 relative">
                  <img
                    src={photoUrl}
                    alt={`${car.brand?.name || ''} ${car.model}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.log("Error loading featured car image:", photoUrl);
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {car.brand?.name || 'Marque'} {car.model} ({car.year})
                  </h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>{car.fuel_type?.name || 'N/A'}</span>
                    <span>{car.transmission?.name || 'N/A'}</span>
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
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">Aucun véhicule disponible pour le moment.</p>
      )}
      
      <div className="text-center mt-8">
        <Link
          to="/cars"
          className="inline-block border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white py-2 px-6 rounded transition duration-300"
        >
          Voir tous nos véhicules
        </Link>
      </div>
    </section>
  );
};

export default FeaturedCars;
