
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CarBrand, FuelType, TransmissionType, Car, CompanyInfo } from "@/types";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminTabs } from "@/components/admin/dashboard";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  console.log("AdminPage component rendering");
  const { isAdmin, loading: authLoading, isInitialized } = useAdminAuth();
  console.log("AdminPage auth status:", { isAdmin, authLoading, isInitialized });
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
  const [transmissions, setTransmissions] = useState<TransmissionType[]>([]);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [cars, setCars] = useState<Car[]>([]);

  // Initialiser les données au chargement
  useEffect(() => {
    console.log("AdminPage useEffect - isAdmin:", isAdmin, "isInitialized:", isInitialized);
    if (isAdmin) {
      console.log("AdminPage: Loading admin data");
      Promise.all([
        fetchBrands(),
        fetchFuelTypes(),
        fetchTransmissionTypes(),
        fetchCompanyInfo(),
        fetchCars()
      ]);
    } else if (isInitialized && !isAdmin && !authLoading) {
      console.log("AdminPage: User is not admin, redirecting to login");
      navigate("/login", { state: { redirectTo: "/admin" }, replace: true });
    }
  }, [isAdmin, isInitialized, authLoading, navigate]);

  // Récupérer les marques
  const fetchBrands = async () => {
    try {
      // @ts-ignore
      const { data, error } = await supabase.from("car_brands").select("*").order('name');
      if (error) throw error;
      console.log("Brands loaded:", data);
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
      console.log("Fuel types loaded:", data);
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
      console.log("Transmission types loaded:", data);
      setTransmissions(data || []);
      return data;
    } catch (error) {
      console.error("Erreur lors du chargement des types de transmission:", error);
    }
  };
  
  // Récupérer les informations de l'entreprise
  const fetchCompanyInfo = async () => {
    try {
      // @ts-ignore
      const { data, error } = await supabase.from("company_info").select("*").single();
      if (error && error.code !== 'PGRST116') throw error; // Ignorer l'erreur si aucun résultat
      console.log("Company info loaded:", data);
      setCompanyInfo(data || null);
      return data;
    } catch (error) {
      console.error("Erreur lors du chargement des informations de l'entreprise:", error);
    }
  };
  
  // Récupérer les voitures
  const fetchCars = async () => {
    try {
      // @ts-ignore
      const { data, error } = await supabase.from("cars").select("*").order('created_at', { ascending: false });
      if (error) throw error;
      console.log("Cars loaded:", data);
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

  console.log("AdminPage rendering UI - authLoading:", authLoading, "isAdmin:", isAdmin);
  
  if (authLoading) {
    console.log("AdminPage showing loading spinner");
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAdmin && isInitialized) {
    console.log("AdminPage: User is not admin, rendering null");
    return null; // Redirection gérée par useAdminAuth
  }

  console.log("AdminPage: Rendering admin dashboard");
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Panneau d'administration</h1>
      
      <AdminTabs
        brands={brands}
        fuelTypes={fuelTypes}
        transmissions={transmissions}
        cars={cars}
        companyInfo={companyInfo}
        loading={loading}
        onBrandsChange={fetchBrands}
        onCompanyInfoChange={fetchCompanyInfo}
        onCarsChange={fetchCars}
      />
    </div>
  );
};

export default AdminPage;
