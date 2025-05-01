
import React from "react";

interface ErrorStateProps {
  error: string | null;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="text-red-500 mb-4 text-xl">Erreur de chargement</div>
      <p className="text-gray-600 mb-4">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
      >
        Rafraîchir la page
      </button>
    </div>
  );
};

export default ErrorState;
