
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Car } from "@/types";
import PhotoUploader from "./photo-uploader";
import { carFormSchema, CarFormValues } from "./car-form/formSchema";
import YearAndBrandFields from "./car-form/YearAndBrandFields";
import ModelField from "./car-form/ModelField";
import FuelAndTransmissionFields from "./car-form/FuelAndTransmissionFields";
import CarFormHeader from "./car-form/CarFormHeader";
import FormActions from "./car-form/FormActions";
import { useCarFormData } from "./car-form/useCarFormData";
import { useCarFormSubmit } from "./car-form/useCarFormSubmit";
import PriceField from "./car-form/PriceField";
import MileageField from "./car-form/MileageField";
import { Textarea } from "@/components/ui/textarea";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

type CarFormProps = {
  car?: Car;
  onSuccess?: () => void;
};

/**
 * Composant de formulaire pour l'ajout ou la modification d'une voiture
 */
const CarForm: React.FC<CarFormProps> = ({ car, onSuccess }) => {
  const [photos, setPhotos] = useState<File[]>([]);
  const isEditMode = !!car;
  
  // Récupération des données du formulaire (marques, types de carburant, etc.)
  const { 
    loading: dataLoading, 
    currentPhotos, 
    photosToRemove, 
    handleRemoveExistingPhoto 
  } = useCarFormData(car);
  
  // Gestion de la soumission du formulaire
  const { handleSubmit, loading: submitting, setLoading } = useCarFormSubmit(car, photosToRemove, onSuccess);
  
  // Initialisation du formulaire avec les valeurs par défaut
  const form = useForm<CarFormValues>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      year: car?.year || new Date().getFullYear(),
      brand_id: car?.brand_id || "",
      model: car?.model || "",
      fuel_type_id: car?.fuel_type_id || "",
      transmission_id: car?.transmission_id || "",
      daily_price: car?.daily_price || 0,
      mileage: car?.mileage || 0,
      description: car?.description || "",
    },
  });
  
  // Gérer l'ajout/suppression de photos
  const handlePhotoChange = (newPhotos: File[]) => {
    setPhotos(newPhotos);
  };
  
  // Gestion de la soumission du formulaire
  const onSubmit = async (values: CarFormValues) => {
    setLoading(true);
    await handleSubmit(values, photos);
  };

  const loading = dataLoading || submitting;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <CarFormHeader isEditMode={isEditMode} />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <YearAndBrandFields form={form} loading={loading} />
          
          <ModelField form={form} loading={loading} />
          
          <FuelAndTransmissionFields 
            form={form} 
            loading={loading} 
          />
          
          {/* Ajout du champ prix et kilométrage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <PriceField form={form} loading={loading} />
            <MileageField form={form} loading={loading} />
          </div>

          {/* Ajout du champ description */}
          <div className="mt-6">
            <FormItem>
              <FormLabel>Description du véhicule</FormLabel>
              <FormControl>
                <Textarea
                  {...form.register("description")}
                  placeholder="Décrivez ce véhicule en détail..."
                  className="min-h-[150px] resize-y"
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
          
          {/* Upload de photos */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Photos de la voiture</h3>
            <PhotoUploader 
              onChange={handlePhotoChange} 
              existingPhotos={currentPhotos}
              onRemoveExisting={handleRemoveExistingPhoto}
              disabled={loading}
            />
          </div>
          
          <FormActions loading={loading} isEditMode={isEditMode} />
        </form>
      </Form>
    </div>
  );
};

export default CarForm;
