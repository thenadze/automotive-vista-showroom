
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CarWithDetails } from "@/types";

interface CarsFilterParams {
  selectedBrand: string | null;
  selectedFuel: string | null;
  selectedTransmission: string | null;
  yearRange: [number, number];
}

export const useCarsData = (filterParams: CarsFilterParams) => {
  const [cars, setCars] = useState<CarWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedBrand, selectedFuel, selectedTransmission, yearRange } = filterParams;

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

  return {
    cars,
    loading
  };
};
