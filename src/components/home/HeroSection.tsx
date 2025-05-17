
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CompanyInfo } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, ChevronUp, Clock } from "lucide-react";
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

  const fullText = "Fondée en 2023 à Bezons, Automotive propose une sélection de véhicules soigneusement choisis, adaptés à tous les styles de vie et à tous les usages. Dès les premiers échanges, l'entreprise accompagne chaque client avec attention : conseils personnalisés, transparence, et préparation rigoureuse des véhicules avant la vente. Nous vous accueillons dans notre établissement <a href='#contact' class='text-orange-500 hover:underline'>ouvert tous les jours de 10h à 19h <Clock className='inline-block w-4 h-4 mb-1' /></a>, sur rendez-vous en semaine et sans rendez-vous le weekend. \n\nAutomotive incarne une nouvelle vision de la vente automobile, fondée sur la proximité, la confiance et l'exigence de qualité.";
  
  // Version encore plus courte pour mobile
  const mobileShortenedText = "Fondée en 2023 à Bezons, Automotive propose une sélection de véhicules soigneusement choisis. <a href='#contact' class='text-orange-500 hover:underline'>Ouvert 7j/7 de 10h à 19h <Clock className='inline-block w-3 h-3 mb-0.5' /></a>";
  
  // Version pour desktop
  const desktopShortenedText = "Fondée en 2023 à Bezons, Automotive propose une sélection de véhicules soigneusement choisis, adaptés à tous les styles de vie et à tous les usages. Dès les premiers échanges, l'entreprise accompagne chaque client avec attention : conseils personnalisés, transparence, et préparation rigoureuse des véhicules avant la vente. Nous vous accueillons dans notre établissement <a href='#contact' class='text-orange-500 hover:underline'>ouvert tous les jours de 10h à 19h <Clock className='inline-block w-4 h-4 mb-1' /></a>, sur rendez-vous en semaine et sans rendez-vous le weekend.";
  
  // Sélectionne la version appropriée selon le dispositif
  const shortenedText = isMobile ? mobileShortenedText : desktopShortenedText;

  const toggleText = () => {
    setExpanded(!expanded);
  };
  
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
        
        {/* Motifs graphiques enrichis */}
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
          
          {/* Cercles décoratifs animés */}
          <motion.div 
            className="absolute -top-20 -left-20 w-64 h-64 bg-stone-700 rounded-full opacity-10"
            animate={{ 
              y: [0, 15, 0], 
              x: [0, 10, 0], 
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 8, 
              ease: "easeInOut", 
              repeat: Infinity,
              delay: 0.5
            }}
          />
          <motion.div 
            className="absolute top-40 -right-20 w-80 h-80 bg-stone-600 rounded-full opacity-5"
            animate={{ 
              y: [0, -20, 0], 
              x: [0, -15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 10, 
              ease: "easeInOut", 
              repeat: Infinity,
              delay: 1
            }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-10 w-72 h-72 bg-stone-800 rounded-full opacity-10"
            animate={{ 
              y: [0, -15, 0], 
              scale: [1, 0.95, 1]
            }}
            transition={{ 
              duration: 9, 
              ease: "easeInOut", 
              repeat: Infinity,
              delay: 2
            }}
          />
          
          {/* Cercles décoratifs statiques */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border border-white/5 opacity-30" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full border border-white/5 opacity-20" />
          <div className="absolute top-2/3 right-2/3 w-48 h-48 rounded-full border border-white/5 opacity-15" />
          <div className="absolute bottom-1/4 right-1/3 w-56 h-56 rounded-full border border-white/5 opacity-25" />
          
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
          
          <motion.div 
            className="absolute top-1/2 right-1/3 w-32 h-32 opacity-10"
            animate={{ 
              y: [0, 5, 0], 
              rotate: [0, 8, 0]
            }}
            transition={{ 
              duration: 6, 
              ease: "easeInOut", 
              repeat: Infinity,
              delay: 1
            }}
          >
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFFFFF" d="M40.2,-62.6C52,-52.2,61.6,-40.6,65.9,-27.5C70.2,-14.3,69.1,0.4,65,14C60.9,27.5,53.8,39.9,43.5,49.2C33.1,58.5,19.6,64.8,4.7,69C-10.2,73.2,-26.5,75.3,-40.1,69.6C-53.7,63.9,-64.4,50.3,-69.8,35C-75.2,19.8,-75.2,2.8,-71.6,-12.8C-68,-28.5,-60.8,-42.8,-49.9,-53.3C-39,-63.8,-24.4,-70.5,-9.5,-72C5.4,-73.5,13.3,-69.7,24.2,-66.1C35.1,-62.4,48.8,-59,58.2,-50C67.5,-41,72.5,-26.4,74,-11.7C75.6,2.9,73.8,17.6,67.9,30.1C62,42.6,52,52.9,40.2,59C28.4,65.1,14.2,67,0.6,66.1C-13,65.1,-26,61.3,-39.3,56.3C-52.5,51.3,-66,45.1,-71.7,34C-77.4,22.9,-75.3,6.9,-71.2,-7.5C-67.1,-21.9,-60.9,-34.6,-51.6,-45.4C-42.2,-56.2,-29.7,-65,-16,-67.1C-2.3,-69.3,11.5,-64.8,24.1,-61.5C36.8,-58.1,48.2,-55.9,56.5,-48.7C64.9,-41.6,70.3,-29.4,68.7,-18C67.1,-6.6,58.6,4,51.5,14C44.4,24,38.8,33.5,30.3,37.9C21.8,42.3,10.9,41.7,-0.8,42.9C-12.5,44.2,-25,47.3,-37.9,45.4C-50.7,43.5,-64,36.6,-68.1,25.8C-72.3,15,-67.4,0.3,-64.2,-14.6C-60.9,-29.5,-59.2,-44.5,-51.2,-55.4C-43.2,-66.3,-28.8,-73,-14.1,-70.6C0.6,-68.1,15.5,-56.5,24.4,-49.5C33.4,-42.5,36.3,-40,47.3,-32.9C58.2,-25.8,77.2,-14.2,79.7,-0.9C82.1,12.5,68.1,27.7,55.7,39.4C43.4,51.1,32.7,59.3,19.5,63.8C6.3,68.3,-9.5,69.1,-23.6,65.9C-37.8,62.7,-50.4,55.6,-57.6,44.7C-64.8,33.8,-66.6,19.2,-71,3.2C-75.3,-12.8,-82.2,-30.1,-77.2,-42.1C-72.2,-54.1,-55.2,-60.7,-40.3,-66.3C-25.3,-71.9,-12.7,-76.6,0.4,-77.1C13.4,-77.7,26.9,-74.2,40.2,-70.8Z" transform="translate(100 100)" />
            </svg>
          </motion.div>
          
          {/* Lignes diagonales décoratives */}
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
          
          {/* Motif en grille hexagonale */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }} />
          
          {/* Points lumineux dispersés */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-white rounded-full opacity-30" />
            <div className="absolute top-3/4 left-2/5 w-1.5 h-1.5 bg-white rounded-full opacity-40" />
            <div className="absolute top-1/3 left-4/5 w-1 h-1 bg-white rounded-full opacity-20" />
            <div className="absolute top-2/3 left-1/5 w-1 h-1 bg-white rounded-full opacity-30" />
            <div className="absolute top-1/2 left-3/5 w-2 h-2 bg-white rounded-full opacity-25" />
            <div className="absolute top-1/5 left-1/2 w-1 h-1 bg-white rounded-full opacity-30" />
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
              dangerouslySetInnerHTML={createMarkup(expanded ? fullText : shortenedText)}
            />
            
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
