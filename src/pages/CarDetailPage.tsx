
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCarDetails } from "@/hooks/useCarDetails";
import CarImageGallery from "@/components/car-detail/CarImageGallery";
import CarSpecifications from "@/components/car-detail/CarSpecifications";
import DescriptionSection from "@/components/car-detail/DescriptionSection";
import CarDetailHeader from "@/components/car-detail/CarDetailHeader";
import LoadingState from "@/components/car-detail/LoadingState";
import NotFoundState from "@/components/car-detail/NotFoundState";

const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { car, loading } = useCarDetails(id);

  useEffect(() => {
    console.log("CarDetailPage rendered with car:", car);
    console.log("Car photos:", car?.photos);
  }, [car]);

  if (loading) {
    return <LoadingState />;
  }

  if (!car) {
    return <NotFoundState />;
  }

  const brandName = car.brand?.name || car.brand_id;

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <CarDetailHeader 
        brandName={brandName}
        model={car.model} 
        year={car.year} 
      />
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <CarImageGallery 
          photos={car.photos} 
          brandName={brandName}
          model={car.model}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CarSpecifications car={car} />
        <DescriptionSection car={car} />
      </div>
    </div>
  );
};

export default CarDetailPage;
