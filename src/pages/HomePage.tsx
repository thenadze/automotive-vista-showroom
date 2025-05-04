
import React, { useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCars from "@/components/home/FeaturedCars";
import ServicesSection from "@/components/home/ServicesSection";
import CallToAction from "@/components/home/CallToAction";
import LoadingState from "@/components/home/LoadingState";
import ErrorState from "@/components/home/ErrorState";
import { useHomepageData } from "@/hooks/useHomepageData";
import AOS from "aos";

const HomePage = () => {
  const { companyInfo, featuredCars, loading, error } = useHomepageData();

  useEffect(() => {
    // Réinitialiser AOS lors du montage du composant HomePage
    AOS.refresh();
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
