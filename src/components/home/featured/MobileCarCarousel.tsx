
import React from "react";
import { CarWithDetails } from "@/types";
import FeaturedCarCard from "./FeaturedCarCard";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

interface MobileCarCarouselProps {
  cars: CarWithDetails[];
  startIndex?: number;
}

const MobileCarCarousel: React.FC<MobileCarCarouselProps> = ({ cars, startIndex = 0 }) => {
  if (cars.length === 0) return null;

  return (
    <div className="md:hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-stone-700">
          Plus de véhicules
        </h3>
      </div>
      <Carousel 
        opts={{
          align: "start",
          loop: cars.length > 1
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:ml-0">
          {cars.map((car, index) => (
            <CarouselItem key={car.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2">
              <FeaturedCarCard car={car} index={index + startIndex} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4 gap-2">
          <CarouselPrevious className="relative left-auto right-auto static" />
          <CarouselNext className="relative left-auto right-auto static" />
        </div>
      </Carousel>
    </div>
  );
};

export default MobileCarCarousel;
