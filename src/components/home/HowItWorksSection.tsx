
import React from "react";
import { Search, Car, Clock, Calendar } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Search className="w-12 h-12 text-stone-700" />,
      title: "Choisissez Votre Destination",
      description: "Indiquez-nous où et quand vous avez besoin d'un véhicule."
    },
    {
      icon: <Car className="w-12 h-12 text-stone-700" />,
      title: "Sélectionnez Votre Véhicule",
      description: "Choisissez parmi notre large gamme de véhicules de qualité."
    },
    {
      icon: <Calendar className="w-12 h-12 text-stone-700" />,
      title: "Réservez en Quelques Clics",
      description: "Processus de réservation simple et rapide en ligne."
    },
    {
      icon: <Clock className="w-12 h-12 text-stone-700" />,
      title: "Récupérez & Profitez",
      description: "Récupérez votre véhicule et commencez votre aventure."
    }
  ];

  return (
    <section className="py-16 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6">
              <div className="mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-stone-800">{step.title}</h3>
              <p className="text-stone-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
