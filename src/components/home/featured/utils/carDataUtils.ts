
import { CarWithDetails } from "@/types";
import { predefinedFuelTypes } from "@/components/admin/car-form/fuelTypes";

export const formatPrice = (dailyPrice?: number): string => {
  return dailyPrice 
    ? new Intl.NumberFormat('fr-FR', { 
        style: 'currency', 
        currency: 'EUR',
        maximumFractionDigits: 0 
      }).format(dailyPrice)
    : "Prix sur demande";
};

export const formatMileage = (mileage?: number): string => {
  return mileage !== undefined && mileage !== null
    ? new Intl.NumberFormat('fr-FR').format(mileage) + " km"
    : "0 km";
};

export const getBrandName = (car: CarWithDetails): string => {
  // Si on a l'objet brand complet avec le nom
  if (car.brand && typeof car.brand === 'object' && car.brand.name) {
    return car.brand.name;
  }
  
  // Si brand_id est défini mais qu'il n'y a pas d'objet brand
  if (car.brand_id && car.brand_id !== "undefined" && car.brand_id !== "null") {
    // Ne pas retourner l'ID numérique si c'est juste un nombre
    if (!isNaN(Number(car.brand_id))) {
      return "";  // Retourner une chaîne vide au lieu de l'ID
    }
    return car.brand_id;
  }
  
  return "";
};

export const getFuelTypeName = (car: CarWithDetails): string => {
  // Si l'objet fuel_type est disponible avec le nom
  if (car.fuel_type && car.fuel_type.name) {
    return car.fuel_type.name;
  }
  
  // Si fuel_type_id est défini, essayer de le mapper aux types prédéfinis
  if (car.fuel_type_id) {
    // Vérifier si c'est un nombre sous forme de string
    const fuelTypeIdNum = parseInt(car.fuel_type_id);
    if (!isNaN(fuelTypeIdNum)) {
      // Rechercher dans les types prédéfinis par ID numérique
      const foundType = predefinedFuelTypes.find(ft => ft.id === String(fuelTypeIdNum));
      if (foundType) {
        return foundType.name;
      }
    }
    
    // Essayer de trouver par correspondance exacte de string
    const foundTypeByString = predefinedFuelTypes.find(ft => ft.id === car.fuel_type_id);
    if (foundTypeByString) {
      return foundTypeByString.name;
    }
    
    // Si ce n'est pas un ID numérique reconnu mais que c'est une chaîne, l'utiliser telle quelle
    if (isNaN(Number(car.fuel_type_id))) {
      return car.fuel_type_id;
    }
  }
  
  return "Essence";  // Valeur par défaut
};

export const getTransmissionName = (car: CarWithDetails): string => {
  // Si l'objet transmission est disponible avec le nom
  if (car.transmission && car.transmission.name) {
    return car.transmission.name;
  }
  
  // Si transmission_id est défini
  if (car.transmission_id) {
    // Si c'est une chaîne de caractères, l'utiliser directement
    if (isNaN(Number(car.transmission_id))) {
      return car.transmission_id;
    }
  }
  
  return "Automatique";  // Valeur par défaut
};

export const getCarTitle = (car: CarWithDetails): string => {
  const brandName = getBrandName(car);
  const modelName = car.model || "";
  // S'assurer que le titre n'inclut pas l'ID numérique
  return brandName ? `${brandName} ${modelName}`.trim() : modelName;
};
