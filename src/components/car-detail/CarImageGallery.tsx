
import React from "react";
import { CarPhoto } from "@/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CarImageGalleryProps {
  photos: CarPhoto[] | undefined;
  brandName: string;
  model: string;
}

const CarImageGallery: React.FC<CarImageGalleryProps> = ({ photos, brandName, model }) => {
  // Filtrer les photos valides
  const validPhotos = React.useMemo(() => {
    if (!photos || photos.length === 0) return [];
    return photos.filter(photo => photo && photo.photo_url && typeof photo.photo_url === 'string');
  }, [photos]);

  return (
    <div className="relative">
      {validPhotos.length > 0 ? (
        <Carousel className="relative w-full">
          <CarouselContent>
            {validPhotos.map((photo, index) => (
              <CarouselItem key={photo.id || index}>
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={photo.photo_url}
                    alt={`${brandName} ${model} - Photo ${index + 1}`}
                    className="h-full w-full object-cover rounded-t-lg"
                    onError={(e) => {
                      console.error("Error loading image:", photo.photo_url);
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </AspectRatio>
              </CarouselItem>
            ))}
          </CarouselContent>
          {validPhotos.length > 1 && (
            <>
              <CarouselPrevious className="left-2 bg-black/50 hover:bg-black/70 text-white" />
              <CarouselNext className="right-2 bg-black/50 hover:bg-black/70 text-white" />
            </>
          )}
        </Carousel>
      ) : (
        <div className="w-full bg-gray-200">
          <AspectRatio ratio={16 / 9}>
            <div className="h-full w-full flex items-center justify-center">
              <p className="text-gray-500">Aucune photo disponible</p>
            </div>
          </AspectRatio>
        </div>
      )}
    </div>
  );
};

export default CarImageGallery;
