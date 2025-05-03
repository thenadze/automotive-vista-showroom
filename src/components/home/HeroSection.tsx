
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
    <section className="relative py-28 md:py-40 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          {/* Contenu textuel à gauche */}
          <div className="md:w-1/2 md:pr-8 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Explorez la Route Devant<br />
              avec {companyInfo?.name || 'Automotive'}
            </h1>
            <p className="text-lg max-w-xl mb-8 text-gray-600">
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
          
          {/* Image à droite */}
          <div className="md:w-1/2">
            <img 
              src="/lovable-uploads/6b2f82b9-958e-418e-90f6-6781f0cbada0.png" 
              alt="Automotive showcase" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
