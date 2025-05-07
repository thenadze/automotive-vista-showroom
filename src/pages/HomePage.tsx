
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

  return (
    <div className="flex flex-col">
      <HeroSection companyInfo={companyInfo} />
      <FeaturedCars featuredCars={featuredCars} />
      <ServicesSection />
      <CallToAction />
    </div>
  );
};

export default HomePage;
