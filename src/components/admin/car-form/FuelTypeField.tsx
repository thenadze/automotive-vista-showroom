
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { CarFormValues } from "./formSchema";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { predefinedFuelTypes } from "./fuelTypes";

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
            <Select 
              disabled={loading} 
              value={field.value} 
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionnez un type de carburant" />
              </SelectTrigger>
              <SelectContent>
                {predefinedFuelTypes.map((fuelType) => (
                  <SelectItem key={fuelType.id} value={String(fuelType.id)}>
                    {fuelType.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FuelTypeField;
