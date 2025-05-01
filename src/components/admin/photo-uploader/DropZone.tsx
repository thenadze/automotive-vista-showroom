
import React from 'react';
import { Button } from "@/components/ui/button";
import { Image, Plus } from "lucide-react";

interface DropZoneProps {
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onClick: () => void;
  disabled?: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Component for drag and drop file upload zone
 */
const DropZone: React.FC<DropZoneProps> = ({
  onDragOver,
  onDrop,
  onClick,
  disabled = false,
  fileInputRef,
  onFileChange,
}) => {
  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center ${
        disabled ? 'bg-gray-100 border-gray-300' : 'border-gray-300 hover:border-blue-500'
      }`}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <Image className="mx-auto h-12 w-12 text-gray-400" />
      <div className="mt-2">
        <p className="text-sm text-gray-600">
          Glissez-déposez des photos ici, ou
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={onClick}
          disabled={disabled}
        >
          <Plus className="mr-2 h-4 w-4" />
          Parcourir
        </Button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={onFileChange}
        className="hidden"
        disabled={disabled}
      />
      <p className="mt-2 text-xs text-gray-500">
        PNG, JPG ou JPEG jusqu'à 5MB
      </p>
    </div>
  );
};

export default DropZone;
