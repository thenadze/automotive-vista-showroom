
import React, { useState, useEffect, useMemo } from "react";
import { CarPhoto } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSwipeGallery } from "@/hooks/useSwipeGallery";
import { useAutoSlide } from "@/hooks/useAutoSlide";
import GalleryNavigation from "./gallery/GalleryNavigation";
import GalleryIndicators from "./gallery/GalleryIndicators";
import GallerySlides from "./gallery/GallerySlides";

interface CarGalleryProps {
  photos: CarPhoto[];
  className?: string;
  style?: React.CSSProperties;
  enableSwipe?: boolean;
  showArrows?: boolean;
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

const CarGallery: React.FC<CarGalleryProps> = ({ 
  photos, 
  className = "", 
  style = {},
  enableSwipe = true,
  showArrows = true,
  autoSlide = false,
  autoSlideInterval = 4000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isMobile = useIsMobile();

  // Filtrer les photos valides avec useMemo pour éviter les recalculs
  const validPhotos = useMemo(() => {
    return photos?.filter(photo => 
      photo && photo.photo_url && typeof photo.photo_url === 'string'
    ) || [];
  }, [photos]);

  const swipeGallery = useSwipeGallery({
    photosLength: validPhotos.length,
    isAnimating,
    setIsAnimating,
    setCurrentIndex,
    setPaused: setIsPaused
  });

  useAutoSlide({
    autoSlide,
    photosLength: validPhotos.length,
    isPaused,
    autoSlideInterval,
    currentIndex,
    goToNext: swipeGallery.goToNext
  });

  // Reset index if photos change
  useEffect(() => {
    if (currentIndex >= validPhotos.length && validPhotos.length > 0) {
      setCurrentIndex(0);
    }
  }, [validPhotos.length, currentIndex]);

  // Pause le diaporama au survol (desktop) ou lors d'interaction (mobile)
  const handleMouseEnter = () => {
    if (!isMobile) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setIsPaused(false);
  };

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
      onTouchStart={enableSwipe ? swipeGallery.onTouchStart : undefined}
      onTouchMove={enableSwipe ? swipeGallery.onTouchMove : undefined}
      onTouchEnd={enableSwipe ? swipeGallery.onTouchEnd : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <GallerySlides
        photos={validPhotos}
        getTransformValue={swipeGallery.getTransformValue}
        currentIndex={currentIndex}
        isDragging={swipeGallery.isDragging}
      />

      <GalleryNavigation
        showArrows={showArrows}
        isMobile={isMobile}
        photosLength={validPhotos.length}
        isAnimating={isAnimating}
        goToPrevious={swipeGallery.goToPrevious}
        goToNext={swipeGallery.goToNext}
      />

      <GalleryIndicators
        photosLength={validPhotos.length}
        currentIndex={currentIndex}
        isAnimating={isAnimating}
        setCurrentIndex={setCurrentIndex}
        setIsAnimating={setIsAnimating}
        setPaused={setIsPaused}
      />
    </div>
  );
};

export default React.memo(CarGallery);
