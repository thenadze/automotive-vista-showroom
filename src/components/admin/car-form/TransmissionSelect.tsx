
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
  return (
    <FormField
      control={form.control}
      name="transmission"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Boîte de vitesse</FormLabel>
          <FormControl>
            <Input 
              placeholder="Ex: Automatique, Manuelle, etc." 
              {...field} 
              disabled={loading} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TransmissionSelect;
