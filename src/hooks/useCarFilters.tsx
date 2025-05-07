
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
    // Load filter options from cars table and related tables
    const fetchFilterOptions = async () => {
      try {
        // Fetch brands from car_brands table
        const { data: brandsData, error: brandsError } = await supabase
          .from('car_brands')
          .select('id, name');
        
        if (brandsError) throw brandsError;
        
        if (brandsData) {
          // Map brands to format { id, name }
          const formattedBrands = brandsData.map(brand => ({
            id: brand.id.toString(),
            name: brand.name
          }));
          setBrands(formattedBrands);
        }

        // Fetch fuel types from fuel_types table
        const { data: fuelTypesData, error: fuelTypesError } = await supabase
          .from('fuel_types')
          .select('id, name');
        
        if (fuelTypesError) throw fuelTypesError;
        
        if (fuelTypesData) {
          // Map fuel types to format { id, name }
          const formattedFuelTypes = fuelTypesData.map(fuel => ({
            id: fuel.id.toString(),
            name: fuel.name
          }));
          setFuelTypes(formattedFuelTypes);
        }
        
        // Fetch unique transmissions from cars
        const { data: carsData, error: carsError } = await supabase
          .from("cars")
          .select("transmission_id");
        
        if (carsError) throw carsError;
        
        if (carsData) {
          // Extract unique transmissions
          const uniqueTransmissions = Array.from(new Set(carsData.map(car => car.transmission_id)));
          setTransmissions(uniqueTransmissions);
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
