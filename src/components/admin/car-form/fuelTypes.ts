
import { FuelType } from "@/types";

// Type définissant un type de carburant avec le nombre d'annonces
export interface FuelTypeWithCount extends FuelType {
  count?: number;
}

// Définition des types de carburant avec le nombre d'annonces
export const predefinedFuelTypes: FuelTypeWithCount[] = [
  { id: 1, name: "Essence", count: 17501 },
  { id: 2, name: "Diesel", count: 12844 },
  { id: 3, name: "Hybride", count: 1006 },
  { id: 4, name: "Électrique", count: 1793 },
  { id: 5, name: "GPL", count: 63 },
  { id: 6, name: "Gaz naturel (CNG)", count: 2 },
  { id: 7, name: "Autre", count: 26 },
];
