
import React, { useState } from "react";
import { Car } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";

interface FeaturedTabProps {
  cars: Car[];
  onCarsChange: () => Promise<any>;
}

const FeaturedTab: React.FC<FeaturedTabProps> = ({ cars, onCarsChange }) => {
  // Sort cars by display_order, handling undefined values
  const [orderedCars, setOrderedCars] = useState<Car[]>(
    [...cars].sort((a, b) => {
      // If both have display_order, compare them
      if (a.display_order !== undefined && b.display_order !== undefined) {
        return a.display_order - b.display_order;
      }
      // If only a has display_order, it comes first
      if (a.display_order !== undefined) {
        return -1;
      }
      // If only b has display_order, it comes first
      if (b.display_order !== undefined) {
        return 1;
      }
      // If neither has display_order, sort by created_at (newest first)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    })
  );
  
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { toast } = useToast();

  const handleDragEnd = (result: any) => {
    // Abandon if dropped outside the list
    if (!result.destination) {
      return;
    }

    // Don't reorder if dropped in the same position
    if (result.destination.index === result.source.index) {
      return;
    }

    // Create a copy of cars
    const updatedCars = Array.from(orderedCars);
    
    // Remove the dragged item
    const [removed] = updatedCars.splice(result.source.index, 1);
    
    // Insert it at the new position
    updatedCars.splice(result.destination.index, 0, removed);

    // Update state with new order
    setOrderedCars(updatedCars);
  };

  const saveDisplayOrder = async () => {
    try {
      setIsUpdating(true);
      
      // Update display order for each car
      const updates = orderedCars.map((car, index) => {
        return supabase
          .from("cars")
          .update({ display_order: index + 1 })
          .eq("id", car.id);
      });
      
      // Execute all updates
      await Promise.all(updates);
      
      toast({
        title: "Ordre sauvegardé",
        description: "L'ordre d'affichage des véhicules a été mis à jour",
      });
      
      // Refresh cars data
      await onCarsChange();
      
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour de l'ordre:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'ordre d'affichage",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Véhicules à la une</h2>
        <Button 
          onClick={saveDisplayOrder}
          disabled={isUpdating}
        >
          {isUpdating ? "Sauvegarde en cours..." : "Sauvegarder l'ordre"}
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-sm text-gray-500 mb-4">
          Faites glisser les véhicules pour changer leur ordre d'affichage sur la page d'accueil.
        </p>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="carsList">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {orderedCars.map((car, index) => (
                  <Draggable key={car.id} draggableId={car.id} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="border border-gray-200"
                      >
                        <CardContent className="p-3 flex items-center">
                          <div 
                            {...provided.dragHandleProps}
                            className="mr-3 cursor-grab"
                          >
                            <GripVertical className="text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <span className="text-gray-500 text-sm mr-2">#{index + 1}</span>
                            <span className="font-medium">
                              {car.brand_id} {car.model} ({car.year})
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default FeaturedTab;
