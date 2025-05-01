
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { CarFormValues } from "./formSchema";
import { TransmissionType } from "@/types";

interface TransmissionSelectProps {
  form: UseFormReturn<CarFormValues>;
  transmissions: TransmissionType[];
  loading: boolean;
}

const TransmissionSelect: React.FC<TransmissionSelectProps> = ({ 
  form, 
  transmissions, 
  loading 
}) => {
  return (
    <FormField
      control={form.control}
      name="transmission_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Boîte de vitesse</FormLabel>
          <FormControl>
            <select
              className="w-full h-10 rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading}
              value={field.value?.toString() || ""}
              onChange={(e) => field.onChange(parseInt(e.target.value))}
            >
              <option value="">Sélectionner une boîte</option>
              {transmissions.map((transmission) => (
                <option key={transmission.id} value={transmission.id.toString()}>
                  {transmission.name}
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

export default TransmissionSelect;
