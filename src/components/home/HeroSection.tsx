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
  return <section className="relative py-16 md:py-24 bg-gradient-to-r from-stone-700 to-stone-800">
      <div className="container mx-auto relative z-10 px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left column - Text content */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold mb-4 text-white px-0 md:text-5xl">
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
              
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;