
import React from "react";
import { Link } from "react-router-dom";
import { CompanyInfo } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  companyInfo: CompanyInfo | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  companyInfo
}) => {
  return (
    <section 
      className="relative py-28 md:py-40 bg-cover bg-center"
      style={{ backgroundImage: "url('/lovable-uploads/849f0276-cedf-4986-a87c-5e780ebd9dec.png')" }}
    >
      {/* Overlay sombre pour améliorer la lisibilité du texte */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Contenu textuel */}
          <div className="md:w-1/2 md:pr-8 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Explorez la Route Devant<br />
              avec {companyInfo?.name || 'Automotive'}
            </h1>
            <p className="text-lg max-w-xl mb-8 text-gray-200">
              Des véhicules sélectionnés avec soin, prêts à vous accompagner partout. Achetez l'esprit libre, roulez avec confiance.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-stone-700 hover:bg-stone-800 text-white px-8 py-6 rounded-md text-lg font-medium" size="lg">
                <Link to="/cars" className="flex items-center gap-2">
                  Voir nos véhicules
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
