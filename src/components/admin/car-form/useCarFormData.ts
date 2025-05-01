
import { useState, useEffect } from "react";
import { Car, CarBrand, TransmissionType } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FuelTypeWithCount, predefinedFuelTypes } from "./fuelTypes";

export const useCarFormData = (car?: Car) => {
  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [fuelTypes, setFuelTypes] = useState<FuelTypeWithCount[]>([]);
  const [transmissions, setTransmissions] = useState<TransmissionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPhotos, setCurrentPhotos] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Charger les marques
        const { data: brandsData, error: brandsError } = await supabase
          .from("car_brands")
          .select("*")
          .order("name");
          
        if (brandsError) throw brandsError;
        setBrands(brandsData || []);
        
        // Utiliser les types de carburant prédéfinis au lieu de les charger
        setFuelTypes(predefinedFuelTypes);
        
        // Charger les types de boîte de vitesse (maintenant simplifiés à Automatique et Manuelle)
        const { data: transmissionsData, error: transmissionsError } = await supabase
          .from("transmission_types")
          .select("*")
          .order("id");
          
        if (transmissionsError) throw transmissionsError;
        setTransmissions(transmissionsData || []);
        
        // Si en mode édition, charger les photos existantes
        if (car?.id) {
          const { data: photosData, error: photosError } = await supabase
            .from("car_photos")
            .select("photo_url")
            .eq("car_id", car.id);
            
          if (photosError) throw photosError;
          if (photosData) {
            setCurrentPhotos(photosData.map((photo) => photo.photo_url));
          }
        }
      } catch (error: any) {
        console.error("Erreur lors du chargement des données:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données nécessaires au formulaire.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [car, toast]);

  return {
    brands,
    fuelTypes,
    transmissions,
    loading,
    currentPhotos
  };
};
