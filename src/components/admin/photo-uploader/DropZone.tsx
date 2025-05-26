
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
  console.log('DropZone rendering on mobile');
  
  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        disabled ? 'bg-gray-100 border-gray-300' : 'border-gray-300 hover:border-blue-500'
      }`}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <Image className="mx-auto h-16 w-16 text-gray-400" />
      <div className="mt-6">
        <p className="text-base text-gray-600 font-medium leading-relaxed">
          Glissez-déposez des photos ici, ou
        </p>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="mt-6 text-base px-8 py-4 font-medium h-auto"
          onClick={onClick}
          disabled={disabled}
        >
          <Plus className="mr-3 h-5 w-5" />
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
      <p className="mt-6 text-sm text-gray-500 font-medium">
        PNG, JPG ou JPEG
      </p>
    </div>
  );
};

export default DropZone;
