
import React from "react";
import { CarWithDetails } from "@/types";

interface CarSpecificationsProps {
  car: CarWithDetails;
}

const CarSpecifications: React.FC<CarSpecificationsProps> = ({ car }) => {
  // Formatter le prix
  const formattedPrice = car.daily_price 
    ? new Intl.NumberFormat('fr-FR', { 
        style: 'currency', 
        currency: 'EUR',
        maximumFractionDigits: 0 
      }).format(car.daily_price)
    : "Non spécifié";

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Caractéristiques</h2>
      
      <table className="w-full mb-6">
        <tbody>
          <tr className="border-b">
            <td className="py-2 font-medium">Marque</td>
            <td className="py-2">{car.brand?.name || "Non spécifiée"}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-medium">Modèle</td>
            <td className="py-2">{car.model}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-medium">Année</td>
            <td className="py-2">{car.year}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-medium">Carburant</td>
            <td className="py-2">{car.fuel_type?.name || "Non spécifié"}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-medium">Transmission</td>
            <td className="py-2">{car.transmission?.name || "Non spécifiée"}</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">Prix</td>
            <td className="py-2">{formattedPrice}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CarSpecifications;
