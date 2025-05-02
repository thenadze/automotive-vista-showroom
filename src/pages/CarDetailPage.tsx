
import React from "react";
import { useParams } from "react-router-dom";
import { useCarDetails } from "@/hooks/useCarDetails";
import CarImageGallery from "@/components/car-detail/CarImageGallery";
import CarSpecifications from "@/components/car-detail/CarSpecifications";
import ContactSection from "@/components/car-detail/ContactSection";
import CarDetailHeader from "@/components/car-detail/CarDetailHeader";
import LoadingState from "@/components/car-detail/LoadingState";
import NotFoundState from "@/components/car-detail/NotFoundState";

const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { car, loading } = useCarDetails(id);

  if (loading) {
    return <LoadingState />;
  }

  if (!car) {
    return <NotFoundState />;
  }

  return (
    <div>
      <CarDetailHeader 
        brandName={car.brand_id} 
        model={car.model} 
        year={car.year} 
      />
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <CarImageGallery 
          photos={car.photos} 
          brandName={car.brand_id}
          model={car.model}
        />
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CarSpecifications car={car} />
            <ContactSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
