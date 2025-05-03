
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
        <div className="flex flex-col items-center text-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4 text-white md:text-5xl">
              Explorez la Route Devant<br />
              avec {companyInfo?.name || 'Automotive'}
            </h1>
            <p className="text-lg mb-8 text-white opacity-90">
              Des véhicules sélectionnés avec soin, prêts à vous accompagner partout. Achetez l'esprit libre, roulez avec confiance.
            </p>
            
            <div className="flex justify-center">
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
    </section>;
};
export default HeroSection;
