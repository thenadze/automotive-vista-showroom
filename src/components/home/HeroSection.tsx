
import React from "react";
import { Link } from "react-router-dom";
import { CompanyInfo } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  companyInfo: CompanyInfo | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ companyInfo }) => {
  return (
    <section 
      className="relative bg-cover bg-center py-28 md:py-40 text-white"
      style={{
        backgroundImage: "url('/lovable-uploads/a96a3654-991e-4b06-8faf-a04cdc864545.png')",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      
      <div className="container mx-auto relative z-10 px-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explorez la Route Devant<br />
            avec {companyInfo?.name || 'Automotive'}
          </h1>
          <p className="text-lg max-w-xl mb-8 opacity-90">
            Des véhicules sélectionnés avec soin, prêts à vous accompagner partout. Achetez l'esprit libre, roulez avec confiance.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="bg-stone-700 hover:bg-stone-800 text-white px-8 py-6 rounded-md text-lg font-medium"
              size="lg"
            >
              <Link to="/cars" className="flex items-center gap-2">
                Voir nos véhicules
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
