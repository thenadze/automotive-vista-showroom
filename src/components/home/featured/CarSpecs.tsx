
import React from "react";
import { CarWithDetails } from "@/types";
import { getFuelTypeName, getTransmissionName, formatMileage } from "./utils/carDataUtils";

interface CarSpecsProps {
  car: CarWithDetails;
  className?: string;
}

const CarSpecs: React.FC<CarSpecsProps> = ({ car, className = "" }) => {
  const fuelTypeName = getFuelTypeName(car);
  const transmissionName = getTransmissionName(car);
  const formattedMileage = formatMileage(car.mileage);
  
  return (
    <div className={`flex justify-between text-xs md:text-sm text-stone-600 mb-2 ${className}`}>
      <div className="flex flex-col space-y-1">
        <span>{fuelTypeName}</span>
        <span>{transmissionName}</span>
      </div>
      <span className="text-right">{formattedMileage}</span>
    </div>
  );
};

export default CarSpecs;
