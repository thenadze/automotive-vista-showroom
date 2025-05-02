
import React, { useState } from "react";
import { CarPhoto } from "@/types";

interface CarImageGalleryProps {
  photos: CarPhoto[] | undefined;
  brandName: string;
  model: string;
}

const CarImageGallery: React.FC<CarImageGalleryProps> = ({ photos, brandName, model }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const handlePrevImage = () => {
    if (!photos?.length) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? photos.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    if (!photos?.length) return;
    setCurrentImageIndex((prev) => 
      prev === photos.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative h-96">
      {photos && photos.length > 0 ? (
        <>
          <img
            src={photos[currentImageIndex]?.photo_url || "/placeholder.svg"}
            alt={`${brandName} ${model}`}
            className="w-full h-full object-cover"
          />
          
          {photos.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white p-2 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white p-2 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          
          {/* Thumbnail navigation */}
          {photos.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentImageIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
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
