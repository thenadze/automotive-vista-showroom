
import { useEffect, useRef } from 'react';

interface UseAutoSlideProps {
  autoSlide: boolean;
  photosLength: number;
  isPaused: boolean;
  autoSlideInterval: number;
  currentIndex: number;
  goToNext: () => void;
}

export const useAutoSlide = ({
  autoSlide,
  photosLength,
  isPaused,
  autoSlideInterval,
  currentIndex,
  goToNext
}: UseAutoSlideProps) => {
  const autoSlideIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!autoSlide || photosLength <= 1 || isPaused) {
      if (autoSlideIntervalRef.current) {
        clearInterval(autoSlideIntervalRef.current);
        autoSlideIntervalRef.current = null;
      }
      return;
    }

    autoSlideIntervalRef.current = setInterval(() => {
      goToNext();
    }, autoSlideInterval);

    return () => {
      if (autoSlideIntervalRef.current) {
        clearInterval(autoSlideIntervalRef.current);
        autoSlideIntervalRef.current = null;
      }
    };
  }, [autoSlide, photosLength, isPaused, autoSlideInterval, currentIndex, goToNext]);

  useEffect(() => {
    return () => {
      if (autoSlideIntervalRef.current) {
        clearInterval(autoSlideIntervalRef.current);
      }
    };
  }, []);
};
