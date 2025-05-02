
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { CarFormValues } from "./formSchema";
import { TransmissionType } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
            <Select
              disabled={loading}
              value={field.value?.toString() || ""}
              onValueChange={(value) => field.onChange(parseInt(value))}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Sélectionner une boîte" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {transmissions.map((transmission) => (
                  <SelectItem 
                    key={transmission.id} 
                    value={transmission.id.toString()}
                  >
                    {transmission.name}
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

export default TransmissionSelect;
