
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CarBrand, FuelType, TransmissionType, Car } from "@/types";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminTabs } from "@/components/admin/dashboard";

const AdminPage = () => {
  const { isAdmin, loading: authLoading } = useAdminAuth();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
  const [transmissions, setTransmissions] = useState<TransmissionType[]>([]);
  const [cars, setCars] = useState<Car[]>([]);

  // Initialiser les données au chargement
  useEffect(() => {
    if (isAdmin) {
      Promise.all([
        fetchBrands(),
        fetchFuelTypes(),
        fetchTransmissionTypes(),
        fetchCars()
      ]);
    }
  }, [isAdmin]);

  // Récupérer les marques
  const fetchBrands = async () => {
    try {
      // @ts-ignore
      const { data, error } = await supabase.from("car_brands").select("*").order('name');
      if (error) throw error;
      setBrands(data || []);
      return data;
    } catch (error) {
      console.error("Erreur lors du chargement des marques:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les marques.",
        variant: "destructive",
      });
    }
  };
  
  // Récupérer les types de carburant
  const fetchFuelTypes = async () => {
    try {
      // @ts-ignore
      const { data, error } = await supabase.from("fuel_types").select("*").order('name');
      if (error) throw error;
      setFuelTypes(data || []);
      return data;
    } catch (error) {
      console.error("Erreur lors du chargement des types de carburant:", error);
    }
  };
  
  // Récupérer les types de transmission
  const fetchTransmissionTypes = async () => {
    try {
      // @ts-ignore
      const { data, error } = await supabase.from("transmission_types").select("*").order('name');
      if (error) throw error;
      setTransmissions(data || []);
      return data;
    } catch (error) {
      console.error("Erreur lors du chargement des types de transmission:", error);
    }
  };
  
  // Récupérer les voitures
  const fetchCars = async () => {
    try {
      // @ts-ignore
      const { data, error } = await supabase.from("cars").select("*").order('created_at', { ascending: false });
      if (error) throw error;
      setCars(data || []);
      return data;
    } catch (error) {
      console.error("Erreur lors du chargement des voitures:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les voitures.",
        variant: "destructive",
      });
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Redirection gérée par useAdminAuth
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Panneau d'administration</h1>
      
      <AdminTabs
        brands={brands}
        fuelTypes={fuelTypes}
        transmissions={transmissions}
        cars={cars}
        loading={loading}
        onBrandsChange={fetchBrands}
        onCarsChange={fetchCars}
      />
    </div>
  );
};

export default AdminPage;
