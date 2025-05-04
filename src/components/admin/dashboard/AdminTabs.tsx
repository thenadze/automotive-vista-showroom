
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BrandsTab from "./BrandsTab";
import CarsTab from "./CarsTab";
import { CarBrand, FuelType, TransmissionType, Car } from "@/types";

interface AdminTabsProps {
  brands: CarBrand[];
  fuelTypes: FuelType[];
  transmissions: TransmissionType[];
  cars: Car[];
  loading: boolean;
  onBrandsChange: () => Promise<any>;
  onCarsChange: () => Promise<any>;
}

const AdminTabs: React.FC<AdminTabsProps> = ({
  brands,
  fuelTypes,
  transmissions,
  cars,
  loading,
  onBrandsChange,
  onCarsChange
}) => {
  return (
    <Tabs defaultValue="cars" className="space-y-4">
      <TabsList>
        <TabsTrigger value="cars">Voitures</TabsTrigger>
        <TabsTrigger value="brands">Marques</TabsTrigger>
      </TabsList>
      
      {/* Onglet Voitures */}
      <TabsContent value="cars">
        <CarsTab 
          cars={cars}
          brands={brands}
          fuelTypes={fuelTypes}
          transmissions={transmissions}
          onCarsChange={onCarsChange}
        />
      </TabsContent>
      
      {/* Onglet Marques */}
      <TabsContent value="brands">
        <BrandsTab 
          brands={brands} 
          loading={loading} 
          onBrandsChange={onBrandsChange} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;
