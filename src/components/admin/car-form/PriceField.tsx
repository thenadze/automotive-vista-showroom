
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { CarFormValues } from "./formSchema";

interface PriceFieldProps {
  form: UseFormReturn<CarFormValues>;
  loading: boolean;
}

const PriceField: React.FC<PriceFieldProps> = ({ form, loading }) => {
  return (
    <FormField
      control={form.control}
      name="daily_price"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Prix journalier (€)</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="50"
              disabled={loading}
              {...field}
              onChange={(e) => {
                const value = e.target.value === "" ? 0 : parseFloat(e.target.value);
                field.onChange(value);
              }}
              value={field.value || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PriceField;
