
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CarBrand, FuelType, TransmissionType, Car, CompanyInfo } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import CarsList from "@/components/admin/CarsList";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Textarea } from "@/components/ui/textarea";

// Schéma de validation pour le formulaire de marque
const brandFormSchema = z.object({
  name: z.string().min(1, "Le nom de la marque est requis"),
});

// Schéma de validation pour le formulaire d'informations de l'entreprise
const companyFormSchema = z.object({
  name: z.string().min(1, "Le nom de l'entreprise est requis"),
  description: z.string().min(1, "La description est requise"),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Email invalide").optional().or(z.literal('')),
  logo_url: z.string().optional(),
});

const AdminPage = () => {
  const { isAdmin, loading: authLoading } = useAdminAuth();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
  const [transmissions, setTransmissions] = useState<TransmissionType[]>([]);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [cars, setCars] = useState<Car[]>([]);

  // Formulaire pour ajouter une marque
  const brandForm = useForm<z.infer<typeof brandFormSchema>>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      name: "",
    },
  });

  // Formulaire pour les informations de l'entreprise
  const companyForm = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: companyInfo?.name || "",
      description: companyInfo?.description || "",
      address: companyInfo?.address || "",
      phone: companyInfo?.phone || "",
      email: companyInfo?.email || "",
      logo_url: companyInfo?.logo_url || "",
    },
  });

  // Initialiser les données au chargement
  useEffect(() => {
    if (isAdmin) {
      Promise.all([
        fetchBrands(),
        fetchFuelTypes(),
        fetchTransmissionTypes(),
        fetchCompanyInfo(),
        fetchCars()
      ]);
    }
  }, [isAdmin]);
  
  // Mettre à jour les valeurs du formulaire lorsque companyInfo change
  useEffect(() => {
    if (companyInfo) {
      companyForm.reset({
        name: companyInfo.name,
        description: companyInfo.description,
        address: companyInfo.address || "",
        phone: companyInfo.phone || "",
        email: companyInfo.email || "",
        logo_url: companyInfo.logo_url || "",
      });
    }
  }, [companyInfo]);

  // Récupérer les marques
  const fetchBrands = async () => {
    try {
      // @ts-ignore
      const { data, error } = await supabase.from("car_brands").select("*").order('name');
      if (error) throw error;
      setBrands(data || []);
      return data;
    } catch (error) {
      console.error("Erreur lors du chargement des marques:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les marques.",
        variant: "destructive",
      });
    }
  };
  
  // Récupérer les types de carburant
  const fetchFuelTypes = async () => {
    try {
      // @ts-ignore
      const { data, error } = await supabase.from("fuel_types").select("*").order('name');
      if (error) throw error;
      setFuelTypes(data || []);
      return data;
    } catch (error) {
      console.error("Erreur lors du chargement des types de carburant:", error);
    }
  };
  
  // Récupérer les types de transmission
  const fetchTransmissionTypes = async () => {
    try {
      // @ts-ignore
      const { data, error } = await supabase.from("transmission_types").select("*").order('name');
      if (error) throw error;
      setTransmissions(data || []);
      return data;
    } catch (error) {
      console.error("Erreur lors du chargement des types de transmission:", error);
    }
  };
  
  // Récupérer les informations de l'entreprise
  const fetchCompanyInfo = async () => {
    try {
      // @ts-ignore
      const { data, error } = await supabase.from("company_info").select("*").single();
      if (error && error.code !== 'PGRST116') throw error; // Ignorer l'erreur si aucun résultat
      setCompanyInfo(data || null);
      return data;
    } catch (error) {
      console.error("Erreur lors du chargement des informations de l'entreprise:", error);
    }
  };
  
  // Récupérer les voitures
  const fetchCars = async () => {
    try {
      // @ts-ignore
      const { data, error } = await supabase.from("cars").select("*").order('created_at', { ascending: false });
      if (error) throw error;
      setCars(data || []);
      return data;
    } catch (error) {
      console.error("Erreur lors du chargement des voitures:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les voitures.",
        variant: "destructive",
      });
    }
  };

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
      fetchBrands();
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
      
      fetchBrands();
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

  // Soumettre le formulaire d'informations de l'entreprise
  const onSubmitCompanyInfo = async (values: z.infer<typeof companyFormSchema>) => {
    try {
      setLoading(true);
      if (companyInfo) {
        // Mettre à jour les informations existantes
        // @ts-ignore
        const { error } = await supabase
          .from("company_info")
          .update({
            name: values.name,
            description: values.description,
            address: values.address,
            phone: values.phone,
            email: values.email || null,
            logo_url: values.logo_url
          })
          .eq("id", companyInfo.id);
          
        if (error) throw error;
        
        toast({
          title: "Informations mises à jour",
          description: "Les informations de l'entreprise ont été mises à jour avec succès.",
        });
      } else {
        // Insérer de nouvelles informations
        // @ts-ignore
        const { error } = await supabase
          .from("company_info")
          .insert([{
            name: values.name,
            description: values.description,
            address: values.address,
            phone: values.phone,
            email: values.email || null,
            logo_url: values.logo_url
          }]);
          
        if (error) throw error;
        
        toast({
          title: "Informations ajoutées",
          description: "Les informations de l'entreprise ont été ajoutées avec succès.",
        });
      }
      
      fetchCompanyInfo();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite lors de la mise à jour des informations.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
    <div>
      <h1 className="text-3xl font-bold mb-6">Panneau d'administration</h1>
      
      <Tabs defaultValue="cars" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cars">Voitures</TabsTrigger>
          <TabsTrigger value="brands">Marques</TabsTrigger>
          <TabsTrigger value="company">Entreprise</TabsTrigger>
        </TabsList>
        
        {/* Onglet Voitures */}
        <TabsContent value="cars">
          <CarsList
            cars={cars}
            brands={brands}
            fuelTypes={fuelTypes}
            transmissions={transmissions}
            onCarsChange={fetchCars}
          />
        </TabsContent>
        
        {/* Onglet Marques */}
        <TabsContent value="brands">
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
                  
                  <Button type="submit" disabled={loading}>
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
                            disabled={loading}
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
        </TabsContent>
        
        {/* Onglet Informations de l'entreprise */}
        <TabsContent value="company">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Informations de l'entreprise</h2>
            
            <Form {...companyForm}>
              <form onSubmit={companyForm.handleSubmit(onSubmitCompanyInfo)} className="space-y-4">
                <FormField
                  control={companyForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de l'entreprise</FormLabel>
                      <FormControl>
                        <Input placeholder="Automotive" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={companyForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description de l'entreprise..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={companyForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Rue des Voitures" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={companyForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="+33 123 456 789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={companyForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="contact@automotive.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={companyForm.control}
                    name="logo_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL du logo</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/logo.png" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button type="submit" disabled={loading}>
                  {loading ? "Enregistrement..." : "Enregistrer"}
                </Button>
              </form>
            </Form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
