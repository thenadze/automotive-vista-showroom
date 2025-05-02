
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { CarFormValues } from "./formSchema";
import FuelTypeField from "./FuelTypeField";
import TransmissionSelect from "./TransmissionSelect";

interface FuelAndTransmissionFieldsProps {
  form: UseFormReturn<CarFormValues>;
  loading: boolean;
}

const FuelAndTransmissionFields: React.FC<FuelAndTransmissionFieldsProps> = ({ 
  form, 
  loading 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Type de carburant */}
      <FuelTypeField 
        form={form} 
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
