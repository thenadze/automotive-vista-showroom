
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { CarFormValues } from "./formSchema";

interface FuelTypeFieldProps {
  form: UseFormReturn<CarFormValues>;
  loading: boolean;
}

const FuelTypeField: React.FC<FuelTypeFieldProps> = ({ form, loading }) => {
  return (
    <FormField
      control={form.control}
      name="fuel_type_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Type de carburant</FormLabel>
          <FormControl>
            <Input placeholder="Type de carburant (ex: Diesel, Essence, Électrique)" {...field} disabled={loading} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FuelTypeField;
