import React, { useState } from "react";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroTextProps {
  createMarkup: (htmlString: string) => { __html: string };
}

const HeroText: React.FC<HeroTextProps> = ({ createMarkup }) => {
  const [expanded, setExpanded] = useState(false);
  const isMobile = useIsMobile();

  const fullText = "Fondée en 2023 à Bezons, Automotive propose une sélection de véhicules soigneusement choisis, adaptés à tous les styles de vie et à tous les usages. Dès les premiers échanges, l'entreprise accompagne chaque client avec attention : conseils personnalisés, transparence, et préparation rigoureuse des véhicules avant la vente. Automotive incarne une nouvelle vision de la vente automobile, fondée sur la proximité, la confiance et l'exigence de qualité. <span class='block mt-2 text-sm opacity-80'><a href='#contact' class='text-orange-500 hover:underline'>Ouvert 7j/7 de 10h à 19h avec rendez-vous <Clock className='inline-block w-3 h-3 mb-0.5' /></a></span>";
  
  // Version encore plus courte pour mobile
  const mobileShortenedText = "Fondée en 2023 à Bezons, Automotive propose une sélection de véhicules soigneusement choisis. <span class='block mt-2 text-xs opacity-80'><a href='#contact' class='text-orange-500 hover:underline'>Ouvert 7j/7 de 10h à 19h avec rendez-vous <Clock className='inline-block w-3 h-3 mb-0.5' /></a></span>";
  
  // Version pour desktop
  const desktopShortenedText = "Fondée en 2023 à Bezons, Automotive propose une sélection de véhicules soigneusement choisis, adaptés à tous les styles de vie et à tous les usages. Dès les premiers échanges, l'entreprise accompagne chaque client avec attention : conseils personnalisés, transparence, et préparation rigoureuse des véhicules avant la vente. <span class='block mt-2 text-sm opacity-80'><a href='#contact' class='text-orange-500 hover:underline'>Ouvert 7j/7 de 10h à 19h avec rendez-vous <Clock className='inline-block w-3 h-3 mb-0.5' /></a></span>";
  
  // Sélectionne la version appropriée selon le dispositif
  const shortenedText = isMobile ? mobileShortenedText : desktopShortenedText;

  const toggleText = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div
        className="text-base sm:text-lg mb-2 opacity-90 text-slate-50 font-normal px-0 mx-auto"
        dangerouslySetInnerHTML={createMarkup(expanded ? fullText : shortenedText)}
      />
      
      <div className="flex justify-center mb-6">
        <Button 
          variant="link" 
          className="text-slate-50 hover:text-slate-200 flex items-center gap-1"
          onClick={toggleText}
        >
          {expanded ? "Voir moins" : "Lire plus"}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      </div>
    </>
  );
};

export default HeroText;
