
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CarWithDetails } from "@/types";

export const useCarFilters = () => {
  const [cars, setCars] = useState<CarWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedFuel, setSelectedFuel] = useState<string | null>(null);
  const [selectedTransmission, setSelectedTransmission] = useState<string | null>(null);
  const [yearRange, setYearRange] = useState<[number, number]>([0, 3000]);
  const [brands, setBrands] = useState<{id: string, name: string}[]>([]);
  const [fuelTypes, setFuelTypes] = useState<{id: string, name: string}[]>([]);
  const [transmissions, setTransmissions] = useState<string[]>([]);

  useEffect(() => {
    // Charge uniquement les marques et types de carburant utilisés dans les véhicules existants
    const fetchFilterOptions = async () => {
      try {
        // Récupérer toutes les voitures pour analyser leurs attributs
        const { data: carsData, error: carsError } = await supabase
          .from("cars")
          .select("brand_id, fuel_type_id, transmission_id");
        
        if (carsError) throw carsError;
        
        if (carsData) {
          // Extraire les IDs uniques de marques utilisées
          const uniqueBrandIds = Array.from(new Set(carsData.map(car => car.brand_id)));
          
          // Récupérer seulement les marques qui sont utilisées dans des voitures
          const { data: brandsData, error: brandsError } = await supabase
            .from('car_brands')
            .select('id, name')
            .in('id', uniqueBrandIds);
          
          if (brandsError) throw brandsError;
          
          if (brandsData) {
            // Trier les marques par ordre alphabétique
            const formattedBrands = brandsData
              .map(brand => ({
                id: brand.id.toString(),
                name: brand.name
              }))
              .sort((a, b) => a.name.localeCompare(b.name));
              
            setBrands(formattedBrands);
          }
          
          // Extraire les IDs uniques de types de carburant utilisés
          const uniqueFuelIds = Array.from(new Set(carsData.map(car => car.fuel_type_id)));
          
          // Récupérer seulement les types de carburant qui sont utilisés dans des voitures
          const { data: fuelTypesData, error: fuelTypesError } = await supabase
            .from('fuel_types')
            .select('id, name')
            .in('id', uniqueFuelIds);
          
          if (fuelTypesError) throw fuelTypesError;
          
          if (fuelTypesData) {
            // Trier les types de carburant par ordre alphabétique
            const formattedFuelTypes = fuelTypesData
              .map(fuel => ({
                id: fuel.id.toString(),
                name: fuel.name
              }))
              .sort((a, b) => a.name.localeCompare(b.name));
              
            setFuelTypes(formattedFuelTypes);
          }
          
          // Extraire les transmissions uniques
          const uniqueTransmissions = Array.from(new Set(carsData.map(car => car.transmission_id)));
          setTransmissions(uniqueTransmissions.sort());
        }
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };
    
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      
      try {
        // @ts-ignore - Ignorer l'erreur de typage pour le nom de table
        let query = supabase
          .from("cars")
          .select(`
            *,
            car_photos (*)
          `);
        
        // Apply filters
        if (selectedBrand !== null) {
          query = query.eq('brand_id', selectedBrand);
        }
        
        if (selectedFuel !== null) {
          query = query.eq('fuel_type_id', selectedFuel);
        }
        
        if (selectedTransmission !== null) {
          query = query.eq('transmission_id', selectedTransmission);
        }
        
        if (yearRange[0] > 0) {
          query = query.gte('year', yearRange[0]);
        }
        
        if (yearRange[1] < 3000) {
          query = query.lte('year', yearRange[1]);
        }
        
        const { data: carsData, error } = await query;
        
        if (error) {
          console.error("Error fetching cars:", error);
          setLoading(false);
          return;
        }
        
        if (carsData) {
          console.log("Cars data:", carsData);
          
          // Convert data to match CarWithDetails interface
          const carsWithDetails: CarWithDetails[] = carsData.map(car => {
            return {
              ...car,
              photos: car.car_photos || []
            };
          });
          
          setCars(carsWithDetails);
        }
      } catch (err) {
        console.error("Error in fetchCars:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCars();
  }, [selectedBrand, selectedFuel, selectedTransmission, yearRange]);

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
  };
};
