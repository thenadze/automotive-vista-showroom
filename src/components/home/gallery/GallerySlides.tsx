
import React from "react";
import { CarPhoto } from "@/types";

interface GallerySlidesProps {
  photos: CarPhoto[];
  getTransformValue: (currentIndex: number) => number;
  currentIndex: number;
  isDragging: boolean;
}

const GallerySlides: React.FC<GallerySlidesProps> = ({
  photos,
  getTransformValue,
  currentIndex,
  isDragging
}) => {
  return (
    <div 
      className={`flex h-full swipe-gallery ${isDragging ? 'swiping' : ''}`}
      style={{ 
        transform: `translateX(${getTransformValue(currentIndex)}%)`,
        transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      {photos.map((photo, index) => (
        <div key={photo.id || index} className="min-w-full h-full">
          <img
            src={photo.photo_url}
            alt={`Véhicule ${index + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error("Error loading image:", photo.photo_url);
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default React.memo(GallerySlides);
