
import React from 'react';
import { Trash2 } from "lucide-react";

interface PhotoPreviewProps {
  preview: string;
  index: number;
  disabled?: boolean;
  onRemove: (index: number) => void;
  isExisting?: boolean;
}

/**
 * Component to display a photo preview with delete button
 */
const PhotoPreview: React.FC<PhotoPreviewProps> = ({
  preview,
  index,
  disabled = false,
  onRemove,
  isExisting = false,
}) => {
  console.log('PhotoPreview rendering:', { index, isExisting });
  
  return (
    <div className="relative group">
      <img
        src={preview}
        alt={`${isExisting ? 'Photo existante' : 'Aperçu'} ${index + 1}`}
        className="h-32 w-full object-cover rounded-lg"
      />
      
      {isExisting && (
        <span className="absolute top-2 left-2 bg-gray-900 bg-opacity-95 text-white px-3 py-1.5 text-sm font-semibold rounded-md">
          Existante
        </span>
      )}
      
      {!disabled && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="absolute top-2 right-2 p-2.5 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
          title="Supprimer"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default PhotoPreview;
