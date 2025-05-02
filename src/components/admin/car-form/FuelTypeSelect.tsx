
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { CarFormValues } from "./formSchema";
import { FuelTypeWithCount } from "./fuelTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FuelTypeSelectProps {
  form: UseFormReturn<CarFormValues>;
  fuelTypes: FuelTypeWithCount[];
  loading: boolean;
}

const FuelTypeSelect: React.FC<FuelTypeSelectProps> = ({ 
  form, 
  fuelTypes, 
  loading 
}) => {
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
              value={field.value?.toString() || ""}
              onValueChange={(value) => field.onChange(parseInt(value))}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {fuelTypes.map((fuelType) => (
                  <SelectItem 
                    key={fuelType.id} 
                    value={fuelType.id.toString()}
                  >
                    {fuelType.name} {fuelType.count > 0 && `(${fuelType.count})`}
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

export default FuelTypeSelect;
