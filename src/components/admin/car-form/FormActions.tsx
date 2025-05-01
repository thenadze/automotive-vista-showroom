
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  loading: boolean;
  isEditMode: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ loading, isEditMode }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-end space-x-4 pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate("/admin")}
        disabled={loading}
      >
        Annuler
      </Button>
      <Button type="submit" disabled={loading}>
        {loading ? "Enregistrement..." : isEditMode ? "Mettre à jour" : "Ajouter la voiture"}
      </Button>
    </div>
  );
};

export default FormActions;
