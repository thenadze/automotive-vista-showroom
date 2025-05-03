
import React from "react";
import { FilterResetButton } from "./FilterResetButton";

interface FiltersSectionProps {
  brands: string[];
  fuelTypes: string[];
  transmissions: string[];
  selectedBrand: string | null;
  selectedFuel: string | null;
  selectedTransmission: string | null;
  yearRange: [number, number];
  handleBrandChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFuelChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleTransmissionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleYearMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleYearMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetFilters: () => void;
}

export const FiltersSection: React.FC<FiltersSectionProps> = ({
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
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Filtres</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Marque</label>
          <select 
            className="w-full p-2 border rounded-md"
            value={selectedBrand || ""}
            onChange={handleBrandChange}
          >
            <option value="">Toutes les marques</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block mb-1 text-sm font-medium">Carburant</label>
          <select 
            className="w-full p-2 border rounded-md"
            value={selectedFuel || ""}
            onChange={handleFuelChange}
          >
            <option value="">Tous les carburants</option>
            {fuelTypes.map(fuel => (
              <option key={fuel} value={fuel}>{fuel}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block mb-1 text-sm font-medium">Transmission</label>
          <select 
            className="w-full p-2 border rounded-md"
            value={selectedTransmission || ""}
            onChange={handleTransmissionChange}
          >
            <option value="">Toutes les transmissions</option>
            {transmissions.map(trans => (
              <option key={trans} value={trans}>{trans}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block mb-1 text-sm font-medium">Année</label>
          <div className="flex gap-2">
            <input 
              type="number" 
              placeholder="Min"
              className="w-full p-2 border rounded-md"
              value={yearRange[0] === 0 ? "" : yearRange[0]}
              onChange={handleYearMinChange}
            />
            <span className="self-center">-</span>
            <input 
              type="number" 
              placeholder="Max"
              className="w-full p-2 border rounded-md"
              value={yearRange[1] === 3000 ? "" : yearRange[1]}
              onChange={handleYearMaxChange}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-right">
        <FilterResetButton onClick={resetFilters} />
      </div>
    </div>
  );
};
