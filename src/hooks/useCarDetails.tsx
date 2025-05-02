
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CarWithDetails } from "@/types";

export const useCarDetails = (id: string | undefined) => {
  const [car, setCar] = useState<CarWithDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Get car details
        // @ts-ignore - Ignorer l'erreur de typage pour le nom de table
        const { data: carData, error } = await supabase
          .from("cars")
          .select(`
            *,
            car_photos (*)
          `)
          .eq("id", id)
          .single();
          
        if (error) throw error;
        
        // Adapter les données pour correspondre à l'interface CarWithDetails
        const carWithDetails: CarWithDetails = {
          ...carData,
          brand_id: carData.brand_id,
          fuel_type_id: carData.fuel_type_id,
          transmission_id: carData.transmission_id,
          photos: carData.car_photos || []
        };
        
        setCar(carWithDetails);
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCarDetails();
  }, [id]);

  return { car, loading };
};
