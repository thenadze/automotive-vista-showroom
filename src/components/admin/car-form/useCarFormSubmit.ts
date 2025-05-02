
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Car } from "@/types";
import { CarFormValues } from "./formSchema";

export const useCarFormSubmit = (car?: Car, onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = !!car;

  const handleSubmit = async (values: CarFormValues, photos: File[]) => {
    try {
      setLoading(true);
      
      let carId = car?.id;
      
      // Assurons-nous que les valeurs sont correctes pour la base de données
      const formData = {
        year: values.year,
        brand_id: values.brand_id,
        model: values.model,
        fuel_type_id: values.fuel_type_id,
        transmission_id: values.transmission_id,
        updated_at: new Date().toISOString(),
      };
      
      if (isEditMode && carId) {
        // Mise à jour d'une voiture existante
        const { error } = await supabase
          .from("cars")
          .update(formData)
          .eq("id", carId);
          
        if (error) throw error;
      } else {
        // Création d'une nouvelle voiture
        const { data: newCar, error } = await supabase
          .from("cars")
          .insert(formData)
          .select()
          .single();
          
        if (error) throw error;
        if (newCar) {
          carId = newCar.id;
        } else {
          throw new Error("Erreur lors de la création de la voiture");
        }
      }
      
      // Traitement des photos
      if (photos.length > 0 && carId) {
        // Upload des nouvelles photos
        for (let i = 0; i < photos.length; i++) {
          const photo = photos[i];
          const fileExt = photo.name.split('.').pop();
          const fileName = `${carId}/${Date.now()}.${fileExt}`;
          
          // Upload de la photo dans le bucket Supabase Storage
          const { error: uploadError } = await supabase.storage
            .from("car_photos")
            .upload(fileName, photo);
            
          if (uploadError) {
            throw uploadError;
          }
          
          // Récupérer l'URL publique de la photo
          const { data: publicURL } = supabase.storage
            .from("car_photos")
            .getPublicUrl(fileName);
            
          if (publicURL) {
            // Enregistrer la référence à la photo dans la base de données
            const { error: photoError } = await supabase
              .from("car_photos")
              .insert({
                car_id: carId,
                photo_url: publicURL.publicUrl,
                is_primary: i === 0 && !isEditMode, // La première photo est principale pour les nouvelles voitures
              });
              
            if (photoError) {
              throw photoError;
            }
          }
        }
      }
      
      toast({
        title: isEditMode ? "Voiture mise à jour" : "Voiture ajoutée",
        description: `La voiture a été ${isEditMode ? "mise à jour" : "ajoutée"} avec succès.`,
      });
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/admin");
      }
    } catch (error: any) {
      console.error("Erreur lors de la sauvegarde de la voiture:", error);
      toast({
        title: "Erreur",
        description: error.message || `Une erreur s'est produite lors de la ${isEditMode ? "mise à jour" : "création"} de la voiture.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
    
    return loading;
  };

  return { handleSubmit, loading, setLoading };
};
