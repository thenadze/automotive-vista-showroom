
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { CarFormValues } from "./formSchema";

interface MileageFieldProps {
  form: UseFormReturn<CarFormValues>;
  loading: boolean;
}

const MileageField: React.FC<MileageFieldProps> = ({ form, loading }) => {
  return (
    <FormField
      control={form.control}
      name="mileage"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Kilométrage (km)</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="10000"
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

export default MileageField;
