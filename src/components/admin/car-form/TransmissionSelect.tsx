
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { CarFormValues } from "./formSchema";

interface TransmissionSelectProps {
  form: UseFormReturn<CarFormValues>;
  loading: boolean;
}

const TransmissionSelect: React.FC<TransmissionSelectProps> = ({ 
  form, 
  loading 
}) => {
  const transmissions = [
    { id: "Automatique", name: "Automatique" },
    { id: "Manuelle", name: "Manuelle" },
    { id: "Semi-automatique", name: "Semi-automatique" },
    { id: "Double embrayage", name: "Double embrayage" }
  ];

  return (
    <FormField
      control={form.control}
      name="transmission_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Boîte de vitesse</FormLabel>
          <Select 
            disabled={loading} 
            value={field.value} 
            onValueChange={field.onChange}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {transmissions.map((transmission) => (
                <SelectItem key={transmission.id} value={transmission.id}>
                  {transmission.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TransmissionSelect;
