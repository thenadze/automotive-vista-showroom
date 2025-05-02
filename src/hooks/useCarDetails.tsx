
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CarWithDetails, CarPhoto } from "@/types";

export const useCarDetails = (id: string | undefined) => {
  const [car, setCar] = useState<CarWithDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        console.log("Fetching car details for ID:", id);
        
        // Get car details
        const { data: carData, error } = await supabase
          .from("cars")
          .select(`
            *,
            brand:car_brands(*),
            fuel_type:fuel_types(*),
            transmission:transmission_types(*)
          `)
          .eq("id", id)
          .single();
          
        if (error) {
          console.error("Error fetching car:", error);
          throw error;
        }
        
        console.log("Car data retrieved:", carData);
        
        // Get photos separately with a dedicated query
        const { data: photosData, error: photosError } = await supabase
          .from("car_photos")
          .select("*")
          .eq("car_id", id);
          
        if (photosError) {
          console.error("Error fetching photos:", photosError);
        }
        
        console.log("Photos data retrieved:", photosData);
        
        // Adapter les données pour correspondre à l'interface CarWithDetails
        const carWithDetails: CarWithDetails = {
          ...carData,
          photos: photosData || []
        };
        
        console.log("Final car with details:", carWithDetails);
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
