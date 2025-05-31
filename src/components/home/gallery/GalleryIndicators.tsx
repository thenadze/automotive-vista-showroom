
import React from "react";

interface GalleryIndicatorsProps {
  photosLength: number;
  currentIndex: number;
  isAnimating: boolean;
  setCurrentIndex: (index: number) => void;
  setIsAnimating: (value: boolean) => void;
  setPaused: (paused: boolean) => void;
}

const GalleryIndicators: React.FC<GalleryIndicatorsProps> = ({
  photosLength,
  currentIndex,
  isAnimating,
  setCurrentIndex,
  setIsAnimating,
  setPaused
}) => {
  if (photosLength <= 1) {
    return null;
  }

  const handleIndicatorClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(index);
      setPaused(false);
      setTimeout(() => setIsAnimating(false), 400);
    }
  };

  return (
    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
      {Array.from({ length: photosLength }, (_, index) => (
        <button
          key={index}
          onClick={(e) => handleIndicatorClick(index, e)}
          className={`w-2 h-2 rounded-full transition-all ${
            index === currentIndex 
              ? 'bg-white' 
              : 'bg-white bg-opacity-50'
          }`}
          aria-label={`Aller à la photo ${index + 1}`}
          disabled={isAnimating}
        />
      ))}
    </div>
  );
};

export default React.memo(GalleryIndicators);
