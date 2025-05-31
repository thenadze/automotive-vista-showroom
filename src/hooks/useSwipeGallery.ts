
import { useState, useCallback } from 'react';

interface UseSwipeGalleryProps {
  photosLength: number;
  currentIndex: number;
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
  setCurrentIndex: (index: number) => void;
  setPaused: (paused: boolean) => void;
}

export const useSwipeGallery = ({
  photosLength,
  currentIndex,
  isAnimating,
  setIsAnimating,
  setCurrentIndex,
  setPaused
}: UseSwipeGalleryProps) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const minSwipeDistance = 50;

  const goToNext = useCallback(() => {
    if (isAnimating || photosLength <= 1) return;
    setIsAnimating(true);
    const nextIndex = (currentIndex + 1) % photosLength;
    setCurrentIndex(nextIndex);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, photosLength, currentIndex, setIsAnimating, setCurrentIndex]);

  const goToPrevious = useCallback(() => {
    if (isAnimating || photosLength <= 1) return;
    setIsAnimating(true);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : photosLength - 1;
    setCurrentIndex(prevIndex);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, photosLength, currentIndex, setIsAnimating, setCurrentIndex]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (photosLength <= 1) return;
    setPaused(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    setIsAnimating(false);
  }, [photosLength, setPaused, setIsAnimating]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStart || !isDragging || photosLength <= 1) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    
    const offset = currentTouch - touchStart;
    setDragOffset(offset);
  }, [touchStart, isDragging, photosLength]);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd || photosLength <= 1) return;
    
    setIsDragging(false);
    setDragOffset(0);
    setPaused(false);
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    } else {
      if (Math.abs(distance) > 10) {
        const bounceClass = distance > 0 ? 'bounce-left' : 'bounce-right';
        const galleryElement = document.querySelector('.swipe-gallery');
        if (galleryElement) {
          galleryElement.classList.add(bounceClass);
          setTimeout(() => {
            galleryElement.classList.remove(bounceClass);
          }, 300);
        }
      }
    }
  }, [touchStart, touchEnd, photosLength, setPaused, goToNext, goToPrevious]);

  const getTransformValue = useCallback((currentIndex: number) => {
    const baseTransform = -currentIndex * 100;
    if (isDragging) {
      const dragPercent = (dragOffset / window.innerWidth) * 100;
      return baseTransform + dragPercent;
    }
    return baseTransform;
  }, [isDragging, dragOffset]);

  return {
    touchStart,
    touchEnd,
    isDragging,
    dragOffset,
    goToNext,
    goToPrevious,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    getTransformValue
  };
};
