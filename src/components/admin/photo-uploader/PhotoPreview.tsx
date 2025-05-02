
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
        className="h-24 w-full object-cover rounded-md"
      />
      
      {isExisting && (
        <span className="absolute top-0 left-0 bg-gray-900 bg-opacity-75 text-white px-2 py-1 text-xs rounded-br-md">
          Existante
        </span>
      )}
      
      {!disabled && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
          title="Supprimer"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default PhotoPreview;
