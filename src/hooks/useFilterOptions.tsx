
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
  const [transmissions, setTransmissions] = useState<FilterOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer toutes les options de marque, carburant et transmission disponibles
    const fetchFilterOptions = async () => {
      try {
        // Récupérer toutes les marques disponibles (inchangé)
        const { data: brandsData, error: brandsError } = await supabase
          .from('car_brands')
          .select('id, name');
      
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
        
        // Récupérer tous les types de carburant de la table fuel_types
        const { data: fuelTypesData, error: fuelTypesError } = await supabase
          .from('fuel_types')
          .select('id, name');
      
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
        
        // Récupérer toutes les transmissions de la table transmission_types
        const { data: transmissionsData, error: transmissionsError } = await supabase
          .from('transmission_types')
          .select('id, name');
      
        if (transmissionsError) throw transmissionsError;
        
        if (transmissionsData) {
          // Trier les transmissions par ordre alphabétique
          const formattedTransmissions = transmissionsData
            .map(transmission => ({
              id: transmission.id.toString(),
              name: transmission.name
            }))
            .sort((a, b) => a.name.localeCompare(b.name));
            
          setTransmissions(formattedTransmissions);
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
