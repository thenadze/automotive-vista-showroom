
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { CarFormValues } from "./formSchema";
import { FuelTypeWithCount } from "./fuelTypes";
import FuelTypeSelect from "./FuelTypeSelect";
import TransmissionSelect from "./TransmissionSelect";

interface FuelAndTransmissionFieldsProps {
  form: UseFormReturn<CarFormValues>;
  fuelTypes: FuelTypeWithCount[];
  loading: boolean;
}

const FuelAndTransmissionFields: React.FC<FuelAndTransmissionFieldsProps> = ({ 
  form, 
  fuelTypes, 
  loading 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Type de carburant */}
      <FuelTypeSelect 
        form={form} 
        fuelTypes={fuelTypes} 
        loading={loading} 
      />
      
      {/* Type de transmission */}
      <TransmissionSelect 
        form={form} 
        loading={loading} 
      />
    </div>
  );
};

export default FuelAndTransmissionFields;
