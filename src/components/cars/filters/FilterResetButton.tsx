
import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface FilterResetButtonProps {
  onClick: () => void;
}

export const FilterResetButton: React.FC<FilterResetButtonProps> = ({ onClick }) => {
  return (
    <Button 
      onClick={onClick}
      variant="outline"
      className="flex items-center gap-2"
    >
      <RotateCcw className="h-4 w-4" />
      Réinitialiser
    </Button>
  );
};
