
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
          // Get brand info using brand_id
          supabase
            .from("car_brands")
            .select("*")
            .eq("id", carData.brand_id)
            .maybeSingle(),
          
          // Get fuel type info
          supabase
            .from("fuel_types")
            .select("*")
            .eq("id", carData.fuel_type_id)
            .maybeSingle(),
            
          // Get transmission info
          supabase
            .from("transmission_types")
            .select("*")
            .eq("name", carData.transmission_id)
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
          console.error("Error fetching brand or brand not found:", brandResult.error);
          // Create fallback brand object with proper typing
          brand = { 
            id: Number(carData.brand_id) || 0, 
            name: "Marque inconnue" 
          };
          
          // Try to get brand name by direct lookup if needed
          try {
            const { data: allBrands } = await supabase
              .from("car_brands")
              .select("*");
              
            if (allBrands && allBrands.length > 0) {
              const foundBrand = allBrands.find(b => String(b.id) === carData.brand_id);
              if (foundBrand) {
                brand = foundBrand;
              }
            }
          } catch (e) {
            console.error("Failed to fetch all brands as fallback:", e);
          }
        }
        
        let fuelType: FuelType | null = null;
        if (!fuelTypeResult.error && fuelTypeResult.data) {
          fuelType = fuelTypeResult.data;
        } else {
          console.error("Error fetching fuel type:", fuelTypeResult.error);
          fuelType = { 
            id: Number(carData.fuel_type_id) || 0,
            name: carData.fuel_type_id || "Type de carburant inconnu" 
          };
        }
        
        let transmission: TransmissionType | null = null;
        if (!transmissionResult.error && transmissionResult.data) {
          transmission = transmissionResult.data;
        } else {
          console.error("Error fetching transmission:", transmissionResult.error);
          transmission = { 
            id: 0,
            name: carData.transmission_id || "Transmission inconnue" 
          };
        }
        
        // Traitement spécifique pour les photos
        let photos: CarPhoto[] = [];
        if (photosResult.error) {
          console.error("Error fetching photos:", photosResult.error);
        } else {
          console.log("Photos fetched successfully:", photosResult.data);
          photos = photosResult.data || [];
          
          // Vérifions que chaque photo a une URL valide
          photos = photos.filter(photo => {
            const hasValidUrl = !!photo.photo_url && typeof photo.photo_url === 'string';
            if (!hasValidUrl) {
              console.warn("Found photo with invalid URL:", photo);
            }
            return hasValidUrl;
          });
          
          console.log("Filtered valid photos:", photos);
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
