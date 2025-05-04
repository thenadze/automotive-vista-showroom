
import React, { useEffect, useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { CarFormValues } from "./formSchema";
import { supabase } from "@/integrations/supabase/client";
import { CarBrand } from "@/types";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface YearAndBrandFieldsProps {
  form: UseFormReturn<CarFormValues>;
  loading: boolean;
}

const YearAndBrandFields: React.FC<YearAndBrandFieldsProps> = ({ form, loading }) => {
  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [brandsLoading, setBrandsLoading] = useState(true);

  // Charger les marques depuis la base de données
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setBrandsLoading(true);
        const { data, error } = await supabase
          .from("car_brands")
          .select("*")
          .order('name');
        
        if (error) throw error;
        setBrands(data || []);
      } catch (error) {
        console.error("Erreur lors du chargement des marques:", error);
      } finally {
        setBrandsLoading(false);
      }
    };

    fetchBrands();
  }, []);

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
      
      {/* Marque (maintenant un Select) */}
      <FormField
        control={form.control}
        name="brand_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Marque</FormLabel>
            <FormControl>
              <Select 
                disabled={loading || brandsLoading} 
                value={field.value} 
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez une marque" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={String(brand.id)}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default YearAndBrandFields;
