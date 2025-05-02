
import React from "react";
import { Link } from "react-router-dom";

interface CarDetailHeaderProps {
  brandName: string;
  model: string;
  year: number;
}

const CarDetailHeader: React.FC<CarDetailHeaderProps> = ({ brandName, model, year }) => {
  return (
    <>
      <div className="mb-4">
        <Link to="/cars" className="text-blue-600 hover:underline flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour au catalogue
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-2">
        {brandName} {model} ({year})
      </h1>
    </>
  );
};

export default CarDetailHeader;
