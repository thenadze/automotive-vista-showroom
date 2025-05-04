
import React from "react";
import { CarPhoto } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CarGalleryProps {
  photos: CarPhoto[];
  className?: string;
}

const CarGallery: React.FC<CarGalleryProps> = ({ photos, className }) => {
  // Si pas de photos, afficher un placeholder
  if (!photos || photos.length === 0) {
    return (
      <div className={cn("w-full h-full bg-stone-100", className)}>
        <img 
          src="/placeholder.svg" 
          alt="Aucune photo"
          className="w-full h-full object-cover"
          style={{ minHeight: "240px" }}
        />
      </div>
    );
  }

  // Si une seule photo, pas besoin de carousel
  if (photos.length === 1) {
    return (
      <div 
        className={cn("w-full h-full relative overflow-hidden rounded-t-lg", className)}
        data-aos="fade-up"
        data-aos-once="true"
      >
        <img 
          src={photos[0].photo_url} 
          alt="Photo du véhicule"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>
    );
  }

  // Sinon, afficher le carousel
  return (
    <Carousel 
      className={cn("w-full", className)}
      data-aos="fade-up"
      data-aos-once="true"
    >
      <CarouselContent>
        {photos.map((photo, index) => (
          <CarouselItem key={photo.id || index}>
            <Card className="border-none">
              <CardContent className="p-0 overflow-hidden rounded-lg">
                <div className="overflow-hidden">
                  <img
                    src={photo.photo_url}
                    alt={`Photo ${index + 1} du véhicule`}
                    className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                    style={{ height: "280px" }}
                    loading="lazy" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 hover:opacity-100 transition-opacity">
        <CarouselPrevious 
          className="relative rounded-full bg-stone-100/80 hover:bg-stone-100 border-stone-200 shadow-md h-8 w-8 left-0"
        />
        <CarouselNext 
          className="relative rounded-full bg-stone-100/80 hover:bg-stone-100 border-stone-200 shadow-md h-8 w-8 right-0"
        />
      </div>
    </Carousel>
  );
};

export default CarGallery;
