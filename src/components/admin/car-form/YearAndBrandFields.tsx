
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { CarFormValues } from "./formSchema";

interface YearAndBrandFieldsProps {
  form: UseFormReturn<CarFormValues>;
  loading: boolean;
}

const YearAndBrandFields: React.FC<YearAndBrandFieldsProps> = ({ form, loading }) => {
  return (
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
                // Convertir la valeur en nombre lors du changement
                onChange={(e) => field.onChange(Number(e.target.value))}
                // S'assurer que la valeur est toujours un nombre
                value={field.value}
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
            <FormControl>
              <Input
                placeholder="Ex: Renault, Peugeot, etc."
                {...field}
                disabled={loading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default YearAndBrandFields;
