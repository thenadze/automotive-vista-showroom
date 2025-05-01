
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CompanyInfo, CarWithDetails } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const HomePage = () => {
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
        
        // Fetch company info
        const companyResult = await supabase
          .from("company_info")
          .select("*")
          .single();
        
        if (companyResult.error) {
          console.error("Company info error:", companyResult.error);
          setCompanyInfo(null);
        } else {
          setCompanyInfo(companyResult.data);
        }
        
        // Fetch featured cars (limit to 3)
        const carsResult = await supabase
          .from("cars")
          .select(`
            *,
            car_photos (*)
          `)
          .limit(3);

        if (carsResult.error) {
          console.error("Cars fetch error:", carsResult.error);
          setFeaturedCars([]);
        } else {
          // Fetch additional car details
          const brandsResult = await supabase.from("car_brands").select("*");
          const fuelTypesResult = await supabase.from("fuel_types").select("*");
          const transmissionsResult = await supabase.from("transmission_types").select("*");
          
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

  if (loading) {
    return (
      <div className="space-y-10">
        <Skeleton className="h-64 w-full rounded-lg" />
        <div className="space-y-6">
          <Skeleton className="h-8 w-1/3 mx-auto rounded" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-100 rounded-lg overflow-hidden">
                <Skeleton className="w-full h-56" />
                <div className="p-4 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-red-500 mb-4 text-xl">Erreur de chargement</div>
        <p className="text-gray-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Rafraîchir la page
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16 rounded-lg mb-12">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bienvenue chez {companyInfo?.name || 'Automotive'}</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            {companyInfo?.description || 'Votre partenaire de confiance pour trouver la voiture de vos rêves.'}
          </p>
          <Link
            to="/cars"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-md text-lg font-medium transition duration-300"
          >
            Voir nos véhicules
          </Link>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Véhicules à la une</h2>
        
        {featuredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCars.map(car => {
              const primaryPhoto = car.photos?.find(p => p.is_primary);
              const firstPhoto = car.photos?.[0];
              const photoUrl = primaryPhoto?.photo_url || firstPhoto?.photo_url || "/placeholder.svg";
              
              return (
                <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={photoUrl}
                    alt={`${car.brand?.name || ''} ${car.model}`}
                    className="w-full h-56 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {car.brand?.name || 'Marque'} {car.model} ({car.year})
                    </h3>
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <span>{car.fuel_type?.name || 'N/A'}</span>
                      <span>{car.transmission?.name || 'N/A'}</span>
                    </div>
                    <Link
                      to={`/cars/${car.id}`}
                      className="block text-center bg-gray-800 hover:bg-gray-900 text-white py-2 rounded transition duration-300"
                    >
                      Voir les détails
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">Aucun véhicule disponible pour le moment.</p>
        )}
        
        <div className="text-center mt-8">
          <Link
            to="/cars"
            className="inline-block border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white py-2 px-6 rounded transition duration-300"
          >
            Voir tous nos véhicules
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Nos Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Essai Routier</h3>
            <p className="text-gray-600">Essayez votre voiture préférée avant de l'acheter pour vous assurer qu'elle vous convient parfaitement.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Garantie Complète</h3>
            <p className="text-gray-600">Nous offrons une garantie étendue sur tous nos véhicules pour votre tranquillité d'esprit.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Financement</h3>
            <p className="text-gray-600">Des options de financement flexibles pour vous aider à acheter la voiture de vos rêves.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-12 rounded-lg">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Prêt à trouver votre prochaine voiture ?</h2>
          <p className="text-xl mb-6">Parcourez notre catalogue de véhicules dès maintenant.</p>
          <Link
            to="/cars"
            className="bg-white text-blue-600 hover:bg-gray-100 py-3 px-8 rounded-md text-lg font-medium transition duration-300"
          >
            Explorer le catalogue
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
