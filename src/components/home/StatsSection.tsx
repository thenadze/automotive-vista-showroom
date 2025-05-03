
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
    <section className="py-12 bg-stone-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className={`grid ${isMobile ? 'grid-cols-2 gap-6' : 'grid-cols-4 gap-8'}`}>
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-bold text-stone-800 mb-2">{stat.number}</span>
              <span className="text-sm sm:text-base text-stone-600 text-center">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
