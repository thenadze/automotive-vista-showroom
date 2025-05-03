
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Car } from "@/types";
import { CarFormValues } from "./formSchema";

export const useCarFormSubmit = (car?: Car, photosToRemove: string[] = [], onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = !!car;

  const handleSubmit = async (values: CarFormValues, photos: File[]) => {
    try {
      setLoading(true);
      
      // Vérifier d'abord que l'utilisateur est connecté
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        throw new Error("Vous devez être connecté pour effectuer cette action.");
      }
      
      let carId = car?.id;
      
      // Assurons-nous que les valeurs sont correctes pour la base de données
      const formData = {
        year: values.year,
        brand_id: values.brand_id,
        model: values.model,
        fuel_type_id: values.fuel_type_id,
        transmission_id: values.transmission_id,
        daily_price: values.daily_price || 0,
        mileage: values.mileage || 0, // Ajout du kilométrage
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
        // Ajout de la date de création pour les nouvelles voitures
        const newCarData = { 
          ...formData, 
          created_at: new Date().toISOString() 
        };

        const { data: newCar, error } = await supabase
          .from("cars")
          .insert(newCarData)
          .select()
          .single();
          
        if (error) throw error;
        if (newCar) {
          carId = newCar.id;
        } else {
          throw new Error("Erreur lors de la création de la voiture");
        }
      }

      // Suppression des photos à retirer
      if (photosToRemove.length > 0 && carId) {
        console.log(`Suppression de ${photosToRemove.length} photos pour la voiture ${carId}`);
        
        for (const photoUrl of photosToRemove) {
          // Supprimer l'entrée de la base de données
          const { error: deleteError } = await supabase
            .from("car_photos")
            .delete()
            .eq("car_id", carId)
            .eq("photo_url", photoUrl);
            
          if (deleteError) {
            console.error("Erreur lors de la suppression de la photo en base de données:", deleteError);
          }
          
          // Extraire le chemin du fichier depuis l'URL
          try {
            const url = new URL(photoUrl);
            const pathMatch = url.pathname.match(/\/storage\/v1\/object\/public\/car_photos\/(.+)/);
            
            if (pathMatch && pathMatch[1]) {
              const filePath = pathMatch[1];
              console.log(`Tentative de suppression du fichier: ${filePath}`);
              
              // Supprimer le fichier du stockage
              const { error: storageError } = await supabase.storage
                .from("car_photos")
                .remove([filePath]);
                
              if (storageError) {
                console.error("Erreur lors de la suppression du fichier de stockage:", storageError);
              } else {
                console.log(`Fichier supprimé avec succès: ${filePath}`);
              }
            }
          } catch (error) {
            console.error("Erreur lors de l'extraction du chemin de fichier:", error);
          }
        }
      }
      
      // Traitement des photos
      if (photos.length > 0 && carId) {
        console.log(`Traitement de ${photos.length} photos pour la voiture ${carId}`);
        
        // Upload des nouvelles photos dans le bucket Supabase Storage
        for (let i = 0; i < photos.length; i++) {
          const photo = photos[i];
          const fileExt = photo.name.split('.').pop();
          const fileName = `${carId}/${Date.now()}.${fileExt}`;
          
          console.log(`Upload de la photo ${i+1}/${photos.length}: ${fileName}`);
          
          // Upload de la photo dans le bucket Supabase Storage
          const { error: uploadError, data } = await supabase.storage
            .from("car_photos")
            .upload(fileName, photo);
            
          if (uploadError) {
            console.error("Erreur lors de l'upload de la photo:", uploadError);
            continue; // Continuer avec les autres photos même si une échoue
          }
          
          console.log("Photo uploadée avec succès:", fileName);
          
          // Récupérer l'URL publique de la photo
          const { data: publicURL } = supabase.storage
            .from("car_photos")
            .getPublicUrl(fileName);
            
          if (publicURL) {
            console.log("URL publique récupérée:", publicURL.publicUrl);
            
            // Enregistrer la référence à la photo dans la base de données
            const photoData = {
              car_id: carId,
              photo_url: publicURL.publicUrl,
              is_primary: i === 0 && !isEditMode, // La première photo est principale pour les nouvelles voitures
            };
            
            const { error: photoError } = await supabase
              .from("car_photos")
              .insert(photoData);
              
            if (photoError) {
              console.error("Erreur lors de l'enregistrement de la référence photo:", photoError);
            } else {
              console.log("Référence photo enregistrée avec succès");
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
