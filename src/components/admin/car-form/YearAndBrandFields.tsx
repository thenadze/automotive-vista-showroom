
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { CarFormValues } from "./formSchema";
import { CarBrand } from "@/types";

interface YearAndBrandFieldsProps {
  form: UseFormReturn<CarFormValues>;
  brands: CarBrand[];
  loading: boolean;
}

const YearAndBrandFields: React.FC<YearAndBrandFieldsProps> = ({ form, brands, loading }) => {
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
            <Select
              disabled={loading}
              onValueChange={field.onChange}
              defaultValue={field.value?.toString()}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une marque" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id.toString()}>
                    {brand.name}
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

export default YearAndBrandFields;
