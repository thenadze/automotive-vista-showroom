
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
  return <section className="relative py-16 md:py-24 bg-stone-700">
      <div style={{
      backgroundImage: "url('/lovable-uploads/a56e06c3-0cca-4278-9b82-0cbce8c748b6.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundBlendMode: "overlay"
    }} className="absolute inset-0 bg-stone-600"></div>
      
      <div className="container mx-auto relative z-10 px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left column - Text content */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Explorez la Route Devant<br />
              avec {companyInfo?.name || 'Automotive'}
            </h1>
            <p className="text-lg max-w-xl mb-8 text-white opacity-90">
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
          
          {/* Right column - Car image */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img src="/lovable-uploads/92058d71-ddf1-4306-86a7-1e36e4609b8c.png" alt="Voitures alignées" className="w-full h-auto object-cover rounded-lg transform transition-transform hover:scale-105 duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default HeroSection;
