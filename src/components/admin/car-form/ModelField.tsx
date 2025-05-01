
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { CarFormValues } from "./formSchema";

interface ModelFieldProps {
  form: UseFormReturn<CarFormValues>;
  loading: boolean;
}

const ModelField: React.FC<ModelFieldProps> = ({ form, loading }) => {
  return (
    <FormField
      control={form.control}
      name="model"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Modèle</FormLabel>
          <FormControl>
            <Input placeholder="Nom du modèle" {...field} disabled={loading} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ModelField;
