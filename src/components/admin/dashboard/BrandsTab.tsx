
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CarBrand } from "@/types";

// Schéma de validation pour le formulaire de marque
const brandFormSchema = z.object({
  name: z.string().min(1, "Le nom de la marque est requis"),
});

interface BrandsTabProps {
  brands: CarBrand[];
  loading: boolean;
  onBrandsChange: () => Promise<any>;
}

const BrandsTab: React.FC<BrandsTabProps> = ({ brands, loading: parentLoading, onBrandsChange }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Formulaire pour ajouter une marque
  const brandForm = useForm<z.infer<typeof brandFormSchema>>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      name: "",
    },
  });

  // Soumettre le formulaire de marque
  const onSubmitBrand = async (values: z.infer<typeof brandFormSchema>) => {
    try {
      setLoading(true);
      // @ts-ignore
      const { error } = await supabase
        .from("car_brands")
        .insert([{ name: values.name }]);
        
      if (error) throw error;
      
      toast({
        title: "Marque ajoutée",
        description: `La marque ${values.name} a été ajoutée avec succès.`,
      });
      
      brandForm.reset();
      onBrandsChange();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite lors de l'ajout de la marque.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Supprimer une marque
  const handleDeleteBrand = async (id: number) => {
    try {
      if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette marque ? Cette action peut affecter les voitures associées.")) {
        return;
      }
      
      setLoading(true);
      // @ts-ignore
      const { error } = await supabase
        .from("car_brands")
        .delete()
        .eq("id", id);
        
      if (error) throw error;
      
      toast({
        title: "Marque supprimée",
        description: "La marque a été supprimée avec succès.",
      });
      
      onBrandsChange();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite lors de la suppression de la marque.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Ajouter une marque</h2>
        
        <Form {...brandForm}>
          <form onSubmit={brandForm.handleSubmit(onSubmitBrand)} className="space-y-4">
            <FormField
              control={brandForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de la marque</FormLabel>
                  <FormControl>
                    <Input placeholder="Toyota" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={loading || parentLoading}>
              {loading ? "Ajout en cours..." : "Ajouter"}
            </Button>
          </form>
        </Form>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Marques existantes</h2>
        
        <div className="max-h-[400px] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {brands.map(brand => (
                <tr key={brand.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{brand.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{brand.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteBrand(brand.id)}
                      disabled={loading || parentLoading}
                    >
                      Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {brands.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              Aucune marque enregistrée
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandsTab;
