
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
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className={`grid ${isMobile ? 'grid-cols-2 gap-6' : 'grid-cols-4 gap-10'}`}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-stone-800 mb-2">{stat.number}</p>
              <p className="text-sm md:text-base text-stone-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
