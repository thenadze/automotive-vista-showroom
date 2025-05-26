
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
  return (
    <div className="relative group">
      <img
        src={preview}
        alt={`${isExisting ? 'Photo existante' : 'Aperçu'} ${index + 1}`}
        className="h-24 w-full object-cover rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
      />
      
      {isExisting && (
        <span className="absolute top-1.5 left-1.5 bg-gray-900 bg-opacity-90 text-white px-2 py-1 text-xs font-medium rounded">
          Existante
        </span>
      )}
      
      {!disabled && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="absolute top-1.5 right-1.5 p-1.5 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg hover:bg-red-600 hover:scale-110"
          title="Supprimer"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};

export default PhotoPreview;
