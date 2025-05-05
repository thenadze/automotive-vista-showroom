
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CompanyInfo } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroSectionProps {
  companyInfo: CompanyInfo | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  companyInfo
}) => {
  const [expanded, setExpanded] = useState(false);
  const isMobile = useIsMobile();

  const fullText = "Fondée en 2023 à Bezons, Automotive propose une sélection de véhicules soigneusement choisis, adaptés à tous les styles de vie et à tous les usages. Dès les premiers échanges, l'entreprise accompagne chaque client avec attention : conseils personnalisés, transparence, et préparation rigoureuse des véhicules avant la vente. \n\nAutomotive incarne une nouvelle vision de la vente automobile, fondée sur la proximité, la confiance et l'exigence de qualité.";
  
  // Version encore plus courte pour mobile
  const mobileShortenedText = "Fondée en 2023 à Bezons, Automotive propose une sélection de véhicules soigneusement choisis.";
  
  // Version pour desktop
  const desktopShortenedText = fullText.split('\n\n')[0];
  
  // Sélectionne la version appropriée selon le dispositif
  const shortenedText = isMobile ? mobileShortenedText : desktopShortenedText;

  const toggleText = () => {
    setExpanded(!expanded);
  };

  return <section className="relative py-12 md:py-24 bg-black">
      <div className="container mx-auto relative z-10 px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <div className={`${isMobile ? 'w-full' : 'max-w-5xl'}`}>
            <h1 className="text-3xl font-bold mb-4 text-white md:text-5xl">
              Explorez la Route Devant<br />
              avec {companyInfo?.name || 'Automotive'}
            </h1>
            <div className="text-base sm:text-lg mb-2 opacity-90 text-slate-50 font-normal px-0 mx-auto">
              {expanded ? fullText : shortenedText}
            </div>
            
            <Button 
              variant="link" 
              className="text-slate-50 hover:text-slate-200 mb-6"
              onClick={toggleText}
            >
              {expanded ? "Voir moins" : "Lire plus"}
            </Button>
            
            <div className="flex justify-center">
              <Button asChild className="bg-stone-700 hover:bg-stone-800 text-white px-5 py-4 sm:px-8 sm:py-6 rounded-md text-base sm:text-lg font-medium" size="lg">
                <Link to="/cars" className="flex items-center gap-2">
                  Voir nos véhicules
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default HeroSection;
