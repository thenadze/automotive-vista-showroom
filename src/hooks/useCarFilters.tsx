
import { useState } from "react";
import { useCarsData } from "./useCarsData";
import { useFilterOptions, FilterOption } from "./useFilterOptions";
import { CarWithDetails } from "@/types";

export const useCarFilters = () => {
  // Filters
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedFuel, setSelectedFuel] = useState<string | null>(null);
  const [selectedTransmission, setSelectedTransmission] = useState<string | null>(null);
  const [yearRange, setYearRange] = useState<[number, number]>([0, 3000]);
  
  // Get filter options
  const { brands, fuelTypes, transmissions, loading: optionsLoading } = useFilterOptions();
  
  // Get cars based on filters
  const { cars, loading: carsLoading } = useCarsData({
    selectedBrand,
    selectedFuel,
    selectedTransmission,
    yearRange
  });

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "" ? null : e.target.value;
    setSelectedBrand(value);
  };
  
  const handleFuelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "" ? null : e.target.value;
    setSelectedFuel(value);
  };
  
  const handleTransmissionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "" ? null : e.target.value;
    setSelectedTransmission(value);
  };
  
  const handleYearMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = parseInt(e.target.value) || 0;
    setYearRange([min, yearRange[1]]);
  };
  
  const handleYearMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = parseInt(e.target.value) || 3000;
    setYearRange([yearRange[0], max]);
  };
  
  const resetFilters = () => {
    setSelectedBrand(null);
    setSelectedFuel(null);
    setSelectedTransmission(null);
    setYearRange([0, 3000]);
  };

  return {
    cars,
    loading: optionsLoading || carsLoading,
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
  };
};
