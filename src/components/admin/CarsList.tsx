
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Car, CarBrand, FuelType, TransmissionType } from "@/types";
import { Edit, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CarsListProps {
  cars: Car[];
  brands: CarBrand[];
  fuelTypes: FuelType[];
  transmissions: TransmissionType[];
  onCarsChange: () => void;
}

/**
 * Composant affichant la liste des voitures avec options d'édition et de suppression
 */
const CarsList: React.FC<CarsListProps> = ({ 
  cars, 
  brands, 
  fuelTypes, 
  transmissions,
  onCarsChange
}) => {
  const [loading, setLoading] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Récupérer le nom de la marque par ID
  const getBrandName = (brandId: number) => {
    return brands.find(brand => brand.id === brandId)?.name || 'Inconnu';
  };
  
  // Récupérer le nom du type de carburant par ID
  const getFuelTypeName = (fuelTypeId: number) => {
    return fuelTypes.find(fuel => fuel.id === fuelTypeId)?.name || 'Inconnu';
  };
  
  // Récupérer le nom du type de transmission par ID
  const getTransmissionName = (transmissionId: number) => {
    return transmissions.find(trans => trans.id === transmissionId)?.name || 'Inconnu';
  };
  
  // Gérer la suppression d'une voiture
  const handleDelete = async (carId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette voiture ? Cette action est irréversible.')) {
      try {
        setLoading(carId);
        
        // Supprimer d'abord les photos dans car_photos
        // @ts-ignore
        const { error: photosError } = await supabase
          .from('car_photos')
          .delete()
          .eq('car_id', carId);
          
        if (photosError) throw photosError;
        
        // Ensuite supprimer la voiture elle-même
        // @ts-ignore
        const { error: carError } = await supabase
          .from('cars')
          .delete()
          .eq('id', carId);
          
        if (carError) throw carError;
        
        toast({
          title: "Voiture supprimée",
          description: "La voiture a été supprimée avec succès.",
        });
        
        // Rafraîchir la liste des voitures
        onCarsChange();
      } catch (error: any) {
        console.error('Erreur lors de la suppression:', error);
        toast({
          title: "Erreur",
          description: error.message || "Une erreur s'est produite lors de la suppression.",
          variant: "destructive",
        });
      } finally {
        setLoading(null);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Liste des voitures</h2>
        <Button onClick={() => navigate('/admin/car/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une voiture
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Année</TableHead>
              <TableHead>Marque</TableHead>
              <TableHead>Modèle</TableHead>
              <TableHead>Carburant</TableHead>
              <TableHead>Boîte de vitesse</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  Aucune voiture enregistrée
                </TableCell>
              </TableRow>
            ) : (
              cars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell>{car.year}</TableCell>
                  <TableCell>{getBrandName(car.brand_id)}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{getFuelTypeName(car.fuel_type_id)}</TableCell>
                  <TableCell>{getTransmissionName(car.transmission_id)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/car/${car.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(car.id)}
                      disabled={loading === car.id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CarsList;
