
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

  // Formatter le kilométrage
  const formattedMileage = car.mileage !== undefined && car.mileage !== null
    ? `${new Intl.NumberFormat('fr-FR').format(car.mileage)} km`
    : "Non spécifié";

  // S'assurer que le type de carburant est correctement affiché
  const fuelTypeName = car.fuel_type?.name || "Non spécifié";
  console.log("Fuel type displayed:", fuelTypeName);

  const specifications = [
    { label: "Marque", value: car.brand?.name || "Non spécifiée" },
    { label: "Modèle", value: car.model },
    { label: "Année", value: car.year ? car.year.toString() : "Non spécifiée" },
    { label: "Kilométrage", value: formattedMileage },
    { label: "Carburant", value: fuelTypeName },
    { label: "Transmission", value: car.transmission?.name || "Non spécifiée" },
    { label: "Prix", value: formattedPrice }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Caractéristiques</h2>
      
      <table className="w-full">
        <tbody>
          {specifications.map((spec, index) => (
            <tr key={spec.label} className={index < specifications.length - 1 ? "border-b" : ""}>
              <td className="py-3 font-medium text-gray-700">{spec.label}</td>
              <td className="py-3 text-right">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarSpecifications;
