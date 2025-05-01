
import React from 'react';
import DropZone from './DropZone';
import PreviewGrid from './PreviewGrid';
import { usePhotoUploader } from './usePhotoUploader';

interface PhotoUploaderProps {
  onChange: (files: File[]) => void;
  existingPhotos?: string[];
  disabled?: boolean;
}

/**
 * Main component for uploading photos with preview and drag & drop
 */
const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  onChange,
  existingPhotos = [],
  disabled = false,
}) => {
  const {
    previews,
    fileInputRef,
    handleFileChange,
    handleRemove,
    handleDragOver,
    handleDrop
  } = usePhotoUploader(onChange, disabled);

  return (
    <div className="space-y-4">
      {/* Zone de drop */}
      <DropZone
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        fileInputRef={fileInputRef}
        onFileChange={handleFileChange}
      />
      
      {/* Prévisualisations */}
      <PreviewGrid
        existingPhotos={existingPhotos}
        previews={previews}
        onRemove={handleRemove}
        disabled={disabled}
      />
    </div>
  );
};

export default PhotoUploader;
