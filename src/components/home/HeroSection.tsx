
import React, { useState, useEffect } from "react";
import { CompanyInfo } from "@/types";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import HeroBackground from "./hero/HeroBackground";
import HeroText from "./hero/HeroText";
import HeroButton from "./hero/HeroButton";

interface HeroSectionProps {
  companyInfo: CompanyInfo | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  companyInfo
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  // Fonction pour créer du HTML balisé à partir des chaînes de texte
  const createMarkup = (htmlString: string) => {
    return { __html: htmlString };
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

  return (
    <section className="relative py-12 md:py-24 bg-black overflow-hidden">
      <HeroBackground />
      
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
            
            <motion.div variants={itemVariants}>
              <HeroText createMarkup={createMarkup} />
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex justify-center">
              <HeroButton />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
