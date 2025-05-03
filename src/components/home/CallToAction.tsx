
import React from "react";
import { Link } from "react-router-dom";

const CallToAction: React.FC = () => {
  return (
    <section className="bg-stone-800 text-white py-12 rounded-lg">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Prêt à trouver votre prochaine voiture ?</h2>
        <p className="text-xl mb-6">Parcourez notre catalogue de véhicules dès maintenant.</p>
        <Link
          to="/cars"
          className="bg-stone-600 text-white hover:bg-stone-700 py-3 px-8 rounded-md text-lg font-medium transition duration-300"
        >
          Explorer le catalogue
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
