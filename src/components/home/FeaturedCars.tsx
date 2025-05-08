
import React from "react";
import { Link } from "react-router-dom";
import { CarWithDetails } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import FeaturedCarsGrid from "./featured/FeaturedCarsGrid";
import MobileFeaturedCars from "./featured/MobileFeaturedCars";
import MobileCarCarousel from "./featured/MobileCarCarousel";
import EmptyFeaturedState from "./featured/EmptyFeaturedState";

interface FeaturedCarsProps {
  featuredCars: CarWithDetails[];
}

const FeaturedCars: React.FC<FeaturedCarsProps> = ({ featuredCars }) => {
  console.log("FeaturedCars received:", featuredCars);
  const isMobile = useIsMobile();
  
  // Limiter à 6 véhicules maximum, l'ordre est déjà défini par la requête
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
            {!isMobile && <FeaturedCarsGrid cars={limitedCars} />}
            
            {/* Version Mobile: 3 premiers véhicules en grille */}
            {isMobile && (
              <>
                <MobileFeaturedCars cars={firstThreeCars} />
                
                {/* Version Mobile: 3 derniers véhicules en carrousel */}
                {lastThreeCars.length > 0 && (
                  <MobileCarCarousel cars={lastThreeCars} startIndex={3} />
                )}
              </>
            )}
          </>
        ) : (
          <EmptyFeaturedState />
        )}
      </div>
    </section>
  );
};

export default FeaturedCars;
