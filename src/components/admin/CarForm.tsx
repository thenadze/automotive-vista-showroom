
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
  const { fuelTypes, loading, currentPhotos } = useCarFormData(car);
  
  // Gestion de la soumission du formulaire
  const { handleSubmit, loading: submitting, setLoading } = useCarFormSubmit(car, onSuccess);
  
  // Initialisation du formulaire avec les valeurs par défaut
  const form = useForm<CarFormValues>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      year: car?.year || new Date().getFullYear(),
      brand_id: car?.brand_id || undefined,
      model: car?.model || "",
      fuel_type_id: car?.fuel_type_id || undefined,
      transmission_id: car?.transmission_id || undefined,
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <CarFormHeader isEditMode={isEditMode} />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <YearAndBrandFields form={form} loading={loading || submitting} />
          
          <ModelField form={form} loading={loading || submitting} />
          
          <FuelAndTransmissionFields 
            form={form} 
            fuelTypes={fuelTypes}
            loading={loading || submitting} 
          />
          
          {/* Upload de photos */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Photos de la voiture</h3>
            <PhotoUploader 
              onChange={handlePhotoChange} 
              existingPhotos={currentPhotos}
              disabled={loading || submitting}
            />
          </div>
          
          <FormActions loading={loading || submitting} isEditMode={isEditMode} />
        </form>
      </Form>
    </div>
  );
};

export default CarForm;
