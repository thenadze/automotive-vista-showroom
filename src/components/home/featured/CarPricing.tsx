
import React from "react";
import { Link } from "react-router-dom";
import { CarWithDetails } from "@/types";
import { Button } from "@/components/ui/button";
import { formatPrice } from "./utils/carDataUtils";

interface CarPricingProps {
  car: CarWithDetails;
  className?: string;
}

const CarPricing: React.FC<CarPricingProps> = ({ car, className = "" }) => {
  const formattedPrice = formatPrice(car.daily_price);
  
  return (
    <div className={`flex items-center justify-between mb-2 ${className}`}>
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
  );
};

export default CarPricing;
