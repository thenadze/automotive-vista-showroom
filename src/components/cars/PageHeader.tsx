
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export const PageHeader = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-2">
        <Link to="/">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            Retour à l'accueil
          </Button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold">Catalogue des véhicules</h1>
    </div>
  );
};
