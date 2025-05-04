
import React from "react";
import { Helmet } from "react-helmet-async";
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
    <>
      <Helmet>
        <title>Catalogue de véhicules d'occasion | Automotive</title>
        <meta name="description" content="Découvrez notre sélection de véhicules d'occasion. Trouvez la voiture qui vous convient parmi notre catalogue varié de marques et modèles." />
        <meta property="og:title" content="Catalogue de véhicules d'occasion | Automotive" />
        <meta property="og:description" content="Découvrez notre sélection de véhicules d'occasion. Trouvez la voiture qui vous convient parmi notre catalogue varié de marques et modèles." />
      </Helmet>
      
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
    </>
  );
};

export default CarsPage;
