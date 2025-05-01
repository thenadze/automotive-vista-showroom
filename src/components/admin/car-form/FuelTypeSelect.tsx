
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { CarFormValues } from "./formSchema";
import { FuelTypeWithCount } from "./fuelTypes";

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
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading}
              value={field.value?.toString() || ""}
              onChange={(e) => field.onChange(parseInt(e.target.value))}
            >
              <option value="">Sélectionner un type</option>
              {fuelTypes.map((fuelType) => (
                <option key={fuelType.id} value={fuelType.id.toString()}>
                  {fuelType.name} {fuelType.count > 0 && `(${fuelType.count})`}
                </option>
              ))}
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FuelTypeSelect;
