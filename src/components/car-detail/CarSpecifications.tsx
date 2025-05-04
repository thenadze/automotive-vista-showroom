
import React from "react";
import { CarWithDetails } from "@/types";
import { predefinedFuelTypes } from "@/components/admin/car-form/fuelTypes";

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

  // Obtenir le nom du type de carburant de façon plus robuste
  const getFuelTypeName = () => {
    // Si l'objet fuel_type est disponible avec le nom
    if (car.fuel_type && car.fuel_type.name) {
      console.log("CarSpecifications - Fuel type from object:", car.fuel_type.name);
      return car.fuel_type.name;
    }
    
    // Si fuel_type_id est défini, essayer de le mapper aux types prédéfinis
    if (car.fuel_type_id) {
      console.log("CarSpecifications - Looking up fuel type ID:", car.fuel_type_id);
      
      // Vérifier si c'est un nombre sous forme de string
      const fuelTypeIdNum = parseInt(car.fuel_type_id);
      if (!isNaN(fuelTypeIdNum)) {
        // Rechercher dans les types prédéfinis par ID numérique
        const foundType = predefinedFuelTypes.find(ft => ft.id === String(fuelTypeIdNum));
        if (foundType) {
          console.log("CarSpecifications - Found predefined fuel type by numeric ID:", foundType.name);
          return foundType.name;
        }
      }
      
      // Essayer de trouver par correspondance exacte de string
      const foundTypeByString = predefinedFuelTypes.find(ft => ft.id === car.fuel_type_id);
      if (foundTypeByString) {
        console.log("CarSpecifications - Found predefined fuel type by string ID:", foundTypeByString.name);
        return foundTypeByString.name;
      }
      
      // Si ce n'est pas un ID numérique reconnu mais que c'est une chaîne, l'utiliser telle quelle
      // car ce pourrait être directement le nom du type de carburant
      if (isNaN(Number(car.fuel_type_id))) {
        console.log("CarSpecifications - Using fuel_type_id as name:", car.fuel_type_id);
        return car.fuel_type_id;
      }
    }
    
    return "Non spécifié";
  };

  const fuelTypeName = getFuelTypeName();
  console.log("CarSpecifications - Final fuel type displayed:", fuelTypeName);

  const specifications = [
    { label: "Marque", value: car.brand?.name || "Non spécifiée" },
    { label: "Modèle", value: car.model },
    { label: "Année", value: car.year ? car.year.toString() : "Non spécifiée" },
    { label: "Kilométrage", value: formattedMileage },
    { label: "Carburant", value: fuelTypeName },
    { label: "Transmission", value: car.transmission?.name || "Non spécifiée" },
    { label: "Prix", value: formattedPrice }
  ];

  // Ajouter des attributs schema.org pour le SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    "brand": car.brand?.name,
    "model": car.model,
    "modelDate": car.year,
    "vehicleConfiguration": fuelTypeName,
    "mileageFromOdometer": {
      "@type": "QuantitativeValue",
      "value": car.mileage,
      "unitCode": "KMT"
    },
    "offers": {
      "@type": "Offer",
      "price": car.daily_price,
      "priceCurrency": "EUR"
    }
  };

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
      
      {/* Schema.org data pour SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
    </div>
  );
};

export default CarSpecifications;
