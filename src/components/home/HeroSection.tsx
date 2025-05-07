
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

  // Motifs SVG
  const patternVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 0.08, 
      scale: 1,
      transition: { duration: 1.5, ease: "easeOut" }
    }
  };

  return (
    <section className="relative py-12 md:py-24 bg-black overflow-hidden">
      {/* Motifs décoratifs sur l'arrière-plan */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Arrière-plan avec dégradé */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-black to-stone-900" />
        
        {/* Motifs graphiques */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full opacity-[0.05]"
          initial="initial"
          animate="animate"
          variants={patternVariants}
        >
          {/* Grille de lignes fines */}
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }} />
          
          {/* Cercles décoratifs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border border-white/5 opacity-30" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full border border-white/5 opacity-20" />
          
          {/* Formes avec animation */}
          <motion.div 
            className="absolute top-10 right-[10%] w-40 h-40 opacity-10"
            animate={{ 
              y: [0, -15, 0], 
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 8, 
              ease: "easeInOut", 
              repeat: Infinity 
            }}
          >
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFFFFF" d="M47.5,-57.2C59.9,-46.9,67.5,-30.5,69.7,-13.5C71.9,3.5,68.8,21.2,60.2,35.8C51.6,50.4,37.5,62,21,69.5C4.6,76.9,-14.2,80.2,-30.3,74.5C-46.4,68.8,-59.8,54.1,-67.4,37.5C-74.9,20.9,-76.6,2.4,-72.8,-15.2C-69,-32.9,-59.7,-49.6,-46,-60.3C-32.2,-71.1,-14,-75.8,2,-78.1C18,-80.4,35.1,-67.5,47.5,-57.2Z" transform="translate(100 100)" />
            </svg>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-20 left-[15%] w-56 h-56 opacity-10"
            animate={{ 
              y: [0, 10, 0], 
              rotate: [0, -3, 0]
            }}
            transition={{ 
              duration: 7, 
              ease: "easeInOut", 
              repeat: Infinity,
              delay: 0.5
            }}
          >
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFFFFF" d="M55.7,-59.2C71.9,-44.3,84.5,-22.1,83.3,-1.2C82.1,19.8,67.1,39.6,50.9,53.1C34.6,66.6,17.3,73.8,-1.9,75.7C-21.1,77.6,-42.2,74.3,-58.6,60.9C-75.1,47.5,-86.9,24,-87.3,0.3C-87.6,-23.4,-76.6,-46.7,-60,-61.6C-43.4,-76.4,-21.7,-82.7,0.5,-83.2C22.7,-83.8,45.4,-78.6,55.7,-59.2Z" transform="translate(100 100)" />
            </svg>
          </motion.div>
          
          {/* Lignes diagonales */}
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3">
            <div className="w-full h-full" style={{
              backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03), rgba(255,255,255,0.03) 1px, transparent 1px, transparent 10px)"
            }} />
          </div>
          
          <div className="absolute top-0 right-0 w-1/2 h-1/2">
            <div className="w-full h-full" style={{
              backgroundImage: "repeating-linear-gradient(-45deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02) 1px, transparent 1px, transparent 15px)"
            }} />
          </div>
        </motion.div>
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
