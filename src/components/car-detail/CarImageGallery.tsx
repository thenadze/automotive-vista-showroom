
import React, { useState, useEffect } from "react";
import { CarPhoto } from "@/types";

interface CarImageGalleryProps {
  photos: CarPhoto[] | undefined;
  brandName: string;
  model: string;
}

const CarImageGallery: React.FC<CarImageGalleryProps> = ({ photos, brandName, model }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [validPhotos, setValidPhotos] = useState<CarPhoto[]>([]);
  
  // Filtrer les photos valides et les mettre à jour quand photos change
  useEffect(() => {
    if (photos && photos.length > 0) {
      const filtered = photos.filter(photo => photo && photo.photo_url);
      console.log("Filtered valid photos:", filtered);
      setValidPhotos(filtered);
    } else {
      setValidPhotos([]);
    }
    setCurrentImageIndex(0);
  }, [photos]);
  
  const handlePrevImage = () => {
    if (validPhotos.length === 0) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? validPhotos.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    if (validPhotos.length === 0) return;
    setCurrentImageIndex((prev) => 
      prev === validPhotos.length - 1 ? 0 : prev + 1
    );
  };

  console.log("CarImageGallery rendering with:", { 
    validPhotosCount: validPhotos.length, 
    currentIndex: currentImageIndex,
    currentPhotoUrl: validPhotos[currentImageIndex]?.photo_url || "none"
  });
  
  return (
    <div className="relative h-96">
      {validPhotos.length > 0 ? (
        <>
          <img
            src={validPhotos[currentImageIndex]?.photo_url}
            alt={`${brandName} ${model}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error("Error loading image:", validPhotos[currentImageIndex]?.photo_url);
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          
          {validPhotos.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white p-2 rounded-full"
                aria-label="Photo précédente"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white p-2 rounded-full"
                aria-label="Photo suivante"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          
          {/* Thumbnail navigation */}
          {validPhotos.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {validPhotos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentImageIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                  aria-label={`Aller à la photo ${index + 1}`}
                ></button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Aucune photo disponible</p>
        </div>
      )}
    </div>
  );
};

export default CarImageGallery;
