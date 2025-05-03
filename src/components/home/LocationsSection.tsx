
import React from "react";
import { Link } from "react-router-dom";

const LocationsSection = () => {
  const locations = [
    {
      name: "Paris",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      count: 15,
    },
    {
      name: "Lyon",
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
      count: 12,
    },
    {
      name: "Marseille",
      image: "https://images.unsplash.com/photo-1600690556171-3e1d0a91f7de",
      count: 8,
    },
    {
      name: "Bordeaux",
      image: "https://images.unsplash.com/photo-1589983846997-04788035ec69",
      count: 7,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Nos Emplacements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden group h-64">
              <img 
                src={location.image} 
                alt={location.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
                <h3 className="text-xl font-bold text-white mb-1">{location.name}</h3>
                <p className="text-sm text-white/80">{location.count} véhicules disponibles</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
