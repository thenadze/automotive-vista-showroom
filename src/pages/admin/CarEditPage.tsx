
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
  const { isAdmin, loading: authLoading } = useAdminAuth();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Si en mode édition, charger les données de la voiture
    const fetchCar = async () => {
      if (isEditMode && id) {
        try {
          setLoading(true);
          // @ts-ignore
          const { data, error } = await supabase
            .from('cars')
            .select('*')
            .eq('id', id)
            .single();

          if (error) {
            throw error;
          }

          if (data) {
            setCar(data as Car);
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
  }, [id, isAdmin, isEditMode, navigate, toast]);

  const handleSuccess = () => {
    navigate('/admin');
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Redirection gérée par useAdminAuth
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
