
import React from "react";
import { useCarFilters } from "@/hooks/useCarFilters";
import CarsFilters from "@/components/cars/CarsFilters";
import CarsGrid from "@/components/cars/CarsGrid";
import LoadingState from "@/components/cars/LoadingState";

const CarsPage = () => {
  const {
    cars,
    loading,
    brands,
    fuelTypes,
    transmissions,
    selectedBrand,
    selectedFuel,
    selectedTransmission,
    yearRange,
    handleBrandChange,
    handleFuelChange,
    handleTransmissionChange,
    handleYearMinChange,
    handleYearMaxChange,
    resetFilters
  } = useCarFilters();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Catalogue des véhicules</h1>
      
      <CarsFilters 
        brands={brands}
        fuelTypes={fuelTypes}
        transmissions={transmissions}
        selectedBrand={selectedBrand}
        selectedFuel={selectedFuel}
        selectedTransmission={selectedTransmission}
        yearRange={yearRange}
        handleBrandChange={handleBrandChange}
        handleFuelChange={handleFuelChange}
        handleTransmissionChange={handleTransmissionChange}
        handleYearMinChange={handleYearMinChange}
        handleYearMaxChange={handleYearMaxChange}
        resetFilters={resetFilters}
      />
      
      {loading ? (
        <LoadingState />
      ) : (
        <CarsGrid 
          cars={cars}
          resetFilters={resetFilters}
        />
      )}
    </div>
  );
};

export default CarsPage;
