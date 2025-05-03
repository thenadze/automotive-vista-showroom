
import React from "react";
import { FiltersSection } from "@/components/cars/filters/FiltersSection";
import { CarsList } from "@/components/cars/list/CarsList";
import { useCarsFiltering } from "@/hooks/useCarsFiltering";

const CarsPage = () => {
  const { 
    cars, 
    loading, 
    filters, 
    handlers 
  } = useCarsFiltering();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Catalogue des véhicules</h1>
      
      {/* Filters */}
      <FiltersSection
        brands={filters.brands}
        fuelTypes={filters.fuelTypes}
        transmissions={filters.transmissions}
        selectedBrand={filters.selectedBrand}
        selectedFuel={filters.selectedFuel}
        selectedTransmission={filters.selectedTransmission}
        yearRange={filters.yearRange}
        handleBrandChange={handlers.handleBrandChange}
        handleFuelChange={handlers.handleFuelChange}
        handleTransmissionChange={handlers.handleTransmissionChange}
        handleYearMinChange={handlers.handleYearMinChange}
        handleYearMaxChange={handlers.handleYearMaxChange}
        resetFilters={handlers.resetFilters}
      />
      
      {/* Car Listings */}
      <CarsList 
        cars={cars} 
        resetFilters={handlers.resetFilters}
        loading={loading}
      />
    </div>
  );
};

export default CarsPage;
