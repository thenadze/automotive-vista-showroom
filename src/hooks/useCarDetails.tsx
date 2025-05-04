
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
        
        // Amélioration: conversion correcte des IDs en nombre ou gestion des valeurs string
        const brandId = carData.brand_id ? parseInt(carData.brand_id) || 0 : 0;
        const fuelTypeId = carData.fuel_type_id ? parseInt(carData.fuel_type_id) || 0 : 0;
        
        // Fetch related data separately
        const [brandResult, fuelTypeResult, transmissionResult, photosResult] = await Promise.all([
          // Get brand info using brand_id
          supabase
            .from("car_brands")
            .select("*")
            .eq("id", brandId)
            .maybeSingle(),
          
          // Get fuel type info
          supabase
            .from("fuel_types")
            .select("*")
            .eq("id", fuelTypeId)
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
        
        // Amélioration de la gestion des marques
        let brand: CarBrand | null = null;
        
        if (!brandResult.error && brandResult.data) {
          brand = brandResult.data;
          console.log("Brand data found directly:", brand);
        } else {
          console.log("Brand not found by ID, trying fallback methods");
          
          // Essayer de récupérer directement la marque si c'est une chaîne qui existe déjà
          if (carData.brand_id && typeof carData.brand_id === "string") {
            // Créer un objet marque avec l'ID et le nom étant la valeur de brand_id
            brand = { 
              id: brandId || 0, 
              name: carData.brand_id 
            };
            console.log("Created brand from brand_id string:", brand);
          } else {
            // Essayer de récupérer toutes les marques pour voir s'il y en a une qui correspond
            try {
              const { data: allBrands } = await supabase
                .from("car_brands")
                .select("*");
                
              if (allBrands && allBrands.length > 0) {
                const foundBrand = allBrands.find(b => String(b.id) === carData.brand_id);
                if (foundBrand) {
                  brand = foundBrand;
                  console.log("Found brand in all brands:", brand);
                }
              }
            } catch (e) {
              console.error("Failed to fetch all brands as fallback:", e);
            }
            
            // Si aucune marque n'est trouvée, créer un objet vide
            if (!brand) {
              brand = { 
                id: 0, 
                name: "-" 
              };
              console.log("Using empty brand as last resort");
            }
          }
        }
        
        let fuelType: FuelType | null = null;
        if (!fuelTypeResult.error && fuelTypeResult.data) {
          fuelType = fuelTypeResult.data;
        } else {
          console.error("Error fetching fuel type:", fuelTypeResult.error);
          fuelType = { 
            id: fuelTypeId || 0,
            name: carData.fuel_type_id || "-" 
          };
        }
        
        let transmission: TransmissionType | null = null;
        if (!transmissionResult.error && transmissionResult.data) {
          transmission = transmissionResult.data;
        } else {
          console.error("Error fetching transmission:", transmissionResult.error);
          transmission = { 
            id: 0,
            name: carData.transmission_id || "-" 
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
