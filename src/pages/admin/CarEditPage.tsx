
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import CarForm from '@/components/admin/CarForm';
import { Car } from '@/types';

/**
 * Page d'édition ou de création d'une voiture
 */
const CarEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = id !== 'new';
  const { isAdmin, loading: authLoading, isInitialized } = useAdminAuth();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Ne charger les données que si l'utilisateur est admin et que l'authentification est initialisée
    if (!isInitialized) return;
    if (!isAdmin) return;

    // Si en mode édition, charger les données de la voiture
    const fetchCar = async () => {
      if (isEditMode && id) {
        try {
          setLoading(true);
          const { data, error } = await supabase
            .from('cars')
            .select('*')
            .eq('id', id)
            .single();

          if (error) {
            throw error;
          }

          if (data) {
            // Convertir explicitement les données pour correspondre à l'interface Car
            const carData: Car = {
              id: data.id,
              year: data.year,
              brand_id: data.brand_id,
              model: data.model,
              fuel_type_id: data.fuel_type_id,
              transmission_id: data.transmission_id,
              created_at: data.created_at,
              updated_at: data.updated_at
            };
            setCar(carData);
          } else {
            toast({
              title: 'Erreur',
              description: 'Voiture non trouvée',
              variant: 'destructive',
            });
            navigate('/admin');
          }
        } catch (error: any) {
          console.error('Erreur lors du chargement de la voiture:', error);
          toast({
            title: 'Erreur',
            description: error.message || 'Une erreur s\'est produite lors du chargement de la voiture.',
            variant: 'destructive',
          });
          navigate('/admin');
        } finally {
          setLoading(false);
        }
      }
    };

    if (isAdmin) {
      fetchCar();
    }
  }, [id, isAdmin, isEditMode, navigate, toast, isInitialized]);

  const handleSuccess = () => {
    navigate('/admin');
  };

  // Afficher un indicateur de chargement pendant l'initialisation de l'authentification
  if (authLoading || !isInitialized) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas admin et que l'authentification est initialisée, ne rien rendre
  // La redirection est gérée par useAdminAuth
  if (!isAdmin && isInitialized) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          {isEditMode ? 'Modifier la voiture' : 'Ajouter une nouvelle voiture'}
        </h1>
        <p className="text-gray-600 mt-2">
          {isEditMode
            ? 'Modifiez les informations de la voiture ci-dessous.'
            : 'Remplissez le formulaire pour ajouter une nouvelle voiture.'}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <CarForm car={car || undefined} onSuccess={handleSuccess} />
      )}
    </div>
  );
};

export default CarEditPage;
