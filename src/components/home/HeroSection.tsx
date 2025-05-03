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
            <p className="text-lg mb-8 opacity-90 text-slate-50 font-normal px-0">Fondée en 2024 à Bezons, Automotive propose une sélection de véhicules soigneusement choisis, adaptés à tous les styles de vie et à tous les usages. Dès les premiers échanges, l’entreprise accompagne chaque client avec attention : conseils personnalisés, transparence, et préparation rigoureuse des véhicules avant la vente. 

Automotive incarne une nouvelle vision de la vente automobile, fondée sur la proximité, la confiance et l’exigence de qualité.</p>
            
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