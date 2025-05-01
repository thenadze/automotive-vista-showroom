
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { CarFormValues } from "./formSchema";
import { FuelTypeWithCount } from "./fuelTypes";
import { TransmissionType } from "@/types";

interface FuelAndTransmissionFieldsProps {
  form: UseFormReturn<CarFormValues>;
  fuelTypes: FuelTypeWithCount[];
  transmissions: TransmissionType[];
  loading: boolean;
}

const FuelAndTransmissionFields: React.FC<FuelAndTransmissionFieldsProps> = ({ 
  form, 
  fuelTypes, 
  transmissions, 
  loading 
}) => {
  return (
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
                    {fuelType.name} {fuelType.count > 0 && `(${fuelType.count})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Type de transmission - maintenant simplifié à Automatique ou Manuelle */}
      <FormField
        control={form.control}
        name="transmission_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Boîte de vitesse</FormLabel>
            <Select
              disabled={loading}
              onValueChange={field.onChange}
              defaultValue={field.value?.toString()}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Automatique ou Manuelle" />
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
  );
};

export default FuelAndTransmissionFields;
