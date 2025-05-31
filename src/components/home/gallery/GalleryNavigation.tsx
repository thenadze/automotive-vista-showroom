
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryNavigationProps {
  showArrows: boolean;
  isMobile: boolean;
  photosLength: number;
  isAnimating: boolean;
  goToPrevious: () => void;
  goToNext: () => void;
}

const GalleryNavigation: React.FC<GalleryNavigationProps> = ({
  showArrows,
  isMobile,
  photosLength,
  isAnimating,
  goToPrevious,
  goToNext
}) => {
  if (!showArrows || isMobile || photosLength <= 1) {
    return null;
  }

  const handlePreviousClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    goToPrevious();
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    goToNext();
  };

  return (
    <>
      <button
        onClick={handlePreviousClick}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
        aria-label="Photo précédente"
        disabled={isAnimating}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={handleNextClick}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all z-10"
        aria-label="Photo suivante"
        disabled={isAnimating}
      >
        <ChevronRight size={20} />
      </button>
    </>
  );
};

export default React.memo(GalleryNavigation);
