
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Car, CarBrand, FuelType, TransmissionType, CarPhoto } from "@/types";
import { useToast } from "@/hooks/use-toast";

export const useCarFormData = (car?: Car) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
  const [transmissions, setTransmissions] = useState<TransmissionType[]>([]);
  const [currentPhotos, setCurrentPhotos] = useState<string[]>([]);
  const [photosToRemove, setPhotosToRemove] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les marques
        const { data: brandsData, error: brandsError } = await supabase
          .from("car_brands")
          .select("*")
          .order('name');
          
        if (brandsError) throw brandsError;
        setBrands(brandsData || []);
        
        // Récupérer les types de carburant
        const { data: fuelTypesData, error: fuelTypesError } = await supabase
          .from("fuel_types")
          .select("*")
          .order('name');
          
        if (fuelTypesError) throw fuelTypesError;
        setFuelTypes(fuelTypesData || []);
        
        // Récupérer les types de transmission
        const { data: transmissionsData, error: transmissionsError } = await supabase
          .from("transmission_types")
          .select("*")
          .order('name');
          
        if (transmissionsError) throw transmissionsError;
        setTransmissions(transmissionsData || []);
        
        // Si une voiture est fournie, récupérer ses photos
        if (car?.id) {
          const { data: photosData, error: photosError } = await supabase
            .from("car_photos")
            .select("*")
            .eq("car_id", car.id);
            
          if (photosError) throw photosError;
          
          if (photosData && photosData.length > 0) {
            const photoUrls = photosData
              .filter(photo => photo.photo_url && typeof photo.photo_url === 'string')
              .map(photo => photo.photo_url);
              
            setCurrentPhotos(photoUrls);
          }
        }
      } catch (error: any) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les données du formulaire",
          variant: "destructive",
        });
        console.error("Erreur lors du chargement des données du formulaire:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [car, toast]);

  const handleRemoveExistingPhoto = (photoUrl: string) => {
    setCurrentPhotos(prev => prev.filter(url => url !== photoUrl));
    setPhotosToRemove(prev => [...prev, photoUrl]);
  };

  return { 
    loading, 
    brands, 
    fuelTypes, 
    transmissions, 
    currentPhotos, 
    photosToRemove, 
    handleRemoveExistingPhoto 
  };
};
