
import React from "react";
import { CarWithDetails } from "@/types";
import FeaturedCarCard from "./FeaturedCarCard";

interface FeaturedCarsGridProps {
  cars: CarWithDetails[];
}

const FeaturedCarsGrid: React.FC<FeaturedCarsGridProps> = ({ cars }) => {
  return (
    <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {cars.map((car, index) => (
        <FeaturedCarCard key={car.id} car={car} index={index} />
      ))}
    </div>
  );
};

export default FeaturedCarsGrid;
