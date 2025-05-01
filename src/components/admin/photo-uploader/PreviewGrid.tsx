
import React from 'react';
import PhotoPreview from './PhotoPreview';

interface PreviewGridProps {
  existingPhotos?: string[];
  previews: string[];
  onRemove: (index: number) => void;
  disabled?: boolean;
}

/**
 * Grid component to display photo previews
 */
const PreviewGrid: React.FC<PreviewGridProps> = ({
  existingPhotos = [],
  previews,
  onRemove,
  disabled = false,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {/* Photos existantes */}
      {existingPhotos?.map((photoUrl, index) => (
        <PhotoPreview
          key={`existing-${index}`}
          preview={photoUrl}
          index={index}
          disabled={disabled}
          onRemove={onRemove}
          isExisting={true}
        />
      ))}
      
      {/* Prévisualisations des nouvelles photos */}
      {previews.map((preview, index) => (
        <PhotoPreview
          key={`preview-${index}`}
          preview={preview}
          index={index}
          disabled={disabled}
          onRemove={onRemove}
          isExisting={false}
        />
      ))}
    </div>
  );
};

export default PreviewGrid;
