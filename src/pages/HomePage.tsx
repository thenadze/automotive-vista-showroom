
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCars from "@/components/home/FeaturedCars";
import ServicesSection from "@/components/home/ServicesSection";
import CallToAction from "@/components/home/CallToAction";
import LoadingState from "@/components/home/LoadingState";
import ErrorState from "@/components/home/ErrorState";
import { useHomepageData } from "@/hooks/useHomepageData";
import StatsSection from "@/components/home/StatsSection";
import LocationsSection from "@/components/home/LocationsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import NewsletterSection from "@/components/home/NewsletterSection";

const HomePage = () => {
  const { companyInfo, featuredCars, loading, error } = useHomepageData();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="flex flex-col">
      <HeroSection companyInfo={companyInfo} />
      <StatsSection />
      <FeaturedCars featuredCars={featuredCars} />
      <LocationsSection />
      <HowItWorksSection />
      <NewsletterSection />
      <ServicesSection />
      <CallToAction />
    </div>
  );
};

export default HomePage;
