
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
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
        disabled 
          ? 'bg-gray-100 border-gray-300' 
          : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
      }`}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <Image className="mx-auto h-12 w-12 text-gray-400 transition-transform duration-300 hover:scale-110" />
      <div className="mt-4">
        <p className="text-base text-gray-600 font-medium">
          Glissez-déposez des photos ici, ou
        </p>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="mt-4 text-base px-6 py-3 font-medium transition-all duration-200 hover:scale-105"
          onClick={onClick}
          disabled={disabled}
        >
          <Plus className="mr-2 h-5 w-5" />
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
      <p className="mt-4 text-sm text-gray-500">
        PNG, JPG ou JPEG
      </p>
    </div>
  );
};

export default DropZone;
