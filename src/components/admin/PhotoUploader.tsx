
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Image, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PhotoUploaderProps {
  onChange: (files: File[]) => void;
  existingPhotos?: string[];
  disabled?: boolean;
}

/**
 * Composant pour télécharger des photos avec prévisualisation et drag & drop
 */
const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  onChange,
  existingPhotos = [],
  disabled = false,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Appelé quand l'utilisateur sélectionne des fichiers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const newFiles = Array.from(e.target.files);
    
    // Vérifier la taille des fichiers (max 5MB par fichier)
    const oversizedFiles = newFiles.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast({
        title: "Fichiers trop volumineux",
        description: "Certains fichiers dépassent la limite de 5MB.",
        variant: "destructive",
      });
      return;
    }
    
    // Vérifier le type de fichier (uniquement les images)
    const invalidFiles = newFiles.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      toast({
        title: "Format non supporté",
        description: "Veuillez sélectionner uniquement des fichiers image (JPEG, PNG, etc.).",
        variant: "destructive",
      });
      return;
    }
    
    // Mettre à jour les fichiers sélectionnés
    const updatedFiles = [...selectedFiles, ...newFiles];
    setSelectedFiles(updatedFiles);
    
    // Mettre à jour les aperçus
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    
    // Notifier le parent du changement
    onChange(updatedFiles);
    
    // Réinitialiser l'élément input pour permettre de sélectionner à nouveau les mêmes fichiers
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Gérer la suppression d'une photo
  const handleRemove = (index: number) => {
    setSelectedFiles(files => {
      const updatedFiles = [...files];
      updatedFiles.splice(index, 1);
      onChange(updatedFiles);
      return updatedFiles;
    });
    
    setPreviews(prevs => {
      const updatedPreviews = [...prevs];
      URL.revokeObjectURL(updatedPreviews[index]); // Libérer l'URL de l'objet
      updatedPreviews.splice(index, 1);
      return updatedPreviews;
    });
  };
  
  // Gérer le drag & drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      
      // Simuler la vérification de la taille et du type comme dans handleFileChange
      const oversizedFiles = droppedFiles.filter(file => file.size > 5 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        toast({
          title: "Fichiers trop volumineux",
          description: "Certains fichiers dépassent la limite de 5MB.",
          variant: "destructive",
        });
        return;
      }
      
      const invalidFiles = droppedFiles.filter(file => !file.type.startsWith('image/'));
      if (invalidFiles.length > 0) {
        toast({
          title: "Format non supporté",
          description: "Veuillez sélectionner uniquement des fichiers image (JPEG, PNG, etc.).",
          variant: "destructive",
        });
        return;
      }
      
      const updatedFiles = [...selectedFiles, ...droppedFiles];
      setSelectedFiles(updatedFiles);
      
      const newPreviews = droppedFiles.map(file => URL.createObjectURL(file));
      setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
      
      onChange(updatedFiles);
    }
  };

  // Libérer les URL des objets lors du démontage du composant
  React.useEffect(() => {
    return () => {
      previews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  return (
    <div className="space-y-4">
      {/* Zone de drop */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          disabled ? 'bg-gray-100 border-gray-300' : 'border-gray-300 hover:border-blue-500'
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
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
            onClick={() => fileInputRef.current?.click()}
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
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />
        <p className="mt-2 text-xs text-gray-500">
          PNG, JPG ou JPEG jusqu'à 5MB
        </p>
      </div>
      
      {/* Prévisualisations */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {/* Photos existantes */}
        {existingPhotos?.map((photoUrl, index) => (
          <div key={`existing-${index}`} className="relative">
            <img
              src={photoUrl}
              alt={`Photo existante ${index + 1}`}
              className="h-24 w-full object-cover rounded-md"
            />
            <span className="absolute top-0 left-0 bg-gray-900 bg-opacity-75 text-white px-2 py-1 text-xs rounded-br-md">
              Existante
            </span>
          </div>
        ))}
        
        {/* Prévisualisations des nouvelles photos */}
        {previews.map((preview, index) => (
          <div key={`preview-${index}`} className="relative group">
            <img
              src={preview}
              alt={`Aperçu ${index + 1}`}
              className="h-24 w-full object-cover rounded-md"
            />
            {!disabled && (
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                title="Supprimer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoUploader;
