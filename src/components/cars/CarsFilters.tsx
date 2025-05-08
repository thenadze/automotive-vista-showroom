
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CarsFiltersProps {
  brands: { id: string, name: string }[];
  fuelTypes: { id: string, name: string }[];
  transmissions: { id: string, name: string }[];
  selectedBrand: string | null;
  selectedFuel: string | null;
  selectedTransmission: string | null;
  yearRange: [number, number];
  handleBrandChange: (value: string) => void;
  handleFuelChange: (value: string) => void;
  handleTransmissionChange: (value: string) => void;
  handleYearMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleYearMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetFilters: () => void;
}

const CarsFilters: React.FC<CarsFiltersProps> = ({
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
  resetFilters,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Filtres</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Marque</label>
          <Select 
            value={selectedBrand || "all"} 
            onValueChange={handleBrandChange}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Toutes les marques" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les marques</SelectItem>
              {brands && brands.length > 0 ? (
                brands.map(brand => (
                  <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>
                ))
              ) : (
                <SelectItem value="no-brands" disabled>Aucune marque disponible</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block mb-1 text-sm font-medium">Carburant</label>
          <Select 
            value={selectedFuel || "all"} 
            onValueChange={handleFuelChange}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Tous les carburants" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les carburants</SelectItem>
              {fuelTypes && fuelTypes.length > 0 ? (
                fuelTypes.map(fuel => (
                  <SelectItem key={fuel.id} value={fuel.id}>{fuel.name}</SelectItem>
                ))
              ) : (
                <SelectItem value="no-fuels" disabled>Aucun carburant disponible</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block mb-1 text-sm font-medium">Transmission</label>
          <Select 
            value={selectedTransmission || "all"} 
            onValueChange={handleTransmissionChange}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Toutes les transmissions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les transmissions</SelectItem>
              {transmissions && transmissions.length > 0 ? (
                transmissions.map(trans => (
                  <SelectItem key={trans.id} value={trans.id}>{trans.name}</SelectItem>
                ))
              ) : (
                <SelectItem value="no-transmissions" disabled>Aucune transmission disponible</SelectItem>
              )}
            </SelectContent>
          </Select>
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
        <button 
          onClick={resetFilters}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded transition duration-300"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
};

export default CarsFilters;
