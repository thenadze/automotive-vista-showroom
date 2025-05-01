
import React from "react";
import { Link } from "react-router-dom";
import { CompanyInfo } from "@/types";

interface HeroSectionProps {
  companyInfo: CompanyInfo | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ companyInfo }) => {
  return (
    <section className="bg-gray-900 text-white py-16 rounded-lg mb-12">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Bienvenue chez {companyInfo?.name || 'Automotive'}
        </h1>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          {companyInfo?.description || 'Votre partenaire de confiance pour trouver la voiture de vos rêves.'}
        </p>
        <Link
          to="/cars"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-md text-lg font-medium transition duration-300"
        >
          Voir nos véhicules
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
