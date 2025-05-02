
import React, { useState } from 'react';
import DropZone from './DropZone';
import PreviewGrid from './PreviewGrid';
import { usePhotoUploader } from './usePhotoUploader';

interface PhotoUploaderProps {
  onChange: (files: File[]) => void;
  existingPhotos?: string[];
  onRemoveExisting?: (photoUrl: string) => void;
  disabled?: boolean;
}

/**
 * Main component for uploading photos with preview and drag & drop
 */
const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  onChange,
  existingPhotos = [],
  onRemoveExisting,
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

  const handleRemoveExisting = (index: number) => {
    if (disabled || !onRemoveExisting) return;
    onRemoveExisting(existingPhotos[index]);
  };

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
        onRemoveExisting={handleRemoveExisting}
        disabled={disabled}
      />
    </div>
  );
};

export default PhotoUploader;
