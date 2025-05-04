
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CompanyInfo, CarWithDetails, CarPhoto } from "@/types";
import { useToast } from "@/hooks/use-toast";

export const useHomepageData = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [featuredCars, setFeaturedCars] = useState<CarWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    console.log("HomePage useEffect running - fetching data");
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all data in parallel for better performance
        const [companyResult, carsResult] = await Promise.all([
          supabase.from("company_info").select("*").single(),
          supabase.from("cars")
            .select("*")
            .order('display_order', { ascending: true, nullsLast: true })
            .limit(6)
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
          console.log("Cars fetched successfully:", carsResult.data);
          
          // Récupérer les photos pour chaque voiture
          const carsWithPhotos = await Promise.all(
            carsResult.data.map(async (car: any) => {
              const { data: photoData, error: photoError } = await supabase
                .from("car_photos")
                .select("*")
                .eq("car_id", car.id);
              
              if (photoError) {
                console.error(`Error fetching photos for car ${car.id}:`, photoError);
                return {
                  ...car,
                  photos: []
                };
              }
              
              console.log(`Photos for car ${car.id}:`, photoData);
              return {
                ...car,
                photos: photoData || []
              };
            })
          );
          
          console.log("Cars with details:", carsWithPhotos);
          setFeaturedCars(carsWithPhotos);
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
