
import { useToast } from "@/hooks/use-toast";

/**
 * Interface for photo validation options
 */
export interface PhotoValidationOptions {
  maxSizeInMB?: number;
  allowedTypes?: string[];
}

/**
 * Default validation options for photos
 */
const defaultValidationOptions: PhotoValidationOptions = {
  maxSizeInMB: 5,
  allowedTypes: ['image/'],
};

/**
 * Validates a list of files against size and type constraints
 * @param files List of files to validate
 * @param toast Toast function for error messages
 * @param options Validation options
 * @returns Boolean indicating if all files are valid
 */
export const validateFiles = (
  files: File[], 
  toast: ReturnType<typeof useToast>['toast'],
  options: PhotoValidationOptions = defaultValidationOptions
): boolean => {
  const { maxSizeInMB = 5, allowedTypes = ['image/'] } = options;
  
  // Verify file sizes
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  const oversizedFiles = files.filter(file => file.size > maxSizeInBytes);
  if (oversizedFiles.length > 0) {
    toast({
      title: "Fichiers trop volumineux",
      description: `Certains fichiers dépassent la limite de ${maxSizeInMB}MB.`,
      variant: "destructive",
    });
    return false;
  }
  
  // Verify file types
  const invalidFiles = files.filter(file => 
    !allowedTypes.some(type => file.type.startsWith(type))
  );
  if (invalidFiles.length > 0) {
    toast({
      title: "Format non supporté",
      description: "Veuillez sélectionner uniquement des fichiers image (JPEG, PNG, etc.).",
      variant: "destructive",
    });
    return false;
  }
  
  return true;
};
