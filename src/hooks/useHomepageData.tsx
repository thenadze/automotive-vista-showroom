
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CompanyInfo, CarWithDetails } from "@/types";
import { useToast } from "@/hooks/use-toast";

export const useHomepageData = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [featuredCars, setFeaturedCars] = useState<CarWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    console.log("HomePage useEffect running");
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all data in parallel for better performance
        const [companyResult, carsResult, brandsResult, fuelTypesResult, transmissionsResult] = await Promise.all([
          supabase.from("company_info").select("*").single(),
          supabase.from("cars").select(`*, car_photos (*)`).limit(3),
          supabase.from("car_brands").select("*"),
          supabase.from("fuel_types").select("*"),
          supabase.from("transmission_types").select("*")
        ]);

        // Handle company info
        if (companyResult.error) {
          console.error("Company info error:", companyResult.error);
          setCompanyInfo(null);
        } else {
          setCompanyInfo(companyResult.data);
        }
        
        // Handle featured cars
        if (carsResult.error) {
          console.error("Cars fetch error:", carsResult.error);
          setFeaturedCars([]);
        } else {
          const carsWithDetails = carsResult.data.map((car: any) => ({
            ...car,
            brand: brandsResult.data?.find(b => b.id === car.brand_id) || null,
            fuel_type: fuelTypesResult.data?.find(f => f.id === car.fuel_type_id) || null,
            transmission: transmissionsResult.data?.find(t => t.id === car.transmission_id) || null,
            photos: car.car_photos || []
          }));
          
          setFeaturedCars(carsWithDetails);
        }
      } catch (err: any) {
        console.error("HomePage error:", err);
        setError("Une erreur est survenue lors du chargement des données.");
        toast({
          title: "Erreur",
          description: "Impossible de charger le contenu de la page d'accueil",
          variant: "destructive",
        });
      } finally {
        console.log("Setting loading to false");
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  return { companyInfo, featuredCars, loading, error };
};
