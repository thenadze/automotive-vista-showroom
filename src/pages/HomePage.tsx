
import React, { useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCars from "@/components/home/FeaturedCars";
import ServicesSection from "@/components/home/ServicesSection";
import CallToAction from "@/components/home/CallToAction";
import LoadingState from "@/components/home/LoadingState";
import ErrorState from "@/components/home/ErrorState";
import { useHomepageData } from "@/hooks/useHomepageData";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const HomePage = () => {
  const { companyInfo, featuredCars, loading, error } = useHomepageData();

  useEffect(() => {
    // Initialiser AOS avec plus d'options pour améliorer les animations
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,  // Modifier pour que les animations se répètent lors du scroll
      offset: 50,
      delay: 100,
      anchorPlacement: 'top-bottom',
    });
    
    // Réinitialiser AOS lors du chargement des données
    if (!loading) {
      AOS.refresh();
    }
  }, [loading]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  // Variantes d'animation pour le conteneur principal
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="flex flex-col"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={sectionVariants}>
        <HeroSection companyInfo={companyInfo} />
      </motion.div>
      
      <motion.div 
        variants={sectionVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        <FeaturedCars featuredCars={featuredCars} />
      </motion.div>
      
      <motion.div 
        variants={sectionVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        <ServicesSection />
      </motion.div>
      
      <motion.div 
        variants={sectionVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        <CallToAction />
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
