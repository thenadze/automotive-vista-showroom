
import React from "react";
import { CarWithDetails } from "@/types";
import { CarCard } from "./CarCard";
import { EmptyState } from "./EmptyState";

interface CarsListProps {
  cars: CarWithDetails[];
  resetFilters: () => void;
  loading: boolean;
}

export const CarsList: React.FC<CarsListProps> = ({ cars, resetFilters, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (cars.length === 0) {
    return <EmptyState resetFilters={resetFilters} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cars.map(car => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};
