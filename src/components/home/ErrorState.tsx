
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface ErrorStateProps {
  error: string | null;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 p-6 bg-red-50 border border-red-100 rounded-lg">
      <div className="text-red-600 mb-4 text-xl font-semibold">Erreur de chargement</div>
      <p className="text-gray-700 mb-6 text-center">
        {error || "Une erreur s'est produite lors du chargement des données."}
      </p>
      <Button 
        onClick={() => window.location.reload()}
        variant="outline"
        className="flex items-center gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        Rafraîchir la page
      </Button>
    </div>
  );
};

export default ErrorState;
