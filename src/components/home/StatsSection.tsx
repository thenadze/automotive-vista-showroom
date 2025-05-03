
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
    <section className="py-10 md:py-16 bg-stone-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-stone-800 mb-2">{stat.number}</div>
              <div className="text-sm md:text-base text-stone-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
