
import { useCallback } from 'react';

interface SmoothScrollOptions {
  offset?: number;
  animationDuration?: number;
}

export const useSmoothScroll = () => {
  const scrollToElement = useCallback((elementId: string, options: SmoothScrollOptions = {}) => {
    const { offset = 0, animationDuration = 1000 } = options;
    
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // Animation de la section cible
    setTimeout(() => {
      element.classList.add('highlight-section');
      
      // Retirer la classe après la fin de l'animation
      setTimeout(() => {
        element.classList.remove('highlight-section');
      }, animationDuration);
    }, 500); // Délai avant de démarrer l'animation pour laisser le temps au scroll de se terminer
  }, []);

  return { scrollToElement };
};
