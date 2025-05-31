
import React from "react";
import { CarWithDetails } from "@/types";
import { getCarTitle } from "./utils/carDataUtils";

interface CarTitleProps {
  car: CarWithDetails;
  className?: string;
}

const CarTitle: React.FC<CarTitleProps> = ({ car, className = "" }) => {
  const carTitle = getCarTitle(car);
  
  return (
    <h3 className={`text-base md:text-lg font-bold mb-2 text-stone-800 truncate ${className}`}>
      {carTitle || "-"}
    </h3>
  );
};

export default CarTitle;
