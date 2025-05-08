
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toNumberArray } from "@/utils/arrayUtils";

export interface FilterOption {
  id: string;
  name: string;
}

export const useFilterOptions = () => {
  const [brands, setBrands] = useState<FilterOption[]>([]);
  const [fuelTypes, setFuelTypes] = useState<FilterOption[]>([]);
  const [transmissions, setTransmissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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
            .in('id', toNumberArray(uniqueBrandIds));
          
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
            .in('id', toNumberArray(uniqueFuelIds));
          
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
      } finally {
        setLoading(false);
      }
    };
    
    fetchFilterOptions();
  }, []);

  return {
    brands,
    fuelTypes,
    transmissions,
    loading
  };
};
