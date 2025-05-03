import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CarWithDetails } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

const CarsPage = () => {
  const [cars, setCars] = useState<CarWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedFuel, setSelectedFuel] = useState<string | null>(null);
  const [selectedTransmission, setSelectedTransmission] = useState<string | null>(null);
  const [yearRange, setYearRange] = useState<[number, number]>([0, 3000]);
  const [brands, setBrands] = useState<string[]>([]);
  const [fuelTypes, setFuelTypes] = useState<string[]>([]);
  const [transmissions, setTransmissions] = useState<string[]>([]);

  useEffect(() => {
    // Charger les données pour les filtres depuis les voitures existantes
    const fetchFilterOptions = async () => {
      try {
        // @ts-ignore - Ignorer l'erreur de typage pour le nom de table
        const { data, error } = await supabase
          .from("cars")
          .select(`
            brand_id,
            fuel_type_id,
            transmission_id
          `);
        
        if (error) throw error;
        
        if (data) {
          // Extraire les marques uniques
          const uniqueBrands = Array.from(new Set(data.map(car => car.brand_id)));
          setBrands(uniqueBrands);
          
          // Extraire les types de carburant uniques
          const uniqueFuelTypes = Array.from(new Set(data.map(car => car.fuel_type_id)));
          setFuelTypes(uniqueFuelTypes);
          
          // Extraire les transmissions uniques
          const uniqueTransmissions = Array.from(new Set(data.map(car => car.transmission_id)));
          setTransmissions(uniqueTransmissions);
        }
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };
    
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      
      try {
        // @ts-ignore - Ignorer l'erreur de typage pour le nom de table
        let query = supabase
          .from("cars")
          .select(`
            *,
            car_photos (*)
          `);
        
        // Apply filters
        if (selectedBrand !== null) {
          query = query.eq('brand_id', selectedBrand);
        }
        
        if (selectedFuel !== null) {
          query = query.eq('fuel_type_id', selectedFuel);
        }
        
        if (selectedTransmission !== null) {
          query = query.eq('transmission_id', selectedTransmission);
        }
        
        if (yearRange[0] > 0) {
          query = query.gte('year', yearRange[0]);
        }
        
        if (yearRange[1] < 3000) {
          query = query.lte('year', yearRange[1]);
        }
        
        const { data: carsData, error } = await query;
        
        if (error) {
          console.error("Error fetching cars:", error);
          setLoading(false);
          return;
        }
        
        if (carsData) {
          console.log("Cars data:", carsData);
          
          // Convertir les données pour correspondre à l'interface CarWithDetails
          const carsWithDetails: CarWithDetails[] = carsData.map(car => {
            return {
              ...car,
              photos: car.car_photos || []
            };
          });
          
          setCars(carsWithDetails);
        }
      } catch (err) {
        console.error("Error in fetchCars:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCars();
  }, [selectedBrand, selectedFuel, selectedTransmission, yearRange]);

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "" ? null : e.target.value;
    setSelectedBrand(value);
  };
  
  const handleFuelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "" ? null : e.target.value;
    setSelectedFuel(value);
  };
  
  const handleTransmissionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "" ? null : e.target.value;
    setSelectedTransmission(value);
  };
  
  const handleYearMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = parseInt(e.target.value) || 0;
    setYearRange([min, yearRange[1]]);
  };
  
  const handleYearMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = parseInt(e.target.value) || 3000;
    setYearRange([yearRange[0], max]);
  };
  
  const resetFilters = () => {
    setSelectedBrand(null);
    setSelectedFuel(null);
    setSelectedTransmission(null);
    setYearRange([0, 3000]);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Catalogue des véhicules</h1>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Filtres</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Marque</label>
            <select 
              className="w-full p-2 border rounded-md"
              value={selectedBrand || ""}
              onChange={handleBrandChange}
            >
              <option value="">Toutes les marques</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium">Carburant</label>
            <select 
              className="w-full p-2 border rounded-md"
              value={selectedFuel || ""}
              onChange={handleFuelChange}
            >
              <option value="">Tous les carburants</option>
              {fuelTypes.map(fuel => (
                <option key={fuel} value={fuel}>{fuel}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium">Transmission</label>
            <select 
              className="w-full p-2 border rounded-md"
              value={selectedTransmission || ""}
              onChange={handleTransmissionChange}
            >
              <option value="">Toutes les transmissions</option>
              {transmissions.map(trans => (
                <option key={trans} value={trans}>{trans}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium">Année</label>
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder="Min"
                className="w-full p-2 border rounded-md"
                value={yearRange[0] === 0 ? "" : yearRange[0]}
                onChange={handleYearMinChange}
              />
              <span className="self-center">-</span>
              <input 
                type="number" 
                placeholder="Max"
                className="w-full p-2 border rounded-md"
                value={yearRange[1] === 3000 ? "" : yearRange[1]}
                onChange={handleYearMaxChange}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-right">
          <button 
            onClick={resetFilters}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded transition duration-300"
          >
            Réinitialiser
          </button>
        </div>
      </div>
      
      {/* Car Listings */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          {cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map(car => {
                console.log("Car photos:", car.photos);
                const primaryPhoto = car.photos?.find(p => p.is_primary);
                const firstPhoto = car.photos?.[0];
                const photoUrl = primaryPhoto?.photo_url || firstPhoto?.photo_url || "/placeholder.svg";
                
                const formattedPrice = car.daily_price 
                  ? new Intl.NumberFormat('fr-FR', { 
                      style: 'currency', 
                      currency: 'EUR',
                      maximumFractionDigits: 0 
                    }).format(car.daily_price)
                  : "Prix sur demande";
                
                const formattedMileage = car.mileage !== undefined && car.mileage !== null
                  ? new Intl.NumberFormat('fr-FR').format(car.mileage) + " km"
                  : "0 km";
                
                return (
                  <Card key={car.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                    <div className="w-full" style={{ width: "515px", height: "506px", maxWidth: "100%" }}>
                      <img 
                        src={photoUrl} 
                        alt={`${car.brand_id} ${car.model}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.log("Image error:", e);
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-semibold mb-2">
                        {car.brand_id} {car.model} ({car.year})
                      </h3>
                      <div className="flex justify-between text-sm text-gray-600 mb-3">
                        <span>{car.fuel_type_id || 'Essence'}</span>
                        <span>{formattedMileage}</span>
                      </div>
                      <div className="flex items-end justify-between mb-3">
                        <div>
                          <span className="block text-stone-500 text-xs">Prix</span>
                          <span className="text-xl font-bold text-stone-700">
                            {car.daily_price ? formattedPrice : "Prix sur demande"}
                          </span>
                        </div>
                        
                        <Link
                          to={`/cars/${car.id}`}
                          className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded transition duration-300"
                        >
                          Détails
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <h3 className="text-xl font-medium mb-2">Aucun véhicule trouvé</h3>
              <p className="text-gray-600 mb-4">Aucun véhicule ne correspond à vos critères de recherche.</p>
              <button 
                onClick={resetFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition duration-300"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CarsPage;
