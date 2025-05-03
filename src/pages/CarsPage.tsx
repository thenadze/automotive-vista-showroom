
import React from "react";
import { FiltersSection } from "@/components/cars/filters/FiltersSection";
import { CarsList } from "@/components/cars/list/CarsList";
import { useCarsFiltering } from "@/hooks/useCarsFiltering";
import { PageHeader } from "@/components/cars/PageHeader";

const CarsPage = () => {
  const { 
    cars, 
    loading, 
    filters, 
    handlers 
  } = useCarsFiltering();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header with navigation */}
      <PageHeader />
      
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
