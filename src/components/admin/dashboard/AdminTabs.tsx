
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BrandsTab from "./BrandsTab";
import CarsTab from "./CarsTab";
import CompanyTab from "./CompanyTab";
import { CarBrand, FuelType, TransmissionType, Car, CompanyInfo } from "@/types";

interface AdminTabsProps {
  brands: CarBrand[];
  fuelTypes: FuelType[];
  transmissions: TransmissionType[];
  cars: Car[];
  companyInfo: CompanyInfo | null;
  loading: boolean;
  onBrandsChange: () => Promise<any>;
  onCompanyInfoChange: () => Promise<any>;
  onCarsChange: () => Promise<any>;
}

const AdminTabs: React.FC<AdminTabsProps> = ({
  brands,
  fuelTypes,
  transmissions,
  cars,
  companyInfo,
  loading,
  onBrandsChange,
  onCompanyInfoChange,
  onCarsChange
}) => {
  return (
    <Tabs defaultValue="cars" className="space-y-4">
      <TabsList>
        <TabsTrigger value="cars">Voitures</TabsTrigger>
        <TabsTrigger value="brands">Marques</TabsTrigger>
        <TabsTrigger value="company">Entreprise</TabsTrigger>
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
      
      {/* Onglet Informations de l'entreprise */}
      <TabsContent value="company">
        <CompanyTab 
          companyInfo={companyInfo} 
          loading={loading} 
          onCompanyInfoChange={onCompanyInfoChange} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;
