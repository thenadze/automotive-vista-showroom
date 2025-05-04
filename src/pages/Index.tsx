
import React from "react";
import { Helmet } from "react-helmet-async";
import HomePage from "./HomePage";

const Index = () => {
  // Ajout de données structurées pour les moteurs de recherche
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "Automotive",
    "description": "Vente de véhicules d'occasion soigneusement sélectionnés",
    "url": "https://automotive-vista-showroom.lovable.dev/",
    "priceRange": "€€"
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Automotive - Vente de véhicules d'occasion de qualité</title>
        <meta name="description" content="Découvrez notre sélection de véhicules d'occasion soigneusement choisis. Automotive vous propose des voitures adaptées à tous les styles de vie et budgets." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <main>
        <HomePage />
      </main>
    </React.Fragment>
  );
};

export default Index;
