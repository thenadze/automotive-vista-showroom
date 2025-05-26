
import React, { useState, useEffect } from "react";
import { CarPhoto } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface CarGalleryProps {
  photos: CarPhoto[];
  className?: string;
  style?: React.CSSProperties;
  enableSwipe?: boolean;
  showArrows?: boolean;
}

const CarGallery: React.FC<CarGalleryProps> = ({ 
  photos, 
  className = "", 
  style = {},
  enableSwipe = true,
  showArrows = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const isMobile = useIsMobile();

  // Filtrer les photos valides
  const validPhotos = photos?.filter(photo => 
    photo && photo.photo_url && typeof photo.photo_url === 'string'
  ) || [];

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    if (!enableSwipe) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!enableSwipe) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!enableSwipe || !touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < validPhotos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : validPhotos.length - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex < validPhotos.length - 1 ? currentIndex + 1 : 0);
  };

  // Reset index if photos change
  useEffect(() => {
    if (currentIndex >= validPhotos.length && validPhotos.length > 0) {
      setCurrentIndex(0);
    }
  }, [validPhotos.length, currentIndex]);

  if (!validPhotos || validPhotos.length === 0) {
    return (
      <div className={`relative bg-gray-200 flex items-center justify-center ${className}`} style={style}>
        <p className="text-gray-500 text-sm">Aucune photo disponible</p>
      </div>
    );
  }

  if (validPhotos.length === 1) {
    return (
      <div className={`relative ${className}`} style={style}>
        <img
          src={validPhotos[0].photo_url}
          alt="Véhicule"
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error("Error loading image:", validPhotos[0].photo_url);
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>
    );
  }

  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      style={style}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div 
        className="flex transition-transform duration-300 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {validPhotos.map((photo, index) => (
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

      {/* Navigation flèches (desktop uniquement) */}
      {showArrows && !isMobile && validPhotos.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            aria-label="Photo précédente"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
            aria-label="Photo suivante"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Indicateurs de pagination */}
      {validPhotos.length > 1 && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {validPhotos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Aller à la photo ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarGallery;
