
import React from "react";
import { CarWithDetails } from "@/types";
import FeaturedCarCard from "./FeaturedCarCard";

interface MobileFeaturedCarsProps {
  cars: CarWithDetails[];
}

const MobileFeaturedCars: React.FC<MobileFeaturedCarsProps> = ({ cars }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:hidden mb-8">
      {cars.map((car, index) => (
        <FeaturedCarCard key={car.id} car={car} index={index} />
      ))}
    </div>
  );
};

export default MobileFeaturedCars;
