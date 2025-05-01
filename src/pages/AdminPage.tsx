
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CarBrand, FuelType, TransmissionType, Car, CompanyInfo } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const AdminPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
  const [transmissions, setTransmissions] = useState<TransmissionType[]>([]);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        
        if (!session.session) {
          navigate("/login");
          return;
        }
        
        // @ts-ignore - Ignorer l'erreur de typage pour le nom de table
        const { data: adminData } = await supabase
          .from("admins")
          .select("*")
          .eq("id", session.session.user.id)
          .single();
          
        if (!adminData) {
          toast({
            title: "Accès refusé",
            description: "Vous n'avez pas les droits d'administration nécessaires.",
            variant: "destructive",
          });
          navigate("/");
          return;
        }
        
        setIsAdmin(true);
        
        // Fetch all data
        await Promise.all([
          fetchBrands(),
          fetchFuelTypes(),
          fetchTransmissionTypes(),
          fetchCompanyInfo(),
          fetchCars()
        ]);
        
      } catch (error) {
        console.error("Error checking admin status:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    
    checkAdmin();
  }, [navigate]);

  const fetchBrands = async () => {
    // @ts-ignore - Ignorer l'erreur de typage pour le nom de table
    const { data } = await supabase.from("car_brands").select("*");
    setBrands(data || []);
    return data;
  };
  
  const fetchFuelTypes = async () => {
    // @ts-ignore - Ignorer l'erreur de typage pour le nom de table
    const { data } = await supabase.from("fuel_types").select("*");
    setFuelTypes(data || []);
    return data;
  };
  
  const fetchTransmissionTypes = async () => {
    // @ts-ignore - Ignorer l'erreur de typage pour le nom de table
    const { data } = await supabase.from("transmission_types").select("*");
    setTransmissions(data || []);
    return data;
  };
  
  const fetchCompanyInfo = async () => {
    // @ts-ignore - Ignorer l'erreur de typage pour le nom de table
    const { data } = await supabase.from("company_info").select("*").single();
    setCompanyInfo(data || null);
    return data;
  };
  
  const fetchCars = async () => {
    // @ts-ignore - Ignorer l'erreur de typage pour le nom de table
    const { data } = await supabase.from("cars").select("*");
    setCars(data || []);
    return data;
  };

  // Brand Form
  const brandFormSchema = z.object({
    name: z.string().min(1, "Le nom de la marque est requis"),
  });

  const brandForm = useForm<z.infer<typeof brandFormSchema>>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmitBrand = async (values: z.infer<typeof brandFormSchema>) => {
    try {
      // @ts-ignore - Ignorer l'erreur de typage pour le nom de table
      const { data, error } = await supabase
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
    }
  };

  // Company Info Form
  const companyFormSchema = z.object({
    name: z.string().min(1, "Le nom de l'entreprise est requis"),
    description: z.string().min(1, "La description est requise"),
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email("Email invalide").optional().or(z.literal('')),
    logo_url: z.string().optional(),
  });

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

  const onSubmitCompanyInfo = async (values: z.infer<typeof companyFormSchema>) => {
    try {
      if (companyInfo) {
        // Update
        // @ts-ignore - Ignorer l'erreur de typage pour le nom de table
        const { data, error } = await supabase
          .from("company_info")
          .update(values)
          .eq("id", companyInfo.id);
          
        if (error) throw error;
        
        toast({
          title: "Informations mises à jour",
          description: "Les informations de l'entreprise ont été mises à jour avec succès.",
        });
      } else {
        // Insert
        // @ts-ignore - Ignorer l'erreur de typage pour le nom de table
        const { data, error } = await supabase
          .from("company_info")
          .insert([values]);
          
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
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will be redirected by useEffect
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Panneau d'administration</h1>
      
      <Tabs defaultValue="company" className="space-y-4">
        <TabsList>
          <TabsTrigger value="company">Entreprise</TabsTrigger>
          <TabsTrigger value="cars">Voitures</TabsTrigger>
          <TabsTrigger value="brands">Marques</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>
        
        {/* Company Info Tab */}
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
                        <textarea 
                          className="w-full p-2 border rounded-md min-h-[100px]"
                          placeholder="Description de l'entreprise..." 
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
                
                <Button type="submit">Enregistrer</Button>
              </form>
            </Form>
          </div>
        </TabsContent>
        
        {/* Cars Tab */}
        <TabsContent value="cars">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Liste des voitures</h2>
              <Button>
                <Link to="/admin/cars/new">Ajouter une voiture</Link>
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Marque</TableHead>
                  <TableHead>Modèle</TableHead>
                  <TableHead>Année</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cars.map(car => (
                  <TableRow key={car.id}>
                    <TableCell className="font-medium">{car.id.substring(0, 8)}...</TableCell>
                    <TableCell>
                      {brands.find(b => b.id === car.brand_id)?.name || car.brand_id}
                    </TableCell>
                    <TableCell>{car.model}</TableCell>
                    <TableCell>{car.year}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Modifier
                        </Button>
                        <Button variant="destructive" size="sm">
                          Supprimer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {cars.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      Aucune voiture enregistrée
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        {/* Brands Tab */}
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
                  
                  <Button type="submit">Ajouter</Button>
                </form>
              </Form>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Marques existantes</h2>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {brands.map(brand => (
                    <TableRow key={brand.id}>
                      <TableCell className="font-medium">{brand.id}</TableCell>
                      <TableCell>{brand.name}</TableCell>
                      <TableCell>
                        <Button variant="destructive" size="sm">
                          Supprimer
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {brands.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-4">
                        Aucune marque enregistrée
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Paramètres du site</h2>
            
            <p className="mb-4 text-gray-600">
              Cette section sera développée dans une future mise à jour pour permettre la configuration du site.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
