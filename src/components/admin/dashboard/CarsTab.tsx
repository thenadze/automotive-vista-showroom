
import React from "react";
import CarsList from "@/components/admin/CarsList";
import { CarBrand, Car, FuelType, TransmissionType } from "@/types";

interface CarsTabProps {
  cars: Car[];
  brands: CarBrand[];
  fuelTypes: FuelType[];
  transmissions: TransmissionType[];
  onCarsChange: () => Promise<any>;
}

const CarsTab: React.FC<CarsTabProps> = ({ 
  cars,
  brands,
  fuelTypes,
  transmissions,
  onCarsChange
}) => {
  return (
    <CarsList
      cars={cars}
      brands={brands}
      fuelTypes={fuelTypes}
      transmissions={transmissions}
      onCarsChange={onCarsChange}
    />
  );
};

export default CarsTab;
