import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CarWithDetails } from "@/types";

const CarDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<CarWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Get car details
        // @ts-ignore - Ignorer l'erreur de typage pour le nom de table
        const { data: carData, error } = await supabase
          .from("cars")
          .select(`
            *,
            car_photos (*)
          `)
          .eq("id", id)
          .single();
          
        if (error) throw error;
        
        // Adapter les données pour correspondre à l'interface CarWithDetails
        const carWithDetails: CarWithDetails = {
          ...carData,
          brand_id: carData.brand_id,
          transmission_id: carData.transmission_id,
          photos: carData.car_photos || []
        };
        
        setCar(carWithDetails);
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCarDetails();
  }, [id]);

  const handlePrevImage = () => {
    if (!car?.photos) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? car.photos!.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    if (!car?.photos) return;
    setCurrentImageIndex((prev) => 
      prev === car.photos!.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-medium mb-2">Véhicule non trouvé</h2>
        <p className="text-gray-600 mb-4">Le véhicule que vous recherchez n'existe pas ou a été supprimé.</p>
        <Link
          to="/cars"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition duration-300"
        >
          Retour au catalogue
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <Link to="/cars" className="text-blue-600 hover:underline flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour au catalogue
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Gallery */}
        <div className="relative h-96">
          {car.photos && car.photos.length > 0 ? (
            <>
              <img
                src={car.photos[currentImageIndex]?.photo_url || "/placeholder.svg"}
                alt={`${car.brand_id} ${car.model}`}
                className="w-full h-full object-cover"
              />
              
              {car.photos.length > 1 && (
                <>
                  <button
                    onClick={() => {
                      if (!car?.photos) return;
                      setCurrentImageIndex((prev) => 
                        prev === 0 ? car.photos!.length - 1 : prev - 1
                      );
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white p-2 rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      if (!car?.photos) return;
                      setCurrentImageIndex((prev) => 
                        prev === car.photos!.length - 1 ? 0 : prev + 1
                      );
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white p-2 rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
              
              {/* Thumbnail navigation */}
              {car.photos.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {car.photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        currentImageIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'
                      }`}
                    ></button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Aucune photo disponible</p>
            </div>
          )}
        </div>
        
        {/* Car Details */}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">
            {car.brand_id} {car.model} ({car.year})
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Caractéristiques</h2>
              
              <table className="w-full mb-6">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Marque</td>
                    <td className="py-2">{car.brand_id}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Modèle</td>
                    <td className="py-2">{car.model}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Année</td>
                    <td className="py-2">{car.year}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Carburant</td>
                    <td className="py-2">{car.fuel_type?.name}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Transmission</td>
                    <td className="py-2">{car.transmission_id}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Contactez-nous</h2>
              <p className="mb-4">
                Vous êtes intéressé par ce véhicule ? N'hésitez pas à nous contacter pour plus d'informations ou pour organiser un essai routier.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>(123) 456-7890</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>contact@automotive.com</span>
                </div>
              </div>
              
              <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition duration-300">
                Demander plus d'infos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
