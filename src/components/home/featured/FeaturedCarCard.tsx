
import React, { useState } from "react";
import { CarWithDetails } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import CarGallery from "@/components/home/CarGallery";
import CarModal from "@/components/cars/CarModal";
import CarTitle from "./CarTitle";
import CarSpecs from "./CarSpecs";
import CarPricing from "./CarPricing";
import CarStatusIndicators from "./CarStatusIndicators";

interface FeaturedCarCardProps {
  car: CarWithDetails;
  index: number;
}

const FeaturedCarCard: React.FC<FeaturedCarCardProps> = ({ car, index }) => {
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <Card 
        className="bg-white rounded-lg overflow-hidden shadow cursor-pointer transition-all duration-300 hover:shadow-lg"
        onClick={handleCardClick}
      >
        <div className="relative w-full">
          <CarGallery 
            photos={car.photos || []} 
            className="w-full"
            style={{ height: isMobile ? "140px" : "180px" }}
            autoSlide={true}
            autoSlideInterval={4500}
          />
          
          {car.year && (
            <div className="absolute top-2 right-2 z-10">
              <Badge className="bg-stone-700 text-white text-xs">{car.year}</Badge>
            </div>
          )}
        </div>
        
        <CardContent className="p-3 md:p-4">
          <CarTitle car={car} />
          <CarSpecs car={car} />
          <CarPricing car={car} />
          <CarStatusIndicators />
        </CardContent>
      </Card>
      
      <CarModal 
        car={car}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default FeaturedCarCard;
