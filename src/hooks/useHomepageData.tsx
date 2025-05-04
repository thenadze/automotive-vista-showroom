
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CompanyInfo, CarWithDetails, CarPhoto, CarBrand } from "@/types";
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
        const [companyResult, carsResult, brandsResult] = await Promise.all([
          supabase.from("company_info").select("*").single(),
          supabase.from("cars")
            .select("*")
            .order('display_order', { ascending: true })
            .limit(6),
          supabase.from("car_brands").select("*")
        ]);

        // Handle company info
        if (companyResult.error) {
          console.error("Company info error:", companyResult.error);
          setCompanyInfo(null);
        } else {
          setCompanyInfo(companyResult.data);
        }
        
        // Récupérer les marques pour pouvoir les associer aux voitures
        let brandsMap: Record<number, CarBrand> = {};
        if (!brandsResult.error && brandsResult.data) {
          brandsResult.data.forEach(brand => {
            brandsMap[brand.id] = brand;
          });
          console.log("Brands map created:", brandsMap);
        } else {
          console.error("Error fetching brands:", brandsResult.error);
        }
        
        // Handle featured cars
        if (carsResult.error) {
          console.error("Cars fetch error:", carsResult.error);
          setFeaturedCars([]);
        } else {
          console.log("Cars fetched successfully:", carsResult.data);
          
          // Récupérer les photos pour chaque voiture et associer la marque correcte
          const carsWithDetails = await Promise.all(
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
              
              // Récupérer la marque de la voiture depuis le mapping des marques
              let brand: CarBrand | undefined;
              if (car.brand_id) {
                // Essayer de convertir l'ID en nombre pour le lookup
                const brandId = parseInt(car.brand_id);
                if (!isNaN(brandId) && brandsMap[brandId]) {
                  brand = brandsMap[brandId];
                  console.log(`Found brand for car ${car.id}:`, brand);
                } else {
                  // Si la marque n'est pas trouvée mais que brand_id est une chaîne
                  // On utilise cette chaîne comme nom de marque
                  brand = {
                    id: brandId || 0,
                    name: typeof car.brand_id === 'string' ? car.brand_id : "-"
                  };
                  console.log(`Created fallback brand for car ${car.id}:`, brand);
                }
              } else {
                brand = { id: 0, name: "-" };
                console.log(`No brand_id for car ${car.id}, using default`);
              }
              
              console.log(`Photos for car ${car.id}:`, photoData);
              return {
                ...car,
                brand,
                photos: photoData || []
              };
            })
          );
          
          console.log("Cars with details:", carsWithDetails);
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
