
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const StatsSection = () => {
  const isMobile = useIsMobile();
  
  const stats = [
    {
      number: "10+",
      label: "Années d'Expérience"
    }, 
    {
      number: "1000+",
      label: "Clients Heureux"
    }, 
    {
      number: "200+",
      label: "Véhicules"
    }, 
    {
      number: "10+",
      label: "Emplacements"
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Notre Impact en Chiffres</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Découvrez pourquoi nous sommes le choix préféré pour la location de véhicules premium en France.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
