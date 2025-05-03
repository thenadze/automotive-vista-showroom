
import React from "react";

const StatsSection = () => {
  const stats = [
    { number: "10+", label: "Années d'Expérience" },
    { number: "1000+", label: "Clients Heureux" },
    { number: "200+", label: "Véhicules" },
    { number: "10+", label: "Emplacements" },
  ];

  return (
    <section className="py-8 bg-orange-50">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center p-4 text-center"
            >
              <span className="text-3xl font-bold text-orange-500 mb-2">{stat.number}</span>
              <span className="text-sm text-gray-700">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
