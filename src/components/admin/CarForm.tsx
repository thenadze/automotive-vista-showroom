
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PhotoUploader from "./PhotoUploader";
import { CarBrand, FuelType, TransmissionType, Car } from "@/types";

// Schema de validation pour le formulaire
const carFormSchema = z.object({
  year: z.coerce
    .number()
    .min(1900, "L'année doit être supérieure à 1900")
    .max(new Date().getFullYear() + 1, `L'année doit être au maximum ${new Date().getFullYear() + 1}`),
  brand_id: z.coerce.number({
    required_error: "Veuillez sélectionner une marque",
  }),
  model: z.string().min(1, "Le modèle est requis"),
  fuel_type_id: z.coerce.number({
    required_error: "Veuillez sélectionner un type de carburant",
  }),
  transmission_id: z.coerce.number({
    required_error: "Veuillez sélectionner un type de boîte de vitesse",
  }),
});

// Type définissant un type de carburant avec le nombre d'annonces
interface FuelTypeWithCount extends FuelType {
  count?: number;
}

type CarFormProps = {
  car?: Car; // Pour l'édition d'une voiture existante
  onSuccess?: () => void;
};

/**
 * Composant de formulaire pour l'ajout ou la modification d'une voiture
 */
const CarForm: React.FC<CarFormProps> = ({ car, onSuccess }) => {
  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [fuelTypes, setFuelTypes] = useState<FuelTypeWithCount[]>([]);
  const [transmissions, setTransmissions] = useState<TransmissionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [currentPhotos, setCurrentPhotos] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isEditMode = !!car;

  // Définition des types de carburant avec le nombre d'annonces
  const predefinedFuelTypes: FuelTypeWithCount[] = [
    { id: 1, name: "Essence", count: 17501 },
    { id: 2, name: "Diesel", count: 12844 },
    { id: 3, name: "Hybride", count: 1006 },
    { id: 4, name: "Électrique", count: 1793 },
    { id: 5, name: "GPL", count: 63 },
    { id: 6, name: "Gaz naturel (CNG)", count: 2 },
    { id: 7, name: "Autre", count: 26 },
  ];

  // Initialisation du formulaire
  const form = useForm<z.infer<typeof carFormSchema>>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      year: car?.year || new Date().getFullYear(),
      brand_id: car?.brand_id || undefined,
      model: car?.model || "",
      fuel_type_id: car?.fuel_type_id || undefined,
      transmission_id: car?.transmission_id || undefined,
    },
  });

  // Charger les données nécessaires au formulaire (marques, types de carburant, etc.)
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
        
        // Charger les types de boîte de vitesse
        const { data: transmissionsData, error: transmissionsError } = await supabase
          .from("transmission_types")
          .select("*")
          .order("name");
          
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

  // Gérer l'ajout/suppression de photos
  const handlePhotoChange = (newPhotos: File[]) => {
    setPhotos(newPhotos);
  };

  // Gestion de la soumission du formulaire
  const onSubmit = async (values: z.infer<typeof carFormSchema>) => {
    try {
      setLoading(true);
      
      let carId = car?.id;
      
      if (isEditMode && carId) {
        // Mise à jour d'une voiture existante
        const { error } = await supabase
          .from("cars")
          .update({
            year: values.year,
            brand_id: values.brand_id,
            model: values.model,
            fuel_type_id: values.fuel_type_id,
            transmission_id: values.transmission_id,
            updated_at: new Date().toISOString(),
          })
          .eq("id", carId);
          
        if (error) throw error;
      } else {
        // Création d'une nouvelle voiture
        const { data: newCar, error } = await supabase
          .from("cars")
          .insert({
            year: values.year,
            brand_id: values.brand_id,
            model: values.model,
            fuel_type_id: values.fuel_type_id,
            transmission_id: values.transmission_id,
          })
          .select()
          .single();
          
        if (error) throw error;
        carId = newCar.id;
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
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">
        {isEditMode ? "Modifier une voiture" : "Ajouter une nouvelle voiture"}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Année */}
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Année</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="2023"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Marque */}
            <FormField
              control={form.control}
              name="brand_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marque</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une marque" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id.toString()}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Modèle */}
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modèle</FormLabel>
                <FormControl>
                  <Input placeholder="Nom du modèle" {...field} disabled={loading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Type de carburant */}
            <FormField
              control={form.control}
              name="fuel_type_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de carburant</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fuelTypes.map((fuelType) => (
                        <SelectItem key={fuelType.id} value={fuelType.id.toString()}>
                          {fuelType.name} ({fuelType.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Type de transmission */}
            <FormField
              control={form.control}
              name="transmission_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de boîte de vitesse</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {transmissions.map((transmission) => (
                        <SelectItem key={transmission.id} value={transmission.id.toString()}>
                          {transmission.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Upload de photos */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Photos de la voiture</h3>
            <PhotoUploader 
              onChange={handlePhotoChange} 
              existingPhotos={currentPhotos}
              disabled={loading}
            />
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin")}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Enregistrement..." : isEditMode ? "Mettre à jour" : "Ajouter la voiture"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CarForm;
