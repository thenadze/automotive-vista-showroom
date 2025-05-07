
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CompanyInfo } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

interface HeroSectionProps {
  companyInfo: CompanyInfo | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  companyInfo
}) => {
  const [expanded, setExpanded] = useState(false);
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    // Déclencher l'animation après montage du composant
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Variants pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        duration: 0.8 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  return (
    <section className="relative py-12 md:py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-black to-stone-900" />
      </div>
      
      <motion.div 
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto relative z-10 px-4 sm:px-6"
      >
        <div className="flex flex-col items-center text-center">
          <div className={`${isMobile ? 'w-full' : 'max-w-5xl'}`}>
            <motion.h1 
              variants={itemVariants} 
              className="text-3xl font-bold mb-4 text-white md:text-5xl"
            >
              Explorez la Route Devant<br />
              avec {companyInfo?.name || 'Automotive'}
            </motion.h1>
            
            <motion.div 
              variants={itemVariants}
              className="text-base sm:text-lg mb-2 opacity-90 text-slate-50 font-normal px-0 mx-auto"
            >
              {expanded ? fullText : shortenedText}
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Button 
                variant="link" 
                className="text-slate-50 hover:text-slate-200 mb-6 flex items-center gap-1"
                onClick={toggleText}
              >
                {expanded ? "Voir moins" : "Lire plus"}
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex justify-center">
              <motion.div
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <Button asChild className="bg-stone-700 hover:bg-stone-800 text-white px-5 py-4 sm:px-8 sm:py-6 rounded-md text-base sm:text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl" size="lg">
                  <Link to="/cars" className="flex items-center gap-2">
                    Voir nos véhicules
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
