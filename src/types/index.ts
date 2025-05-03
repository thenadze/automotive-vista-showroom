
export interface CompanyInfo {
  id: number;
  name: string;
  description: string;
  address?: string;
  phone?: string;
  email?: string;
  logo_url?: string;
}

export interface CarBrand {
  id: number;
  name: string;
}

export interface FuelType {
  id: number;
  name: string;
}

export interface TransmissionType {
  id: number;
  name: string;
}

export interface Car {
  id: string;
  year: number;
  brand_id: string;
  model: string;
  fuel_type_id: string;  // Maintenant une chaîne de caractères
  transmission_id: string;
  created_at: string;
  updated_at: string;
  daily_price?: number;  // Added daily_price property
}

export interface CarPhoto {
  id: string;
  car_id: string;
  photo_url: string;
  is_primary: boolean;
  created_at: string;
}

export interface CarWithDetails extends Car {
  brand?: CarBrand;
  fuel_type?: FuelType;
  transmission?: TransmissionType;
  photos?: CarPhoto[];
}
