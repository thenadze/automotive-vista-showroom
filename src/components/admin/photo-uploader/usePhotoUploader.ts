
import { useState, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { validateFiles } from './utils/photoValidation';

/**
 * Custom hook for handling photo upload functionality
 */
export const usePhotoUploader = (
  onChange: (files: File[]) => void,
  disabled: boolean = false
) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      previews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || disabled) return;
    
    const newFiles = Array.from(e.target.files);
    
    if (!validateFiles(newFiles, toast)) return;
    
    // Update selected files
    const updatedFiles = [...selectedFiles, ...newFiles];
    setSelectedFiles(updatedFiles);
    
    // Update previews
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    
    // Notify parent component
    onChange(updatedFiles);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Handle file removal
  const handleRemove = (index: number) => {
    if (disabled) return;

    setSelectedFiles(files => {
      const updatedFiles = [...files];
      updatedFiles.splice(index, 1);
      onChange(updatedFiles);
      return updatedFiles;
    });
    
    setPreviews(prevs => {
      const updatedPreviews = [...prevs];
      URL.revokeObjectURL(updatedPreviews[index]); // Free memory
      updatedPreviews.splice(index, 1);
      return updatedPreviews;
    });
  };
  
  // Handle drag & drop events
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
      
      if (!validateFiles(droppedFiles, toast)) return;
      
      const updatedFiles = [...selectedFiles, ...droppedFiles];
      setSelectedFiles(updatedFiles);
      
      const newPreviews = droppedFiles.map(file => URL.createObjectURL(file));
      setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
      
      onChange(updatedFiles);
    }
  };
  
  return {
    selectedFiles,
    previews,
    fileInputRef,
    handleFileChange,
    handleRemove,
    handleDragOver,
    handleDrop
  };
};
