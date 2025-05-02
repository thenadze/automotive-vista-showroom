
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CarWithDetails, CarPhoto, CarBrand, FuelType, TransmissionType } from "@/types";

export const useCarDetails = (id: string | undefined) => {
  const [car, setCar] = useState<CarWithDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        console.log("Fetching car details for ID:", id);
        
        // Get car details - using separate queries instead of relationships
        const { data: carData, error: carError } = await supabase
          .from("cars")
          .select("*")
          .eq("id", id)
          .single();
          
        if (carError) {
          console.error("Error fetching car:", carError);
          throw carError;
        }
        
        console.log("Car data retrieved:", carData);
        
        // Fetch related data separately
        const [brandResult, fuelTypeResult, transmissionResult, photosResult] = await Promise.all([
          // Get brand - Use the direct name if it's a string, otherwise try to parse as integer
          supabase
            .from("car_brands")
            .select("*")
            .eq("id", isNaN(parseInt(carData.brand_id)) ? carData.brand_id : parseInt(carData.brand_id))
            .maybeSingle(),
          
          // Get fuel type - Use the direct name if it's a string, otherwise try to parse as integer
          supabase
            .from("fuel_types")
            .select("*")
            .eq("id", isNaN(parseInt(carData.fuel_type_id)) ? carData.fuel_type_id : parseInt(carData.fuel_type_id))
            .maybeSingle(),
            
          // Get transmission - Use the direct name if it's a string, otherwise try to parse as integer
          supabase
            .from("transmission_types")
            .select("*")
            .eq("id", isNaN(parseInt(carData.transmission_id)) ? carData.transmission_id : parseInt(carData.transmission_id))
            .maybeSingle(),
          
          // Get photos
          supabase
            .from("car_photos")
            .select("*")
            .eq("car_id", id)
        ]);
        
        // Handle possible errors and fallbacks for related data
        let brand: CarBrand | null = null;
        if (!brandResult.error && brandResult.data) {
          brand = brandResult.data;
        } else {
          console.error("Error fetching brand:", brandResult.error);
          // Create fallback brand object with proper typing
          brand = { 
            id: isNaN(parseInt(carData.brand_id)) ? 0 : parseInt(carData.brand_id), 
            name: carData.brand_id 
          };
        }
        
        let fuelType: FuelType | null = null;
        if (!fuelTypeResult.error && fuelTypeResult.data) {
          fuelType = fuelTypeResult.data;
        } else {
          console.error("Error fetching fuel type:", fuelTypeResult.error);
          fuelType = { 
            id: isNaN(parseInt(carData.fuel_type_id)) ? 0 : parseInt(carData.fuel_type_id),
            name: carData.fuel_type_id 
          };
        }
        
        let transmission: TransmissionType | null = null;
        if (!transmissionResult.error && transmissionResult.data) {
          transmission = transmissionResult.data;
        } else {
          console.error("Error fetching transmission:", transmissionResult.error);
          transmission = { 
            id: isNaN(parseInt(carData.transmission_id)) ? 0 : parseInt(carData.transmission_id),
            name: carData.transmission_id 
          };
        }
        
        const photos = photosResult.error ? [] : (photosResult.data || []);
        if (photosResult.error) {
          console.error("Error fetching photos:", photosResult.error);
        }
        
        // Construct final car object with all details
        const carWithDetails: CarWithDetails = {
          ...carData,
          brand,
          fuel_type: fuelType,
          transmission,
          photos
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
