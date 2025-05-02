
import React from "react";
import { Link } from "react-router-dom";

const NotFoundState: React.FC = () => {
  return (
    <div className="bg-gray-50 p-8 rounded-lg text-center">
      <h2 className="text-2xl font-medium mb-2">Véhicule non trouvé</h2>
      <p className="text-gray-600 mb-4">Le véhicule que vous recherchez n'existe pas ou a été supprimé.</p>
      <Link
        to="/cars"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition duration-300"
      >
        Retour au catalogue
      </Link>
    </div>
  );
};

export default NotFoundState;
